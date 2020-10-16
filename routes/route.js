const { Router } = require('express')
const passport = require('passport')
const router = Router()
const {  loginUser ,registerUser ,commonLogOut, adminReferral, pdfGeneration ,fetchPdf , excelFile, fetchexcelFile ,getAdminReferrals} = require('../controllers/controller')

router.post('/user/register', registerUser)
router.post('/login', passport.authenticate('local', {session: false}), loginUser)
router.post("/admin/referral" , adminReferral)
router.delete("/logout" , passport.authenticate('jwt', {session: false}), commonLogOut)
router.post("/pdf" , passport.authenticate('jwt', {session: false}), pdfGeneration)
router.get("/fetch-pdf" , fetchPdf)
router.get("/fetch-excel" , fetchexcelFile)
router.post("/excel/file" ,passport.authenticate('jwt', {session: false}),excelFile)
router.get("/get/referral" , getAdminReferrals)

module.exports = router


