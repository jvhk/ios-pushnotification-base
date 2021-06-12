// reference:  https://www.intertech.com/push-notifications-tutorial-node-js-and-azure-setup/

var azure = require('azure');
var notificationHubService = azure.createNotificationHubService('demo-hub', 'Endpoint=...');

/*Now is the important line of code that registers a device with Azure so it knows about the device. In this example we 
will register an iOS device using Apple Push Notification Service (APNS).

- Params
1 -> device token that will be provided by the iOS application itself when it asks the user permission to send notifications.
2 -> the tag to use to identify this registration.  Here we just used the simple string of ‘tag’.  You might use a username for example.
3 -> The third is the template for this specific notification type. In this case I have used 
an APNS notification type with two variables in it, one of the message and another for the iOS 
badge count, we will use these variables later when we send a notification.  Templates are were
the power of Azure’s system come in.  They allow us to send a generic message type and taylor 
it to the specific format that the platform needs (APNS, GCM, Windows, etc.)
4 -> The fourth is the callback to handle success/failure of the registration. Here I am simply logging to the console.
*/


notificationHubService.apns.createTemplateRegistration(
    'deviceToken',
    'tag', {
        'aps': {
            'alert': '$(message)',
            'badge': '#(count)',
            'sound': 'default'
        }
    },
    function (e, r) {
        if (e) {
            console.log(e);
        } else {
            console.log({
                id: r.RegistrationId,
                deviceToken: r.DeviceToken,
                expires: r.ExpirationTime
            });
        }
    }
);

// !!! after register the device running node register.js go to send.js  !!!

