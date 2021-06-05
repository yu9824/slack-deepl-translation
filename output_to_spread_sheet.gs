// console.logやLogger.logによって出力を見ることができないので，仕方なく，spredsheetに書き出して確認するという方法をとっている．
// より良い方法がありましたらご教示いただけますと幸いです．
function _output_test() {
  to_spread_sheet('Hello!', 'A1')
}

function to_spread_sheet(message, cell) {
  var prop = PropertiesService.getScriptProperties().getProperties();
  var sheet_id = prop.spreadSheetId;
  var spreadsheet = SpreadsheetApp.openById(sheet_id);
  // var sheet = spreadsheet.getActiveSheet();
  var sheet = spreadsheet.getSheetByName("シート1");
  sheet.getRange(cell).setValue(message);
}