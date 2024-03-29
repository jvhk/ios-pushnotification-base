require('dotenv').config();

const azure = require('azure-sb');

function checkForMessages(sbService, queueName, callback) {
  sbService.receiveQueueMessage(queueName, { isPeekLock: true }, function (err, lockedMessage) {
    if (err) {
      if (err == 'No messages to receive') {
        console.log('No messages');
      } else {
        callback(err);
      }
    } else {
      callback(null, lockedMessage);
    }
  });
}

function processMessage(sbService, err, lockedMsg) {
  if (err) {
    console.log('Error on Rx: ', err);
  } else {
    console.log('Rx: ', lockedMsg);
    sbService.deleteMessage(lockedMsg, function(err2) {
      if (err2) {
        console.log('Failed to delete message: ', err2);
      } else {
        console.log('Deleted message.');
      }
    })
  }
}

var idx = 0;
function sendMessages(sbService, queueName) {
  let msg = 'Message #'  + (++idx);
  sbService.sendQueueMessage(queueName, msg, function (err) {
   if (err) {
     console.log('Failed Tx: ', err);
   } else {
     console.log('Sent ' + msg);
   }
  });
}

let connStr = process.argv[2] || process.env.SERVICE_BUS;
if (!connStr) throw new Error('Must provide connection string');
let queueName = 'sbqtest';

console.log('Connecting to ' + connStr + ' queue ' + queueName);
const sbService = azure.createServiceBusService(connStr);
sbService.createQueueIfNotExists(queueName, function (err) {
  if (err) {
   console.log('Failed to create queue: ', err);
  } else {
   setInterval(checkForMessages.bind(null, sbService, queueName, processMessage.bind(null, sbService)), 5000);
   setInterval(sendMessages.bind(null, sbService, queueName), 15000);
  }
});