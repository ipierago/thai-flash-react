const fs = require('fs');
const util = require('util');

async function readTermsFromFile(path) {
  const readFile = util.promisify(fs.readFile);
  const data = await readFile(path);
  var array = data.toString().split('\n');
  let i = 0;
  let newTerms = [];
  while (i < array.length) {
    const th = array[i].replace(/(\r\n|\n|\r)/gm, '');
    const ipa = array[i + 1].replace(/(\r\n|\n|\r)/gm, '');
    const en = array[i + 2].replace(/(\r\n|\n|\r)/gm, '');
    i = i + 3;
    const term = { th: th, ipa: ipa, en: en };
    console.log(term);
    newTerms.push(term);
  }
  return newTerms;
}

async function addNewTerms(path, in_tags = []) {
  const Vocabulary = require('./vocabulary');
  const vocabulary = new Vocabulary();
  await vocabulary.load();
  const newTerms = await readTermsFromFile(path);
  for (const term of newTerms) {
    vocabulary.add(term.th, term.ipa, term.en, in_tags);
  }
  await vocabulary.save();
  console.log('addNewTerms end');
}

module.exports = addNewTerms;
