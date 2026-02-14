import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


/**
 * Tractor owner registration email
 */
const sendRegistrationEmail = async ({
  ownerName,
  email,
  model,
  tractorNumber,
  horsepower,
  fuelType,
}) => {
  await transporter.sendMail({
    from: `"Green Field Hub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🚜 Tractor Registration Successful",
    html: `
      <h2>Tractor Registered Successfully</h2>
      <p>Hello <b>${ownerName}</b>,</p>
      <ul>
        <li><b>Model:</b> ${model}</li>
        <li><b>Number:</b> ${tractorNumber}</li>
        <li><b>Horsepower:</b> ${horsepower} HP</li>
        <li><b>Fuel:</b> ${fuelType}</li>
      </ul>
    `,
  });
};

/**
 * Rental confirmation → ONLY TO TRACTOR OWNER
 */

const sendRentalConfirmationEmail = async ({
  ownerEmail,
  ownerName,
  renterName,
  renterEmail,
  model,
  tractorNumber,
  startDate,
  rentalType,
  duration,
  totalCost,
  ownerPhone,
}) => {
  // Email to Owner
  const ownerMailOptions = {
    from: `"Green Field Hub" <${process.env.EMAIL_USER}>`,
    to: ownerEmail,
    subject: "📢 Your Tractor Has Been Booked!",
    html: `
      <h2>New Tractor Rental</h2>
      <p>Hello <b>${ownerName}</b>,</p>
      <p>Your tractor has been booked.</p>
      <p><b>Farmer Details:</b></p>
      <ul>
        <li>Name: ${renterName}</li>
        <li>Email: ${renterEmail}</li>
      </ul>
      <p><b>Rental Details:</b></p>
      <ul>
        <li>Tractor: ${model} (${tractorNumber})</li>
        <li>Start Date: ${startDate}</li>
        <li>Duration: ${duration} ${rentalType === 'hourly' ? 'hour(s)' : 'day(s)'}</li>
        <li>Total Earnings: ₹${totalCost}</li>
      </ul>
    `,
  };

  // Email to Renter
  const renterMailOptions = {
    from: `"Green Field Hub" <${process.env.EMAIL_USER}>`,
    to: renterEmail,
    subject: "✅ Rental Confirmed: " + model,
    html: `
      <h2>Rental Confirmed!</h2>
      <p>Hello <b>${renterName}</b>,</p>
      <p>Your rental request has been confirmed.</p>
      <p><b>Tractor Details:</b></p>
      <ul>
        <li>Model: ${model}</li>
        <li>Number: ${tractorNumber}</li>
        <li>Owner: ${ownerName}</li>
        <li>Contact: ${ownerPhone}</li>
      </ul>
      <p><b>Booking Details:</b></p>
      <ul>
        <li>Start Date: ${startDate}</li>
        <li>Duration: ${duration} ${rentalType === 'hourly' ? 'hour(s)' : 'day(s)'}</li>
        <li>Total Cost: ₹${totalCost}</li>
      </ul>
      <p>Please contact the owner to arrange pickup/delivery.</p>
    `,
  };

  await Promise.all([
    transporter.sendMail(ownerMailOptions),
    transporter.sendMail(renterMailOptions)
  ]);
};

export { sendRegistrationEmail, sendRentalConfirmationEmail };
