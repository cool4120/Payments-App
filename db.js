const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://colinct2002:dy9FGN7HEutKAqLw@cluster0.6aw6qnr.mongodb.net/patmDB')
const UserSchema =  new mongoose.Schema({
    firstName:String,
    lastName:String,
    password:String,
    username:String
})
const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type: Number,
        required:true
    }
})

const User = mongoose.model('user',UserSchema);
const Accounts = mongoose.model('Account',accountSchema);

module.exports = {
    User,
    Accounts
}
