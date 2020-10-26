const nodemailer = require('nodemailer');

const mailstyles = {
  container: 'background-color: #fd5c63; border: 2px solid #333; display: flex; flex-direction: column; align-items: center',
  image: 'width: 500px; height: 500px',
}

module.exports = {
  transporter: nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  }),
  welcome(name) {
    return {
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Demystifying Email Design</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
      <tr>
      <td>
      <tr>
      <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#fd5c63">
      </td>
      </tr>
      <tr>
      <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#fd5c63">
      Help Me Out!
      </td>
      </tr>
      </td>
      </tr>
      <tr>
      <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#fd5c63">
      Welcome to Help Me Out!, ${name}.<br/>Make your fisrt post and start your journey out of the closet!
      </td>
      </tr>
      <tr>
      <td align="center" style="padding: 40px 0 30px 0" bgcolor="#fd5c63">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR5Z9ffPQb4M6UWBDN1__vrUeSCXxRNlmQ-rA&usqp=CAU" width="400"/>
      </td>
      </tr>
      </table>
      </body>
      </html>
      `
    }
  },
  async verify(transporter) {
    try {
      const isConnected = await transporter.verify();
      console.log('Servidor listo para recibir mensajes', isConnected);
    }
    catch (error) { console.log('error') };

  }
}
