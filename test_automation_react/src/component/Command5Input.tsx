
import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../type/command"

type Props = {
	setCommandResultEachNormal: Function;
	command_results: COMMAND_ELEMENTS;
	command_result: COMMAND_ELEMENT;
	index : number;
}

const Command5Input = (props: Props) => {

	const setCommandResultEachNormal = props.setCommandResultEachNormal
	const command_results = props.command_results
	const command_result = props.command_result
	const index = props.index

	return(
		<div className="app-left-command-detail-area">
			<label><small>Xpath名</small></label>
			<br/>
			<input
			  type="text"
			  className="app-text-input"
			  onChange={(e) => setCommandResultEachNormal(e, "xpath", index)}
			  value={(command_result.xpath !== undefined) ? command_result.xpath : ""}
			/>
			<br/>
			<label><small>何番目のXpath</small></label>
			<br/>
			<input
			  type="number"
			  className="app-text-input"
			  onChange={(e) => setCommandResultEachNormal(e, "xpath_index", index)}
			  value={(command_result.xpath_index !== undefined ? command_result.xpath_index : "")}
			/>
		</div>
	)
}

export default Command5Input