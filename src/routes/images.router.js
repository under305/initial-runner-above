const { Router } = require('express');
const router = Router();
const { 
    renderImagesForm, 
    createNewImage, 
    renderImages, 
    renderDeleteForm, 
    deleteImage ,
    showReceivedImages
} = require('../controllers/images.controller');
const { isAuthenticated } = require('./../helpers/auth');

/**
 * *Set new Image
 */
router.get('/images/new-image', isAuthenticated, renderImagesForm);
router.post('/images/new-image', isAuthenticated,createNewImage);

/**
 * *GetAllImages
 */
router.get('/images', isAuthenticated,renderImages);

/**
 * !Delete the image
 */
//router.get('/images/delete/:id', renderDeleteForm);
router.delete('/images/delete/:id', isAuthenticated, deleteImage);

router.get('/images/received-images', isAuthenticated, showReceivedImages);


module.exports = router;