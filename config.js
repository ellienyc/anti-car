//layout from Mapbox Storytelling template

var config = {
    style: 'mapbox://styles/ekarpe/cmafq4uwa006t01s13ff011zh', // style URL
    accessToken: 'pk.eyJ1IjoiZWthcnBlIiwiYSI6ImNsbXM1a2c3MzBkZWEya24xdTB0dW5hZmEifQ.5vXxMn1kOMvdkUCdQfc0oQ',
    theme: 'dark',
    use3dTerrain: false, //set true for enabling 3D maps.
    auto: false,
    title: 'Ban cars in NYC',
    subtitle: 'We give too much of our limited streetscape to cars.',
    footer: 'Source: data from NYC Open Data. <br> Created using <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'fully',
            hidden: false,
            title: 'intro', //chapter one
            // image: './assets/san-fran.jpeg',
            description: 'NYC/Manhattan streets',
            location: {
                center: [-73.98732, 40.73],
                zoom: 11.75,
                pitch: 0,
                bearing: 28.9
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    // layer: 'layer-name',
                    // opacity: 1,
                    // duration: 5000
                }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'second-identifier', //chapter two
            alignment: 'left',
            hidden: false,
            title: 'CBD',
            description: 'congestion pricing zone',
            location: {
                center: [-73.98732, 40.73], //same map parameters for all chapters
                zoom: 11.75,
                pitch: 0,
                bearing: 28.9,
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'CBD-fill',
                    opacity: 1,
                    duration: 100
                }
            ],
            onChapterExit: [
                {
                    layer: 'CBD-fill',
                    opacity: 0,
                    duration: 100
                },
                {
                    layer: 'CBD-only-fill',
                    opacity: 0.5,
                    duration: 110
                }
            ]
        },
        {
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            title: 'car space',
            description: 'all the space that is dedicated to cars',
            location: {
                center: [-73.98732, 40.73],
                zoom: 11.75,
                pitch: 0,
                bearing: 28.9,
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'streets-line',
                    opacity: 1,
                    duration: 100
                }
            ],
            onChapterExit: [
                {
                    layer: 'streets-line',
                    opacity: 0,
                    duration: 100
                },
            ]
        },
        {
            id: 'fourth-chapter',
            alignment: 'left',
            hidden: false,
            title: 'pedestrian space',
            description: 'Pedestrian plazas (permanent) and Open Streets (most temporary)',
            location: {
                center: [-73.98732, 40.73],
                zoom: 11.75,
                pitch: 0,
                bearing: 28.9
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'openStreets-fill',
                    opacity: 1,
                    duration: 100
                },
                {
                    layer: 'openStreets-line',
                    opacity: 1,
                    duration: 100
                },
                {
                    layer: 'pedPlazas-fill',
                    opacity: 1,
                    duration: 100
                },
                {
                    layer: 'pedPlazas-line',
                    opacity: 1,
                    duration: 100
                }
            ],
            onChapterExit: [{
                layer: 'openStreets-fill',
                opacity: 0,
                duration: 100,
            },
            {
                layer: 'openStreets-line',
                opacity: 0,
                duration: 100
            },
            {
                layer: 'pedPlazas-fill',
                opacity: 0,
                duration: 100
            },
            {
                layer: 'pedPlazas-line',
                opacity: 0,
                duration: 100
            }
            ]
        },
        {
            id: 'fifth-chapter',
            alignment: 'left',
            hidden: false,
            title: 'bike infra',
            description: 'dedicated bike lanes, bike parking, CitiBike stations',
            location: {
                center: [-73.98732, 40.73],
                zoom: 11.75,
                pitch: 0,
                bearing: 28.9
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'bikeParkingS-point',
                    opacity: 1,
                    duration: 100,
                },
                {
                    layer: 'citiBike-point',
                    opacity: 1,
                    duration: 100,
                },
                {
                    layer: 'bikeLanes-line',
                    opacity: 1,
                    duration: 100,
                }
            ],
            onChapterExit: [{
                layer: 'bikeParkingS-point',
                opacity: 0,
                duration: 100,
            },
            {
                layer: 'citiBike-point',
                opacity: 0,
                duration: 100,
            },
            {
                layer: 'bikeLanes-line',
                opacity: 0,
                duration: 100,
            }
            ]
        },
        {
            id: 'sixth-chapter',
            alignment: 'left',
            hidden: false,
            title: 'bus lanes',
            description: 'dedicated bus lanes',
            location: {
                center: [-73.98732, 40.73],
                zoom: 11.75,
                pitch: 0,
                bearing: 28.9
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'busLanes-line',
                    opacity: 1,
                    duration: 100,
                },
            ],
            onChapterExit: [
                {
                    layer: 'busLanes-line',
                    opacity: 0,
                    duration: 100,
                }
            ]
        },
    ]
};

scroller = scrollama({ //from ChatGPT, trying to debug the extra "box" that appears at the beginning and end of the scroll
  step: ".step",
  offset: 0.5,
  debug: false // 👈 Turn this off
});

document.querySelectorAll('.step').forEach(step => {
  if (!step.textContent.trim()) {
    step.style.display = 'none';
  }
});