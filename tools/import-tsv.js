const fs = require('fs');
const util = require('util');

async function importTSV(path, in_tags = []) {
  const readFile = util.promisify(fs.readFile);
  const data = await readFile(path);
  const tabSep = data.toString().split('\t');
  let i = 0;
  let rv = [];
  while (i < tabSep.length) {
    const term = tabSep[i];
    const definition = tabSep[i + 1];
    i = i + 2;

    const array = term.split('\r\n');
    const th = array[0];
    let ipa = '';
    if (array.length > 0) {
      ipa = array[1];
    }

    const item = { th: th, ipa: ipa, en: [definition], tags: in_tags };
    rv.push(item);
  }
  return rv;
}

module.exports = importTSV;
