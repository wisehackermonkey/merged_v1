
/**
 * Adds two SVG markers over the homes of the Chicago Bears and Chicago Cubs
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addSVGMarkers(map){
  //Create the svg mark-up
  var svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="transparent" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
  '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
  'text-anchor="middle" fill="${STROKE}" >💎</text></svg>';

  // Add the first marker
  var bearsIcon = new H.map.Icon(
    svgMarkup.replace('${FILL}', 'transparent').replace('${STROKE}', 'red')),
    bearsMarker = new H.map.Marker({lat: 41.8625, lng: -87.6166 },
      {icon: bearsIcon});

  map.addObject(bearsMarker);

  // Add the second marker.
  var cubsIcon = new H.map.Icon(
    svgMarkup.replace('${FILL}', 'transparent').replace('${STROKE}', 'red')),
    cubsMarker = new H.map.Marker({lat: 47.9025, lng: -87.6166},
      {icon: cubsIcon});

  map.addObject(cubsMarker);
  

}

function addGem(map,x,y){
  var svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="transparent" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
  '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
  'text-anchor="middle" fill="${STROKE}" >💎</text></svg>';
  //for(var i = 0; i < points.length; i++){
  
  
  // Add the first marker
  var bearsIcon = new H.map.Icon(
    svgMarkup.replace('${FILL}', 'transparent').replace('${STROKE}', 'red')),
    bearsMarker = new H.map.Marker({lat:x, lng: y},
      {icon: bearsIcon});
  
  map.addObject(bearsMarker);
 // }

}
function desplayGems(map,locations){
  for(var i = 0; i < locations.length; i++){
   addGem(map,locations[i][0], locations[i][1]);
  }
}
/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: "9QUs1IA9FdEjClrJtD2Ws1i1aeQLvGs-50QKwh5w5Ao"
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Chicago.
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:37.7647816, lng:-122.4124571},
  zoom: 11,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  
//   desplayGems(map,[
//  [41.8625, -87.4166],
//  [47.8625, -87.4166]]
//  ); 
 

//send the path points to server & plot the gems using the resulting points from the server
async function ProcessGems(){
  const rawResponse = await fetch('https://hiddengemsapp.herokuapp.com/gems/3', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "data": [ 
        //37.7643067,-122.4049898
        //37.7646459,-122.4122854
        //37.7647816,-122.4201818
        {
          "lat": 37.7643067,
          "lng": -122.4049898
        },
        {
          "lat": 37.7646459,
          "lng": -122.4122854
        },
        {
          "lat": 37.7647816,
          "lng": -122.4201818
        },
        {
          "lat": 37.7647216,
          "lng": -122.4206818
        }
      ]
    })}
  );
  //wait for the server to process
  const content = await rawResponse.json();

    console.log(content);
    console.log(content.data[0].lat);
    console.log(content.data[0].lng);
   //show points (gems) to the map
    for(var i = 0; i<content.data.length;i++){
      addGem(map,content.data[i].lat, content.data[i].lng);
    }
}
ProcessGems();