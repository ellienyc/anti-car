//here to line 225 is the Mapbox storytelling template
var initLoad = true;
var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
}

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty',
    'full': 'fully'
}

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
        var options = {};
        if (layer.duration) {
            var transitionProp = prop + "-transition";
            options = { "duration": layer.duration };
            map.setPaintProperty(layer.layer, transitionProp, options);
        }
        map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
}

var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');

var header = document.createElement('div');

if (config.title) {
    var titleText = document.createElement('h1');
    titleText.innerText = config.title;
    header.appendChild(titleText);
}

if (config.subtitle) {
    var subtitleText = document.createElement('h2');
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
}

if (config.byline) {
    var bylineText = document.createElement('p');
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
}

if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute('id', 'header');
    story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var chapter = document.createElement('div');

    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }

    if (record.image) {
        var image = new Image();
        image.src = record.image;
        chapter.appendChild(image);
    }

    if (record.description) {
        var story = document.createElement('p');
        story.innerHTML = record.description;
        chapter.appendChild(story);
    }

    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }

    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    container.classList.add(alignments[record.alignment] || 'centered');
    if (record.hidden) {
        container.classList.add('hidden');
    }
    features.appendChild(container);
});

story.appendChild(features);

var footer = document.createElement('div');

if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

mapboxgl.accessToken = config.accessToken;

var map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    interactive: false,
    projection: config.projection
});

// Create a inset map if enabled in config.js
if (config.inset) {
    map.addControl(
        new GlobeMinimap({ ...config.insetOptions }),
        config.insetPosition
    );
}

if (config.showMarkers) {
    var marker = new mapboxgl.Marker({ color: config.markerColor });
    marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();


map.on("load", function () {
    if (config.use3dTerrain) {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
            'id': 'sky',
            'type': 'sky',
            'paint': {
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 15
            }
        });
    };

    // setup the instance, pass callback functions
    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            progress: true
        })
        .onStepEnter(async response => {
            var current_chapter = config.chapters.findIndex(chap => chap.id === response.element.id);
            var chapter = config.chapters[current_chapter];

            response.element.classList.add('active');
            map[chapter.mapAnimation || 'flyTo'](chapter.location);

            if (config.showMarkers) {
                marker.setLngLat(chapter.location.center);
            }
            if (chapter.onChapterEnter.length > 0) {
                chapter.onChapterEnter.forEach(setLayerOpacity);
            }
            if (chapter.callback) {
                window[chapter.callback]();
            }
            if (chapter.rotateAnimation) {
                map.once('moveend', () => {
                    const rotateNumber = map.getBearing();
                    map.rotateTo(rotateNumber + 180, {
                        duration: 30000, easing: function (t) {
                            return t;
                        }
                    });
                });
            }
            if (config.auto) {
                var next_chapter = (current_chapter + 1) % config.chapters.length;
                map.once('moveend', () => {
                    document.querySelectorAll('[data-scrollama-index="' + next_chapter.toString() + '"]')[0].scrollIntoView();
                });
            }
        })
        .onStepExit(response => {
            var chapter = config.chapters.find(chap => chap.id === response.element.id);
            response.element.classList.remove('active');
            if (chapter.onChapterExit.length > 0) {
                chapter.onChapterExit.forEach(setLayerOpacity);
            }
        });


    if (config.auto) {
        document.querySelectorAll('[data-scrollama-index="0"]')[0].scrollIntoView();
    }

    // adding my own layers and sources
    map.addSource('openStreets', { //NYC Open Streets
        type: 'geojson',
        data: 'https://data.cityofnewyork.us/resource/uiay-nctu.geojson' //from NYC Open Data
    });
    map.addLayer({
        'id': 'openStreets-fill', //open streets as fill
        'source': 'openStreets',
        'layout': {},
        'paint': {
            'fill-color': 'steel blue',
            'fill-opacity': 0

        }
    });
    map.addLayer({
        'id': 'openStreets-line', //open streets as line for better visibility
        'source': 'openStreets',
        'paint': {
            'line-color': 'steel blue',
            'line-width': 3,
            'line-opacity': 0
        }
    });

    map.addSource('pedPlazas', { //pedestrian plazas, a.k.a. space taken back from cars
        type: 'geojson',
        data: 'https://data.cityofnewyork.us/resource/k5k6-6jex.geojson' // from https://data.cityofnewyork.us/Transportation/NYC-DOT-Pedestrian-Plazas/k5k6-6jex/about_data
    });
    map.addLayer({
        'id': 'pedPlazas-fill', //pedestrian plazas as fill
        'type': 'fill',
        'source': 'pedPlazas',
        'layout': {},
        'paint': {
            'fill-color': 'navy',
            'fill-opacity': 0
        }
    });
    map.addLayer({
        'id': 'pedPlazas-line', //and pedestrian plazas as line for better visibility
        'type': 'line',
        'source': 'pedPlazas',
        'paint': {
            'line-color': 'navy',
            'line-width': 3,
            'line-opacity': 0
        }
    });
    map.addSource('bikeParkingS', { //bike parking stations/shelters
        type: 'geojson',
        data: 'https://data.cityofnewyork.us/resource/dimy-qyej.geojson' // from NYC Open Data
    });
    map.addLayer({
        'id': 'bikeParkingS-point',
        'type': 'circle',
        'source': 'bikeParkingS',
        'layout': {},
        'paint': {
            'circle-color': 'darkorange',
            'circle-radius': 3,
            'circle-opacity': 0
        }
    });
    map.addSource('citiBike', { //citiBike stations
        type: 'geojson',
        data: 'data/citibike-stations.geojson' // from https://github.com/toddwschneider/nyc-citibike-data/blob/master/data/citibike_stations_data.csv then converted using https://www.convertcsv.com/csv-to-geojson.htm
    });
        map.addLayer({
        'id': 'citiBike-point',
        'type': 'circle',
        'source': 'citiBike',
        'layout': {},
        'paint': {
            'circle-color': 'red',
            'circle-radius': 2,
            'circle-opacity': 0
        }
    });
    map.addSource('bikeLanes', { //bike lanes
        type: 'geojson',
        data: '/data/bikeroutes.geojson' // from NYC Open Data 
    });
    map.addLayer({
        'id': 'bikeLanes-line',
        'type': 'line',
        'source': 'bikeLanes',
        'layout': {},
        'paint': {
            'line-color': 'darkgreen',
            'line-width': 2,
            'line-opacity': 0
        }
    });
    map.addSource('busLanes', { //bus lanes
        type: 'geojson',
        data: 'https://data.cityofnewyork.us/resource/ycrg-ses3.geojson?$limit=2000&$offset=500' // from NYC Open Data
    });
    map.addLayer({
        'id': 'busLanes-line',
        'type': 'line',
        'source': 'busLanes',
        'layout': {},
        'paint': {
            'line-color': 'darkred',
            'line-width': 2,
            'line-opacity': 0
        }
    });
    map.addSource('city', { // NYC city boundaries, to gray out NJ
        type: 'geojson',
        data: '/data/city-inverted.geojson' // inverse of NYC, from borough boundaries
    });
    map.addLayer({
        'id': 'city-only-fill',
        'type': 'fill',
        'source': 'city',
        'layout': {},
        'paint': {
            'fill-color': 'gray',
            'fill-opacity': 0.5
        }
    });
    map.addSource('streets', { // NYC street center lines
        type: 'geojson',
        data: '/data/DCM_StreetCenterLine.geojson' // from NYC Planning data
    });
    map.addLayer({
        'id': 'streets-line',
        'type': 'line',
        'source': 'streets',
        'layout': {},
        'paint': {
            'line-color': 'red',
            'line-width': 1,
            'line-opacity': 0
        }
    });
    map.addSource('CBD', { // Central Business district/congestion pricing zone
        type: 'geojson',
        data: 'https://data.ny.gov/resource/srxy-5nxn.geojson' // from MTA CBD geofence https://data.ny.gov/Transportation/MTA-Central-Business-District-Geofence-Beginning-J/srxy-5nxn/about_data
    });
    map.addLayer({
        'id': 'CBD-fill',
        'type': 'fill',
        'source': 'CBD',
        'layout': {},
        'paint': {
            'fill-color': 'lightpink',
            'fill-opacity': 0
        }
    });
    map.addSource('CBD-only', { //inverse of CBD to keep as visual reference for the rest of the chapters
        type: 'geojson',
        data: 'data/CBD-inverted.geojson' // inverse of CBD using tristan.ca/inverted-polygons of above
    });
    map.addLayer({
        'id': 'CBD-only-fill',
        'type': 'fill',
        'source': 'CBD-only',
        'layout': {},
        'paint': {
            'fill-color': 'lightgray',
            'fill-opacity': 0
        }
    });
});