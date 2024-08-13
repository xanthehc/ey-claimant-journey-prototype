//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here

  function calculateDate() {
    // Get the value from the form field
    const startDateString = document.getElementById('startDate').value;

    // Parse the start date string to extract day, month, and year
    const [day, month, year] = startDateString.split('/');

    // Create a Date object from the extracted components (months are 0-indexed in JavaScript)
    const startDate = new Date(year, month - 1, day); // month - 1 because months are 0-indexed

    // Calculate the date 24 weeks later
    const twentyFourWeeksEarlier = new Date(startDate);
    twentyFourWeeksEarlier.setDate(twentyFourWeeksEarlier.getDate() + (24 * 7)); // Adding 24 weeks (24 * 7 days)

    // Format the calculated date as desired
    const formattedDate = twentyFourWeeksEarlier.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // Output the formatted date (you can display it wherever you need)
    console.log("24 weeks later from", startDateString, "is", formattedDate);
}


})