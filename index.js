const express = require('express');
const app = express();
const cron = require('node-cron');
const mailer = require('nodemailer');

// Schedule a task to run every minute.
cron.schedule('* * * * *', () => {console.log("Task is running every minute")});

// Scheduling the email task
cron.schedule('0 0 * * sunday', sendEmail("Hey there, this email was sent to you automatically"));

//function that sends email
function sendEmail(message){
    // Creating a transporter
    const transporter = mailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'your-username',
            pass: 'your-password'
        }
    });
    //sending the email
    transporter.sendMail({
        from: '"Peter" <peter@kayere.com>',
        to: '"You there" <you@there.com>',
        subject: 'Scheduled Email',
        text: message
    })
        .then(_ => {console.log("Email has been sent")})
        .catch(error => {console.log(error)});
}

app.listen(2400, () => {console.log("Server started at port 2400")});