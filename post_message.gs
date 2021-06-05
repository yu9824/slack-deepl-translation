

const channelIds = {
  testPrivate: 'C024TLZ7MBJ',
  test: 'C0241UA8PHQ',
}

function _post_message_test(){
  // 投稿するメッセージ例
  const message = "Hello world!"
  // channelIdたちを保存
  post_message(message, channelIds.testPrivate)
}

// channelIdとmessageを得ることでメッセージを投稿する関数
function post_message(message, channelId) {
  // propertyの取得
  const prop = PropertiesService.getScriptProperties().getProperties();
  // slackApp インスタンスの取得
  var slackApp = SlackApp.create(prop.slackApiToken);

　// 投稿
  slackApp.chatPostMessage(channelId, message)
}

