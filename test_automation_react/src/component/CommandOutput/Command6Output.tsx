import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"

type Props = {
	command_result: COMMAND_ELEMENT
}

const Command5Output = (props: Props) => {
	const command_result = props.command_result

	return(
		<>
			{
			  (command_result.xpath !== undefined && command_result.xpath_index !== undefined && command_result.is_variable !== undefined && command_result.content !== undefined
			  && command_result.xpath!.length !== 0 && command_result.content!.length !== 0) ?
			    <div><hr/><small>
			      Xpath名：{command_result.xpath} ｜ 何番目のXpathか：{command_result.xpath_index}
			      <br/>
			      値か変数：{command_result.is_variable ? "変数" : "値"} ｜ 内容：{command_result.content}
			    </small></div>
			  :
			    <div><small className="app-small-small">文字入力を記入して下さい</small></div>
			}
		</>
	)
}

export default Command5Output