/*eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiamhhbnZpdGciLCJhIjoiY2xyamdjeGo4MDNlNzJrazBiZHM3NzFodSJ9.WUqfDc-h_fJOf6X71-XjVA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    scrollZoom: false,
    //   center: [-118.263766, 34.114279], // starting position [lng, lat]
    //   zoom: 10, // starting zoom
  });

  const bounds = new mapboxgl.LngLatBounds();

  //create marker
  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    //add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
      .addTo(map);

    //extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
