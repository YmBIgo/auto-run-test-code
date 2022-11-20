
import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"

type Props = {
	setCommandResultEachNormal: Function;
	command_results: COMMAND_ELEMENTS;
	command_result: COMMAND_ELEMENT;
	index : number;
	while_index: number;
}

const WhileCommand5Input = (props: Props) => {

	const setCommandResultEachNormal = props.setCommandResultEachNormal
	const command_results = props.command_results
	const command_result = props.command_result
	const index = props.index
	const while_index = props.while_index

	return(
		<div className="app-left-command-detail-area">
			<label><small>コメント</small></label>
			<br/>
			<input
				type="text"
				className="app-text-input"
				style={{width: "90%"}}
				onChange={(e) => setCommandResultEachNormal(e, "description", index, while_index)}
				value={(command_result.commands && command_result.commands[while_index]
						&& command_result.commands[while_index].description !== undefined)
						? command_result.commands[while_index].description : ""}
				placeholder="コメントを入力して下さい(任意)"
			/>
			<br/>
			<label><small>Xpath名</small></label>
			<br/>
			<input
			  type="text"
			  className="app-text-input"
			  onChange={(e) => setCommandResultEachNormal(e, "xpath", index, while_index)}
			  value={(command_result.commands && command_result.commands[while_index]
					  && command_result.commands[while_index].xpath !== undefined)
			  		  ? command_result.xpath : ""}
			/>
			<br/>
			<label><small>何番目のXpath</small></label>
			<br/>
			<input
			  type="number"
			  className="app-text-input"
			  onChange={(e) => setCommandResultEachNormal(e, "xpath_index", index, while_index)}
			  value={((command_result.commands && command_result.commands[while_index]
					  && command_result.commands[while_index].xpath_index !== undefined)
			  		  ? command_result.xpath_index : "")}
			/>
		</div>
	)
}

export default WhileCommand5Input