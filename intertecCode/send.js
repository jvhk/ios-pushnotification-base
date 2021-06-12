var azure = require('azure');
var notificationHubService = azure.createNotificationHubService('demo-hub', 'Endpoint=...');


// object will be replaced before the message is pushed to the device
var notification = {
    'message': 'hello from node!', // message to display in notification 
    'count': 0                     // set badge iOS badge to this value 
};
 

/* Now we have a response handler. This simply logs the response to the console. Expect to do something 
more interesting here in a real application. */
var responseHandler = (function (n) {
    return function (e, r) {
        if (e) {
            console.log(e);
            return;
        } else {
            console.log(r.statusCode, n);
        }
    };
})(notification);

/*  is where things actually happen. Three parameters, the tag (or who to send it to), the notification 
itself and the response handler. */
notificationHubService.send('tag', notification, responseHandler);