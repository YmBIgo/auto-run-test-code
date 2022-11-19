import React, {useState, useEffect} from 'react'
import axios from "axios"
import "./css/index.css"
import {COMMANDS, COMMANDS_IF_VERSION,
        COMMANDS_STR, COMMANDS_STR_IF_VERSION, COMMANDS_STR_WHILE_VERSION,
        COMMAND_STR_HASH, COMMAND_STR_INDEX_IF_VERSION, COMMAND_STR_INDEX_WHILE_VERSION,
        COMMAND_KEYS, sign_type} from "./constants/commands"
import {COMMAND_ELEMENTS, COMMAND_ELEMENT,
        COMMAND_IF_ELEMENTS, COMMAND_WHILE_ELEMENTS,
        COMMAND_ELEMENT1, COMMAND_ELEMENT2, COMMAND_ELEMENT3,
        COMMAND_ELEMENT4, COMMAND_ELEMENT5, COMMAND_ELEMENT6} from "./type/command"
// Command Input
import Command1Input from "./component/CommandInput/Command1Input"
import Command2Input from "./component/CommandInput/Command2Input"
import Command4Input from "./component/CommandInput/Command4Input"
import Command5Input from "./component/CommandInput/Command5Input"
import Command6Input from "./component/CommandInput/Command6Input"
import Command7Input from "./component/CommandInput/Command7Input"
import IfCommand4Input from "./component/CommandInput/IfCommand4Input"
import IfCommand5Input from "./component/CommandInput/IfCommand5Input"
import IfCommand6Input from "./component/CommandInput/IfCommand6Input"
// Command Output
import Command1Output from "./component/CommandOutput/Command1Output"
import Command2Output from "./component/CommandOutput/Command2Output"
import Command3Output from "./component/CommandOutput/Command3Output"
import Command4Output from "./component/CommandOutput/Command4Output"
import Command5Output from "./component/CommandOutput/Command5Output"
import Command6Output from "./component/CommandOutput/Command6Output"
import Command7Output from "./component/CommandOutput/Command7Output"

type AWS_RESULT_TYPE = {
  file_name: string;
  result: string;
  variables: {[key: string]:string};
}

function App() {

  // right web ui
  const [current_right_message, set_current_right_message] = useState<string>("入力する命令を選択して下さい")
  const [current_right_command, set_current_right_command] = useState<number>(0) 
  const [right_command_input_is_disabled, set_right_command_input_is_disabled] = useState<boolean>(true)
  const [current_url, set_current_url] = useState<string>("")
  const [input_json_command, set_input_json_command] = useState<File | null>(null)
  const [test_result, set_test_result] = useState<string>("テストを実行して下さい")
  const [test_result_image, set_test_result_image] = useState<string>("")
  const [test_result_variables, set_test_result_variables] = useState<{[key: string]: string}>({} as {[key: string]: string})
  const [test_is_loading, set_test_is_loading] = useState<boolean | null>(null)
  // left title
  const [is_left_title_json, set_is_left_title_json] = useState<boolean>(false)
  // left web ui
  const [is_left_ui_focused, set_is_left_ui_focused] = useState<number | null>(null)
  const [current_left_command_if_command, set_current_left_command_if_command] = useState<number>(0)
  // left web ui if
  const [if_command_results, set_if_command_results] = useState<COMMAND_IF_ELEMENTS[]>([])
  const [left_command_if_command_is_disabled, set_left_command_if_command_is_disabled] = useState<boolean>(false)
  const [is_if_command_focused, set_is_if_command_focused] = useState<number | null>(null)
  // left web ui while
  const [while_command_results, set_while_command_results] = useState<COMMAND_WHILE_ELEMENTS[]>([])
  const [left_command_while_command_is_disabled, set_left_command_while_command_is_disabled] = useState<boolean>(false)
  const [is_while_command_focused, set_is_while_command_focused] = useState<number | null>(null)
  // command result
  const [command_results, set_command_results] = useState<COMMAND_ELEMENTS>([])

  const onChangeRightCommand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    set_current_right_command(Number(e.target.value))
  }

  // json
  const onChangeCommandJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files === null) return
    const file = files[0]
    console.log(file)
    set_input_json_command(file)
  }
  const loadCommandJSON = () => {
    if (input_json_command === null) return
    const reader = new FileReader();
    let json_result: {commands: COMMAND_ELEMENTS, url: string} = {commands: [], url: ""}
    reader.onload = () => {
      try{
        const reader_result = reader.result as string
        if (reader_result === null) return
        json_result = JSON.parse(reader_result) // should fix ArrayBuffer
      } catch (e) {
        json_result = {commands: [], url: ""}
      } finally {
        set_command_results(json_result.commands)
        set_current_url(json_result.url)
      }
    }
    reader.readAsText(input_json_command)
    unFocusLeftCommandElement()
  }
  const downloadCommandJSON = () => {
    const random_str = (Math.random() * 1000000).toString(16).replace(/\./, "")
    const fileName = `test_automation_${random_str}.json`
    const download_content: {commands: COMMAND_ELEMENTS, url: string} = {commands: command_results, url: current_url}
    const download_content_str = JSON.stringify(download_content)
    downloadJSON([download_content_str], fileName, 'text/json')
  }
  const downloadTestResultJSON = () => {
    const random_str = (Math.random() * 1000000).toString(16).replace(/\./, "")
    const fileName = `test_result_${random_str}.csv`
    let download_content = `url,${current_url}\n`
    download_content    += `commands,'${JSON.stringify(command_results).replace(/,/g, "\\,").replace(/'/g,"\\'")}'\n`
    download_content    += `assertion,${test_result}\n`
    download_content    += `image_url,${test_result_image}\n`
    download_content    += "variables,"
    for (let test_variable in Object.keys(test_result_variables)) {
      download_content  += `${test_variable},${test_result_variables[test_variable]}\n`
    }
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    downloadJSON([bom, download_content], fileName, 'text/csv')
  }
  const downloadJSON = (download_content: any, fileName: string, file_type: string) => {
    const data = new Blob(download_content, {type: file_type})
    const jsonURL = window.URL.createObjectURL(data)
    const link = document.createElement('a')
    document.body.appendChild(link)
    link.href = jsonURL
    link.setAttribute('download', fileName)
    link.click()
    document.body.removeChild(link)
  }

  // create commands other than if and while
  const createCommandInput = () => {
    const command6_filtered_command_result = command_results.filter((c_r) => c_r.command_id === 6)
    if (command6_filtered_command_result.length === 1 && current_right_command === 6) {
      alert("結果チェックは１つまでしか登録できません")
      return
    }
    const newly_created_command_id: number = command_results.length
    set_is_left_ui_focused(newly_created_command_id)
    set_right_command_input_is_disabled(true)
    let created_command: COMMAND_ELEMENT = {command_id: 0, variable: "", description: ""};
    if (current_right_command === 1) {
      created_command = {command_id: 1, commands: [], condition1: "", condition2: "", condition_sign: "", description: ""}
    } else if (current_right_command === 2) {
      created_command = {command_id: 2, commands: [], condition1: "", description: ""}
    } else if (current_right_command === 3) {
      created_command = {command_id: 3, xpath: "", xpath_index: 0, variable: "", description: ""}
    } else if (current_right_command === 4) {
      created_command = {command_id: 4, xpath: "", xpath_index: 0, description: ""}
    } else if (current_right_command === 5) {
      created_command = {command_id: 5, xpath: "", xpath_index: 0, is_variable: false, content: "", description: ""}
    } else if (current_right_command === 6) {
      created_command = {command_id: 6, variable: "", content: "", sign_type: "", description: ""}
    }
    set_command_results([...command_results, created_command])
  }
  const deleteCommandResult = (index: number) => {
    unFocusLeftCommandElement()
    let deleted_command_results = command_results.slice()
    deleted_command_results.splice(index, 1)
    set_command_results([...deleted_command_results])
  }

  const reFocusLeftCommandElement = (index: number) => {
    set_right_command_input_is_disabled(true)
    set_is_left_ui_focused(index)
  }
  const unFocusLeftCommandElement = () => {
    set_right_command_input_is_disabled(false)
    set_is_left_ui_focused(null)
  }
  const setCommandResultEachNormal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, col_name: COMMAND_KEYS, index: number) => {
    set_command_results((prev_command_result) => {
      let current_command_result: any = prev_command_result[index] // should fix any
      const copyed_col_name = col_name as string
      if (col_name in current_command_result) {
        if (col_name === "xpath_index") {
          current_command_result[col_name] = Number(e.target.value)
        } else if (col_name === "is_variable") {
          current_command_result[col_name] = Boolean(Number(e.target.value))
        } else {
          current_command_result[col_name] = e.target.value
        }
        prev_command_result.splice(index, 1, current_command_result)
        return [...prev_command_result]
      } else {
        return prev_command_result
      }
    })
  }

  // if
  const reFocusIfCommandElement = (index: number, i_index: number) => {
    set_left_command_if_command_is_disabled(true)
    set_is_if_command_focused(i_index)
    const new_command_result_commands = command_results[index].commands
    set_if_command_results(new_command_result_commands as COMMAND_IF_ELEMENTS[])
  }
  const reFocusIfCommandBlock = (index: number) => {
    const new_command_result_commands = command_results[index].commands
    set_if_command_results(new_command_result_commands as COMMAND_IF_ELEMENTS[])
  }
  const unFocusIfCommandElement = (index: number) => {
    if (is_left_ui_focused !== index ) { return }
    set_left_command_if_command_is_disabled(false)
    set_is_if_command_focused(null)
  }
  const unFocusIfCommandElement2 = () => {
    set_left_command_if_command_is_disabled(false)
    set_is_if_command_focused(null)
  }
  const onChangeIfCommand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    set_current_left_command_if_command(Number(e.target.value))
  }
  const createCommandInputIfVersion = (index: number) => {
    reFocusIfCommandBlock(index)
    const is_fin_exists = if_command_results.some((i_c_result) => {
      return i_c_result.command_id === 101
    })
    if (is_fin_exists === true) {
      alert("If文は終了しています。")
      return
    }
    const newly_created_if_command_id = if_command_results.length 
    set_is_if_command_focused(newly_created_if_command_id)
    set_left_command_if_command_is_disabled(true)
    let created_command: COMMAND_IF_ELEMENTS = {command_id: 3, xpath: "", xpath_index: 0, variable: "", description: ""}
    if (current_left_command_if_command === 4) {
      created_command = {command_id: 4, xpath: "", xpath_index: 0, description: ""}
    } else if (current_left_command_if_command === 5) {
      created_command = {command_id: 5, xpath: "", xpath_index: 0, is_variable: false, content: "", description: ""}
    } else if (current_left_command_if_command === 101) {
      created_command = {command_id: 101}
    }
    set_if_command_results([...if_command_results, created_command])
    set_command_results((prev_command_results: COMMAND_ELEMENTS) => {
      const newly_insert_command_result: COMMAND_ELEMENT2 = {command_id: 1, commands: [...if_command_results, created_command], condition1: prev_command_results[index].condition1!, condition2: prev_command_results[index].condition2!, condition_sign: prev_command_results[index].condition_sign!, description: prev_command_results[index].description!}
      if (prev_command_results[index].condition1 !== undefined && prev_command_results[index].condition2 !== undefined && prev_command_results[index].condition_sign !== undefined ) {
        prev_command_results.splice(index, 1, newly_insert_command_result)
      } else {
        prev_command_results.splice(index, 1, {command_id: 1, commands: [...if_command_results, created_command], condition1: "", condition2: "", condition_sign: "", description: ""})
      }
      return [...prev_command_results]
    })
  }
  const setIfWhileCommandResultEachNormal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, col_name: COMMAND_KEYS, index: number, if_index: number) => {
    set_command_results((prev_command_result) => {
      let current_if_command_result: any = prev_command_result[index] // should fix any
      if ("commands" in current_if_command_result === false) {
        return prev_command_result
      }
      let current_command_result = current_if_command_result.commands[if_index]
      if (col_name in current_command_result) {
        if (col_name === "xpath_index") {
          current_command_result[col_name] = Number(e.target.value)
        } else if (col_name === "is_variable") {
          current_command_result[col_name] = Boolean(Number(e.target.value))
        } else {
          current_command_result[col_name] = e.target.value
        }
        const current_command_result_commands = current_if_command_result.commands
        current_command_result_commands.splice(if_index, 1, current_command_result)
        current_if_command_result.commands = current_command_result_commands
        prev_command_result.splice(index, 1, current_if_command_result)
        return [...prev_command_result]
      } else {
        return prev_command_result
      }
    })
  }

  // while
  const createCommandInputWhereVersion = (index: number) => {
    reFocusWhileCommandBlock(index)
    const is_fin_exists = while_command_results.some((i_c_result) => {
      return i_c_result.command_id === 201
    })
    if (is_fin_exists === true) {
      alert("While文は終了しています。")
      return
    }
    const newly_created_while_command_id = while_command_results.length 
    set_is_while_command_focused(newly_created_while_command_id)
    set_left_command_while_command_is_disabled(true)
    let created_command: COMMAND_WHILE_ELEMENTS = {command_id: 3, xpath: "", xpath_index: 0, variable: "", description: ""}
    if (current_left_command_if_command === 4) {
      created_command = {command_id: 4, xpath: "", xpath_index: 0, description: ""}
    } else if (current_left_command_if_command === 5) {
      created_command = {command_id: 5, xpath: "", xpath_index: 0, is_variable: false, content: "", description: ""}
    } else if (current_left_command_if_command === 201) {
      created_command = {command_id: 201}
    }
    set_while_command_results([...while_command_results, created_command])
    set_command_results((prev_command_results: COMMAND_ELEMENTS) => {
      const newly_insert_command_result: COMMAND_ELEMENT3 = {command_id: 2, commands: [...while_command_results, created_command], condition1: prev_command_results[index].condition1!, description: prev_command_results[index].description!}
      if (prev_command_results[index].condition1 !== undefined ) {
        prev_command_results.splice(index, 1, newly_insert_command_result)
      } else {
        prev_command_results.splice(index, 1, {command_id: 2, commands: [...while_command_results, created_command], condition1: "", description: ""})
      }
      return [...prev_command_results]
    })
  }
  const reFocusWhileCommandElement = (index: number, i_index: number) => {
    set_left_command_while_command_is_disabled(true)
    set_is_while_command_focused(i_index)
    const new_command_result_commands = command_results[index].commands
    set_while_command_results(new_command_result_commands as COMMAND_WHILE_ELEMENTS[])
  }
  const reFocusWhileCommandBlock = (index: number) => {
    const new_command_result_commands = command_results[index].commands
    set_while_command_results(new_command_result_commands as COMMAND_WHILE_ELEMENTS[])
  }
  const unFocusWhileCommandElement = (index: number) => {
    if (is_left_ui_focused !== index ) { return }
    set_left_command_while_command_is_disabled(false)
    set_is_while_command_focused(null)
  }

  // submit
  const submitCommand = () => {
    const aws_url = "https://s270q3vddg.execute-api.us-west-1.amazonaws.com/default/runAutoCreatedTestCode?url=" + current_url + "&code_json_str=" + JSON.stringify(command_results)
    console.log(aws_url)
    set_test_is_loading(false)
    set_test_result("テスト実施中...")
    axios.get(aws_url ).then((result) => {
      console.log(result.data)
      const aws_result = result.data as AWS_RESULT_TYPE // should fix
      set_test_result(aws_result.result)
      set_test_result_image(aws_result.file_name)
      console.log(aws_result.variables)
      set_test_result_variables(aws_result.variables)
      set_test_is_loading(true)
    })
    .catch (error => {
      set_test_is_loading(null)
      set_test_result("テスト失敗")
    })
  }

// https://s270q3vddg.execute-api.us-west-1.amazonaws.com/default/runAutoCreatedTestCode
// url="https://www.yahoo.co.jp"&code_json_str='[{"command_id":5,"xpath":"//*[@id=\"ContentWrapper\"]/header/section[1]/div/form/fieldset/span/input","xpath_index":1,"is_variable":false,"content":"test"},{"command_id":4,"xpath":"//*[@id=\"ContentWrapper\"]/header/section[1]/div/form/fieldset/span/button","xpath_index":1}]'

  return (
    <div className="">
      <h1>テスト自動化ツール</h1>
      <hr/>
      <h4 className="app-h4-without-margin">使い方</h4>
      <ol>
        <li>右側のパネルで、URLを入力します (JSONをロードする場合は、2は飛ばしても大丈夫です)。</li>
        <li>左側のパネルで、自動化したい動作を入力します。
          <ul>
            <li>変数や <a href="http://www.ic.daito.ac.jp/~mizutani/python/intro8_python.html" target="_blank">pythonの予約語</a> は数字以外を入力して下さい。</li>
            <li>Xpath は <a href="https://qiita.com/ywindish/items/5a992c49387d81df900e" target="_blank">ディベロッパーツールを使えばコピー</a>出来ます。</li>
            <li>一度だけ、「結果チェック」という内容の検証を行うことができます。</li>
          </ul>
        </li>
        <li>動作を入力したら、右側のパネルの「結果を送信する」の緑のボタンを押します。１分ほどすれば結果が表示されます。</li>
        <li>AWSのリージョンがアメリカであるため、他言語対応サイトでは英語の結果しか表示されません。すみません。</li>
      </ol>
      <hr/>
      <div className="App">
      <div className="app-left" onClick={() => {unFocusLeftCommandElement();}}>
        <div className="app-left-command-title">
          {current_url ? `${current_url}を自動化` : "自動化するURLを右から入力して下さい。" }
          { is_left_title_json &&
            <>
              <hr/>
              <p style={{margin: "3px 0"}}>JSON結果：</p>
              <div className="app-json">
                {JSON.stringify(command_results)}
              </div>
            </>
          }
        </div>
        <div className="app-left-command-download-button">
          <input type="button" className="app-button-primary" value="JSONをダウンロード" style={{width: "120px"}} onClick={() => downloadCommandJSON()} />
          <input type="button" className="app-button-success" value={is_left_title_json ? "JSONを非表示" : "JSONを表示"} style={{marginLeft: "20px"}} onClick={() => set_is_left_title_json((prev_is_left_title_json) => !prev_is_left_title_json)}/>
          <input type="button" className="app-button-danger" value="リセット" style={{marginLeft: "20px"}} onClick={() => set_command_results([])} />
        </div>
        {command_results.length === 0 ?
          <div><h3>自動化が設定されていません。</h3></div>
          :
          command_results.map((c_result, index) => {
          return (
            <React.Fragment key={`command_element_${index}`}>
              <div
                className={ is_left_ui_focused === index ? "app-left-command-element focused-app-left-command-element" : "app-left-command-element"}
                onClick={(e) => {reFocusLeftCommandElement(index); unFocusIfCommandElement(index);unFocusWhileCommandElement(index);e.stopPropagation()}}
              >
                { is_left_ui_focused === index ?
                  <>
                    <h6 className="app-h6-without-margin">
                      {index+1} : {COMMANDS_STR[c_result.command_id]}
                      <input
                        type="button"
                        value="削除する"
                        className="app-button-danger"
                        onClick={(e) =>{ deleteCommandResult(index); e.stopPropagation()}}
                      />
                    </h6>
                    <hr/>
                    {c_result.command_id === 0 &&
                      <Command1Input
                        setCommandResultEachNormal={setCommandResultEachNormal}
                        command_results={command_results}
                        command_result={c_result}
                        index={index}
                      />
                    }
                    {c_result.command_id === 1 &&
                      <Command2Input
                        setIfCommandResultEachNormal={setIfWhileCommandResultEachNormal}
                        setCommandResultEachNormal={setCommandResultEachNormal}
                        onChangeIfCommand={onChangeIfCommand}
                        createCommandInputIfVersion={createCommandInputIfVersion}
                        unFocusIfCommandElement={unFocusIfCommandElement}
                        reFocusIfCommandElement={reFocusIfCommandElement}
                        reFocusIfCommandBlock={reFocusIfCommandBlock}
                        current_left_command_if_command={current_left_command_if_command}
                        command_results={command_results}
                        command_result={c_result}
                        if_command_results={if_command_results}
                        index={index}
                        is_if_command_focused={is_if_command_focused}
                      />
                    }
                    {c_result.command_id === 2 &&
                      <>
                        <label><small>コメント</small></label>
                        <br/>
                        <input
                          type="text"
                          className="app-text-input"
                          style={{width: "90%"}}
                          onChange={(e) => setCommandResultEachNormal(e, "description", index)}
                          value={(c_result.description) ? c_result.description : ""}
                          placeholder="コメントを入力して下さい(任意)"
                        />
                        <br/>
                        <br/>
                        <div className="app-left-command-detail-area-small" onClick={() => {unFocusWhileCommandElement(index); reFocusWhileCommandBlock(index)}}>
                          <h6 className="app-h6-without-margin">条件入力</h6>
                          <hr/>
                          <label><small>繰り返す回数</small></label>
                          <br/>
                          <input type="number" className="app-text-input" value={c_result.condition1} onChange={(e) => setCommandResultEachNormal(e, "condition1", index)} />
                        </div>
                        <div className="app-left-command-detail-area-small" onClick={() => unFocusWhileCommandElement(index)}>
                          <h6 className="app-h6-without-margin">命令入力</h6>
                          <select className="app-select" onChange={(e) => onChangeIfCommand(e)} value={current_left_command_if_command}>
                            {COMMANDS_STR_WHILE_VERSION.map((c_str: string, i_c_index: number) => {
                              return(
                                <option value={COMMAND_STR_INDEX_WHILE_VERSION[i_c_index]} key={`while_command_${i_c_index}`}>{c_str}</option>
                              )
                            })}
                          </select>
                          <input type="button" className="app-button-primary" value="追加する" onClick={() => createCommandInputWhereVersion(index)}/>
                        </div>
                        <div className="app-left-command-detail-area-small-down-arrow"></div>
                        <>
                          {c_result.commands &&
                            c_result.commands.map((while_command_result, w_c_index) => {
                              return (
                                <React.Fragment key={`if_command_${w_c_index}`}>
                                  { is_while_command_focused === w_c_index ?
                                    <div className="app-left-command-detail-area-small" onClick={(e) => {reFocusWhileCommandElement(index, w_c_index); e.stopPropagation()}}>
                                      <h6 className="app-h6-without-margin">{COMMAND_STR_HASH[while_command_result.command_id]}</h6>
                                      <hr/>
                                      { while_command_result.command_id === 3 &&
                                        <IfCommand4Input
                                          setCommandResultEachNormal={setIfWhileCommandResultEachNormal}
                                          command_results={command_results}
                                          command_result={c_result}
                                          index={index}
                                          if_index={w_c_index}
                                        />
                                      }
                                      { while_command_result.command_id === 4 &&
                                        <IfCommand5Input
                                          setCommandResultEachNormal={setIfWhileCommandResultEachNormal}
                                          command_results={command_results}
                                          command_result={c_result}
                                          index={index}
                                          if_index={w_c_index}
                                        />
                                      }
                                      { while_command_result.command_id === 5 &&
                                        <IfCommand6Input
                                          setCommandResultEachNormal={setIfWhileCommandResultEachNormal}
                                          command_results={command_results}
                                          command_result={c_result}
                                          index={index}
                                          if_index={w_c_index}
                                        />
                                      }
                                      { while_command_result.command_id === 201 &&
                                        <div className="app-left-command-detail-area">
                                          <small>While文終了</small>
                                        </div>
                                      }
                                    </div>
                                  :
                                    <div className="app-left-command-detail-area-small" onClick={(e) => {reFocusWhileCommandElement(index, w_c_index); e.stopPropagation()}}>
                                      <h6 className="app-h6-without-margin">{COMMAND_STR_HASH[while_command_result.command_id]} / {while_command_result.description}</h6>
                                      { while_command_result.command_id === 3 &&
                                        <Command4Output command_result={while_command_result}/>
                                      }
                                      { while_command_result.command_id === 4 &&
                                        <Command5Output command_result={while_command_result}/>
                                      }
                                      { while_command_result.command_id === 5 &&
                                        <Command6Output command_result={while_command_result}/>
                                      }
                                      { while_command_result.command_id === 201 &&
                                        <>
                                          <hr/>
                                          <small>While文終了</small>
                                        </>
                                      }
                                    </div>
                                  }
                                  { while_command_result.command_id !== 201 &&
                                    <div className="app-left-command-detail-area-small-down-arrow"></div>
                                  }
                                </React.Fragment>
                              )
                          })}
                        </>
                      </>
                    }
                    {c_result.command_id === 3 &&
                      <div className="app-left-command-detail-area">
                        <Command4Input
                          setCommandResultEachNormal={setCommandResultEachNormal}
                          command_results={command_results}
                          command_result={c_result}
                          index={index}
                        />
                      </div>
                    }
                    {c_result.command_id === 4 &&
                      <div className="app-left-command-detail-area">
                        <Command5Input
                          setCommandResultEachNormal={setCommandResultEachNormal}
                          command_results={command_results}
                          command_result={c_result}
                          index={index}
                        />
                      </div>
                    }
                    {c_result.command_id === 5 &&
                      <div className="app-left-command-detail-area">
                        <Command6Input
                          setCommandResultEachNormal={setCommandResultEachNormal}
                          command_results={command_results}
                          command_result={c_result}
                          index={index}
                        />
                      </div>
                    }
                    {c_result.command_id === 6 &&
                      <div className="app-left-command-detail-area">
                        <Command7Input
                          setCommandResultEachNormal={setCommandResultEachNormal}
                          command_results={command_results}
                          command_result={c_result}
                          index={index}
                          sign_type={sign_type}
                        />
                      </div>
                    }
                  </>
                  :
                  <>
                  <h6 className="app-h6-without-margin">{index+1} : {COMMANDS_STR[c_result.command_id]} / {c_result.description}</h6>
                    {c_result.command_id === 0 &&
                      // <NotFocusedCommand1Component command_result={c_result}/>
                      <>
                        <Command1Output command_result={c_result}/>
                      </>
                    }
                    { (c_result.command_id === 1 ) &&
                      <>
                        <Command2Output command_result={c_result}/>
                      </>
                    }
                    { (c_result.command_id === 2 ) &&
                      <>
                        <Command3Output command_result={c_result}/>
                      </>
                    }
                    { (c_result.command_id === 3 ) &&
                      <>
                        <Command4Output command_result={c_result}/>
                      </>
                    }
                    { (c_result.command_id === 4 ) &&
                      <>
                        <Command5Output command_result={c_result}/>
                      </>
                    }
                    { (c_result.command_id === 5 ) &&
                      <>
                        <Command6Output command_result={c_result}/>
                      </>
                    }
                    { (c_result.command_id === 6 ) &&
                      <>
                        <Command7Output command_result={c_result}/>
                      </>
                    }
                  </>
                }
              </div>
              <div className="app-left-command-down-arrow">
              </div>
            </React.Fragment>
          )
        })}
      </div>
      <div className="app-right">
        <h4 className="app-h4-without-margin">サイトURLを入力して下さい。</h4>
        <input className="app-text-input" style={{width: "300px"}} type="text" value={current_url} onChange={(e) => {set_current_url(e.target.value); set_right_command_input_is_disabled(false)}}/>
        <hr/>
        <h4 className="app-h4-without-margin">{current_right_message}</h4>
        <select className="app-select" disabled = {right_command_input_is_disabled} value={current_right_command} onChange={(e) => onChangeRightCommand(e)} >
          {COMMANDS_STR.map((c_str, index) => {
            return(
              <option value={index} key={`command_${index}`}>{c_str}</option>
            )
          })}
        </select>
        <br/>
        <input type="button" disabled={right_command_input_is_disabled} className="app-button-primary" value="コマンドを作る" onClick={() => createCommandInput()} />
        <hr/>
        <h4 className="app-h4-without-margin">JSONから入力することもできます。</h4>
        <input type="file" accept="application/JSON" onChange={(e) => onChangeCommandJSON(e)} />
        <input type="button" className="app-button-primary" value="JSON を読み込む" onClick={() => loadCommandJSON()} />
        {/* 
        <br/>
        <div className="app-json">
          {JSON.stringify(command_results)}
        </div>
        */}
        <hr/>
        <input type="button" disabled={right_command_input_is_disabled} className="app-button-success" value="結果を送信する" onClick={() => submitCommand()} />
        <br/>
        <p>
          {test_result}
          {test_result == "False" && <> : 検証は失敗しました</>}
          {test_result == "True" && <> : 検証は成功しました</>}
        </p>
        { test_is_loading ?
          <>
            { test_result_image !== "" ?
              <>
                <a href={test_result_image} target="_blank">
                  <img src={test_result_image} className="app-file-image"/>
                </a>
                {Object.keys(test_result_variables).length !== 0 ?
                  <>
                    <p>変数一覧</p>
                    <ul>
                      {Object.keys(test_result_variables).map((test_r_v, index) => {
                        return (
                          <li key={`test_variable_${index}`}>
                            {test_r_v} {" = "} {test_result_variables[test_r_v]}
                          </li>
                        )
                      })}
                    </ul>
                  </>
                  :
                  <></>
                }
                <input
                  type="button"
                  className="app-button-primary"
                  style={{width: "200px"}}
                  value="テスト結果をCSVでダウンロードする"
                  onClick={() => downloadTestResultJSON()}
                />
              </>
              :
              <div className="app-file-image-text">
                <div style={{padding: "10px"}}>
                  テスト結果のスクリーンショットが、ここに表示されます。
                </div>
              </div>
            }
          </>
          :
          <>
            {test_is_loading === null &&
              <div className="app-file-image-text">
                <div style={{padding: "10px"}}>
                  テスト結果のスクリーンショットが、ここに表示されます。
                </div>
              </div>
            }
            {test_is_loading === false &&
              <p>
                1分ほどお待ちください。
              </p>
            }
          </>
        }
      </div>
      </div>
    </div>
  );
}

export default App;
