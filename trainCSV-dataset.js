const fs = require('fs')
const csv = require('fast-csv');
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'], forceNER: true ,nlu: { useNoneFeature: false }});
const data = []
 
fs.createReadStream('./dataset/sentiment_tweets3.csv')
  .pipe(csv.parse({ headers: true }))
  .on('error', error => console.error(error))
  .on('data', row => {
// Adds the utterances and intents for the NLP
manager.addDocument('en', row['message to examine'], row['label (depression result)']);
})
  .on('end', async () => {
    await manager.addAnswer('en', 1, 'Depression  Detected');

    await manager.addAnswer('en', 0, 'Depression Not Detected');
    await manager.train();
    manager.save();
    console.log("model trained")
});