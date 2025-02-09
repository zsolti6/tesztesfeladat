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

def check_input_field(name, value, error_message):
    field = driver.find_element(By.NAME, name)
    field.clear()
    field.send_keys(value)
    field.send_keys(Keys.TAB)
    time.sleep(1)
    
    try:
        error = driver.find_element(By.CLASS_NAME, "text-danger")
        assert error.text == error_message, f"Hibás üzenet a(z) {name} mezőnél: {error.text}"
        print(f"Helyes hibaüzenet megjelenik a(z) {name} mezőnél")
    except:
        print(f"Nincs hibaüzenet, vagy nem megfelelő a(z) {name} mezőnél")

check_input_field("name", "123", "A név csak betűket és szóközt tartalmazhat!")
check_input_field("email", "hibasemail", "Érvénytelen email cím!")
check_input_field("age", "abc", "Az életkor csak szám lehet!")
check_input_field("favoriteGame", "", "A kedvenc játék nem lehet üres!")

submit_button = driver.find_element(By.CLASS_NAME, "btn-primary")
submit_button.click()
time.sleep(2)

driver.save_screenshot('form_test_result.png')

driver.quit()