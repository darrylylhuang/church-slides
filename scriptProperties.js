function setScriptProperty(key, value) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(key, value);
}

function getScriptProperty(key) {
  var scriptProperties = PropertiesService.getScriptProperties();
  var value = scriptProperties.getProperty(key);
  return value;
}

function deleteScriptProperty(key) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.deleteProperty(key);
}
