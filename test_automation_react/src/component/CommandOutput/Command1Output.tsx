import {COMMAND_ELEMENTS, COMMAND_ELEMENT} from "../../type/command"

type Props = {
	command_result: COMMAND_ELEMENT
}

const Command1Output = (props: Props) => {
	const command_result = props.command_result

	return(
		<>
		{
			(command_result.variable !== undefined && command_result.variable!.length === 0) ?
				<div><small className="app-small-small">変数名を入力して下さい。</small></div>
			:
				<div><hr/><small>変数名：{command_result.variable}</small></div>
		}
		</>
	)
}

export default Command1Output