function _test_get_replies() {
  const ts = "1622889443.0111"
  const channelId = "C0241UA8PHQ"
  const reply = get_replies(channelId, ts)
  Logger.log(reply)
}

function get_replies(channelId, ts) {
  // 公式ドキュメント: https://api.slack.com/methods/conversations.replies#arg_channel
  const url = "https://slack.com/api/conversations.replies";

  // propertyの取得
  const prop = PropertiesService.getScriptProperties().getProperties();
  
  // おそらく，公式ドキュメントでArgumentに書かれていた部分
  const payload = {
    "token" : prop.slackApiToken,
    "channel" : channelId,
    "ts": ts,
  };
  
  const params = {
    "method" : "get", // Preferred HTTP method:の部分と思われる．
    "contentType": "application/x-www-form-urlencoded",
    "payload" : payload,
  };

  // jsonの文字列？のようなものを取得
  var reply = UrlFetchApp.fetch(url, params);
  // それを返す
  return JSON.parse(reply);
}
