const { createCipheriv, createDecipheriv } = require('crypto');

class CryptoHelper {
    constructor({ cryptoKey }) {
       /*
        aes-192-ecb
        aes = Advanced Encryption Standard
        192 = 192 bits of the key
        24 characters = 192 bits converted to bytes
        ecb = Electronic Code Book

        openssl -cipher-algorithms
       */

        this.cryptoConfig = Object.values({
            algorithm: 'aes-192-ecb',
            cryptoKey,
            initializationVectorKey: null,
        });
    }

    static async setup({ cryptoKey }) {
        return new CryptoHelper({ cryptoKey });
    }

    async encrypt(data) {
        const cipher = createCipheriv(...this.cryptoConfig);

        // from utf-8 to base64
        return cipher
        .update(data, 'utf-8', 'base64')
        .concat(cipher.final('base64'))
    }

    async decrypt(data) {
        const cipher = createDecipheriv(...this.cryptoConfig);

        return cipher
        .update(data, 'base64', 'utf-8')
        .concat(cipher.final('utf-8'))
    }
}   

module.exports = { CryptoHelper };