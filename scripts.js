mapboxgl.accessToken = 'pk.eyJ1IjoiZWthcnBlIiwiYSI6ImNsbXM1a2c3MzBkZWEya24xdTB0dW5hZmEifQ.5vXxMn1kOMvdkUCdQfc0oQ';

const map = new mapboxgl.Map({ //the map!
    container: 'map',
    center: [-73.98732, 40.73], // starting position [lng, lat]
    zoom: 11.75, // opening zoom level
    minZoom: 11.5, // constraining the zoom level
    maxZoom: 15, // constraining the zoom level
    // hash: true, // Enable hash in the URL to reflect the map's center and zoom level
    bearing: 28.9, // switching to Manhattan north
    pitch: 0, // pitch in degrees, so map is flat and not 3D
    style: 'mapbox://styles/ekarpe/cmafq4uwa006t01s13ff011zh' // style URL
});

map.on('load', () => {
    map.addSource('CBD', {
     type: 'geojson',
       data: 'https://data.ny.gov/resource/srxy-5nxn.geojson' // from MTA CBD geofence https://data.ny.gov/Transportation/MTA-Central-Business-District-Geofence-Beginning-J/srxy-5nxn/about_data
    });
    // map.addLayer({
    //     'id': 'CBD-fill',
    //     'type': 'fill',
    //     'source': 'CBD',
    //     'layout': {},
    //     'paint': {
    //         'fill-color': 'green',
    //         'fill-opacity': 0.1
    //     }
    // });
    map.addSource('openStreets', {
        type: 'geojson',
        data: 'https://data.cityofnewyork.us/resource/uiay-nctu.geojson'
    });

    map.addLayer({
        'id': 'openStreets-fill',
        'type': 'fill',
        'source': 'openStreets',
        'layout': {},
        'paint': {
            'fill-color': 'navy',
            'fill-opacity': 1
        }
    });
    map.addLayer({
        'id': 'openStreets-outline',
        'type': 'line',
        'source': 'openStreets',
        'paint': {
            'line-color': 'navy',
            'line-width': 4,
            'line-opacity': 1
        }
    });

    map.addSource('pedPlazas', {
        type: 'geojson',
        data: 'https://data.cityofnewyork.us/resource/k5k6-6jex.geojson' // from https://data.cityofnewyork.us/Transportation/NYC-DOT-Pedestrian-Plazas/k5k6-6jex/about_data
    });
    map.addLayer({
        'id': 'pedPlazas-fill',
        'type': 'fill',
        'source': 'pedPlazas',
        'layout': {},
        'paint': {
            'fill-color': 'steel blue', 
            'fill-opacity': 1
        }
    });
    map.addLayer({
        'id': 'pedPlazas-outline',
        'type': 'line',
        'source': 'pedPlazas',
        'paint': {
            'line-color': 'steel blue',
            'line-width': 4,
            'line-opacity': 1
        }
    });
});

