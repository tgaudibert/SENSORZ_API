require('dotenv').config({
  path: `../../../env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



function sendResetPassMail(to,code){
  const msg = {
    to: to,
    from: process.env.SENDGRID_SENDER,
    subject: 'Your reset password code',
    text: code,
    html: '<strong>'+code+'</strong>',
  };
  const isSendneeded = process.env.VERIFICATION_CODE || sgMail.send(msg);
}


function sendRegisterMail(to,code){
  const msg = {
    to: to,
    from: process.env.SENDGRID_SENDER,
    subject: 'Welcome! Your register code',
    text: code,
    html: '<strong>'+code+'</strong>',
  };
  const isSendneeded = process.env.VERIFICATION_CODE || sgMail.send(msg);
}


function sendInvitationMail(to,code){
  const msg = {
    to: to,
    from: process.env.SENDGRID_SENDER,
    subject: 'Your received an invitation code',
    text: code,
    html: '<strong>'+code+'</strong>',
  };
  const isSendneeded = process.env.VERIFICATION_CODE || sgMail.send(msg);
}

module.exports = {
  sendResetPassMail,
  sendRegisterMail,
  sendInvitationMail
}
