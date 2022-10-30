const fs = require('fs');
const util = require('util');
const Vocabulary = require('./vocabulary');
const textToSpeech = require('@google-cloud/text-to-speech');
const dotenv = require('dotenv');

async function doesExist(path) {
  let rv = true;
  const access = util.promisify(fs.access);
  try {
    await access(path);
  } catch (err) {
    rv = false;
  }
  return rv;
}

function relativePathMP3FromTH(th) {
  let rv = '..\\public\\mp3\\' + th + '.mp3';
  return rv;
}

async function ensureAllMP3() {
  dotenv.config();
  const textToSpeechClient = new textToSpeech.TextToSpeechClient();

  const vocabulary = new Vocabulary();
  await vocabulary.load();
  for (const term of vocabulary.data) {
    const path = relativePathMP3FromTH(term.th);
    const pathExists = await doesExist(path);
    if (!pathExists) {
      const request = {
        input: { text: term.th },
        voice: {
          languageCode: 'th-TH',
          name: 'th-TH-Standard-A',
          ssmlGender: 'FEMALE',
        },
        audioConfig: { audioEncoding: 'MP3' },
      };
      const [response] = await textToSpeechClient.synthesizeSpeech(request);
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(path, response.audioContent, 'binary');
      console.log('ensureAllMP3: ' + path);
    }
  }
}

module.exports = ensureAllMP3;
