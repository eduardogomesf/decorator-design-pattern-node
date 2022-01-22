const app = require('./app');
const { CryptoHelper } = require('./cryptoHelper');

(async () => {
    const config = {
        cryptoKey: 'minha-senha-super-segura'
    }
    const cryptoHelper = await CryptoHelper.setup(config);

    await app.run();
})() 