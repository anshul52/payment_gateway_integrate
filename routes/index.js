var express = require('express');
var router = express.Router();
var Razorpay = require("razorpay");
require('dotenv').config();


var instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

var fields = {
  "razorpay_payment_id": "pay_29QQoUBi66xm2f",
  "razorpay_order_id": "order_9A33XWu170gUtm",
  "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

router.post('/create/orderId',(req,res)=>{
  
  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "rcp1"
  }

  instance.orders.create(options, function(err, order) {
    // console.log(order);
    res.status(200).send(order,{ orderId:order.id , key_id:process.env.key_id });
  })

})

router.get('/success', function(req, res, next) {
  res.render('success')
});

module.exports = router;


