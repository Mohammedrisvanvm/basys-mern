import { transporter } from "./config.nodeMailer";

export const mailService = (email: string, password: string) => {
  const mailOptions = {
    from: 'risvanrishu0000@gmail.com',
    to: email,
    subject: "Your Account Information",
    html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">
            <div style="background-color: #f3f4f6; padding: 20px;">
                <h2 style="color: #333;">Hello,</h2>
                <p>Your account credentials for signing in:</p>
                <ul>
                <li><strong>Website:</strong>http://localhost:5173/login</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p>Please use these credentials to sign in to your account.</p>
                <p>Regards,</p>
                <p>Basys Application Team</p>
            </div>
        </div>
    `,
  };
  transporter.sendMail(mailOptions, (error: Error) => {
    if (error) {
      console.log("Failed to generate otp");
    } else {
      console.log("Email sent successfully");
    }
  });
};
