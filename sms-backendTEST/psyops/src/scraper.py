from selenium import webdriver
from selenium.webdriver.common.by import By
from src.db import batch_insert_reviews
import time

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


def run(listingId, max_reviews, url):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    driver.get(url + "&hl=en")

    time.sleep(2)

    sidebar = driver.find_element(By.CLASS_NAME, "m6QErb.DxyBCb.kA9KIf.dS8AEf")
    see_more_buttons = driver.find_elements(By.CLASS_NAME, classNames["see_more_button"])

    while len(driver.find_elements(By.CLASS_NAME, classNames["username"])) < max_reviews:
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight;", sidebar)

    elements = {key: driver.find_elements(By.CLASS_NAME, value) for key, value in classNames.items()}
    reviews_to_insert = []

    for i in range(len(elements["username"])):
        username, description, date, review_text, stars = extract_review_data([elements["username"][i], elements["description"][i], elements["date"][i], elements["review_text"][i]], elements["stars"][i])
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
