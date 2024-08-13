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



router.post('/test', function(request, response) {
  // Assuming session data is set properly with declaration-B
  var declarationB = request.session.data['declarationB'];

  if (declarationB === "yes") {
      response.redirect("/returner-1");
  } else {
      response.redirect("/ineligible");
  }
});

// Route to handle form submission from /child-facing-A
router.post('/child-facing-A', function(request, response) {
  // Always redirect to /returner-1
  response.redirect("/returner-1");
});

// Route to handle form submission from /returner-1
router.post('/returner-1', function(request, response) {
  // Get the value of the radio buttons
  var returnerOne = request.body.returnerOne;

  // Redirect based on the radio button value
  if (returnerOne === "no") {
      response.redirect("/employee-email");
  } else {
      response.redirect("/returner-2");
  }
});


router.post('/returner-2', function(request, response) {
  // Assuming session data is set properly with returnerOne
  var returnerTwo = request.session.data['returnerTwo'];

  if (returnerTwo === "yes") {
      // Generate a random number (0 or 1)
      var randomRoute = Math.random() < 0.5 ? "/returner-4A" : "/returner-4B";
      response.redirect(randomRoute);
  } 
  else {
      response.redirect("/employee-email");
  }
});


router.post('/returner-4A', function(request, response) {
  // Assuming session data is set properly with returnerOne
  var returnerThree = request.session.data['returnerThree'];

  if (returnerThree === "no") {
      response.redirect("/ineligible");
  }
  else {
      response.redirect("/employee-email");
  }
});

router.post('/returner-4B', function(request, response) {
  var returnerFour = request.body.returnerFour;

  if (returnerFour === "permanent") {
      response.redirect("/ineligible");
  } else {
      response.redirect("/employee-email");
  }
});



module.exports = router;  // Export the router at the end of the file
