
// passport and passport-local
const passport = require('passport')
const bcrypt = require('bcrypt'); 
const LocalStrategy = require('passport-local').Strategy;


const Person = require('./models/Person');

passport.use(new LocalStrategy(async (username, password, done)=>{
    //authentication logic here
    try {
        
        console.log('Received credentials');
        const user = await Person.findOne({username});
        if(!user){
            return done(null, false, {message:'Incorrect Username.'});
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message:'Incorrect password.'});
        }

    } catch (error) {
        return done(error);
    }
}));

module.exports = passport; // export configured passport



