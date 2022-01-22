const app = require('./app');
const { CryptoHelper } = require('./cryptoHelper');
const { CustomFsPromises } = require('./customFsPromises');
const { Decorator } = require('./decorator');

(async () => {
    const config = {
        cryptoKey: 'minha-senha-super-segura'
    }
    const cryptoHelper = await CryptoHelper.setup(config);
    const customFsPromises = new CustomFsPromises({ cryptoHelper }).configure();
    Decorator.decorateModule(customFsPromises, require('fs').promises);

    await app.run();
})() 