
import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"

type Props = {
	setCommandResultEachNormal: Function;
	command_results: COMMAND_ELEMENTS;
	command_result: COMMAND_ELEMENT;
	index : number;
	if_index: number
}

const Command6Input = (props: Props) => {

	const setCommandResultEachNormal = props.setCommandResultEachNormal
	const command_results = props.command_results
	const command_result = props.command_result
	const index = props.index
	const if_index = props.if_index

	return(
		<div className="app-left-command-detail-area">
			<label><small>コメント</small></label>
			<br/>
			<input
				type="text"
				className="app-text-input"
				style={{width: "90%"}}
				onChange={(e) => setCommandResultEachNormal(e, "description", index, if_index)}
				value={(command_result.commands && command_result.commands[if_index]
						&& command_result.commands[if_index].description !== undefined)
						? command_result.commands[if_index].description : ""}
				placeholder="コメントを入力して下さい(任意)"
			/>
			<br/>
			<label><small>Xpath名</small></label>
			<br/>
			<input
			  type="text"
			  className="app-text-input"
			  onChange={(e) => setCommandResultEachNormal(e, "xpath", index, if_index)}
			  value={(command_result.commands && command_result.commands[if_index]
			  		&& command_result.commands[if_index].xpath !== undefined)
			  		? command_result.commands[if_index].xpath : ""}
			/>
			<br/>
			<label><small>何番目のXpath</small></label>
			<br/>
			<input
			  type="number"
			  className="app-text-input"
			  onChange={(e) => setCommandResultEachNormal(e, "xpath_index", index, if_index)}
			  value={(command_result.commands && command_result.commands[if_index]
			  		&& command_result.commands[if_index].xpath_index !== undefined)
			  		? command_result.commands[if_index].xpath_index : ""}
			/>
			<br/>
			<label><small>値か変数か</small></label>
			<br/>
			<select
			  className="app-select"
			  onChange={(e) => setCommandResultEachNormal(e, "is_variable", index, if_index)}
			  value={(command_result.commands && command_result.commands[if_index]
			  		&& command_result.commands[if_index].is_variable !== undefined)
			  		 ? Number(command_result.commands[if_index].is_variable) : undefined}
			>
			  <option value="0">値</option>
			  <option value="1">変数</option>
			</select>
			<br/>
			<label><small>内容</small></label>
			<br/>
			{ (command_result.commands && command_result.commands[if_index] && command_result.commands[if_index].is_variable !== undefined) ?
			  <>
			  { command_result.commands[if_index].is_variable === true ?
			    <select
			      className="app-select"
			      onChange={(e) => setCommandResultEachNormal(e, "content", index, if_index)} value={command_result.commands[if_index].content !== undefined ? command_result.commands[if_index].content : ""}
			    >
			      <option></option>
			      {command_results.filter((c_r) => c_r.command_id === 0).map((result, r_index) => {
			        return(
			          <option key={`c_result_${r_index}`} value={result.variable}>{result.variable}</option>
			        )
			      })}
			    </select>
			  :
			    <input
			      type="text"
			      className="app-text-input"
			      onChange={(e) => setCommandResultEachNormal(e, "content", index, if_index)}
			      value={command_result.commands[if_index].content ? command_result.commands[if_index].content : ""}
			    />
			  }
			  </>
			:
			  <>エラー</>
			}
		</div>
	)
}

export default Command6Input