/* eslint-disable semi */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import express from 'express';
import fetchOrders from '../controllers/fetchOrders.js';
import deleteOrder from '../controllers/deleteOrder.js';
import updateAccount from '../controllers/updateAccout.js';
import login from '../controllers/login.js';
import auth from '../auth/auth.js';

const router = express.Router()
router.get('/order_items', auth, fetchOrders);
router.post('/login', login, auth);
router.delete('/order_items/:id', auth, deleteOrder);
router.put('/account', auth, updateAccount);
export default router;
