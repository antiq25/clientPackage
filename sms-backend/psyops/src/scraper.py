from selenium import webdriver
from selenium.webdriver.common.by import By
from src.db import batch_insert_reviews, get_url_from_listing
from selenium.common.exceptions import StaleElementReferenceException
import time
import re 
from datetime import datetime


classNames = {
    "username": "d4r55",
    "description": "RfnDt",
    "stars": "kvMYJc",
    "date": "rsqaWe",
    "see_more_button": "w8nwRe.kyuRq",
    "review_text": "wiI7pd"
}


def click_see_more_button(buttons_list, index):
    try:
        if index < len(buttons_list):
            buttons_list[index].click()
    except:
        pass


def extract_review_data(review_elements, stars):
    data = []
    for element in review_elements:
        data.append(element.text.strip())

    data.append(stars.get_attribute("aria-label"))
    return data


def is_valid_url(url):  ## regex to check if url is valid
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|'  # ...or ipv4
        r'\[?[A-F0-9]*:[A-F0-9:]+\]?)'  # ...or ipv6
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url) is not None

def run(listingId, max_reviews):
    url = get_url_from_listing(listingId)

    # Validate URL
    if not is_valid_url(url):
        print("Invalid URL")
        return
    
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    driver.get(url + "&hl=en")
    sidebar = driver.find_element(By.CLASS_NAME, "m6QErb.DxyBCb.kA9KIf.dS8AEf")
    see_more_buttons = driver.find_elements(
        By.CLASS_NAME, classNames["see_more_button"])

    prev_num_of_reviews = 0
    no_change_count = 0
    MAX_NO_CHANGE = 5


    while len(driver.find_elements(By.CLASS_NAME, classNames["username"])) < max_reviews:
        driver.implicitly_wait(3)
        current_num_of_reviews = len(driver.find_elements(By.CLASS_NAME, classNames["username"]))
        if current_num_of_reviews == prev_num_of_reviews:
            no_change_count += 1
        else:
            no_change_count = 0

        if no_change_count >= MAX_NO_CHANGE:
            break

        prev_num_of_reviews = current_num_of_reviews

        driver.execute_script(
            "arguments[0].scrollTop = arguments[0].scrollHeight;", sidebar)

    elements = {key: driver.find_elements(
        By.CLASS_NAME, value) for key, value in classNames.items()}

    i = 0
    reviews_to_insert = []
    while i < max_reviews:
        try:
            elements = {key: driver.find_elements(By.CLASS_NAME, value) for key, value in classNames.items()}
            num_reviews_on_website = len(elements["username"])
            if i >= num_reviews_on_website:
                break  # Exit loop if there are no more reviews

            username = elements["username"][i].text.strip() if i < len(elements["username"]) else "N/A"
            description = elements["description"][i].text.strip() if i < len(elements["description"]) else "N/A"
            date = elements["date"][i].text.strip() if i < len(elements["date"]) else datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            review_text = elements["review_text"][i].text.strip() if i < len(elements["review_text"]) else "N/A"
            stars = elements["stars"][i].get_attribute("aria-label") if i < len(elements["stars"]) else "999" # < --- changed from integer here to string 

            reviews_to_insert.append({
                "author": username,
                "authorDescription": description,
                "stars": stars,
                "date": date,
                "content": review_text
            })

            i += 1  # Increment the counter only if successful
        except StaleElementReferenceException:
            print(f"Encountered a stale element at index {i}, retrying.")
            time.sleep(1) 
            
        click_see_more_button(see_more_buttons, i)

    driver.quit()
    batch_insert_reviews(listingId, reviews_to_insert)