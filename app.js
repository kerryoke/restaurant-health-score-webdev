const resultList = document.getElementById('resultList');
let allResults = [];





const getData = async () => {
  const url = "https://services1.arcgis.com/79kfd2K6fskCAkyg/arcgis/rest/services/FoodServiceData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
  try {
    const result = await fetch(url);
    allResults = await result.json();
    displayResults(allResults);
  } catch (err) {
      console.error(err);
  }
};



const displayResults = (results) => {
  const htmlString = results.features
    .map((result) => {
      return `
      <li class="result">
        <h3>${result.attributes.NameSearch}</h3>
        <p>Grade: ${result.attributes.Grade}</p>
      </li>
    `;
    })
    .join('');
  resultList.innerHTML = htmlString;
};

getData();





// async function getData() {
//   const url = "https://services1.arcgis.com/79kfd2K6fskCAkyg/arcgis/rest/services/FoodServiceData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     return response;
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// getData()
//     .then(response => response.json())
//     .then(response => {
//         allResults = response;
// });




// media queries

