document.addEventListener("DOMContentLoaded", function () {
  loadHomeEvents();
});

function loadHomeEvents() {
  const apiUrl =
    "https://crxqbes1jj.execute-api.ap-southeast-2.amazonaws.com/test/AllEvents";

  axios.get(apiUrl).then(function (response) {
    const events = response.data;
    const eventContainer = document.getElementById("upcoming-event-container");
    const randomEvents = getRandomEvents(events, 4);

    randomEvents.forEach((event, index) => {
      const eventElement = createEventElement(event, index);
      eventContainer.appendChild(eventElement);
    });
  });
}

function getRandomEvents(events, count) {
  const shuffled = events.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function createEventElement(event, index) {
  const maxLength = 100;
  const description =
    event.description.length > maxLength
      ? event.description.substring(0, maxLength) + "..."
      : event.description;

  const eventElement = document.createElement("div");
  eventElement.classList.add("example-2", "card");

  eventElement.innerHTML = `
    <div class="wrapper" style="background: url(${event.image_url}) center/cover no-repeat">
      <div class="head">
        <div class="date">
          <span>${event.start_date}</span>
        </div>
        <ul class="menu-content">
          <li>
            <a href="#" class="fa fa-bookmark-o"></a>
          </li>
          <li>
            <a href="#" class="fa fa-heart-o" id="heart"><span>${event.description.length}</span></a>
          </li>
          <li>
            <a href="#" class="fa fa-comment-o"><span>${event.address.length}</span></a>
          </li>
        </ul>
      </div>
      <div class="data">
        <div class="Econtent">
          <span class="author">${event.organiser_name}</span>
          <h1 class="title">
            <a href="#">${event.event_name}</a>
          </h1>
          <p class="text1">
            ${description}
          </p>
          <a href="events.html" class="Ebutton">Read more</a>
        </div>
      </div>
    </div>
  `;

  return eventElement;
}
