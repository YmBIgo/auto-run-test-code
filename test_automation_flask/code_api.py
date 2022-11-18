from flask import Flask
from flask import request
import json

app = Flask(__name__)

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5000, debug=True)

@app.route("/")
def code_api():
	url = request.args.get("url")
	json_str = request.args.get("code_json_str")
	command_results = json.loads(json_str)
	# script_result = "test"
	chrome_path = "/Users/coffeecup/Documents/work/test_automation/test_automation_selenium/chromedriver"
	# chrome_path = "your_path"
	code_result = "from selenium import webdriver;\n"
	code_result += "from selenium.webdriver.common.action_chains import ActionChains;\n"
	code_result += "from selenium.webdriver.common.by import By;\n"
	code_result += "from selenium.webdriver.chrome import service as fs;\n\n"
	code_result += "from time import sleep;\n"
	code_result += "script_result = '';\n"
	code_result += "chrome_service = fs.Service(executable_path='" + chrome_path + "');\n"
	code_result += "driver = webdriver.Chrome(service=chrome_service);\n"
	code_result += "actionChains = ActionChains(driver);\n\n"
	code_result += "driver.get('" + url + "');\n"
	for command_result in command_results:
		code_result = analyze_command_result(command_result, code_result, "")
	code_result += "driver.quit();\n"
	print(code_result)
	variable_list = {}
	try:
		exec(code_result, globals(), variable_list)
	except:
		return "something went wrong..."
	# return str(script_result)
	print(variable_list)
	return str(variable_list["script_result"])

def analyze_command_result(command_result, code_result, indent):
	if command_result['command_id'] == 0:
		variable = command_result['variable'].split(";")[0].split(" ")[0]
		code_result += indent + variable + " = '';\n"
	elif command_result['command_id'] == 3:
		xpath = command_result['xpath'].split(";")[0].split(" ")[0]
		xpath_index = str(command_result['xpath_index']-1)
		variable = command_result['variable'].split(";")[0].split(" ")[0]
		code_result += indent + variable + " = " + "driver.find_elements(By.XPATH, '" + xpath + "')[" + xpath_index + "].text;\n"
	if command_result['command_id'] == 1:
		condition1 = command_result['condition1'].split(";")[0].split(" ")[0]
		condition2 = command_result['condition2'].split(";")[0].split(" ")[0]
		condition_sign = command_result['condition_sign'].split(" ")[0]
		code_result += indent + "if " + condition1 + " " + condition_sign + " '" + condition2 + "':\n"
		for child_command in command_result['commands']:
			code_result += analyze_command_result(child_command, "", "  ")
	if command_result['command_id'] == 2:
		condition1 = command_result['condition1'].split(";")[0].split(" ")[0]
		code_result += indent + "for i in range(" + str(condition1) + "):\n"
		for child_command in command_result['commands']:
			code_result += analyze_command_result(child_command, "", "  ")
	elif command_result['command_id'] == 4:
		xpath = command_result['xpath'].split(";")[0].split(" ")[0]
		xpath_index = str(command_result['xpath_index']-1)
		code_result += indent + "driver.find_elements(By.XPATH, '" + xpath + "')[" + xpath_index + "].click();\n"
		code_result += indent + "sleep(2);\n"
	elif command_result['command_id'] == 5:
		xpath = command_result['xpath'].split(";")[0].split(" ")[0]
		xpath_index = str(command_result['xpath_index']-1)
		is_variable = command_result['is_variable']
		if is_variable == True:
			variable = command_result['content'].split(";")[0].split(" ")[0]
			code_result += indent + "driver.find_elements(By.XPATH, '" + xpath + "')[" + xpath_index + "].send_keys(" + variable + ");\n"
		elif is_variable == False:
			character = command_result['content'].split(";")[0].split(" ")[0]
			code_result += indent + "driver.find_elements(By.XPATH, '" + xpath + "')[" + xpath_index + "].send_keys('" + character + "');\n"
	elif command_result['command_id'] == 6:
		variable = command_result['variable'].split(";")[0].split(" ")[0]
		content = command_result['content'].split(";")[0].split(" ")[0]
		sign_type = command_result['sign_type'].split(";")[0].split(" ")[0]
		code_result += indent + "script_result = (" + variable + sign_type + "'" + content + "');\n"
		code_result += indent + "print(script_result);\n"
	else:
		pass
	return code_result


