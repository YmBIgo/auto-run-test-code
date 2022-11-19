
import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"

type Props = {
	setCommandResultEachNormal: Function;
	command_results: COMMAND_ELEMENTS;
	command_result: COMMAND_ELEMENT;
	index : number;
	sign_type: string[];
}

const Command7Input = (props: Props) => {

	const setCommandResultEachNormal = props.setCommandResultEachNormal
	const command_results = props.command_results
	const command_result = props.command_result
	const index = props.index
	const sign_type = props.sign_type

	return(
		<div className="app-left-command-detail-area">
			<label><small>コメント</small></label>
			<br/>
			<input
				type="text"
				className="app-text-input"
				style={{width: "90%"}}
				onChange={(e) => setCommandResultEachNormal(e, "description", index)}
				value={(command_result.description !== undefined) ? command_result.description : ""}
				placeholder="コメントを入力して下さい(任意)"
			/>
			<br/>
			<label><small>変数</small></label>
			<br/>
			<select className="app-select" onChange={(e) => setCommandResultEachNormal(e, "variable", index) } value={command_result.variable}>
			  <option></option>
			  {command_results.filter((c_r) => c_r.command_id === 0).map((result, index) => {
			    return(
			      <option value={result.variable} key={`command4_variable_${index}`}>{result.variable}</option>
			    )
			  })}
			</select>
			<br/>
			<label><small>比較する内容</small></label>
			<br/>
			<input
			  type="text"
			  className="app-text-input"
			  onChange={(e) => setCommandResultEachNormal(e, "content", index)}
			  value={(command_result.content !== undefined ? command_result.content : "")}
			/>
			<br/>
			<label><small>等号など</small></label>
			<br/>
			<select className="app-select" value={command_result.sign_type} onChange={(e) => setCommandResultEachNormal(e, "sign_type", index)}>
			  <option></option>
			  {sign_type.map((sign, s_index) => {
			    return(
			      <option key={`select_sign_type_${s_index}`} value={sign}>{sign}</option>
			    )
			  })}
			</select>
		</div>
	)
}

export default Command7Input