let google_auth = require('../lib/google-auth')
const APP_URL = 'http://localhost:8082'

let homepage = function(req, res){
    let user_details = false
    if (req.session.hasOwnProperty('user')){
        user_details = req.session.user
    } else {
        return res.status(301).redirect('/login')
    }
    res.render('pages/index', {
        title: 'Home',
        user: user_details
    });
}

let googleURLHandler = function(req, res) {
    return res.status(200).send({
        google_url: google_auth.googleUrl()
    })
}

let loginpage = function(req, res) {
    res.render('pages/login', {
        google_url: google_auth.googleUrl(),
        title: 'login'
    })
}

let loginHandler = function(req, res) {
    let params = req.body
    console.log('params: ', params)
    return res.status(200).send('OK')
}


let logoutHandler = async function(req, res) {
    let logged_out = await req.session.destroy()
    console.log('logged_out: ', logged_out)
    if (logged_out){
        res.status(301).redirect('/login')
    } else {
        res.status(301).redirect('/')
    }
}

let callbackHandler = async function(req, res) {
    let code = req.query.code
    console.log('code: ', code)
    let user_details = await google_auth.getGoogleAccountFromCode(code)
    console.log('user_details: ', user_details)
    if (user_details.hasOwnProperty('id')){
        req.session.user = user_details
        // res.status(200).json({...user_details})
        res.status(301).redirect('http://localhost:8082/index.html')
        return
    } else {
        res.redirect(APP_URL + '/login')
    }
}

module.exports = {
    homepage: homepage,
    loginView: loginpage,
    loginHandler: loginHandler,
    callbackHandler: callbackHandler,
    logoutHandler: logoutHandler,
    googleURLHandler: googleURLHandler
}