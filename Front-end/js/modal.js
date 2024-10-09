document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("attractionModal");

  const closeBtn = modal.querySelector(".close");

  document.querySelectorAll("[data-attraction-id]").forEach((element) => {
    element.addEventListener("click", function () {
      const attractionId = this.getAttribute("data-attraction-id");
      openAttractionModal(attractionId);
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});

function openAttractionModal(attractionId) {
  const apiUrl = `https://nfrery0wo9.execute-api.ap-southeast-2.amazonaws.com/dev/ToursInfo/${attractionId}`;
  const modal = document.getElementById("attractionModal");
  modal.setAttribute("data-attraction-id", attractionId);
  axios
    .get(apiUrl)
    .then(function (response) {
      const attractionData = response.data;
      updateModalContent(attractionData);

      document.getElementById("attractionModal").style.display = "block";
    })
    .catch(function (error) {
      console.error("Error:", error);
      modalBody.innerHTML =
        "<p>There was an error fetching the attraction details. Please try again later.</p>";
    });
}

function updateModalContent(data) {
  const modalBody = document.getElementById("attractionModalBody");

  const dateOptions = data
    .map(
      (tour) => `<option value="${tour.StartDate}">${tour.StartDate}</option>`
    )
    .join("");

  modalBody.innerHTML = `
    <h2 id="attractionModalLabel">Attraction Details</h2>
    <p><strong>Attraction Name:</strong> ${data[0].TourName}</p>
    <p><strong>Location:</strong> ${data[0].Location.replace(/"/g, "")}</p>
    <p><strong>Description:</strong> ${data[0].Description}</p>
    <p><strong>Price from:</strong> $${data[0].Price} Per Person</p>
    <p>
      <strong>Select Date:</strong>
      <select id="tourDate">
        ${dateOptions}
      </select>
    </p>
    <p><strong>Available:</strong> <span id="availableSeats">${
      data[0].AvailableSeats
    }</span></p>
    <div class="userInput">
    <p><strong>Full Name:</strong> <input type="text" id="fullName" required /></p>
    <p><strong>Email:</strong> <input type="email" id="email" required /></p>
    <p><strong>Phone Number:</strong> <input type="tel" id="phoneNumber" required /></p>
    <p>
    <span>
      <strong>People:</strong>
      <input type="number" id="seatsBooked" min="1" max="10" value="1" required />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span class="totalPrice">
      <strong>Total Price:</strong> <span id="totalPrice">${
        data[0].Price
      }</span></span>
    </p>
    </div>
    <button id="bookButton">Book</button>
  `;

  function calculateTotalPrice() {
    const price = parseFloat(data[0].Price);
    const seatsBooked = parseInt(document.getElementById("seatsBooked").value);
    const totalPrice = price * seatsBooked;
    document.getElementById("totalPrice").textContent = totalPrice;
  }

  document.getElementById("tourDate").addEventListener("change", function () {
    const selectedDate = this.value;
    const selectedTour = data.find((tour) => tour.StartDate === selectedDate);
    document.getElementById("availableSeats").textContent =
      selectedTour.AvailableSeats;
  });

  document
    .getElementById("seatsBooked")
    .addEventListener("input", calculateTotalPrice);

  document.getElementById("bookButton").addEventListener("click", function () {
    const attractionId = document
      .querySelector("#attractionModal")
      .getAttribute("data-attraction-id");
    console.log("Booking attractionId:", attractionId);
    const customerName = document.getElementById("fullName").value;
    const customerEmail = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const seatsBooked = parseInt(document.getElementById("seatsBooked").value);
    const startDate = document.getElementById("tourDate").value;

    processBooking(
      attractionId,
      customerName,
      customerEmail,
      phoneNumber,
      seatsBooked,
      startDate
    );
  });
}
