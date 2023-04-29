const express = require('express');
const bodyParser = require('body-parser');
const { PORT} = require('./config/serverConfig');
const { REMINDER_BINDING_KEY} = require('./config/serverConfig');
const TicketController = require('./controllers/ticket-controller');
const { subscribeMessage, createChannel } = require('./utils/messageQueue');
const jobs = require('./utils/job');
const EmailService = require('./services/email-service');
const setupAndStartServer = async() => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('api/v1/tickets', TicketController.create);
    const channel = await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);
    app.listen(PORT, () => {
        console.log(`Server Started at ${PORT}`);
        jobs();
        
    })
}

setupAndStartServer();