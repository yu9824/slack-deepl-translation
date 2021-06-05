function post_test() {
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
  var channelId = channelIds.testPrivate

　// 投稿
  slackApp.chatPostMessage(channelId, "Hello world!")
}
