$(() => {
  console.log("Document is ready.");
  showCupcakes();
});

async function showCupcakes() {
  // Query the /cupcakes endpoint (no auth required)
  const response = await axios.get("/api/cupcakes");

  // Loop through all cupcakes, generate HTML, append to list
  for (let cupcake of response.data.cupcakes) {
    li = generateCupcakeHTML(cupcake);
    $("#cupcake-list").append(li);
  }
}

function generateCupcakeHTML(cupcake) {
  // Process cupcake object information
  let { id, flavor, size, rating, image } = cupcake;
  flavor = flavor.charAt(0).toUpperCase() + flavor.slice(1);
  size = size.charAt(0).toUpperCase() + size.slice(1);

  // Create and return cupcake markup
  const cupcakeMarkup = $(`
    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${id}">
      <div className="container">
        <h5 class="mb-2">${size} ${flavor} Cupcake</h5>
        <span class="badge badge-primary badge-pill float-left">Rating: ${rating}</span>
      </div>
      <div class="image-parent">
        <img src=${image}
          class="img-fluid" alt=${size}>
      </div>
    </li>
  `);
  return cupcakeMarkup;
}

// TODO:
// - handle form submission
// - let the API know about the new cupcake
// - update the list on the page to show it
