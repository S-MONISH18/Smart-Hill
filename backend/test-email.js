
import { sendRentalConfirmationEmail } from './utils/emailService.js';
import dotenv from 'dotenv';
dotenv.config();

const testEmail = async () => {
    try {
        console.log('Sending test email...');
        await sendRentalConfirmationEmail({
            ownerEmail: process.env.EMAIL_USER, // Send to self for testing owner email
            ownerName: 'Test Owner',
            renterName: 'Test Renter',
            renterEmail: process.env.EMAIL_USER, // Send to self for testing renter email
            model: 'Test Tractor',
            tractorNumber: 'TN-01-1234',
            startDate: '2023-10-27',
            rentalType: 'daily',
            duration: 2,
            totalCost: 5000,
            ownerPhone: '1234567890'
        });
        console.log('Test email sent successfully!');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
};

testEmail();
