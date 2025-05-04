export const sendNotificationEmail = async (email, subject, message) => {
  try {
    const response = await fetch('http://localhost:3000/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, subject, message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};
