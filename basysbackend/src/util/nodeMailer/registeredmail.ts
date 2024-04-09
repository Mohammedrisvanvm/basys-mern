import { transporter } from "./config.nodeMailer";

export const RegmailService = (email: string) => {
  const mailOptions = {
    from: "risvanrishu0000@gmail.com",
    to: email,
    subject: "Your Account Information",
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">
    <div style="background-color: #f3f4f6; padding: 20px;">
        <h2 style="color: #333; margin-bottom: 10px;">Hello,</h2>
        <p>We are pleased to inform you that your account has been successfully registered with us.</p>
        <p>You can now sign in to your account using the provided website link.</p>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
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
