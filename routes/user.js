var express = require('express');
const { response } = require('../app');
var router = express.Router();
const productHelper = require('../helpers/product-helpers');
//const userHelpers = require('../helpers/user-helpers');
const userHelpers = require('../helpers/user-helpers')
const verifyLogin = (req,res,next) =>{
  if(req.session.loggedIn) {
    next()
  }else {
    res.redirect('/login')
  }
}



/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  console.log(user);
  productHelper.getAllProducts().then((products) => {
    res.render('user/view-products',{products, user})
  })
  //res.render('index', { products,admin:false });
});
router.get('/login',(req, res) => {
  //console.log("*****");
  if (req.session.loggedIn) {
    res.redirect("/");
  }  
   else {
     //res.render("user/login",{"loginErr":req.session.loginErr})
     res.render('user/login',{loginErr:req.session.loginErr})  
     console.log("...");
     req.session.loginErr  = false
   }
  res.render('user/login')
})

router.post("/login", (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if(response.status) {
        req.session.loggedIn = true
        req.session.user = response.user
        res.redirect('/')
      }else {
          res.redirect('/login')
      } 
  })
}); 


router.get('/signup',(req, res) => {
  res.render('user/signup')
})

router.post('/signup',(req,res) => {
  userHelpers.doSignup(req.body).then((response)=> {
    console.log(response);
     req.session.loggedIn = true
     req.session.user = response
     res.redirect('/')
  })
}) 


 router.get('/logout',(req,res) => {
   req.session.destroy()
   res.redirect('/') 
 })


router.get('/cart',verifyLogin,(req,res) => {
   res.render('user/cart')
})

router.get('/add-to-cart/:id',verifyLogin, (req,res) => {
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
    res.redirect('/')
  })
})  



       
module.exports = router; 
