import * as RNLocalize from 'react-native-localize';

var errors_json = require('./errors');
const locales = RNLocalize.getLocales();

function getLanguage() {
  let language = "en"
  if (Array.isArray(locales)) {
    language = locales[0].languageTag;
  }
  return language
}

export function translateErrors(value) {
  let i = 1
  let language = getLanguage()
  let res = ""
  if (language == 'fr-FR')
    i = 2
  errors_json.errors_array.forEach((item) => {
    if (item[0].toString().toLowerCase() == value.toLowerCase()) {
      res = item[i]
      return
    }
  });
  return res
}

export function detranslateErrors(value) {
  let i = 1
  let language = getLanguage()
  let res = ""
  if (language == 'fr-FR')
    i = 2
  errors_json.errors_array.forEach((item) => {
    if (item[i].toLowerCase() == value.toLowerCase())
      res = item[0]
      return
  });
  return res
}
