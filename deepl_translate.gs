function _test_translate() {
  var result = translate('おはよう世界!', 'EN')
  Logger.log(result)
  Logger.log(result.translations[0].text)
}

function translate(original, target_lang) {
  const url = "https://api-free.deepl.com/v2/translate";

  // propertyの取得
  const prop = PropertiesService.getScriptProperties().getProperties();
  // 認証キーをプロパティーから取得
  const auth_key = prop.deeplApiToken;

  var payload = {
    "auth_key": auth_key,
    "text": original,
    "target_lang": target_lang,
  }

  var options = {
    method: 'post',
    payload: payload,
  }
  
  // jsonの文字列？のようなものを取得
  var response = UrlFetchApp.fetch(url, options);
  // それを返す
  return JSON.parse(response);
}
