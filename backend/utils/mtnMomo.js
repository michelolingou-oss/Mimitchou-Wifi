const axios = require('axios');

class MtnMomo {
    constructor(apiKey, apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.baseUrl = 'https://sandbox.momodeveloper.mtn.com'; // Use the live URL in production
    }

    async authenticate() {
        const response = await axios.post(`${this.baseUrl}/v1_0/apiuser/token`, {}, {
            headers: {
                'Ocp-Apim-Subscription-Key': this.apiKey,
                'Authorization': 'Basic ' + Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString('base64')
            }
        });
        return response.data;
    }

    async makePayment(amount, currency, externalId, payerMessage, payeeNote) {
        const token = await this.authenticate();
        const response = await axios.post(`${this.baseUrl}/v1_0/transfer`, {
            amount,
            currency,
            externalId,
            payerMessage,
            payeeNote
        }, {
            headers: {
                'Authorization': `Bearer ${token.access_token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
}

module.exports = MtnMomo;