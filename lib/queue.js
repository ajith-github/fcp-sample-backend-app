const AWS = require('aws-sdk');

function getSQSClient() {
    var sqs = new AWS.SQS({
        apiVersion: '2012-11-05',
        region: process.env.AWS_DEFAULT_REGION
    });
    return sqs
}

function sendMessage(message_data) {
    return new Promise((resolve, reject) => {
        let sqs = getSQSClient()
        sqs.sendMessage(message_data, function (err, data) {
            if (err) {
                console.log("Error", err);
                reject(err)
            } else {
                console.log("Success", data.MessageId);
                resolve(data.MessageId)
            }
        });
    });
}


function getMessage(data) {
    return new Promise((resolve, reject) => {
        let sqs = getSQSClient()
        sqs.receiveMessage(data, function(err, data) {
            if (err) {
                console.log("[getMessage] Receive Error", err);
                reject(err.stack)
            } else {
                console.log('[getMessage] ', data)
                resolve(data)
            }
        });
    });
}

function deleteMessage(data) {
    return new Promise((resolve, reject) => {
        let sqs = getSQSClient()
        var deleteParams = {
            QueueUrl: process.env.QUEUE_URL,
            ReceiptHandle: data.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams, function(err, data) {
            if (err) {
                console.log("[deleteMessage Delete Error", err);
                reject(err.stack)
            } else {
                console.log("[deleteMessage] Message Deleted", data);
                resolve(data)
            }
        });
    });
}



module.exports = {
    sendMessage: sendMessage,
    getMessage: getMessage,
    deleteMessage: deleteMessage
}