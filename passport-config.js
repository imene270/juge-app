const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize(passport){
    const authenticateUser = async (email,password ,done )=>{
        const Userdb = getUserByEmail(email)
        if (Userdb == null) {
          return done(null, false, { message: 'No user with that email' })
    }
    try {
        if (await bcrypt.compare(password, Userdb.password)) {
          return done(null, Userdb)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        return done(e)
      }
    }


    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((Userdb, done) => done(null, Userdb.id))
    passport.deserializeUser((id, done) => {
      return done(null, getUserById(id))
    })
  }

module.exports = initialize