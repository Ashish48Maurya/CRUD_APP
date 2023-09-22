exports.home = async (req, res) => {
    try {
        const response = await fetch('http://localhost:5000/api/users')
        const data = await response.json();
        res.render('home', { user: data });
    }
    catch (err) {
        console.log('API request error:', err);
    }
}

exports.addUser = (req, res) => {
    res.render('addUser')
}

exports.back = (req, res) => {
    res.render('home')
}

exports.update = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users?id=${req.query.id}`);
        const userData = await response.json();
        console.log(userData)
        res.render('updateUser', { user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
