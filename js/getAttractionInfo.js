document.addEventListener("DOMContentLoaded", function () {
  loadAttractions();
});

function loadAttractions() {
  const apiUrl =
    "https://maroc4qyae.execute-api.ap-southeast-2.amazonaws.com/prod/allAttraction";

  axios
    .get(apiUrl)
    .then(function (response) {
      const attractions = response.data;
      const attractionContainer = document.getElementById(
        "attraction-container"
      );

      attractionContainer.innerHTML = "";

      attractions.forEach((attraction, index) => {
        const attractionElement = createAttractionElement(attraction, index);
        attractionContainer.appendChild(attractionElement);
      });
    })
    .catch(function (error) {
      console.error("Some error occurred:", error);
    });
}

function createAttractionElement(attraction, index) {
  const attractionElement = document.createElement("div");
  const isEven = index % 2 === 0;

  attractionElement.innerHTML = `
    <div class="container text-center post" id="${attraction.AttractionID}">
      <div class="row">
        ${
          isEven
            ? `
          <div class="col img-container">
            <img src="${attraction.Image}" alt="${attraction.Name}">
          </div>
          <div class="col">
            <h5>${attraction.Name}</h5>
            <h3>${attraction.State}</h3>
            <p>${attraction.Detail}</p>
            <br/>
            <i class="description">${attraction.Description}</i>
            <button class="btn btn-primary open-modal" data-attraction-id="${attraction.AttractionID}">Book Now</button>
          </div>
        `
            : `
          <div class="col">
            <h5>${attraction.Name}</h5>
            <h3>${attraction.State}</h3>
            <p>${attraction.Detail}</p>
            <br/>
            <i class="description">${attraction.Description}</i>
            <button class="btn btn-primary open-modal" data-attraction-id="${attraction.AttractionID}">Book Now</button>
          </div>
          <div class="col" img-container>
            <img src="${attraction.Image}" alt="${attraction.Name}">
          </div>
        `
        }
      </div>
    </div>
  `;
  return attractionElement;
}
