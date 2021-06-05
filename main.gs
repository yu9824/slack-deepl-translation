function post_test() {
  // propertyの取得
  var prop = PropertiesService.getScriptProperties().getProperties();
  // slackApp インスタンスの取得
  var slackApp = SlackApp.create(prop.slackApiToken);
  // #testのchannel idを取得
  var channelId = 'C0241UA8PHQ'
  // var channelId = slackApp.channelsList().channels[0].id;

　// 投稿
  slackApp.chatPostMessage(channelId, "Hello world!", {scope:'global'})
}
