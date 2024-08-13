const { NotifyClient } = require("notifications-node-client");

const apiKey = ''; // replace with your actual API key
const templateId = 'f6d30fef-01b2-4839-a32d-3912b6949027';
const notifyClient = new NotifyClient(apiKey);

notifyClient.sendEmail(templateId, "xanthe.hughes-campbell@education.gov.uk")
  .then(response => {
    console.log("Email sent successfully:", response);
  })
  .catch(error => {
    console.error("Error sending email:", error);
  });
