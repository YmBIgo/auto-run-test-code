"""
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
"""

from selenium import webdriver;
from selenium.webdriver.common.action_chains import ActionChains;
from selenium.webdriver.common.by import By;
from selenium.webdriver.chrome import service as fs;

from time import sleep;
chrome_service = fs.Service(executable_path='/Users/coffeecup/Documents/work/test_automation/test_automation_selenium/chromedriver');
driver = webdriver.Chrome(service=chrome_service);
actionChains = ActionChains(driver);

driver.get('https://www.nikkei.com');
name1 = '';
name2 = '';
name1 = driver.find_elements(By.XPATH, '/html/body/div[5]/div[1]/main/k2-headline-reloader/div[1]/div/k2-pattern-test/div/article/div[2]/h2')[0].text;
if name1 != 'test':
  driver.find_elements(By.XPATH, '/html/body/div[5]/div[1]/main/k2-headline-reloader/div[1]/div/k2-pattern-test/div/article/a')[0].click();
  sleep(2);
  driver.find_elements(By.XPATH, '/html/body/header/nav/div/div/ul/li[2]/a')[0].click();
  sleep(2);
  driver.find_elements(By.XPATH, '/html/body/main/header/div/div/div[1]/input')[-9].send_keys('test');
  driver.find_elements(By.XPATH, '/html/body/main/div[2]/div/section[2]/div/div/button')[0].click();
  sleep(2);
script_result = (name1!='test');
print(script_result);
driver.quit();