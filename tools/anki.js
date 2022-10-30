const fs = require('fs');
const util = require('util');
const Vocabulary = require('./vocabulary');

async function exportSpeakDeck(tags, path = 'anki.out.txt') {
  const vocabulary = new Vocabulary();
  await vocabulary.load();
  var data = '';
  for (const term of vocabulary.data) {
    var b = tags.every((tag) => term.tags.some((e) => e === tag));
    if (b) {
      data = data + '"';
      for (let i in term.en) {
        if (i > 0) data = data + '\r\n';
        data = data + term.en[i];
      }
      data = data + '"';
      data = data + ';';
      data = data + '"';
      data = data + '[sound:' + term.th + '.mp3]';
      data = data + '\r\n';
      data = data + term.th;
      data = data + '\r\n';
      data = data + term.ipa;
      data = data + '"';
      data = data + '\r\n';
    }
  }
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(path, data);
  console.log(path + ' saved');
}

async function exportListenDeck(tags, path = 'anki.out.txt') {
  const vocabulary = new Vocabulary();
  await vocabulary.load();
  var data = '';
  for (const term of vocabulary.data) {
    var b = tags.every((tag) => term.tags.some((e) => e === tag));
    if (b) {
      data = data + '[sound:' + term.th + '.mp3]';
      data = data + ';';
      data = data + '"';
      data = data + term.th + '\r\n';
      data = data + term.ipa;
      for (e of term.en) {
        data = data + '\r\n' + e;
      }
      data = data + '"\r\n';
    }
  }
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(path, data);
  console.log(path + ' saved');
}

module.exports.exportListenDeck = exportListenDeck;
module.exports.exportSpeakDeck = exportSpeakDeck;
