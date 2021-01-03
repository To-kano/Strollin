#INCLUDE

import I18n from '../Translation/configureTrans'


#TRANSLATE

Replace "line to translate (call 'Password')" by {I18n.t('var name (call test)')}
in fr.js and en.js, add at the end of the file your var name with the translation after


#EXAMPLE

in fr.js, i'll add
test: 'Mot de passe', (translation FR on Password)

in en.js, i'll add
test: 'Password',

now, my var test will by replace by it translation
