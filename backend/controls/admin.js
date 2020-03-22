const Chars = require('../models/chars');
const Ads = require('../models/ads');
const Items = require('../models/items');
const Users = require('../models/users');
const Messages = require('../models/messages');
const Wishlist = require('../models/wishlist');


///////////////////////////////////////////// CATEGORIES /////////////////////////////////
exports.addCat = async(req, res) => {
    try {
        console.log(req.body);
        let addchar, update = null;
        if(req.body.mode==='add') {
            addchar = await new Chars(req.body.catData).save();
        }
        else if(req.body.mode === 'update') {
            await Chars.deleteOne({_id: req.body.catData._id});
            update = await new Chars(req.body.catData).save();
        }
        if(addchar || update ) {
            res.json({message: 'category added successfully..'});
        } else {
            res.json({message: 'category not added error happened try again...'});
        }
} catch(err) {
    console.log(err);
    res.json({message: 'category not added category maybe already exists...'});
    }
}
exports.getCats = async(req, res) => {
    const cats = await Chars.find();
    res.json({cats});
}
exports.getCatData = async(req, res) => {
    try {
        const cat = req.params.cat;
        const catData = await Chars.findOne({category: cat});
        res.json({catData});
} catch(err) {
    res.json({message: 'category not added category maybe already exists...'});
    }
}

exports.updateCat = async(req, res) => {
    try {
        const cat = req.prams.cat;
        const update = await Chars.update({category: cat}, req.body);
        if(update.nModified===1) {
            res.json({message: 'category data updated...'});
        }
} catch(err) {
    res.json({message: 'category data not updated.. try again...'});
    }
}

exports.deleteCat = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const delcat= await Chars.deleteOne({_id: id});
        if(delcat) {
            const cats = await Chars.find();
            res.json({cats});
        }
} catch(err) {
    res.json({message: 'category didn\'t deleted.. try again...'});
    }
}



///////////////////////////////////////////// ADVERTISMENTS /////////////////////////////////
exports.addAd = async(req, res) => {
    try {
        const addAd = await new Ads(req.body).save();
        console.log(req.body);
        if(addAd) {
            res.json({message: 'Ad added successfully..'});
        } else {
            res.json({message: 'Ad not added error happened try again...'});
        }
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}

exports.getAdData = async(req, res) => {
    try {
        const id = req.params.id;
        const adData = await Ads.findOne({_id: id});
        res.json({adData});
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

exports.updateAd = async(req, res) => {
    try {
        const id = req.params.id;
        const update = await Ads.update({_id: id}, req.body);
        if(update.nModified===1) {
            res.json({message: 'Ad data updated...'});
        }
} catch(err) {
    res.json({message: 'Update ad problem.. try again...'});
    }
}

exports.deleteAd = async(req, res) => {
    try {
        const id = req.params.id;
        const deletead = await Ads.deleteOne({_id: id});
        if(deletead) {
            const ads = await Ads.find();
            res.json({ads});
        }
} catch(err) {
    res.json({message: 'Ad didn\'t deleted.. try again...'});
    }
}
///////////////////////////////////////////// ITEMS /////////////////////////////////
exports.getItems = async(req, res) => {
    try {
        const skip = +req.params.skip;
        const limit = +req.params.limit;
        const count = await Items.find().count();
        const items = await Items.find().skip(skip).limit(limit);
            res.json({items, count});
} catch(err) {
    res.json({message: 'Items not added...'});
    }
}
exports.uploadItem = async(req, res) => {
    try {
        req.body['image'] = 'http://'+req.headers.host+'/images/'+req.file.filename;
        const newItem = await new Items(req.body).save();
        if(newItem) {
            res.json({message: 'uploaded'});
        }
} catch(err) {
    res.json({message: 'Item not added...'});
    }
}

exports.getItemData = async(req, res) => {
    try {
        const id = req.params.id;
        const itemData = await Items.findOne({_id: id});
        res.json({itemData});
} catch(err) {
    res.json({message: 'Item data problem...'});
    }
}

exports.updateItem = async(req, res) => {
    try {
        req.body['image'] = req.file?'http://'+req.headers.host+'/images/'+req.file.filename:req.body.file;
        const id = req.params.id;
        const update = await Items.update({_id: id}, req.body);
        if(update.nModified===1) {
            res.json({message: 'Item data updated...'});
        }
} catch(err) {
    res.json({message: 'Update item problem.. try again...'});
    }
}

exports.deleteItem = async(req, res) => {
    try {
        const id = req.params.id;
        const delitem = await Items.deleteOne({_id: id});
        if(delitem) {
            const items = await Items.find();
            res.json({items});
        }
} catch(err) {
    res.json({message: 'Item didn\'t deleted.. try again...'});
    }
}

///////////////////////////////////////////// USERS /////////////////////////////////
exports.getUsers = async(req, res) => {
    try {
        const users = await Users.find();
        res.json({users});
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}
exports.deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const deluser = await Users.deleteOne({_id: id});
        console.log(req.body);
        if(deluser) {
            const users = await Users.find();
            res.json({users});
        } else {
            res.json({message: 'Ad not added error happened try again...'});
        }
} catch(err) {
    res.json({message: 'Ad not added category...'});
    }
}

exports.toggleUserRole = async(req, res) => {
    try {
        const id = req.params.id;
        const updateUserRole = await Users.update({_id: id}, {$bit: {role: {xor: 1}}});
        let users = [];
        if(updateUserRole.nModified===1) {
            users = await Users.find();
        }
        res.json({users});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}



////////////////////////////////////// CHATS //////////////////////////////////////////////////
exports.getUsersChats = async(req, res) => {
    try {
        let chats = [];
        chats = await Messages.getMessages();
        res.json({chats});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

exports.getUserChat = async(req, res) => {
    try {
        const email = req.params.email;
        let messages = [];
        messages = await Messages.find({userEmail: email});
        res.json({messages});;
} catch(err) {
    res.json({message: 'Ad data problem...'});
    }
}

////////////////////////////////////// CARTS //////////////////////////////////////////////////
exports.getUsersCarts = async(req, res) => {
    try {
        let users = [];
        const carts = await Wishlist.find({done: 0});
        const cartsCount = carts.length;
        await carts.forEach(async (cart) => {
            const user = await Users.findOne({_id: cart.userId});
            users.push({user, cart});
            if(users.length === cartsCount) {
                res.json({users});
            }
        });

} catch(err) {
    res.json({message: 'Cart data problem...'});
    }
}

exports.cartStage = async(req, res) => {
    try {
        console.log(req.params);
        const id = req.params.id;
        const stage = req.params.stage;
        const updateObj = {$bit: {[stage]: {xor: 1}}};
        if(stage === 'done') updateObj['date'] = new Date();
        const update = await Wishlist.update({_id: id}, updateObj);
        if(update.nModified === 1) {
            let users = [];
            carts = await Wishlist.find({done: 0});
            const cartsCount = carts.length;
                await carts.forEach(async (cart) => {
                    const user = await Users.findOne({_id: cart.userId});
                    users.push({user, cart});
                    if(users.length === cartsCount) {
                        res.json({users, message: 'delivery step updated...'});
                    }
                });
            return;
        }
        res.json({message: 'user cart stage not updated'});
} catch(err) {
    res.json({message: 'Cart data problem...'});
    }
}



