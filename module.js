//This is the Mail templete for sending automatic generated Order Placemment Mail

//module1 is for sending email for Order Placement Templete
var module1 = function module1(){

    const nodemailer = require('nodemailer')
    transporter = nodemailer.createTransport({
        host: 'mail.jorudantaiga.com',
        port: 465,
        secure: true,
        auth: {
            user: 'salauddin@jorudantaiga.com',
            pass: 'salauddin1234',  // this will be hidden later :)
        },
    }),

    EmailTemplate = require('email-templates').EmailTemplate
    path = require('path'),
    Promise = require('bluebird');
    
    let z = require('./app.js');//accessing user data
    let users = [
        {
        name: z.u.name,
        email: z.u.email,
        },
    ];

    function sendEmail (obj) {
        return transporter.sendMail(obj);
    }

    function loadTemplate (templateName, contexts) {
        let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
        return Promise.all(contexts.map((context) => {
            return new Promise((resolve, reject) => {
                template.render(context, (err, result) => {
                    if (err) reject(err);
                    else resolve({
                        email: result,
                        context,
                    });
                });
            });
        }));
    }

    loadTemplate('email templates', users).then((results) => {
        return Promise.all(results.map((result) => {
            sendEmail({
                to: result.context.email,
                from: 'Japan Transit Planner<salauddin@jorudantaiga.com>',
                subject: 'Thanks ' + z.u.name +', for Register with us!',
                html: result.email.html,
                //text: result.email.text,
            });
        }));
    }).then(() => {
        console.log('Email sent!');
    });
};

module.exports.module1 = module1;
