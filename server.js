
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }


const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');
/*********************** */
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');
initializePassport(
    passport,
    email => Userdb.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )

const Userdb = [];





const app = express();
app.use(express.urlencoded({ extended : false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())


  /******************************* */
dotenv.config( { path : 'config.env'} )
//const PORT = process.env.PORT || 8080
const PORT = process.env.PORT || 5000
// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
//app.use(bodyParser.json());
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))


//app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
app.listen(5000,() => console.log("server connected"));

/*******************************/
app.get('/',checkNotAuthenticated,(req,res)=> {
    res.render('login.ejs')
})

app.get('/register',checkNotAuthenticated,(req,res)=> {
    res.render('register.ejs')
})

  


app.post('/login',checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/a',
    failureRedirect: '/',
    failureFlash: true
  }))


app.post('/register',checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      Userdb.push({
        //id: Date.now().toString(),
        name: req.body.name,
        cin: req.body.cin,
        email: req.body.email,
        telephone: req.body.telephone,
        password: hashedPassword,
        role: req.body.role,
        region: req.body.region,
      })

      
      res.redirect('/login')//normalemnt lel page mtaa el home
    } catch {
      res.redirect('/register')
    }

    console.log(Userdb);
  })

app.get('/', checkAuthenticated,  (req, res) => {
    res.render('login.ejs')
  })


  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }