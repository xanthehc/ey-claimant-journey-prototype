// Load environment variables from .env file
require('dotenv').config();
const NotifyClient = require('notifications-node-client').NotifyClient;

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.post('/email-address-page', (req, res) => {
	const notify = new NotifyClient(process.env.NOTIFYAPIKEY);
	notify.sendEmail(
		'f6d30fef-01b2-4839-a32d-3912b6949027',
		req.body.emailAddress
	)

	res.redirect('/confirmation-page');
})

router.post('/email-address', (req, res) => {
	const notify = new NotifyClient(process.env.NOTIFYAPIKEY);
	notify.sendEmail(
		'f6d30fef-01b2-4839-a32d-3912b6949027',
		req.body.emailAddress
	)

	res.redirect('/email-otp');
})

router.post('/handle-confirm', function(req, res) {
  if (req.body.action === 'confirm') {
      res.redirect('/mobile-number');
  } else if (req.body.action === 'change_email') {
      res.redirect('/email-address');
  } else {
      res.redirect('/'); // Default route or error handling
  }
});

// Handle form submission
router.post('/mobile-number', function (req, res) {
  // Get the value of the selected radio button
  const mobileNumber = req.body.mobileNumber; // Use req.body to get form data

  // Check the value and redirect accordingly
  if (mobileNumber === 'yes') {
    res.redirect('/mobile-number-input');
  } else {
    res.redirect('/bank-account-select');
  }
});

const notify = new NotifyClient(process.env.NOTIFYAPIKEY);

router.post('/mobile-number-input', (req, res) => {
  const mobileNumber = req.body.mobileInput;

  if (!mobileNumber) {
    // Handle case where mobile number is missing
    return res.status(400).send('Mobile number is required.');
  }

  // Send the SMS via Notify
  notify.sendSms(
    '45e73a8a-0ee1-4f3d-a8e8-59bd4d0a76a2', // Replace with your template ID
    mobileNumber,
    {
      personalisation: {
        // Add any personalisation if needed
      }
    }
  )
  .then(() => {
    // Redirect to the confirmation page after SMS is sent
    res.redirect('/mobile-number-otp');
  })
  .catch((err) => {
    console.error('Error sending SMS:', err);
    // Handle error, e.g., redirect to an error page or show an error message
    res.status(500).send('Failed to send SMS. Please try again later.');
  });
});

router.post('/handle-redirect', function(req, res) {
  if (req.body.action === 'confirm') {
      res.redirect('/bank-account-select');
  } else if (req.body.action === 'change_mobile') {
      res.redirect('/mobile-number-input');
  } else {
      res.redirect('/'); // Default route or error handling
  }
});




module.exports = router;  // Export the router at the end of the file
