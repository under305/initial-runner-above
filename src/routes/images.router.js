const { Router } = require('express');
const router = Router();
const { 
    renderImagesForm, 
    createNewImage, 
    renderImages, 
    renderDeleteForm, 
    deleteImage 
} = require('../controllers/images.controller');

/**
 * *Set new Image
 */
router.get('/images/new-image', renderImagesForm);
router.post('/images/new-image', createNewImage);

/**
 * *GetAllImages
 */
router.get('/images', renderImages);

/**
 * !Delete the image
 */
//router.get('/images/delete/:id', renderDeleteForm);
router.delete('/images/delete/:id', deleteImage);


module.exports = router;