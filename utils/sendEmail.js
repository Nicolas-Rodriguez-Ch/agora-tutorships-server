
const sgMail = require('@sendgrid/mail')
require('dotenv').config({path: '../.env'})

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = ({user, template, template_data}) => {
  const msg = {
    to: user.email,
    from: 'nicolasrodriguezch@hotmail.com',
    template_id: template,
    dynamic_template_data:template_data
  }
  sgMail.send(msg)
}

// const user = {
//   name: "Esteban",
//   email: "leramirezca@gmail.com"
// }
// sendEmail({
//   user: user,
//   template: 'd-0bc86a7e18464b9191cb127be79f094c',
//   template_data: {"name": user.name}
// })

module.exports = sendEmail