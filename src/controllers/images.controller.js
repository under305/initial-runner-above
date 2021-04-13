const imagesCtrl = {};
const path = require('path');
const fs = require('fs')
const Image = require('./../models/Image');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');
TimeAgo.addDefaultLocale(en);

imagesCtrl.renderImagesForm = (req, res) => {
    res.render('imagesFiles/new-image');
}

imagesCtrl.createNewImage = (req, res) =>{
    const {name} = req.body;
    let newName = req._startTime;
    let filename = req.files.image.name;
    let file = req.files.image;
    let extend = filename.split('.').pop();
    let miniName = filename.split('.')[0]; 
    let fullname = filename;
    let actualRoute = path.join(__dirname, '..','public', 'images', fullname);
    if(name && file){
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
                //res.redirect('/images');
            }
        });
    }else{
        req.flash('error_msg', 'Please, fill the inputs');
    }
    res.redirect('/images');
}

imagesCtrl.renderImages = async (req, res) =>{
    const images = await Image.find({user: req.user.id}).lean();
    var temporal = [];
    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')
    if(images){
        images.forEach ( element=>{
            temporal.push({
                _id: element._id,
                title: element.title,
                imageURL: element.imageURL,
                user: element.user,
                since: timeAgo.format(element.createdAt)
            });
        });
        
    }
    res.render('imagesFiles/all-images.hbs', {images: temporal});
}

imagesCtrl.renderDeleteForm = (req, res) =>{
    res.send('delete image');
}

imagesCtrl.deleteImage = async (req, res) =>{
    console.log(req.params.id);
    const deleted = await Image.findByIdAndDelete(req.params.id);
    const name = deleted.imageURL;
    let finalName = name.split('/').pop();
    console.log(finalName);
    try{
        fs.unlinkSync(path.join(__dirname, '..', 'public', 'images', finalName));
        req.flash('success_msg', 'Image deleted successfuly');
    }catch(err){
        req.flash('error_msg', "Couldn't delete image ");
    }
    
    res.redirect('/images');
}

imagesCtrl.showReceivedImages = async(req, res)=>{
    //console.log(req.user.receivedImages);
    let temporal = [];
    let temporal2 = [];
    (req.user.receivedImages).forEach( async element => {
        const actualImage = await Image.findById(element).lean();
        if(actualImage){
            temporal.push(actualImage);
            temporal2.push(element);
        }
    });
    console.log(await temporal2);
    res.render('imagesFiles/received-images', {images: temporal});
}

module.exports = imagesCtrl;