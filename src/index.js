const app = require('./app');
const { CryptoHelper } = require('./cryptoHelper');
const { CustomFsPromises } = require('./customFsPromises');

(async () => {
    const config = {
        cryptoKey: 'minha-senha-super-segura'
    }
    const cryptoHelper = await CryptoHelper.setup(config);
    const customFsPromises = CustomFsPromises({ cryptoHelper }).configure();


    await app.run();
})() 