let mysql = require('../lib/mysql')

let loginHandler = async function(req, res) {
    try {
        let params = req.body
        console.log('[loginHandler backend] params: ', params)
        let conn = await mysql.connect()

        console.log('[loginHandler backend] db connection established: ', conn.threadId)
        mysql.end(conn)
        let user_details = {
            id: '115407523459751158832',
            email: 'ajith26488@gmail.com'
        }
        console.log('[loginHandler backend] user_details: ', user_details)
        return res.status(200).send(user_details)

    } catch(ex) {
        console.log('[loginHandler backend] exception: ', ex.stack)
        return res.status(500).send('Internal server error.')

    }
}

module.exports = {
    loginHandler: loginHandler
}