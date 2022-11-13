import React, {useState, useEffect} from 'react';
import "./css/index.css"
import {COMMAND_ELEMENTS, COMMAND_ELEMENT,
        COMMAND_ELEMENT1, COMMAND_ELEMENT2, COMMAND_ELEMENT3,
        COMMAND_ELEMENT4, COMMAND_ELEMENT5, COMMAND_ELEMENT6} from "./type/command"
import Command1Input from "./component/Command1Input"
import Command4Input from "./component/Command4Input"
import Command5Input from "./component/Command5Input"
import Command6Input from "./component/Command6Input"
import Command7Input from "./component/Command7Input"


/* コマンドの一覧
 *  1 : 変数作成
 *  2 : If 文
 *  3 : While 文
 *  4 : 変数代入
 *  5 : クリック
 *  6 : 文字入力
 */
type COMMANDS = 0 | 1 | 2 | 3 | 4 | 5 | 6
const COMMANDS_STR = ["変数作成", "If文", "While文", "変数代入", "クリック", "文字入力", "結果チェック"]
type COMMAND_KEYS = "variable" | "xpath" | "xpath_index" | "content" | "is_variable" | "sign_type"
const sign_type = ["=", "!="]

function App() {

  // right web ui
  const [current_right_message, set_current_right_message] = useState<string>("入力する命令を選択して下さい")
  const [current_right_command, set_current_right_command] = useState<number>(0) 
  const [right_command_input_is_disabled, set_right_command_input_is_disabled] = useState<boolean>(false)
  // left web ui
  const [is_left_ui_focused, set_is_left_ui_focused] = useState<number | null>(null)
  // command result
  const [command_results, set_command_results] = useState<COMMAND_ELEMENTS>([])

  const onChangeRightCommand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    set_current_right_command(Number(e.target.value))
  }

  const createCommandInput = () => {
    const command6_filtered_command_result = command_results.filter((c_r) => c_r.command_id === 6)
    if (command6_filtered_command_result.length === 1 && current_right_command === 6) {
      alert("結果チェックは１つまでしか登録できません")
      return
    }
    const newly_created_command_id: number = command_results.length
    set_is_left_ui_focused(newly_created_command_id)
    set_right_command_input_is_disabled(true)
    let created_command: COMMAND_ELEMENT = {command_id: 0, variable: ""};
    if (current_right_command === 1) {
      created_command = {command_id: 1, commands: []}
    } else if (current_right_command === 2) {
      created_command = {command_id: 2, commands: []}
    } else if (current_right_command === 3) {
      created_command = {command_id: 3, xpath: "", xpath_index: 0, variable: ""}
    } else if (current_right_command === 4) {
      created_command = {command_id: 4, xpath: "", xpath_index: 0}
    } else if (current_right_command === 5) {
      created_command = {command_id: 5, xpath: "", xpath_index: 0, is_variable: false, content: ""}
    } else if (current_right_command === 6) {
      created_command = {command_id: 6, variable: "", content: "", sign_type: ""}
    }
    set_command_results([...command_results, created_command])
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
  const onChangeCommand4Varible = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    set_command_results((prev_command_result) => {
      const current_command_result = prev_command_result[index]
      current_command_result.variable = e.target.value
      prev_command_result.splice(index, 1, current_command_result)
      return [...prev_command_result]
    })
  }

  return (
    <div className="App">
      <div className="app-left" onClick={() => unFocusLeftCommandElement()}>
        {command_results.map((c_result, index) => {
          return (
            <React.Fragment key={`command_element_${index}`}>
              <div
                className={ is_left_ui_focused === index ? "app-left-command-element focused-app-left-command-element" : "app-left-command-element"}
                onClick={(e) => {reFocusLeftCommandElement(index); e.stopPropagation()}}
              >
                { is_left_ui_focused === index ?
                  <>
                    <h6 className="app-h6-without-margin">{index+1} : {COMMANDS_STR[c_result.command_id]}</h6>
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
                      <div className="app-left-command-detail-area">
                      </div>
                    }
                    {c_result.command_id === 2 &&
                      <div className="app-left-command-detail-area">
                      </div>
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
                  <h6 className="app-h6-without-margin">{index+1} : {COMMANDS_STR[c_result.command_id]}</h6>
                    {c_result.command_id === 0 &&
                      // <NotFocusedCommand1Component command_result={c_result}/>
                      <>
                      {
                        (c_result.variable !== undefined && c_result.variable!.length === 0) ?
                          <div><small className="app-small-small">変数名を入力して下さい。</small></div>
                        :
                          <div><hr/><small>変数名：{c_result.variable}</small></div>
                      }
                     </>
                    }
                    { (c_result.command_id === 1 ) &&
                      <>
                      </>
                    }
                    { (c_result.command_id === 2 ) &&
                      <>
                      </>
                    }
                    { (c_result.command_id === 3 ) &&
                      <>
                      {
                        (c_result.xpath !== undefined && c_result.xpath_index !== undefined && c_result.variable !== undefined
                        && c_result.xpath!.length !== 0 && c_result.variable!.length !== 0) ?
                          <div><hr/><small>Xpath名：{c_result.xpath} ｜ 何番目のXpathか：{c_result.xpath_index} ｜ 変数名：{c_result.variable}</small></div>
                        :
                          <div><small className="app-small-small">代入する変数を記入して下さい</small></div>
                      }
                      </>
                    }
                    { (c_result.command_id === 4 ) &&
                      <>
                      {
                        (c_result.xpath !== undefined && c_result.xpath_index !== undefined
                        && c_result.xpath!.length !== 0) ?
                          <div><hr/><small>Xpath名：{c_result.xpath} ｜ 何番目のXpathか：{c_result.xpath_index}</small></div>
                        :
                          <div><small className="app-small-small">クリックする要素を記入して下さい</small></div>
                      }
                      </>
                    }
                    { (c_result.command_id === 5 ) &&
                      <>
                      {
                        (c_result.xpath !== undefined && c_result.xpath_index !== undefined && c_result.is_variable !== undefined && c_result.content !== undefined
                        && c_result.xpath!.length !== 0 && c_result.content!.length !== 0) ?
                          <div><hr/><small>
                            Xpath名：{c_result.xpath} ｜ 何番目のXpathか：{c_result.xpath_index}
                            <br/>
                            値か変数：{c_result.is_variable ? "変数" : "値"} ｜ 内容：{c_result.content}
                          </small></div>
                        :
                          <div><small className="app-small-small">文字入力を記入して下さい</small></div>
                      }
                      </>
                    }
                    { (c_result.command_id === 6 ) &&
                      <>
                      {
                        (c_result.variable !== undefined && c_result.content !== undefined && c_result.sign_type !== undefined
                        && c_result.variable!.length !== 0 && c_result.content!.length !== 0 && c_result.sign_type!.length !== 0) ?
                          <div><hr/><small>
                            変数：{c_result.variable} ｜ 比較する内容：{c_result.content} ｜ 等号など：{c_result.sign_type}
                          </small></div>
                        :
                          <div><small className="app-small-small">結果チェックを記入して下さい</small></div>
                      }
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
        <h4>{current_right_message}</h4>
        <select className="app-select" disabled = {right_command_input_is_disabled} value={current_right_command} onChange={(e) => onChangeRightCommand(e)} >
          {COMMANDS_STR.map((c_str, index) => {
            return(
              <option value={index} key={`command_${index}`}>{c_str}</option>
            )
          })}
        </select>
        <br/>
        <input type="submit" disabled = {right_command_input_is_disabled} className="app-button-primary" value="コマンドを作る" onClick={() => createCommandInput()} />
      </div>
    </div>
  );
}

export default App;
