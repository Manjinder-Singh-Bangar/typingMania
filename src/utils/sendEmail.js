import nodemailer from "nodemailer"

// Send verification email
const sendEmail = async (email, token)=>{
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
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: http://localhost:4000/verify/${token}`,
        html: `Please verify your email by clicking the following link: <a href="http://localhost:4000/verify/${token}">Verify Email</a>`
    };
    
    await transporter.sendMail(mailOptions);
}



export {sendEmail}