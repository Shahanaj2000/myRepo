var db = require('../config/connections')
var collection = require('../config/collections')
module.exports = {
    addProduct: (product, callBack) =>{
        console.log(product);

        
    

        db.get().collection('products').insertOne(product).then((data)=>{
            console.log(data);
            callBack(data.insertedId)
            //console.log(ops); 
        })
    },
    getAllProducts: () => {
        return new Promise(async(resolve, reject)=> {
            let products =await db.get().collection(collection.PRODUCT_COLLETIONS).find().toArray()
            resolve(products)
        })
    } 
}  