/* コマンドの一覧
 *  1 : 変数作成
 *  2 : If 文
 *  3 : While 文
 *  4 : 変数代入
 *  5 : クリック
 *  6 : 文字入力
 *  7 : 結果チェック
 *  101 : If終了
 *  201 : While終了
 */
export type COMMANDS = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 101 | 201
export type COMMANDS_IF_VERSION = 3 | 4 | 5 | 101
export type COMMANDS_WHILE_VERSION = 3 | 4 | 5 | 201
export const COMMANDS_STR = ["変数作成", "If文", "While文", "変数代入", "クリック", "文字入力", "結果チェック"]
export const COMMANDS_STR_IF_VERSION = ["変数代入", "クリック", "文字入力", "終了"]
export const COMMANDS_STR_WHILE_VERSION = ["変数代入", "クリック", "文字入力", "終了"]
export const COMMAND_STR_HASH = {0: "変数作成", 1: "If文", 2: "While文", 3: "変数代入", 4: "クリック", 5: "文字入力", 6 : "結果チェック", 101: "If終了", 201: "While終了"}
export const COMMAND_STR_INDEX_IF_VERSION = [3, 4, 5, 101]
export const COMMAND_STR_INDEX_WHILE_VERSION = [3, 4, 5, 201]
export type COMMAND_KEYS = "variable" | "xpath" | "xpath_index" | "content" | "is_variable" | "sign_type" | "condition1" | "condition2" | "condition_sign" | "description"
export const sign_type = ["==", "!=", "in"]