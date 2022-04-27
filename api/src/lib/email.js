import * as nodemailer from 'nodemailer'

export const sendEmail = async ({ to, subject, text, html }) => {
  console.log('Sending email to:', to)

  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Superstore" <${process.env.EMAIL}>`,
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  return info
}
