var express = require('express');
const {render, response} = require('../app');
const productHelper = require('../helpers/product-helpers');
var router = express.Router();

router.get('/', function(req, res, next){
  productHelper.getAllProducts().then((products) => {
    console.log(products);
    res.render('admin/view-products',{admin:true,products})
  })

  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})

router.post('/add-product',(req,res) => {
  //console.log(req.body);
  //console.log(req.files.Image);
  productHelper.addProduct(req.body,(id)=> {
    let image = req.files.Image
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err)=>{
      if(!err) {
        res.render("admin/add-product")
      }
      else {
        console.log(err);
      }
    })
    
  })
})


router.get('/delete-product/:id',(req,res)=> { 
  let prodId = req.params.id
  console.log(prodId);
 productHelper.deleteProduct(prodId).then((response)=> {
    res.redirect('/admin/')      
  })
  //console.log(req.query.name);
})
module.exports = router;
