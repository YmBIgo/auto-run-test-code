export type COMMAND_ELEMENTS = (COMMAND_ELEMENT)[]
export type COMMAND_ELEMENT = COMMAND_ELEMENT1 | COMMAND_ELEMENT2 | COMMAND_ELEMENT3 | COMMAND_ELEMENT4 | COMMAND_ELEMENT5 | COMMAND_ELEMENT6 | COMMAND_ELEMENT7 | COMMAND_ELEMENT2_FIN | COMMAND_ELEMENT3_FIN
export type COMMAND_IF_ELEMENTS = COMMAND_ELEMENT4 | COMMAND_ELEMENT5 | COMMAND_ELEMENT6 | COMMAND_ELEMENT2_FIN
export type COMMAND_WHILE_ELEMENTS = COMMAND_ELEMENT4 | COMMAND_ELEMENT5 | COMMAND_ELEMENT6 | COMMAND_ELEMENT3_FIN

export type COMMAND_ELEMENT1 = {command_id: 0; variable: string; xpath?: undefined; xpath_index?: undefined; is_variable?: undefined; content?: undefined; commands?: undefined; sign_type?: undefined; condition1?: undefined; condition2?: undefined; condition_sign?: undefined, description: string}
export type COMMAND_ELEMENT2 = {command_id: 1; condition1: string; condition2: string; condition_sign: string; commands: (COMMAND_IF_ELEMENTS)[]; variable?: undefined; xpath?: undefined; xpath_index?: undefined; is_variable?: undefined; content?: undefined; sign_type?: undefined, description: string}
export type COMMAND_ELEMENT3 = {command_id: 2; condition1: string; condition2?: undefined; condition_sign?: undefined; commands: (COMMAND_WHILE_ELEMENTS)[]; variable?: undefined; xpath?: undefined; xpath_index?: undefined; is_variable?: undefined; content?: undefined; sign_type?: undefined, description: string}
export type COMMAND_ELEMENT4 = {command_id: 3; xpath: string; xpath_index: number; variable: string; is_variable?: undefined; content?: undefined; commands?: undefined ; sign_type?: undefined; condition1?: undefined; condition2?: undefined; condition_sign?: undefined, description: string}
export type COMMAND_ELEMENT5 = {command_id: 4; xpath: string; xpath_index: number; variable?: undefined; is_variable?: undefined; content?: undefined; commands?: undefined; sign_type?: undefined; condition1?: undefined; condition2?: undefined; condition_sign?: undefined, description: string}
export type COMMAND_ELEMENT6 = {command_id: 5; xpath: string; xpath_index: number; is_variable: boolean; content: string; variable?: undefined; commands?: undefined; sign_type?: undefined; condition1?: undefined; condition2?: undefined; condition_sign?: undefined, description: string}
export type COMMAND_ELEMENT7 = {command_id: 6; variable: string; content: string; sign_type: string; xpath?: undefined; xpath_index?: undefined; is_variable?: undefined; commands?: undefined; condition1?: undefined; condition2?: undefined; condition_sign?: undefined, description: string}
export type COMMAND_ELEMENT2_FIN = {command_id: 101; variable?: undefined; xpath?: undefined; xpath_index?: undefined; is_variable?: undefined; content?: undefined; commands?: undefined; sign_type?: undefined; condition1?: undefined; condition2?: undefined; condition_sign?: undefined, description?: undefined}
export type COMMAND_ELEMENT3_FIN = {command_id: 201; variable?: undefined; xpath?: undefined; xpath_index?: undefined; is_variable?: undefined; content?: undefined; commands?: undefined; sign_type?: undefined; condition1?: undefined; condition2?: undefined; condition_sign?: undefined, description?: undefined}

/*
export type COMMAND_ELEMENT1 = {command_id: 0; variable: string}
export type COMMAND_ELEMENT2 = {command_id: 1; commands: (COMMAND_ELEMENT3 | COMMAND_ELEMENT4 | COMMAND_ELEMENT5 | COMMAND_ELEMENT6 | COMMAND_ELEMENT2_FIN)[]}
export type COMMAND_ELEMENT3 = {command_id: 2; commands: (COMMAND_ELEMENT4 | COMMAND_ELEMENT5 | COMMAND_ELEMENT6 | COMMAND_ELEMENT3_FIN)[] }
export type COMMAND_ELEMENT4 = {command_id: 3; xpath: string; xpath_index: number; variable: string }
export type COMMAND_ELEMENT5 = {command_id: 4; xpath: string; xpath_index: number}
export type COMMAND_ELEMENT6 = {command_id: 5; xpath: string; xpath_index: number; is_variable: boolean; content: string}
export type COMMAND_ELEMENT2_FIN = {command_id: 101}
export type COMMAND_ELEMENT3_FIN = {command_id: 201}
*/