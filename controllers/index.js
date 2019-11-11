let homepage = function(req, res){
    res.render('pages/index', { title: 'Home' });
}


module.exports = {
    homepage: homepage
}