const imagesCtrl = {};
const path = require('path');
const fs = require('fs')
const Image = require('./../models/Image');

imagesCtrl.renderImagesForm = (req, res) => {
    res.render('imagesFiles/new-image');
}

imagesCtrl.createNewImage = (req, res) =>{
    const {name} = req.body;
    //console.log(req._startTime);
    let newName = req._startTime;
    let filename = req.files.image.name;
    let file = req.files.image;
    let extend = filename.split('.').pop();
    let miniName = filename.split('.')[0];
    
    let fullname = filename;

    let actualRoute = path.join(__dirname, '..','public', 'images', fullname);

    try{
        if(fs.existsSync(actualRoute)){
            fullname = miniName+req._startAt[0]+'.'+extend;
            actualRoute = path.join(__dirname, '..','public', 'images', fullname);
        }
    } catch(err){
        console.log(err);
    }
    file.mv(actualRoute,async function(err){
        if(err){
            res.send(err);
        }else{
            const newImage = new Image({
                title: name,
                imageURL: process.env.SERVER+'/images/'+fullname,
                user: req.user.id
            });
            await newImage.save();
            req.flash('success_msg', 'Image uploaded successfuly');
            res.redirect('/images');

        }
    });
    //res.send('new image');
}

imagesCtrl.renderImages = async (req, res) =>{
    const images = await Image.find({user: req.user.id}).lean();
    
    res.render('imagesFiles/all-images.hbs', {images});
}

imagesCtrl.renderDeleteForm = (req, res) =>{
    res.send('delete image');
}

imagesCtrl.deleteImage = async (req, res) =>{
    console.log(req.params.id);
    await Image.findByIdAndDelete(req.params.id);
    //res.send('deleted');
    req.flash('success_msg', 'Image deleted successfuly');
    res.redirect('/images');
}

module.exports = imagesCtrl;