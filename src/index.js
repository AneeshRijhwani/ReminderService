const express = require('express');
const bodyParser = require('body-parser');
const { PORT} = require('./config/serverConfig');
const {sendBasicEmail} = require('./services/email-service');
const setupAndStartServe = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT, () => {
        console.log(`Server Started at ${PORT}`);
        sendBasicEmail(
            'support@booking.com',
            '7851950798aneesh@gmail.com',
            'This is a test mail',
            'Hey, how are you'
        )
    })
}

setupAndStartServe();