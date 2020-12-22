const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'prasannsitani000@gmail.com',
        subject: 'Thank for joining in.',
        text: `Welcome to our app, ${name}. Let me know how you get along with our app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email, 
        from: 'prasannsitani000@gmail.com',
        subject: 'Cancellation Email',
        text: `Hi ${name}, Please let us know, Why do you end up our services.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}
