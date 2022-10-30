const fs = require('fs');
const util = require('util');

const vocabularyDataPath = '../src/vocabulary-data.json';

class Vocabulary {
  constructor() {}

  load = async function () {
    const readFile = util.promisify(fs.readFile);
    const rawdata = await readFile(vocabularyDataPath);
    this.data = JSON.parse(rawdata);
    console.log('vocabulary loaded');
  };

  save = async function () {
    const json = JSON.stringify(this.data);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(vocabularyDataPath, json);
    console.log('vocabulary saved');
  };

  find = function (th) {
    for (let i = 0; i < this.data.length; ++i) {
      if (this.data[i].th === th) {
        return i;
      }
    }
    return -1;
  };

  add = function (in_th, in_ipa = '', in_en, in_tags = []) {
    const i = this.find(in_th);
    if (i == -1) {
      this.data.push({ th: in_th, en: [in_en], ipa: in_ipa, tags: in_tags });
    } else {
      let term = this.data[i];
      if (in_ipa != '') term.ipa = in_ipa;
      if (in_tags != null && in_tags.length > 0) {
        if (term.tags === undefined) term.tags = [];
        let rg = term.tags.concat(in_tags);
        term.tags = rg.filter((item, index) => {
          return rg.indexOf(item) == index;
        });
      }
    }
  };

  merge = function (newTerms) {
    for (const newTerm of newTerms) {
      console.log(newTerm);
      const i = this.find(newTerm.th);
      if (i == -1) {
        this.data.push(newTerm);
      } else {
        let term = this.data[i];
        console.log(term);
        if (newTerm.ipa != '') term.ipa = newTerm.ipa;
        if (newTerm.en != undefined) term.en = newTerm.en;
        if (newTerm.tags != null && newTerm.tags.length > 0) {
          if (term.tags === undefined) term.tags = [];
          let rg = term.tags.concat(newTerm.tags);
          term.tags = rg.filter((item, index) => {
            return rg.indexOf(item) == index;
          });
        }
        console.log(term);
      }
    }
  };
}

module.exports = Vocabulary;
