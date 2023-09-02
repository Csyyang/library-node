const session = require("express-session");

function initSession() {
    return session({
        secret: 'scret20230902',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60,
            secure: false,
        }
    })
}

module.exports = initSession;