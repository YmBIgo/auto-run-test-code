import {COMMAND_ELEMENTS, COMMAND_ELEMENT3, COMMAND_ELEMENT} from "../../type/command"
import {COMMAND_STR_HASH} from "../../constants/commands"

type Props = {
	command_result: COMMAND_ELEMENT3
}

const Command3Output = (props: Props) => {
	const command_result: COMMAND_ELEMENT3 = props.command_result
	return (
		<>
			{(command_result.commands && command_result.commands.some((c_r) => c_r.command_id === 201) === true &&
			  command_result.condition1 !== undefined && command_result.condition1.length !== 0) ?
				(command_result.commands && command_result.commands.every((c_r: COMMAND_ELEMENT) => {
					if (c_r.command_id === 3) {
		        		return c_r.xpath !== undefined && c_r.xpath_index !== undefined && c_r.variable !== undefined && c_r.xpath!.length !== 0 && c_r.variable!.length !== 0
		        	} else if (c_r.command_id === 4) {
				        return c_r.xpath !== undefined && c_r.xpath_index !== undefined && c_r.xpath!.length !== 0
				    } else if (c_r.command_id === 5) {
				        return c_r.xpath !== undefined && c_r.xpath_index !== undefined && c_r.is_variable !== undefined && c_r.content !== undefined && c_r.xpath!.length !== 0 && c_r.content!.length !== 0
				    } else if (c_r.command_id === 201) {
				        return true
				    }
				}) === true ) ?
				<div>
			      <hr/>
			      <small>
			        {command_result.commands.length > 0 ? COMMAND_STR_HASH[command_result.commands[0].command_id] + "...[続きを見る]" : "内容がありません"}
			      </small>
			    </div>
				:
				<div>
			      <hr/>
			      <small>編集中の内容があります。</small>
			    </div>
				:
				<div><hr/><small>条件式を入力して、While文を終了して下さい。</small></div>
			}
		</>
	)
}

export default Command3Output