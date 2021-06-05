function post_message_test(){
  let message = "Hello world!"
  post_message(message)
}


function post_message(message) {
  // propertyの取得
  var prop = PropertiesService.getScriptProperties().getProperties();
  // slackApp インスタンスの取得
  var slackApp = SlackApp.create(prop.slackApiToken);
  // channelIdたちを保存
  var channelIds = {
    testPrivate: 'C024TLZ7MBJ',
    test: 'C0241UA8PHQ',
  }
  // channkeId
  var channelId = channelIds.test

　// 投稿
  slackApp.chatPostMessage(channelId, message)
}

