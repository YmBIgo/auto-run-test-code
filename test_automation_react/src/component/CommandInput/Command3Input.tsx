import React from "react"

import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"
import {COMMANDS, COMMANDS_STR_WHILE_VERSION,
		COMMAND_STR_INDEX_WHILE_VERSION, COMMAND_STR_HASH,
		sign_type} from "../../constants/commands"

import WhileCommand4Input from "../../component/CommandInput/WhileCommand4Input"
import WhileCommand5Input from "../../component/CommandInput/WhileCommand5Input"
import WhileCommand6Input from "../../component/CommandInput/WhileCommand6Input"
import Command4Output from "../../component/CommandOutput/Command4Output"
import Command5Output from "../../component/CommandOutput/Command5Output"
import Command6Output from "../../component/CommandOutput/Command6Output"

type Props = {
	setIfWhileCommandResultEachNormal: Function;
	setCommandResultEachNormal: Function;
	onChangeIfCommand: Function;
	createCommandInputWhileVersion: Function;
	unFocusWhileCommandElement: Function;
	reFocusWhileCommandElement: Function;
	reFocusWhileCommandBlock: Function;
	current_left_command_if_command: number;
	command_results: COMMAND_ELEMENTS;
	command_result: COMMAND_ELEMENT;
	if_command_results: COMMAND_ELEMENTS;
	index : number;
	is_while_command_focused: number | null;
}

const Command3Input = (props: Props) => {

	const setIfWhileCommandResultEachNormal = props.setIfWhileCommandResultEachNormal
	const setCommandResultEachNormal = props.setCommandResultEachNormal
	const unFocusWhileCommandElement = props.unFocusWhileCommandElement
	const reFocusWhileCommandElement = props.reFocusWhileCommandElement
	const reFocusWhileCommandBlock = props.reFocusWhileCommandBlock
	const onChangeIfCommand = props.onChangeIfCommand
	const current_left_command_if_command = props.current_left_command_if_command
	const index = props.index
	const createCommandInputWhileVersion = props.createCommandInputWhileVersion
	const if_command_results = props.if_command_results
	const command_results = props.command_results
	const command_result = props.command_result
	const is_while_command_focused = props.is_while_command_focused

	return(
		<>
		  <label><small>コメント</small></label>
		  <br/>
		  <input
		    type="text"
		    className="app-text-input"
		    style={{width: "90%"}}
		    onChange={(e) => setCommandResultEachNormal(e, "description", index)}
		    value={(command_result.description) ? command_result.description : ""}
		    placeholder="コメントを入力して下さい(任意)"
		  />
		  <br/>
		  <br/>
		  <div className="app-left-command-detail-area-small" onClick={() => {unFocusWhileCommandElement(index); reFocusWhileCommandBlock(index)}}>
		    <h6 className="app-h6-without-margin">条件入力</h6>
		    <hr/>
		    <label><small>繰り返す回数</small></label>
		    <br/>
		    <input type="number" className="app-text-input" value={command_result.condition1} onChange={(e) => setCommandResultEachNormal(e, "condition1", index)} />
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
		    <input type="button" className="app-button-primary" value="追加する" onClick={() => createCommandInputWhileVersion(index)}/>
		  </div>
		  <div className="app-left-command-detail-area-small-down-arrow"></div>
		  <>
		    {command_result.commands &&
		      command_result.commands.map((while_command_result, w_c_index) => {
		        return (
		          <React.Fragment key={`if_command_${w_c_index}`}>
		            { is_while_command_focused === w_c_index ?
		              <div className="app-left-command-detail-area-small" onClick={(e) => {reFocusWhileCommandElement(index, w_c_index); e.stopPropagation()}}>
		                <h6 className="app-h6-without-margin">{COMMAND_STR_HASH[while_command_result.command_id]}</h6>
		                <hr/>
		                { while_command_result.command_id === 3 &&
		                  <WhileCommand4Input
		                    setCommandResultEachNormal={setIfWhileCommandResultEachNormal}
		                    command_results={command_results}
		                    command_result={command_result}
		                    index={index}
		                    while_index={w_c_index}
		                    // if_index={w_c_index}
		                  />
		                }
		                { while_command_result.command_id === 4 &&
		                  <WhileCommand5Input
		                    setCommandResultEachNormal={setIfWhileCommandResultEachNormal}
		                    command_results={command_results}
		                    command_result={command_result}
		                    index={index}
		                    while_index={w_c_index}
		                    // if_index={w_c_index}
		                  />
		                }
		                { while_command_result.command_id === 5 &&
		                  <WhileCommand6Input
		                    setCommandResultEachNormal={setIfWhileCommandResultEachNormal}
		                    command_results={command_results}
		                    command_result={command_result}
		                    index={index}
		                    while_index={w_c_index}
		                    // if_index={w_c_index}
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
	)
}

export default Command3Input