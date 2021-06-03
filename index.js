require('dotenv').config();

const azure = require('azure-sb');  //service bus da azure

const notificationHubService = azure.createNotificationHubService(process.env.HUB_NAME,process.env.CONNECTION_STRING);

// especifico para IOS
let payload={
    alert: 'Hello!'
  };
notificationHubService.apns.send(null, payload, function(error){
  if(!error){
      // notification sent
      console.log("Notification sent to IOS");
  }
});
