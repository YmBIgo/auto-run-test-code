from selenium import webdriver;
from selenium.webdriver.common.action_chains import ActionChains;
from selenium.webdriver.common.by import By;
from selenium.webdriver.chrome import service as fs;

from time import sleep;
chrome_service = fs.Service(executable_path='/Users/coffeecup/Documents/work/test_automation/test_automation_selenium/chromedriver');
driver = webdriver.Chrome(service=chrome_service);
actionChains = ActionChains(driver);

driver.get('https://www.yahoo.co.jp');
driver.find_elements(By.XPATH, '//*[@id="ContentWrapper"]/header/section[1]/div/form/fieldset/span/input')[0].send_keys('test');
driver.find_elements(By.XPATH, '//*[@id="ContentWrapper"]/header/section[1]/div/form/fieldset/span/button')[0].click();
sleep(2);
driver.quit();