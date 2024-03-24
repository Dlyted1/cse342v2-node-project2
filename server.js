// const express = require('express');
// const app = express();

// const port = process.env.PORT || 3000;

// app.use('/', require('./routes'));

// app.listen(port, () => { console.log(`running on port ${port}`) });

// const cookieSession = require('cookie-session')
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
// const MemoryStore = require('memorystore')(session)
const GitHubStrategy = require('passport-github2').Strategy;


const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())

    .use(session({
        // cookie: { maxAge: 86400000 },
        // store: new MemoryStore({
        //    checkPeriod: 86400000 // prune expired entries every 24h
        // }),
        // name: 'session',
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    // This is the basic express session ({..}) initialization.
    .use(passport.initialize())
    // init passport on every route call.
    .use(passport.session())
    // allow passport to use "express-session".

    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    // .use('/', require('./routes'));
    .use('/', require('./routes/index.js'));

//how to handle errors
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception ${err}\n` * `Exception origin: ${origin}`);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        // User.findCreate({ githubID: profile.id }, function (err, user) {
        return done(null, profile);
        // });
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as $(req.session.user.displayName)` : "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});