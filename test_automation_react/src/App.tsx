import React, {useState, useEffect} from 'react';
import "./css/index.css"
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

/* コマンドの一覧
 *  1 : 変数作成
 *  2 : If 文
 *  3 : While 文
 *  4 : 変数代入
 *  5 : クリック
 *  6 : 文字入力
 *  7 : 結果チェック
 *  101 : If終了
 *  201 : While終了
 */
export type COMMANDS = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 101 | 201
type COMMANDS_IF_VERSION = 3 | 4 | 5 | 101
type COMMANDS_WHILE_VERSION = 3 | 4 | 5 | 201
const COMMANDS_STR = ["変数作成", "If文", "While文", "変数代入", "クリック", "文字入力", "結果チェック"]
export const COMMANDS_STR_IF_VERSION = ["変数代入", "クリック", "文字入力", "終了"]
export const COMMANDS_STR_WHILE_VERSION = ["変数代入", "クリック", "文字入力", "終了"]
export const COMMAND_STR_HASH = {0: "変数作成", 1: "If文", 2: "While文", 3: "変数代入", 4: "クリック", 5: "文字入力", 6 : "結果チェック", 101: "If終了", 201: "While終了"}
export const COMMAND_STR_INDEX_IF_VERSION = [3, 4, 5, 101]
export const COMMAND_STR_INDEX_WHILE_VERSION = [3, 4, 5, 201]
type COMMAND_KEYS = "variable" | "xpath" | "xpath_index" | "content" | "is_variable" | "sign_type" | "condition1" | "condition2" | "condition_sign"
export const sign_type = ["=", "!="]

function App() {

  // right web ui
  const [current_right_message, set_current_right_message] = useState<string>("入力する命令を選択して下さい")
  const [current_right_command, set_current_right_command] = useState<number>(0) 
  const [right_command_input_is_disabled, set_right_command_input_is_disabled] = useState<boolean>(true)
  const [current_url, set_current_url] = useState<string>("")
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
      created_command = {command_id: 1, commands: [], condition1: "", condition2: "", condition_sign: ""}
    } else if (current_right_command === 2) {
      created_command = {command_id: 2, commands: [], condition1: ""}
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
  const deleteCommandResult = (index: number) => {
    unFocusLeftCommandElement()
    set_command_results((prev_command_results) => {
      prev_command_results.splice(index, 1)
      return [...prev_command_results]
    })
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
    let created_command: COMMAND_IF_ELEMENTS = {command_id: 3, xpath: "", xpath_index: 0, variable: ""}
    if (current_left_command_if_command === 4) {
      created_command = {command_id: 4, xpath: "", xpath_index: 0}
    } else if (current_left_command_if_command === 5) {
      created_command = {command_id: 5, xpath: "", xpath_index: 0, is_variable: false, content: ""}
    } else if (current_left_command_if_command === 101) {
      created_command = {command_id: 101}
    }
    set_if_command_results([...if_command_results, created_command])
    set_command_results((prev_command_results: COMMAND_ELEMENTS) => {
      const newly_insert_command_result: COMMAND_ELEMENT2 = {command_id: 1, commands: [...if_command_results, created_command], condition1: prev_command_results[index].condition1!, condition2: prev_command_results[index].condition2!, condition_sign: prev_command_results[index].condition_sign!}
      if (prev_command_results[index].condition1 !== undefined && prev_command_results[index].condition2 !== undefined && prev_command_results[index].condition_sign !== undefined ) {
        prev_command_results.splice(index, 1, newly_insert_command_result)
      } else {
        prev_command_results.splice(index, 1, {command_id: 1, commands: [...if_command_results, created_command], condition1: "", condition2: "", condition_sign: ""})
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
    let created_command: COMMAND_WHILE_ELEMENTS = {command_id: 3, xpath: "", xpath_index: 0, variable: ""}
    if (current_left_command_if_command === 4) {
      created_command = {command_id: 4, xpath: "", xpath_index: 0}
    } else if (current_left_command_if_command === 5) {
      created_command = {command_id: 5, xpath: "", xpath_index: 0, is_variable: false, content: ""}
    } else if (current_left_command_if_command === 201) {
      created_command = {command_id: 201}
    }
    set_while_command_results([...while_command_results, created_command])
    set_command_results((prev_command_results: COMMAND_ELEMENTS) => {
      const newly_insert_command_result: COMMAND_ELEMENT3 = {command_id: 2, commands: [...while_command_results, created_command], condition1: prev_command_results[index].condition1!}
      if (prev_command_results[index].condition1 !== undefined ) {
        prev_command_results.splice(index, 1, newly_insert_command_result)
      } else {
        prev_command_results.splice(index, 1, {command_id: 2, commands: [...while_command_results, created_command], condition1: ""})
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

  return (
    <div className="App">
      <div className="app-left" onClick={() => {unFocusLeftCommandElement();}}>
        <div className="app-left-command-element">
          {current_url ? `${current_url}を自動化` : "自動化するURLを右から入力して下さい。" }
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
                                      <h6 className="app-h6-without-margin">{COMMAND_STR_HASH[while_command_result.command_id]}</h6>
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
                  <h6 className="app-h6-without-margin">{index+1} : {COMMANDS_STR[c_result.command_id]}</h6>
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
        <br/>
        <input className="app-text-input" style={{width: "300px"}} type="text" value={current_url} onChange={(e) => {set_current_url(e.target.value); set_right_command_input_is_disabled(false)}}/>
        <h4 className="app-h4-without-margin">{current_right_message}</h4>
        <select className="app-select" disabled = {right_command_input_is_disabled} value={current_right_command} onChange={(e) => onChangeRightCommand(e)} >
          {COMMANDS_STR.map((c_str, index) => {
            return(
              <option value={index} key={`command_${index}`}>{c_str}</option>
            )
          })}
        </select>
        <br/>
        <input type="button" disabled = {right_command_input_is_disabled} className="app-button-primary" value="コマンドを作る" onClick={() => createCommandInput()} />
      </div>
    </div>
  );
}

export default App;
