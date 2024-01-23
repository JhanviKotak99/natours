const express = require('express');
const viewsContoller = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsContoller.getOverview,
);

router.get('/tour/:slug', authController.isLoggedIn, viewsContoller.getTour);

router.get('/login', authController.isLoggedIn, viewsContoller.getLoginForm);

router.get('/signUp', authController.isLoggedIn, viewsContoller.getSignupForm);

router.get('/me', authController.protect, viewsContoller.getAcount);

router.get('/my-tours', authController.protect, viewsContoller.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsContoller.updateUserData,
);

module.exports = router;
