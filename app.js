const express = require('express');
const crypto = require('crypto');

const app = express();

// পেমেন্ট গেটওয়ে থেকে আসা র-বডি (raw body) রিসিভ করার জন্য express.raw ব্যবহার করা জরুরি, 
// যাতে HMAC সিগনেচার সঠিকভাবে ভেরিফাই করা যায়।
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// আপনার সিক্রেট কি (এটি পরিবেশ বা এনভায়রনমেন্ট ভেরিয়েবল থেকে নেওয়া নিরাপদ)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your_secret_key_here';

app.post('/webhook/payment', (req, res) => {
  try {
    const signature = req.headers['x-signature'] || req.headers['x-webhook-signature'];
    
    if (!signature) {
      return res.status(400).send({ error: 'No signature found' });
    }

    // HMAC SHA256 দিয়ে সিগনেচার জেনারেট করা
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const computedSignature = hmac.update(req.rawBody).digest('hex');

    // সিকিউরলি সিগনেচার তুলনা করা (Timing attack রোধ করতে crypto.timingSafeEqual ব্যবহার করা ভালো)
    const matches = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computedSignature)
    );

    if (!matches) {
      return res.status(401).send({ error: 'Invalid signature' });
    }

    // সফলভাবে ভেরিফিকেশন হওয়ার পর পে-লোড বা ডাটা প্রসেস করা
    const event = req.body;
    console.log('Verified Payment Event:', event);

    // পেমেন্ট স্ট্যাটাস চেক এবং ডেটাবেস আপডেট লজিক
    if (event.status === 'SUCCESS' || event.type === 'payment.success') {
      const { transactionId, amount, customerId } = event.data;
      
      // TODO: আপনার ডেটাবেস আপডেট করুন (যেমন: অর্ডার কনফার্ম করা)
      console.log(`Transaction ${transactionId} of amount ${amount} processed successfully.`);
    }

    // সফল রেসপন্স পাঠানো
    return res.status(200).send({ received: true });

  } catch (error) {
    console.error('Webhook Error:', error.message);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
