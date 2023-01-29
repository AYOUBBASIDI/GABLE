"use strict";
const usersDB = require('../../models/users.js');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db mongoose middleware
    const duplicate = usersDB.users.find({ email: email });
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const user = new usersDB.users({
            email: email,
            pwd: hashedPwd
        });
        await user.save();
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };