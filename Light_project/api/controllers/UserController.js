/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login : function(req, res) {
        if(!req.param('email') || !req.param('password')){
            return res.send(false);
        }
        var email = req.param('email');
        var pass = req.param('password');

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

