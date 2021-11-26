const { Router } = require('express')
const router = Router();

const controller = require('../controllers/controller');
const path = 'home';

router.get(`/${path}`, controller.getDataFull);

router.post(`/${path}`, controller.insertData);

router.get(`/${path}/:id`, controller.getData);

router.put(`/${path}/:id`, controller.updateData);

router.delete(`/${path}/:id`, controller.deleteData);

module.exports = router    