const azure = require('azure-sb');  //service bus da azure

const notificationHubService = azure.createNotificationHubService('hubname','connectionstring');

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
