const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/mydatabase1', { });

const userSchema = new Schema({
    name: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// User.create({ name: 'Tarun', password: '12345' })
//     .then(user => {
//         console.log('User created:', user);
//         mongoose.connection.close();
//     })
//     .catch(err => {
//         console.error('Error creating user:', err);
//         mongoose.connection.close();
//     }); 


module.exports = User;