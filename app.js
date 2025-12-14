




async function getData() {
  const url = "https://services1.arcgis.com/79kfd2K6fskCAkyg/arcgis/rest/services/FoodServiceData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(error.message);
  }
}

var allResults;
getData()
    .then(response => response.json())
    .then(response => {
        allResults = response;
        console.log(allResults)
});






// media queries

