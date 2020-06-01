const router = require('express').Router();
let Orders = require('../models/orders.model');
const auth = require('../middleware/auth');
const multer = require('multer');

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {createInvoice} = require("../module/Invoice/createInvoice");

async function sendPaidEmail(email, invoiceInfo, buyerInfo) {
    const mailOptions = {
        from: 'info@imaginesignage.com',
        to: email,
        attachments : [
            {
                filename : invoiceInfo.fileName,
                path : invoiceInfo.filePath,
                contentType : 'application/pdf'
            }
        ],
        subject: "Thank you for paid!",
    };

    const fileLocation = path.join( __dirname, 'emails', 'paid.html' );

        let html = await fs.readFile( fileLocation, 'utf-8' );

        html = html.replace( '[(firstName)]', buyerInfo.firstName );
        html = html.replace( '[(lastName)]', buyerInfo.lastName );

        mailOptions.html = html;
        sgMail
        .send(mailOptions)
        .then(() => {
            console.log("Nice");
        }, error => {
            console.error(error);
            if (error.response) {
            console.error(error.response.body)
            }
        });
}

router.route('/').get((req, res) => {
    Orders.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const {buyerInfo, cartData, orderDetail} = req.body;
    console.log(req.body);

    console.log('received buyerInfo');
    console.log(buyerInfo);
    Orders.countDocuments({}, function(err, c){
        console.log("count",c);
    });
    Orders.find().sort({"invoice.number" : -1}).limit(1).then(max => {
        let invoiceNumber = 0;
        if (max[0]){
            invoiceNumber = max[0].invoice.number + 1;
        }

        let realInvoiceNum = "";
        if (invoiceNumber < 10) {
            realInvoiceNum = "000" + invoiceNumber;
        }
        else if (invoiceNumber < 100) {
            realInvoiceNum = "00" + invoiceNumber;
        }
        else if (invoiceNumber < 1000) {
            realInvoiceNum = "0" + invoiceNumber;
        }
        else {
            realInvoiceNum = "" + invoiceNumber;
        }
        const invoice = {
            buyerInfo : {
                firstName : buyerInfo.firstName,
                lastName : buyerInfo.lastName,
                company: buyerInfo.company,
                address : buyerInfo.address,
                country : buyerInfo.country,
                townCity: buyerInfo.city,
                stateCounty: buyerInfo.state,
                postCode : buyerInfo.zip,
                email : buyerInfo.email,
                phone : buyerInfo.phone,
            },

            items : cartData,

            subTotal : orderDetail.subTotal,
            tax : orderDetail.tax,
            shipping : orderDetail.shipping,
            total : orderDetail.total,
            invoice_num : realInvoiceNum
        };

        const invoiceInfo = createInvoice(invoice, "invoice_" + Date.now());

        const newItem = new Orders({
            total : orderDetail.total,
            subTotal : orderDetail.subTotal,
            shipping: orderDetail.shipping,
            tax : orderDetail.tax,
            payment : orderDetail.payment,

            cartData : cartData,
            buyerInfo : {
                firstName : buyerInfo.firstName,
                lastName : buyerInfo.lastName,
                company: buyerInfo.company,
                address : buyerInfo.address,
                country : buyerInfo.country,
                townCity: buyerInfo.city,
                stateCounty: buyerInfo.state,
                postCode : buyerInfo.zip,
                email : buyerInfo.email,
                phone : buyerInfo.phone,
            },
            invoice : {
                number : invoiceNumber,
                fileName : invoice.fileName ? invoice.fileName : '',
                filePath : invoice.filePath ? invoice.filePath : ''
            }
        });

        newItem.save().then(item => {
            // create invoice

            sendPaidEmail(buyerInfo.email, invoiceInfo, buyerInfo);
            res.json(item)
        });
    });

});

router.route('/change').post((req, res) => {

    const {setValue, id} = req.body;

    let newOrders = {
        'status' : setValue === true ? 'Close order' : 'Process order'
    };
    Orders.findByIdAndUpdate(id, {$set: newOrders}, {useFindAndModify: false}, function (err, response) {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
});

router.route('/delete_orders_row').post((req, res) => {

    const deleteIds = req.body;

    Orders.deleteMany({ _id: deleteIds }, function (err, response) {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }

        if (err) return handleError(err);
        // deleted at most one tank document
    });
});


module.exports = router;