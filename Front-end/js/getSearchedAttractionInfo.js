// Define the search function
async function search() {
  const query = document.getElementById("query").value.trim(); // Get user input and trim any extra spaces

  // Check if input is empty
  if (!query) {
    alert("Please enter a search term (state, city, or attraction name).");
    return;
  }

  // Create query parameters
  const params = new URLSearchParams({ search: query });
  const apiUrl = `https://2hf6llpfb1.execute-api.ap-southeast-2.amazonaws.com/prod/viSearch?${params.toString()}`;

  try {
    // Send API request
    const response = await axios.get(apiUrl);
    const attractions = response.data;

    // Get the attraction-container element
    const attractionContainer = document.getElementById("attraction-container");
    attractionContainer.innerHTML = ""; // Clear previous search results

    // Iterate over the attraction data returned by the API and call createAttractionElement to generate HTML for each attraction
    attractions.forEach((attraction, index) => {
      const attractionElement = createAttractionElement(attraction, index);
      attractionContainer.appendChild(attractionElement);
    });

    document.querySelectorAll(".open-modal").forEach((button) => {
      button.addEventListener("click", function () {
        const attractionId = this.getAttribute("data-attraction-id");
        openAttractionModal(attractionId);
      });
    });
  } catch (error) {
    console.error("Some error occurred:", error);
    alert("There was an error fetching the search results. Please try again.");
  }
}

// Generate HTML elements based on the attraction data
function createAttractionElement(attraction, index) {
  const attractionElement = document.createElement("div");
  const isEven = index % 2 === 0; // Check if the attraction index is even or odd, used to change the layout of images and text

  // Generate the HTML structure for the attraction
  attractionElement.innerHTML = `
    <div class="container text-center post" id="${attraction.AttractionID}">
      <div class="row">
        ${
          isEven
            ? `
          <div class="col img-container">
            <img src="${attraction.Image}" alt="${attraction.Name}" style="max-width: 100%;">
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
          <div class="col img-container">
            <img src="${attraction.Image}" alt="${attraction.Name}" style="max-width: 100%;">
          </div>
        `
        }
      </div>
    </div>
  `;
  return attractionElement; // Return the generated HTML element
}
