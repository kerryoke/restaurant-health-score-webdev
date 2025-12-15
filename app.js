const resultList = document.getElementById('resultList');
const searchBar = document.getElementById('searchBar');
let allResults = [];
let regularInspectionsOnly = [];




searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredResults = allResults.features.filter((result) => {
    return result.attributes.EstablishmentName.toLowerCase().includes(searchString);
  });

  displayResults(filteredResults);
})


const getData = async () => {
  const url = "https://services1.arcgis.com/79kfd2K6fskCAkyg/arcgis/rest/services/FoodServiceData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  try {
    const result = await fetch(url);
    allResults = await result.json();
    regularInspectionsOnly = allResults.features.filter((result) => {
      return result.attributes.Ins_TypeDesc === "REGULAR";
    })
    displayResults(regularInspectionsOnly);
  } catch (err) {
      console.error(err);
  }
};




// clean up date of inspection display
const displayResults = (results) => {
  const htmlString = results
    .map((result) => {
      return `
      <li class="result">
        <h3>${result.attributes.EstablishmentName}</h3>
        <p>Location: ${result.attributes.Address}</p>
        <p>Grade: ${result.attributes.Grade}</p>
        <p>Score: ${result.attributes.score}</p>
        <p>Date of inspection: ${result.attributes.InspectionDate}</p>
      </li>
    `;
    })
    .join('');
  resultList.innerHTML = htmlString;
};

getData();



