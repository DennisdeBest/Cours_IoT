/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login : function(req, res) {
        if(!req.params('email') || !req.params('password')){
            return res.send(false);
        }
        var email = req.params('email');
        var pass = req.params('password');

        User.findOne().where(
            {
                'email' : email,
                'password' : pass
            }).exec(function(err, foundUser) {
            if(err) return res.send(false);
            if(!foundUser) return res.send(false);

            req.session.user = foundUser;
            return res.send(true);
        });
    }
};

