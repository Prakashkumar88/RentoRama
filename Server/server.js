import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectdb.js'
import passport from 'passport';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import transporter from './config/emailConfig.js';
import './config/passport-jwt-strategy.js'

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// This will solve CORS Policy Error
const corsOptions = {
  // set origin to a specific origin.
  origin: process.env.FRONTEND_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))

// Database Connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

//Cloudinary
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Passport Middleware
app.use(passport.initialize());

// Cookie Parser
app.use(cookieParser())

// Load Routes
app.use("/api/user", userRoutes)
app.use("/api/posts", postRoutes)
app.post("/api/email/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Subscribed to Rentorama",
      html: `<p>Welcome to our RentoRama!</p>
      <p>You're now part of our community and will receive updates on our latest <span >products/services/news</span> straight to your inbox.</p>
      <p>Stay tuned for exclusive promotions, new releases, and behind-the-scenes insights.</p>
      <p>Best regards,</p>
      <p><strong>Rentorama</strong></p>`
    });

    res.status(201).json({ status: "success", message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to send email" });
  }
});
app.post("/api/reviews", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Thank You for Your Review!",
      html: `
      <p>Dear ${name},</p>
      <p>Thank you for taking the time to leave a review. We value your feedback and are thrilled to have you as part of our community.</p>
      <p>Your insights help us improve our services and provide a better experience for everyone.</p>
      <p>If you have any further comments or suggestions, please do not hesitate to get in touch.</p>
      <p>Best regards,</p>
      <p><strong>Rentorama Team</strong></p>
      `
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: `Review! from ${name}`,
      html: `
        
        <p>Dear ${name},</p>
        <p>has send the message</p>
        <p>${message}</p>
      `
    });

    res.status(201).json({ status: "success", message: "Review submission successful and email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "failed", message: "Unable to send email" });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})