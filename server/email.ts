import nodemailer from 'nodemailer';

interface EmailParams {
  to: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Create a reusable transporter object using Ethereal (for testing)
let transporter: nodemailer.Transporter;

// Initialize transporter (async)
async function createTransporter() {
  try {
    // Create test SMTP service account (ethereal.email)
    // Only needed for development/testing without exposing real credentials
    // Uses Ethereal, a fake SMTP service, to create a test account
    const testAccount = await nodemailer.createTestAccount();
    
    // Create the transporter with the test account
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
    console.log("Created test email account:", testAccount.user);
    return transporter;
  } catch (error) {
    console.error("Failed to create test email account:", error);
    // Fallback to a basic transporter that logs but doesn't actually send
    return nodemailer.createTransport({
      jsonTransport: true
    });
  }
}

// Initialize the transporter immediately
createTransporter();

/**
 * Sends an email notification about a new contact form submission.
 * Also logs the email content to the console.
 */
export async function sendContactEmail(params: EmailParams): Promise<boolean> {
  try {
    const { to, name, email, phone, subject, message } = params;
    
    // Create formatted message for logging
    const formattedMessage = `
    ====== CONTACT FORM SUBMISSION ======
    To: ${to}
    From: ${name} (${email})
    Phone: ${phone || 'Not provided'}
    Subject: ${subject}
    
    Message:
    ${message}
    ===============================
    `;
    
    // Log the message content for monitoring
    console.log(formattedMessage);
    
    // Set up email options
    const mailOptions = {
      from: `"No Strings Attached Contact Form" <nostrings.cafe@gmail.com>`,
      to: to,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Subject: ${subject}
      
      Message:
      ${message}
      `,
      html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>This email was sent from the No Strings Attached website contact form.</small></p>
      `
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return true;
  } catch (error) {
    console.error('Nodemailer error:', error);
    return false;
  }
}