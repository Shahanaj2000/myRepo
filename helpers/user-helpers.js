var db = require('../config/connections')
var collection = require('../config/collections')
const bcrypt = require('bcrypt') //Password Encryption
const { Promise } = require('mongodb')
const { response } = require('../app')
var objectId = require('mongodb').ObjectId

module.exports = {
    doSignup:(userData) => {
        return new Promise( async(resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).the((data) => {
                resolve(data)
            })
        })
    },
    //To check email and password 
    /*doLogin:(userData) => {
        return new Promise( async(resolve, reject) => {
            console.log("*****"); 
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({Email:userData.Email})
            if(user) {
                bcrypt.compare(userData.Password, user.Password).then((status)=> {
                    if(status) {
                        console.log("login successfully");
                         response.user = user 
                         response.status = true
                         resolve(response)
                        
                    }
                    else{
                        console.log("Login failed"); 
                         resolve({status:false})
                    }
                })
            }
            else {
                console.log("User does not exists"); 
                 resolve({status:false})  
            }
        })
    },*/
    doLogin:(userData) => {
        console.log("_____");
        return new Promise(async (resolve, reject) => {
            console.log("!!!!!!");
            let loginStatus = false
            console.log("#####");
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({Email:userData.Email})
            if(user) {
                bcrypt.compare(userData.Password,user.Password).then((status) => {
                    if(status) {
                        console.log("login success");
                        response.user = user
                        response.status = true
                        resolve(response)
                    }else {
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else {
                console.log("login failed");
                resolve({status:false})
            }
        })
    },
    
    addToCart:(prodId, userId) => {
        return new Promise(async(resolve, reject) => {
            let userCart  = await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
            if(userCart) {

            }else {
                let cartObj = {
                    user:objectId(userId),  
                    products:[objectId(prodId)]
                     }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response) => {
                    resolve()
                })
            }
        }) 
    }
}