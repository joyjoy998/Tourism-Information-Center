document.addEventListener("DOMContentLoaded", function () {
  loadHotAttractions();
});

function loadHotAttractions() {
  const apiUrl =
    "https://pqpanua4za.execute-api.ap-southeast-2.amazonaws.com/prod/viHot";

  axios
    .get(apiUrl)
    .then(function (response) {
      const attractions = response.data;
      const hotAttractionContainer = document.getElementById(
        "hot-attraction-container"
      );

      attractions.forEach((attraction) => {
        const attractionElement = createAttractionElement(attraction);
        hotAttractionContainer.appendChild(attractionElement);
      });
    })
    .catch(function (error) {
      console.error("Some error occurred:", error);
    });
}

function createAttractionElement(attraction) {
  const attractionElement = document.createElement("div");
  attractionElement.innerHTML = `
  <div class="box">
  <img src="${attraction.Image}" alt="${attraction.Name}">
  <h3>${attraction.Name}</h3>
  <p>${attraction.Description}</p>
  <a href="attraction.html#${attraction.AttractionID}" class="btn">Read More</a>
  </div>`;

  return attractionElement;
}
