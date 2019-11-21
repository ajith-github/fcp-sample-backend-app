var queue = require('../lib/queue')

let deleteHandler = async function(req, res) {
    try {
        let receipt_handle = req.body.receipt_handle
        console.log('[deleteHandler backend] receipt_handle: ', receipt_handle)

        let response = await queue.deleteMessage(receipt_handle)
        console.log('[deleteHandler backend] response: ', response)
        return res.status(200).send({response})
    } catch(ex) {
        console.error('[deleteHandler backend] exception ', ex);
        res.status(500).send('Internal server error')
    }
}

let sendMessageHandler = async function(req, res) {
    try {
        console.log('[sendMessageHandler backend] body: ', req.body)
        let message_body = req.body.message_body
        let title = req.body.title
        let author = req.body.author
        let queue_url = req.body.queue_url

        console.log('[sendMessageHandler backend] message_body: ', message_body)
        var params = {
            DelaySeconds: 10,
            MessageAttributes: {
                "Title": {
                    DataType: "String",
                    StringValue: title
                },
                "Author": {
                    DataType: "String",
                    StringValue: author
                }
            },
            MessageBody: message_body,
            QueueUrl: queue_url
        };
        let messageId = await queue.sendMessage(params)
        console.log('[sendMessageHandler backend] messageId: ', messageId)
        return res.status(200).send({messageId})
    } catch(ex) {
        console.error('[sendMessageHandler backend] exception ', ex);
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    sendMessageHandler: sendMessageHandler,
    deleteHandler: deleteHandler
}