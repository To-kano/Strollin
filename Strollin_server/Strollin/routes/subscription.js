var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_51JSMW9H9C7g7Ir78BQDjbCPJ71SYc19nSmTDAEZAqrMHcREIMi6SOhHaEuGspN62eT3g5Iza1QKex8ifc0a2jKGn00wrObLsAs')
var customer = undefined;

const {
    UserModel
  } = require("../models/user")


router.get('/set_subscription', async function(req, res) {
    let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id").catch(error => error);

    if (!user) {
        return res.status(400).send({ status: "You are not connected." });
    }
    if (user.reason) {
        return res.status(400).send({ status: "Error in database transaction:\n", error: user });
    }
    if (user.stripe_id === '') {
        stripe.customers.create({
            email: user.mail,
            
        })
    }

    customer = await stripe.customers.retrieve(user.stripe_id)
    .catch(error => {
        return res.status(400).send({status: "An error occurred during the subscription setting"})
    });
});

module.exports = router;