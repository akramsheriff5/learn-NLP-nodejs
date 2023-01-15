const { NlpManager } = require('node-nlp');
const process = require('process');

manager = new NlpManager();
manager.load('./model.nlp');

// Train and save the model.
(async() => {
   
    const response = await manager.process('en', process.argv[2]);
    console.log(response);
})();