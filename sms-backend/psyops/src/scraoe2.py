from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver import TouchActions

# Initialize the driver and open the URL (assumed to be set earlier)
driver = webdriver.Chrome()
driver.get('https://www.google.com/maps/place/Vancouver+General+Hospital/@49.267965,-123.113447,14z/data=!4m18!1m9!3m8!1s0x548673ddca46c9b3:0x258298f71e1ec8b2!2sCanadian+Tire!8m2!3d49.2652952!4d-123.1137803!9m1!1b1!16s%2Fg%2F1ts_68_2!3m7!1s0x548673c28db3e7ed:0xf09486e6e83bb967!8m2!3d49.2614006!4d-123.1221562!9m1!1b1!16zL20vMGM4azA4?hl=en&entry=ttu')  # Replace 'your_url' with the actual URL
wait = WebDriverWait(driver, 10)

# Scroll to the last review element to trigger loading more reviews
last_review = wait.until(EC.visibility_of_all_elements_located((By.CSS_SELECTOR, ".section-review-content")))[-1]
ActionChains(driver).move_to_element(last_review).perform()

# Perform a scroll action to load more reviews
touch_actions = TouchActions(driver)
touch_actions.scroll(0, 8000).perform()

# Wait for reviews to load and then iterate over them
reviews = wait.until(EC.visibility_of_all_elements_located((By.CSS_SELECTOR, ".section-review-content")))
for review in reviews:
    # Extract the name and review text
    try:
        name = WebDriverWait(review, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "[class='section-review-title'] > span"))).text
        review_text = WebDriverWait(review, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "[class='section-review-text']"))).text
        print(name, review_text)
    except Exception as e:
        print(f"Error while extracting review: {e}")

# Close the driver after scraping
driver.quit()
