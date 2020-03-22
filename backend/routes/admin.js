const express = require('express');
var router = express.Router();
const adminControls = require('../controls/admin');
const fileupload = require('../middlewares/fileupload');

router.post('/addCat', adminControls.addCat);
router.get('/getCats', adminControls.getCats);
router.get('/getCatData/:cat', adminControls.getCatData);
router.post('/updateCat', adminControls.updateCat);
router.get('/deleteCat/:id', adminControls.deleteCat);

router.post('/addAd', adminControls.addAd);
router.get('/getAdData/:id', adminControls.getAdData);
router.post('/updateAd/:id', adminControls.updateAd);
router.get('/deleteAd/:id', adminControls.deleteAd);

router.get('/getItems/:skip/:limit', adminControls.getItems);
router.post('/uploadItem', fileupload, adminControls.uploadItem);
router.get('/getItemData/:id', adminControls.getItemData);
router.post('/updateItem/:id', fileupload, adminControls.updateItem);
router.get('/deleteItem/:id', adminControls.deleteItem);

router.get('/getUsers', adminControls.getUsers);
router.get('/deleteUser/:id', adminControls.deleteUser);
router.get('/toggleUserRole/:id', adminControls.toggleUserRole);

router.get('/getUsersCarts', adminControls.getUsersCarts);
router.get('/cartStage/:id/:stage', adminControls.cartStage);

router.get('/getUsersChats', adminControls.getUsersChats);
router.get('/getUserChat/:email', adminControls.getUserChat);



module.exports = router;
