const Userdb = require('../models/User')

exports.create = async (req, res) => {
    const { username, email, phone, gender, role } = req.body;

    if (!req.body) {
        return res.status(400).send({ "error": "Content cannot be empty!!!" });
    }

    try {
        const isPresent = await Userdb.findOne({ email });
        if (isPresent) {
            return res.status(422).json({ "error": "User Already Exist" });
        }

        const user = new Userdb({
            username: username,
            email: email,
            phone: phone,
            gender: gender,
            role: role
        })

        await user.save().then(data => { res.status(200).redirect('/') }).catch(err => { res.send(err) })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.fetch = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id
            const user = await Userdb.findById(id);
            if (!user) {
                return res.status(422).json({ "error": "User Not Found" });
            }
            else {
                return res.status(200).json({ "User": user });
            }
        }
        else {
            const user = await Userdb.find();
            if (!user) {
                return res.status(422).json({ "error": "Server Error" });
            }
            else {
                return res.status(200).json({ "Users": user });
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.updateUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ "error": "Content cannot be empty!!!" });
    }
    try {
        const id = req.params.id;
        const makeUpdate = await Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        if (!makeUpdate) {
            return res.status(404).send("User Not Found");
        }
        // return res.status(200).send({ "Updated User": makeUpdate })
        return res.status(200).redirect('/');
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await Userdb.findByIdAndDelete(id);
        if (!deleteUser) {
            res.status(404).send({ "msg": "User Not Found" })
        }
        else {
            // res.status(200).send({ "msg": "User Deleted Successfully" })
            res.status(200).redirect('/')
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}