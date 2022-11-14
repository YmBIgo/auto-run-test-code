import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"

type Props = {
	command_result: COMMAND_ELEMENT
}

const Command5Output = (props: Props) => {
	const command_result = props.command_result

	return(
		<>
			{
			  (command_result.variable !== undefined && command_result.content !== undefined && command_result.sign_type !== undefined
			  && command_result.variable!.length !== 0 && command_result.content!.length !== 0 && command_result.sign_type!.length !== 0) ?
			    <div><hr/><small>
			      変数：{command_result.variable} ｜ 比較する内容：{command_result.content} ｜ 等号など：{command_result.sign_type}
			    </small></div>
			  :
			    <div><small className="app-small-small">結果チェックを記入して下さい</small></div>
			}
		</>
	)
}

export default Command5Output