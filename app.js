const resultList = document.getElementById('resultList');
const searchBar = document.getElementById('searchBar');
let allResults = [];





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
    displayResults(allResults.features);
  } catch (err) {
      console.error(err);
  }
};


// limit results to regular inspections only: (not complaints, follow-ups, etc);
// const regularInspections = 



const displayResults = (results) => {
  const htmlString = results
    .map((result) => {
      return `
      <li class="result">
        <h3>${result.attributes.EstablishmentName}</h3>
        <p>Location: ${result.attributes.Address}</p>
        <p>Grade: ${result.attributes.Grade}</p>
        <p>Score: ${result.attributes.score}</p>
      </li>
    `;
    })
    .join('');
  resultList.innerHTML = htmlString;
};

getData();



