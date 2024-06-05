import nodemailer from "nodemailer"

// Send verification email
const sendEmail = async (email, token, subject, text, html)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `typingmaniaa@gmail.com`,
            pass: `jshf vcrf nqdd fzmd`
        }
    });

    const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: email,
        subject: subject,
        text: text,
        html: html
    };
    
    await transporter.sendMail(mailOptions);
}



export {sendEmail}