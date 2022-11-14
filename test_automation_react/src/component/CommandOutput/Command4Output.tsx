import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"

type Props = {
	command_result: COMMAND_ELEMENT
}

const Command4Output = (props: Props) => {
	const command_result = props.command_result

	return(
		<>
			{
			  (command_result.xpath !== undefined && command_result.xpath_index !== undefined && command_result.variable !== undefined
			  && command_result.xpath!.length !== 0 && command_result.variable!.length !== 0) ?
			    <div><hr/><small>Xpath名：{command_result.xpath} ｜ 何番目のXpathか：{command_result.xpath_index} ｜ 変数名：{command_result.variable}</small></div>
			  :
			    <div><small className="app-small-small">代入する変数を記入して下さい</small></div>
			}
		</>
	)
}

export default Command4Output