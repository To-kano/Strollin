import * as RNLocalize from 'react-native-localize';

var tags_json = require('./tags');
const locales = RNLocalize.getLocales();

function getLanguage() {
  let language = "en"
  if (Array.isArray(locales)) {
    language = locales[0].languageTag;
  }
  return language
}

export function translateTags(value) {
  let i = 1
  let language = getLanguage()
  let res = 'error'
  if (language == 'fr-FR')
    i = 2
  tags_json.tags_array.forEach((item) => {
    if (item[0] == value) {
      res = item[i]
      return
    }
  });
  return res
}

export function detranslateTags(value) {
  let i = 1
  let language = getLanguage()
  let res = 'error'
  if (language == 'fr-FR')
    i = 2
  tags_json.tags_array.forEach((item) => {
    if (item[i] == value)
      res = item[0]
  });
  return res
}
