import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"

type Props = {
	setCommandResultEachNormal: Function;
	command_results: COMMAND_ELEMENTS;
	command_result: COMMAND_ELEMENT;
	index : number;
}

const Command1Input = (props: Props) => {

	const setCommandResultEachNormal = props.setCommandResultEachNormal
	const command_results = props.command_results
	const command_result = props.command_result
	const index = props.index

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
			<label><small>変数名</small></label>
			<br/>
			<input
				type="text"
				className="app-text-input"
				onChange={(e) => setCommandResultEachNormal(e, "variable", index)}
				value={(command_result.variable !== undefined) ? command_result.variable : ""}
			/>
		</div>
	)
}

export default Command1Input