module.exports = function makeSendMail({ nodemailer }) {
    return async function sendMail() {

      try {
        // Create a nodemailer transporter with your email server configuration
        const transporter = nodemailer.createTransport({
          service: 'gmail',  
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'kavishprajapati18700@gmail.com',
            pass: 'giswrkwiqrsmfcvb'
          }
        });
        
        // Set up the email message
        const mailOptions = {
          from: 'kavishprajapati18700@gmail.com',
          to: 'akshatvsitapara@gmail.com',
          subject: 'You are logged in to Apple Network',
          text: 'Dear User, you are now logged in to the Apple Network.'
        };
  
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
      } catch (err) {
        throw err;
      }
    };
  };