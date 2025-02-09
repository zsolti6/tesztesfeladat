from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.set_window_size(1920, 1080)

driver.get("http://localhost:3000")

time.sleep(3)

def check_input_field(name, value):
    field = driver.find_element(By.NAME, name)
    field.clear()
    field.send_keys(value)
    field.send_keys(Keys.TAB)
    time.sleep(1)
    print(f"A {name} mező sikeresen kitöltve: {value}")

check_input_field("name", "Gáspár Zsolt")
check_input_field("email", "gasparzs@kkszki.hu")
check_input_field("age", "20")
check_input_field("favoriteGame", "League of Legends")

submit_button = driver.find_element(By.CLASS_NAME, "btn-primary")
submit_button.click()
time.sleep(2)

driver.save_screenshot('form_success_test.png')

driver.quit()
