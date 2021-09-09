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
        return res.status(200).send({status: "The customer is created", id: customer.id});
    } else {
        customer = await stripe.customers.retrieve(user.stripe_id)
        .catch(error => {
            return res.status(400).send({status: "An error occurred during the retrieve of customer"})
        });
        return res.status(200).send({status: "The customer is retrieved", id: customer.id});
    }
});


// CREATE_SUBSCRIPTION
/**
 * Create an incomplete subscription ready to be confirmed by getting payment confirmation.
 * 
 */
router.post('/create_subscription', async function(req, res) {
    const price_id = "price_1JSl53H9C7g7Ir7890KpWvW8";
    var subscription = undefined;

    let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id stripe_id").catch(error => error);

    if (!user) {
        return res.status(400).send({ status: "You are not connected." });
    }
    if (user.reason) {
        return res.status(400).send({ status: "Error in database transaction:\n", error: user });
    }
    if (user.stripe_id !== '') {

        subscription = await stripe.subscriptions.create({
            customer: user.stripe_id,
            items: [{
                price: price_id,
            }],
            payment_behavior: 'default_incomplete',
            expand: ['latest_invoice.payment_intent'],
        })
        .catch(error => {
            return res.status(400).send({status: "Impossible to create the subscription."});
        });
    } else {
        return res.status(400).send({status: "The user has not a stripe ID."});
    }

    let error = await UserModel.updateOne({ id: user.id }, {subscription_id: subscription.id}).catch(error => error);
    if (error.errors) {
        return res.status(400).send({ status: "Error in database transaction:\n", error: error.errors });
    }
    return res.status(200).send({status: "The subscription is created, waiting to confirm the payment.", subscription_id: subscription.id, client_secret: subscription.latest_invoice.payment_intent.client_secret});
});


// GET_SUBSCRIPTION
/**
 * Collect and create Element to save card payment (Temporary, it has to be made in front)
 * 
 */
router.get('/get_subscription', async function(req, res) {
    // let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id subscription_id").catch(error => error);
    // const sub = undefined;

    // if (!user) {
    //     return res.status(400).send({ status: "You are not connected." });
    // }
    // if (user.reason) {
    //     return res.status(400).send({ status: "Error in database transaction:\n", error: user });
    // }
    // if (user.subscription_id !== '') {
    sub = await stripe.subscriptions.retrieve(req.headers.sub)
    // }
    return res.status(200).send({status: "Here is the subscription's information.", subscription: sub});
});



// STOP_SUBSCRIPTION
/**
 * Stop the subscription of an user
 * @param {String} req.headers.access_token
 */
router.post('/stop_subscription', async function(req, res) {
    let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id subscription_id").catch(error => error);

    if (!user) {
        return res.status(400).send({ status: "You are not connected." });
    }
    if (user.reason) {
        return res.status(400).send({ status: "Error in database transaction:\n", error: user });
    }
    stripe.subscriptions.update(user.subscription_id, {cancel_at_period_end: true})
    .catch(error => {
        return res.status(400).send({status: "Error while requesting stop sub."});
    });
    return res.status(200).send({status: "Subscription cancel has been taken into account."});
});


module.exports = router;