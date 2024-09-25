function processBooking(
  attractionId,
  customerName,
  customerEmail,
  phoneNumber,
  seatsBooked,
  startDate
) {
  const bookingData = {
    AttractionID: attractionId,
    customerID: customerEmail,
    customerName: customerName,
    PhoneNumber: phoneNumber,
    SeatsBooked: seatsBooked,
    StartDate: startDate,
  };

  const apiUrl =
    "https://bta5e4k52i.execute-api.ap-southeast-2.amazonaws.com/dev/TourBookingInfo";

  axios
    .post(apiUrl, bookingData)
    .then(function (response) {
      console.log("Booking successful:", response.data);
      const bookingInfo = `
      <h2 id="attractionModalLabel">Order Details</h2>
      <p><strong>Order ID:</strong> <span id="confirmOrderId">${
        response.data.OrderID
      }</span></p>
      <p><strong>Booking Time:</strong> ${response.data.BookingTime}</p>
      <p><strong>Customer ID:</strong> ${response.data.customerID}</p>
      <p><strong>Customer Name:</strong> ${response.data.customerName}</p>
      <p><strong>Phone Number:</strong> ${response.data.PhoneNumber}</p>
      <p><strong>Seats Booked:</strong> ${response.data.SeatsBooked}</p>
      <p><strong>Start Date:</strong> ${response.data.StartDate}</p>
      <p><strong>Total Price:</strong> <span id="confirmAmount">${response.data.TotalPrice.toFixed(
        2
      )}</span></p>
      <button id="confirmButton">Confirm</button>
    `;
      document.getElementById("attractionModalBody").innerHTML = bookingInfo;
    })
    .catch(function (error) {
      console.error("Error during booking:", error);
      alert("There was an error processing your booking. Please try again.");
    });
}

function processConfirm(orderID, amount) {
  const confirmApiUrl =
    "https://9o8pe0ys4g.execute-api.ap-southeast-2.amazonaws.com/test/simulatePayment";
  const orderInfo = {
    OrderID: orderID,
    Amount: amount,
  };
  axios
    .post(confirmApiUrl, orderInfo)
    .then(function (response) {
      console.log("Booking confirmed:", response.data);
      alert(`Booking confirmed! Order ID: ${response.data.OrderID}`);

      document.getElementById("attractionModalBody").innerHTML = `
        <h1>${response.data.message}</h1>
        <p><strong>Order ID:</strong> ${response.data.OrderID}</p>
      `;
    })
    .catch(function (error) {
      console.error("Error during confirmation:", error);
      alert("There was an error confirming your booking. Please try again.");
    });
}

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "confirmButton") {
    const orderID = document.getElementById("confirmOrderId").textContent;
    const amount = parseFloat(
      document.getElementById("confirmAmount").textContent
    );
    processConfirm(orderID, amount);
  }
});
