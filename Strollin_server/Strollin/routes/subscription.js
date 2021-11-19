var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_51JSMW9H9C7g7Ir78BQDjbCPJ71SYc19nSmTDAEZAqrMHcREIMi6SOhHaEuGspN62eT3g5Iza1QKex8ifc0a2jKGn00wrObLsAs')

var customer = undefined;

const {
    UserModel
} = require("../models/user")


// CREATE_SESSION
/**
 * Create a session for Stripe
 * @param {String} req.headers.access_token
**/
router.post('/create_session', async function(req, res) {

    let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id mail stripe_id first_name last_name").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }

    //Check stripe customer
    if (user.stripe_id === '') {
        customer = await stripe.customers.create({
            email: user.mail,
            name: user.first_name + ' ' + user.last_name
        })
        .catch(error => {
            return res.status(500).send({ error_code: 2 })
        });
        let error = await UserModel.updateOne({ id: user.id }, {stripe_id: customer.id}).catch(error => error);
        if (error.errors) {
            return res.status(500).send({ error_code: 2 });
        }
    } else {
        customer = await stripe.customers.retrieve(user.stripe_id)
        .catch(error => {
            return res.status(500).send({ error_code: 2 })
        });
    }

    // create session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'sepa_debit'],

        line_items: [{
            price: "price_1JSl53H9C7g7Ir7890KpWvW8",
            quantity: 1,
        }],
        mode: 'subscription',
        customer: customer.id,
        success_url: 'https://strollin.vercel.app/SubscriptionSuccessPage',
        cancel_url: 'https://strollin.vercel.app/SubscriptionFailedPage',
    });
    if (session) {
        return res.status(200).send({ status: "Session created", url: session.url});
    }
    return res.status(400).send({ status: "Session failed"});
});


// GET_SUBSCRIPTION
/**
 * Collect and create Element to save card payment (Temporary, it has to be made in front)
 * 
 */
router.get('/get_subscription', async function(req, res) {

    console.log(req.headers.access_token)
    let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id subscription_id").catch(error => error);
    const sub = undefined;

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    if (user.subscription_id !== '') {
        sub = await stripe.subscriptions.retrieve(req.headers.sub)
    }
    let subscription = {
        current_period_start: new Date().toISOString(sub.current_period_start).replace(/T/, ' ').replace(/\..+/, ''),
        current_period_end: new Date().toISOString(sub.current_period_end).replace(/T/, ' ').replace(/\..+/, ''),
        cancel_at_period_end: sub.cancel_at_period_end
    }

    return res.status(200).send({ status: "Here is the subscription's information.", subscription });
});

// STOP_SUBSCRIPTION
/**
 * Stop the subscription of an user
 * @param {String} req.headers.access_token
 */
router.post('/stop_subscription', async function(req, res) {
    
    let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id subscription_id").catch(error => error);
    
    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    let sub = await stripe.subscriptions.update(user.subscription_id, {cancel_at_period_end: true})
    .catch(error => {
        return res.status(500).send({ error_code: 2 });
    });
    let subscription = {
        current_period_start: new Date().toISOString(sub.current_period_start).replace(/T/, ' ').replace(/\..+/, ''),
        current_period_end: new Date().toISOString(sub.current_period_end).replace(/T/, ' ').replace(/\..+/, ''),
        cancel_at_period_end: sub.cancel_at_period_end
    }
    return res.status(200).send({ status: "Subscription cancel has been taken into account.", subscription });
});


/**
 * WEBHOOK
 **/

router.post('/webhook', async function(req, res) {
    let event = req.body;

    switch (event.type) {
        case 'customer.subscription.deleted':
            set_partnership_off(event.data.object)
            break;
        case 'invoice.paid':
            set_partnership_on(event.data.object);
            break;
    default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.send();
});

async function set_partnership_on(event) {

    let user = await UserModel.findOne({ stripe_id: event.customer }, "-_id id stripe_id subscription_id partner").catch(error => error);

    if (!user) {
        console.log("User not found in set_partnership_on!");
        return;
    }
    if (user.reason) {
        console.log("Error in database in set_partnership_on!");
        return;
    }
    let error = await UserModel.updateOne({ id: user.id }, {subscription_id: event.subscription}).catch(error => error);
    if (error.errors) {
        console.log("Could not update user in set_partnership_on!");
        return;
    }
    return;
};

async function set_partnership_off(event) {

    let user = await UserModel.findOne({ stripe_id: event.customer }, "-_id id stripe_id subscription_id partner").catch(error => error);

    if (!user) {
        console.log("User not found in set_partnership_off!");
        return;
    }
    if (user.reason) {
        console.log("Error in database in set_partnership_off!");
        return;
    }
    let error = await UserModel.updateOne({ id: user.id }, {subscription_id: ''}).catch(error => error);
    if (error.errors) {
        console.log("Could not update user in set_partnership_off!");
        return;
    }
    return;
};


module.exports = router;