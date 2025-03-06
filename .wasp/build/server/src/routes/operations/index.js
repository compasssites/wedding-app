import express from 'express'

import auth from 'wasp/core/auth'

import fetchGuestData from './fetchGuestData.js'
import getUserData from './getUserData.js'

const router = express.Router()

router.post('/fetch-guest-data', auth, fetchGuestData)
router.post('/get-user-data', auth, getUserData)

export default router
