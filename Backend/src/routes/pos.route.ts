import express from 'express'

import { getProducts, calculateBill, finalizeBill } from '../controllers/pos.controller'

const router = express.Router()


router.get('/products', getProducts)

router.post('/bill/calculate', calculateBill)

router.post('/bill/finalize', finalizeBill)


export default router