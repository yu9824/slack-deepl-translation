// SlackのOutgoingから来るメッセージ
// doPostとは特別な関数名．Webアプリが実行されたとき？厳密な定義はよくわかりませんが呼び出される関数．
// doGetもそれに近いもののよう．
function doPost(e) {
  try {
    try {
      var json = JSON.parse(e.postData.getDataAsString());
    }
    catch {
      // 毎回正式なAPIの動作を実行できないので，ローカルで実行するための "場合わけ"
      var json = JSON.parse(e)
    }

    // ======= Event API Verification 時の承認を超えるためのコード =======
    if (json.type == "url_verification") {
      to_spread_sheet(json, 'A3')
      try {
        return ContentService.createTextOutput(json.challenge);
      }
      catch (er) {
        to_spread_sheet(er, 'A4')
      }
    }
    // ======= Event API Verification 時の承認を超えるためのコード終了 =======
    
    else if (json.event.type == 'reaction_added') {
      //jsonから必要な情報をとる．
      const channelId = json.event.item.channel;  // channelId
      const ts = json.event.item.ts;  // タイムスタンプではなく，スレッドのIDらしい．
      const reaction = json.event.reaction; // 絵文字リアクションの種類

      // 翻訳のトリガーになるスタンプ記号
      const target_flags = {
        "gb": 'EN-GB',
        "us": 'EN-US',
        "cn": 'ZH',
        "jp": 'JA',
        "fr": 'FR',
        "it": 'IT',
        "de": 'DE',
      }
      // 翻訳のトリガーになるスタンプ記号の一覧に含まれていたならば．
      // 翻訳可能先一覧: https://www.deepl.com/docs-api/translating-text/
      // スタンプ記号名前一覧: https://qiita.com/yamadashy/items/ae673f2bae8f1525b6af
      if (reaction in target_flags) {
        // そのリアクションが付いたメッセージの情報を取得
        try {
          get_replies(channelId, ts)
        }
        catch (er) {
          to_spread_sheet(er, 'A11')
        }
        // そのメッセージの具体的なテキストを取得
        var response = get_replies(channelId, ts)
        var original_message = response.messages[0].text
        // 翻訳
        var result = translate(original_message, target_flags[reaction])
        var translated = result.translations[0].text
        // 投稿
        post_message(translated, channelId, ts)
      }
    }
    else {
      to_spread_sheet(json, 'J4')
    }
  }
  catch (ex) {
    to_spread_sheet(ex, "A2");
  } 
}


function _doPost_test () {
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