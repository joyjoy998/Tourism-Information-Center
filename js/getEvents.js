document.addEventListener("DOMContentLoaded", function () {
  loadEvents();
});

function loadEvents() {
  const apiUrl =
    "https://crxqbes1jj.execute-api.ap-southeast-2.amazonaws.com/test/AllEvents";

  axios
    .get(apiUrl)
    .then(function (response) {
      const events = response.data;
      const eventContainer = document.getElementById("event-container");

      eventContainer.innerHTML = "";

      events.forEach((event, index) => {
        const eventElement = createEventElement(event, index);
        eventContainer.appendChild(eventElement);
      });
    })
    .catch(function (error) {
      console.error("Some error occurred:", error);
    });
}

function createEventElement(event, index) {
  const eventElement = document.createElement("div");
  const isEven = index % 2 === 0;

  eventElement.innerHTML = `
    <div class="post container row pt-5 pb-5 d-flex align-items-center justify-content-center" id="${
      event.event_id
    }">
      ${
        isEven
          ? `
        <div class="col col-lg-6 col-md-12">
          <h5><a href=${event.organiser_website}>${event.event_name}</a></h5>
          <h3>${event.state}</h3>
          <h4>Start Date: ${event.start_date}</h4>
          <p>${event.description}</p>
          
        </div>
        <div class="col img-container">
          <img src="${event.image_url}" alt="${event.event_name}" />
        </div>
      `
          : `
        <div class="col img-container">
          <img src="${event.image_url}" alt="${event.event_name}" />
        </div>
        <div class="col col-lg-6 col-md-12">
          <h5><a href=${event.organiser_website}>${event.event_name}</a></h5>
          <h3>${event.state}</h3>
          <h4>Start Date: ${event.start_date}</h4>
          <p>${event.description}</p>
          
        </div>
      `
      }
    </div>
  `;

  return eventElement;
}
