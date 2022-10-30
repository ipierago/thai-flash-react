const fs = require('fs');
const util = require('util');
const Vocabulary = require('./vocabulary');

async function exportCSV(path, tag) {
  const vocabulary = new Vocabulary();
  await vocabulary.load();
  var data = '';
  for (const term of vocabulary.data) {
    if (term.tags.some((e) => e === tag)) {
      data = data + '"';
      data = data + term.th;
      data = data + '"';
      data = data + ',';
      data = data + '"';
      data = data + term.ipa;
      data = data + '"';
      /*
      data = data + ',';
      data = data + '"';
      for (let i in term.en) {
        if (i > 0) data = data + ', ';
        data = data + term.en[i];
      }
      data = data + '"';
      */

      data = data + ',';
      data = data + '"';
      for (let i in term.tags) {
        if (i > 0) data = data + ' -- ';
        data = data + term.tags[i];
      }
      data = data + '"';
      data = data + '\r\n';
    }
  }
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(path, data);
  console.log(path + ' saved');
}

module.exports = exportCSV;
