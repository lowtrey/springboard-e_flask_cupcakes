$(() => {
  showCupcakes();
  $("#add-form").on("submit", createCupcake);
});

function generateCupcakeHTML(cupcake) {
  // Process cupcake object information
  let { id, flavor, size, rating, image } = cupcake;
  size = size.charAt(0).toUpperCase() + size.slice(1);
  flavor = flavor.charAt(0).toUpperCase() + flavor.slice(1);

  // Create and return cupcake markup
  const cupcakeMarkup = $(`
    <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${id}">
      <div className="container">
        <h6 class="mb-2">${size} ${flavor} Cupcake</h5>
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

async function showCupcakes() {
  // Query the /cupcakes endpoint (no auth required)
  const response = await axios.get("/api/cupcakes");

  // Empty the cupcake list
  $("#cupcake-list").empty();

  // Loop through all cupcakes, generate HTML, append to list
  for (let cupcake of response.data.cupcakes) {
    li = generateCupcakeHTML(cupcake);
    $("#cupcake-list").append(li);
  }
}

async function createCupcake(event) {
  event.preventDefault();

  const response = await axios.post("/api/cupcakes", {
    flavor: $("#flavor").val(),
    rating: $("#rating").val(),
    image: $("#image").val(),
    size: $("#size").val(),
  });

  $("#add-form").trigger("reset");
  await showCupcakes();
}

// TODO: try posting without response variable
