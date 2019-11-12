let google_auth = require('../lib/google-auth')

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


let loginpage = function(req, res) {
    res.render('pages/login', {
        google_url: google_auth.googleUrl(),
        title: 'login'
    })
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
        res.status(301).redirect('/')
        return
        // res.render('pages/index', {
        //     title: 'home',
        //     user_details: user_details
        // })
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    homepage: homepage,
    loginView: loginpage,
    callbackHandler: callbackHandler,
    logoutHandler: logoutHandler
}