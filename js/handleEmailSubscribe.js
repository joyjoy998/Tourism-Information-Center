function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Handle form submission
document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting the traditional way

  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value;

  // Validate email format
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // If email is valid, send data using Axios
  axios
    .post(
      "https://pjqgijjkvi.execute-api.ap-southeast-2.amazonaws.com/test/postSubscribers",
      {
        email: email,
      }
    )
    .then(function (response) {
      alert("Subscription successful!");
      document.getElementById("emailInput").value = "";
      console.log(response);
    })
    .catch(function (error) {
      alert("Subscription failed. Please try again.");
      document.getElementById("emailInput").value = "";
      console.log(error);
    });
});
