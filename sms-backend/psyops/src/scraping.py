from selenium import webdriver
from selenium.webdriver.common.by import By
from src.db import batch_insert_reviews, get_url_from_listing
import time
import datetime

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


def run(listingId, max_reviews):
    url = get_url_from_listing(listingId)

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

    reviews_to_insert = []

    num_reviews_on_website = len(elements["username"])
    num_reviews_to_process = min(max_reviews, num_reviews_on_website)

    for i in range(num_reviews_to_process):
        username = elements["username"][i].text.strip() if i < len(elements["username"]) else "N/A"
        description = elements["description"][i].text.strip() if i < len(elements["description"]) else "N/A"
        date = elements["date"][i].text.strip() if i < len(elements["date"]) else time.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        review_text = elements["review_text"][i].text.strip() if i < len(elements["review_text"]) else "N/A"
        stars = elements["stars"][i].get_attribute("aria-label") if i < len(elements["stars"]) else 999 # temp, will think of smth later ;(

        reviews_to_insert.append({
            "author": username,
            "authorDescription": description,
            "stars": stars,
            "date": date,
            "content": review_text
        })

        click_see_more_button(see_more_buttons, i)

    driver.quit()
    batch_insert_reviews(listingId, reviews_to_insert)
