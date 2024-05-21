const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const client_id = 'ShanksRe-Inventor-PRD-95ec4ed98-41a5d4f1';
const client_secret = 'PRD-5ec4ed988579-123f-45d9-a81b-0c07';
const redirect_uri = 'Shanks_RedHair-ShanksRe-Invent-yvmkakqhx';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const authorization_code = req.query.code;
    if (!authorization_code) {
        return res.status(400).send('Authorization code is missing');
    }

    const url = 'https://api.ebay.com/identity/v1/oauth2/token';
    const data = new URLSearchParams({
        code: authorization_code,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri,
        scope: 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly https://api.ebay.com/oauth/api_scope/sell.stores https://api.ebay.com/oauth/api_scope/sell.stores.readonly',
    });

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    };

    try {
        const response = await axios.post(url, data, { headers });
        const { refresh_token, access_token } = response.data;

        res.send(`
            Refresh Token: ${refresh_token} <br>
            Access Token: ${access_token} <br>
        `);
    } catch (error) {
        console.error('Error during token exchange:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
