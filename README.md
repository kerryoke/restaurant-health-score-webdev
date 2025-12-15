# Check Restaurant Health Scores

This website was created to pull data from the [Louisville Metro Open Data API](https://louisville-metro-opendata-lojic.hub.arcgis.com/datasets/LOJIC::louisville-metro-ky-restaurant-inspection-scores/about) and allow the user to search for local establishments that serve food (including restaurants, schools, hospitals, etc) by name or letter grade.


## Included features:

1. Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.
   - Data from the API was stored as arrays within an object. I used methods such as `map`, `filter`, and `Set` to analyze and organize the data.

2. Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.
   - The user input from each search bar are used as parameters in the `searchResults` function.
  
3. Visualize data in a user friendly way.
   - Selected information about each restaurant/establishment entry (name, address, grade, score, and date of inspection) is displayed in easy-to-read sections.
  

## To view project:

1. Clone project.
2. CLick "Go Live" to run live server locally.
3. The site should load automatically.

Troubleshooting:
If the data doesn't load you may need to change the query URL in the `getData()` function in app.js. To do this, copy and paste the query URL found [here](https://louisville-metro-opendata-lojic.hub.arcgis.com/datasets/LOJIC::louisville-metro-ky-restaurant-inspection-scores/api).

## Limitations and stretch goals:

The API limits the over 10,000 establishments down to 1,000 when fetching data. In the future I would like to find a way to use all 10,000 entries so that the data is more helpful for Louisville locals.
I would also like to include more filters so that for example you could search for only restaurants and grocery stores and exclude places like hospitals and school cafeterias. This was one of my original goals but it requires access to all 10,000 entries instead of the limited 1,000.






