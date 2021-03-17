const fr = require("./fr.json")
const en = require("./en.json")

const data = {
  fr,
  en
};



const notificationTranslate = (lang = "en", keyWord = "NOT_DEFINE") => {
  return data[lang].hasOwnProperty(keyWord)
    ? data[lang][keyWord]
    : data[lang]["NOT_DEFINE"];
};


module.exports = {
  notificationTranslate
}
