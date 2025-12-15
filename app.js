const resultList = document.getElementById('resultList');
const nameSearchBar = document.getElementById('nameSearchBar');
const gradeSearchBar = document.getElementById('gradeSearchBar');
let allResults = [];
let regularInspectionsOnly = [];
let nameSearchString = '';
let gradeSearchString = '';



nameSearchBar.addEventListener('keyup', (e) => {

  const filteredResults = searchResults(e.target.value.toLowerCase(), null);

  displayResults(filteredResults);
})

gradeSearchBar.addEventListener('keyup', (e) => {

  const gradeResults = searchResults(null, e.target.value.toLowerCase());

  displayResults(gradeResults);
})



const searchResults = (nameValue, gradeValue) => {
  if (!!nameValue){
    nameSearchString = nameValue;
  }
  if (!!gradeValue){
    gradeSearchString = gradeValue;
  }

  return allResults.features.filter((result) => {
    const filterByName = result.attributes.EstablishmentName.toLowerCase().includes(nameSearchString);
    const filterByGrade = !!result.attributes.Grade
      && result.attributes.Grade.toLowerCase().includes(gradeSearchString);
    const nameHasValue = nameSearchString.length > 0;
    const gradeHasValue = gradeSearchString.length > 0;

    return (nameHasValue ? filterByName : true) && (gradeHasValue ? filterByGrade : true)
           
  }

  )}



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


// //FIND ALL TYPE DESCRIPTIONS
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