const express = require('express');
const router = express.Router();
const apiResponse = require('../utils/helpers').apiResponse;



/* users listing. */
router.get('/users', apiResponse('User', 'getAll', false, ['body']));
router.get('/users/detials/:id', apiResponse('User', 'details', false, ['params.id']));
router.post('/users/create', apiResponse('User', 'create', false, ['body']));
router.put('/users/edit/:id', apiResponse('User', 'edit', false, ['params.id', 'body']));
router.delete('/users/delete/:id', apiResponse('User', 'delete', false, ['params.id']));


/* products listing. */
router.get('/products', apiResponse('Product', 'getAll', false, ['body']));




module.exports = router;