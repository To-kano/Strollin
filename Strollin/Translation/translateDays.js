import * as RNLocalize from 'react-native-localize';

var days_json = require('./days');
const locales = RNLocalize.getLocales();

function getLanguage() {
  let language = "en"
  if (Array.isArray(locales)) {
    language = locales[0].languageTag;
  }
  return language
}

export function translateDays(value) {
  let i = 1
  let language = getLanguage()
  let res = ""
  if (language == 'fr-FR')
    i = 2
  days_json.days_array.forEach((item) => {
    if (item[0].toLowerCase() == value.toLowerCase()) {
      res = item[i]
      return
    }
  });
  return res
}

export function detranslateDays(value) {
  let i = 1
  let language = getLanguage()
  let res = ""
  if (language == 'fr-FR')
    i = 2
  days_json.days_array.forEach((item) => {
    if (item[i].toLowerCase() == value.toLowerCase())
      res = item[0]
      return
  });
  return res
}
