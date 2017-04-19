'use strict';
var bcrypt = require('bcryptjs');
module.exports = {
    saltHashPassword: function (userpassword) {
        return bcrypt.hashSync(userpassword);
    },
    confirmPassword: function (user, password) {
        return bcrypt.compareSync(password, user.password);
    }
}
