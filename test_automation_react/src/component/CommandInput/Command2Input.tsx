import React from "react"
import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"
import {COMMANDS, COMMANDS_STR_IF_VERSION,
		COMMAND_STR_INDEX_IF_VERSION, COMMAND_STR_HASH} from "../../App"
import IfCommand4Input from "../../component/CommandInput/IfCommand4Input"
import IfCommand5Input from "../../component/CommandInput/IfCommand5Input"
import IfCommand6Input from "../../component/CommandInput/IfCommand6Input"
import Command4Output from "../../component/CommandOutput/Command4Output"
import Command5Output from "../../component/CommandOutput/Command5Output"
import Command6Output from "../../component/CommandOutput/Command6Output"

type Props = {
	setCommandResultEachNormal: Function;
	onChangeIfCommand: Function;
	createCommandInputIfVersion: Function;
	unFocusIfCommandElement: Function;
	reFocusIfCommandElement: Function;
	current_left_command_if_command: number;
	command_results: COMMAND_ELEMENTS;
	command_result: COMMAND_ELEMENT;
	if_command_results: COMMAND_ELEMENTS;
	index : number;
	is_if_command_focused: number | null;
}

const Command2Input = (props: Props) => {

	const setIfCommandResultEachNormal = props.setCommandResultEachNormal;
	const unFocusIfCommandElement = props.unFocusIfCommandElement;
	const reFocusIfCommandElement = props.reFocusIfCommandElement
	const onChangeIfCommand = props.onChangeIfCommand
	const current_left_command_if_command = props.current_left_command_if_command
	const index = props.index
	const createCommandInputIfVersion = props.createCommandInputIfVersion
	const if_command_results = props.if_command_results
	const command_results = props.command_results
	const command_result = props.command_result
	const is_if_command_focused = props.is_if_command_focused

	return(
		<>
		<div className="app-left-command-detail-area-small" onClick={() => unFocusIfCommandElement(index)}>
		  <h6 className="app-h6-without-margin">命令入力</h6>
		  <select className="app-select" onChange={(e) => onChangeIfCommand(e)} value={current_left_command_if_command}>
		    {COMMANDS_STR_IF_VERSION.map((c_str: string, i_c_index: number) => {
		      return(
		        <option value={COMMAND_STR_INDEX_IF_VERSION[i_c_index]} key={`command_${i_c_index}`}>{c_str}</option>
		      )
		    })}
		  </select>
		  <br/>
		  <input type="button" className="app-button-primary" value="追加する" onClick={() => createCommandInputIfVersion(index)}/>
		</div>
		<div className="app-left-command-detail-area-small-down-arrow"></div>
		<>
		  {if_command_results.map((if_command_result, i_index) => {
		    return(
		      <React.Fragment key={`if_command_${i_index}`}>
		        { is_if_command_focused === i_index ?
		        <div className="app-left-command-detail-area-small" onClick={(e) => {reFocusIfCommandElement(index, i_index); e.stopPropagation()}}>
		          <h6 className="app-h6-without-margin">{COMMAND_STR_HASH[if_command_result.command_id]}</h6>
		          <hr/>
		          { if_command_result.command_id === 3 &&
		            <IfCommand4Input
		              setCommandResultEachNormal={setIfCommandResultEachNormal}
		              command_results={command_results}
		              command_result={command_result}
		              index={index}
		              if_index={i_index}
		            />
		          }
		          { if_command_result.command_id === 4 &&
		            <IfCommand5Input
		              setCommandResultEachNormal={setIfCommandResultEachNormal}
		              command_results={command_results}
		              command_result={command_result}
		              index={index}
		              if_index={i_index}
		            />
		          }
		          { if_command_result.command_id === 5 &&
		            <IfCommand6Input
		              setCommandResultEachNormal={setIfCommandResultEachNormal}
		              command_results={command_results}
		              command_result={command_result}
		              index={index}
		              if_index={i_index}
		            />
		          }
		          { if_command_result.command_id === 101 &&
		            <div className="app-left-command-detail-area">
		              <small>If文終了</small>
		            </div>
		          }
		        </div>
		        :
		        <div className="app-left-command-detail-area-small" onClick={(e) => {reFocusIfCommandElement(index, i_index); e.stopPropagation()}}>
		          <h6 className="app-h6-without-margin">{COMMAND_STR_HASH[if_command_result.command_id]}</h6>
		          { if_command_result.command_id === 3 &&
		            <Command4Output command_result={if_command_result}/>
		          }
		          { if_command_result.command_id === 4 &&
		            <Command5Output command_result={if_command_result}/>
		          }
		          { if_command_result.command_id === 5 &&
		            <Command6Output command_result={if_command_result}/>
		          }
		          { if_command_result.command_id === 101 &&
		            <>
		              <hr/>
		              <small>If文終了</small>
		            </>
		          }
		        </div>
		        }
		        { if_command_result.command_id !== 101 &&
		          <div className="app-left-command-detail-area-small-down-arrow"></div>
		        }
		      </React.Fragment>
		    )
		  })}
		</>
		</>
	)
}

export default Command2Input