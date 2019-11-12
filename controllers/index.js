let google_auth = require('../lib/google-auth')

let homepage = function(req, res){
    res.render('pages/index', { title: 'Home' });
}


let loginpage = function(req, res) {
    res.render('pages/login', {
        google_url: google_auth.googleUrl(),
        title: 'login'
    })
}

let callbackHandler = async function(req, res) {
    let code = req.query.code
    console.log('code: ', code)
    let user_details = await google_auth.getGoogleAccountFromCode(code)
    console.log('user_details: ', user_details)
    if (user_details.length > 0){
        res.render('pages/index', {
            title: 'home',
            user_details: user_details
        })
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    homepage: homepage,
    loginView: loginpage,
    callbackHandler: callbackHandler
}