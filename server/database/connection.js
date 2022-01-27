const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect('mongodb+srv://imen:azerty@cluster0.kgd1g.mongodb.net/jugement', (err,done) => {
            if (err){
                console.log(err);
            }
            if (done){
        
                console.log('CONNECTED ');
            }
        });
        
        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB