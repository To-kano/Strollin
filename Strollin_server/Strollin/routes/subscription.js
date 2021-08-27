var express = require('express');
var router = express.Router();

const stripe = require('stripe')('sk_test_51JSMW9H9C7g7Ir78BQDjbCPJ71SYc19nSmTDAEZAqrMHcREIMi6SOhHaEuGspN62eT3g5Iza1QKex8ifc0a2jKGn00wrObLsAs')
var customer = undefined;

const {
    UserModel
  } = require("../models/user")


// CREATE_CUSTOMER
/**
 * Create or retrieve a customer for Stripe
 * @param {String} req.headers.access_token
 */
router.post('/create_customer', async function(req, res) {
    let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id mail stripe_id").catch(error => error);

    if (!user) {
        return res.status(400).send({ status: "You are not connected." });
    }
    if (user.reason) {
        return res.status(400).send({ status: "Error in database transaction:\n", error: user });
    }
    if (user.stripe_id === '') {
        customer = await stripe.customers.create({
            email: user.mail,
        })
        .catch(error => {
            return res.status(400).send({status: "An error occurred during the creation of customer"})
        });
        let error = await UserModel.updateOne({ id: user.id }, {stripe_id: customer.id}).catch(error => error);
        if (error.errors) {
            return res.status(400).send({ status: "Error in database transaction:\n", error: error.errors });
        }
    } else {
        customer = await stripe.customers.retrieve(user.stripe_id)
        .catch(error => {
            return res.status(400).send({status: "An error occurred during the retrieve of customer"})
        });
    }
    return res.status(200).send({status: "The customer is created/retrieved", id: customer.id});
});


// STOP_SUBSCRIPTION
/**
 * Stop the subscription of an user
 * @param {String} req.headers.access_token
 */
 router.post('/stop_subscription', async function(req, res) {
    let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id").catch(error => error);

    if (!user) {
        return res.status(400).send({ status: "You are not connected." });
    }
    if (user.reason) {
        return res.status(400).send({ status: "Error in database transaction:\n", error: user });
    }
    //...
});


module.exports = router;