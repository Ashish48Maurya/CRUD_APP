const express = require('express');
const router = express.Router();
const service = require('../controllers/services')
const userServices = require('../controllers/userServices')


router.get('/', service.home);

router.get('/addUser', service.addUser);

router.get('/back', service.back)

router.get('/update', service.update)
router.get('/delete/:id', userServices.delete)


router.post('/api/users', userServices.create);
router.get('/api/users', userServices.fetch);
router.post('/api/users/:id', userServices.updateUser);


module.exports = router;