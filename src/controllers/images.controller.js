const imagesCtrl = {};

imagesCtrl.renderImagesForm = (req, res) => {
    res.send('image add');
}

imagesCtrl.createNewImage = (req, res) =>{
    res.send('new image');
}

imagesCtrl.renderImages = (req, res) =>{
    res.send('render images');
}

imagesCtrl.renderDeleteForm = (req, res) =>{
    res.send('delete image');
}

imagesCtrl.deleteImage = (req, res) =>{
    res.send('deleted');
}

module.exports = imagesCtrl;