// SlackのOutgoingから来るメッセージ
// doPostとは特別な関数名．Webアプリが実行されたとき？厳密な定義はよくわかりませんが呼び出される関数．
// doGetもそれに近いもののよう．
function doPost(e) {
  // ======= Event API Verification 時の承認を超えるためのコード =======
  // try-catchを使って他の時にエラーにならないようにしているのだと思う．たぶん．
  try {
    var json = JSON.parse(e.postData.getDataAsString());
    if (json.type == "url_verification") {
      return ContentService.createTextOutput(json.challenge);        
    }
  }
  catch (ex) {
    to_spread_sheet(ex, "A2");
  } 
  // ======= Event API Verification 時の承認を超えるためのコード終了 =======

  try {
    try {
      var json = JSON.parse(e.postData.getDataAsString());
    }
    catch {

    }
    var json = JSON.parse(e)
  }
  catch {
    to_spread_sheet(e, "A3");
  }

  try {
    // var json = JSON.parse(e.postData.getDataAsString());
    to_spread_sheet(json, 'C1')
    var channel = json.event.item.channel;  // channelId
    var ts = json.event.item.ts;  // タイムスタンプではなく，スレッドのIDらしい．
    var reaction = json.event.reaction; // 絵文字リアクションの種類
    to_spread_sheet(reaction, 'B1');
    if (json.event.type == 'reaction_added') {
      post_message(reaction)
    }
  }   
  catch (e) {
    to_spread_sheet(e, "A5");
  }
}


function doPost_test () {
  var e_example = {
      event: {
        type: "reaction_added",
        user: "U024BE7LH",
        reaction: "thumbsup",
        item_user: "U0G9QF9C6",
        item: {
            type: "message",
            channel: "C0G9QF9GZ",
            ts: "1360782400.498405"
        },
        event_ts: "1360782804.083113"
      }
  }
  var e_example = JSON.stringify(e_example)
  doPost(e_example)
}