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
    // typeDescriptions(regularInspectionsOnly);
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


// //find all type descriptions
// const typeDescriptions = (results) => {
//   const descriptions = results.map((result) => {
//     return result.attributes.TypeDescription;
    
//   })
//   const uniqueDescriptions = [...new Set(descriptions)];
//   console.log(uniqueDescriptions);
// }

// 0: "FOOD SERVICE"
// 1: "SCHOOL CAFETERIA OR FOOD SERVICE"
// 2: "PRE-PACKAGED RETAIL"
// 3: "FOOD SERVICE (HOSPITAL / NURSING HOME"
// 4: "FOOD SERVICE (DAY CARE / CHILD CARE CENTER"
// 5: "SUPERMARKET WITH PROCESSING"
// 6: "RETAIL-FOOD  10,000 SQ FT OR LESS"
// 7: "RETAIL-FOOD  10,001 SQ FT OR OVER"
// 8: "RETAIL WITH LIMITED SERVICE"
// 9: "STATIONARY RESTRICTED CONCESSON"
// length : 10