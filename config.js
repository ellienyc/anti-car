//layout from Mapbox Storytelling template
// link code to re-use= pre text, <a href="link" target="_blank"> hyperlink text </a> post
// legend code to re-use= <span style="display:inline-block;width:10px;height:10px;background-color:COLOR;border-radius:50%;margin-left:4px;"></span> COLOR NAME

var config = {
    style: 'mapbox://styles/mapbox/satellite-v9', // /ekarpe/cmafq4uwa006t01s13ff011zh', // I tried a custom style, but I preferred using layers and the satellite style instead. 
    accessToken: 'pk.eyJ1IjoiZWthcnBlIiwiYSI6ImNsbXM1a2c3MzBkZWEya24xdTB0dW5hZmEifQ.5vXxMn1kOMvdkUCdQfc0oQ',
    theme: 'dark',
    use3dTerrain: false, //set true for enabling 3D maps.
    auto: false,
    title: 'Ban cars in NYC',
    subtitle: 'We give too much of our valuable streetscape to cars.',
    footer: 'Made by Ellie Karpe for Chris Whong Interactive Web Mapping class final.<br>' +
    '<br> Sources: data from NYC Open Data, and MTA via NYS Open Data. See <a href="https://github.com/ellienyc/anti-car" target="_blank"> my GitHub and code</a> for the exact sources. <br> Created using the <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a> template.',
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'fully',
            hidden: false,
            title: 'New York City, especially (mid to lower) Manhattan', //chapter one
            description: 'is a city of movers: walkers, rollers, bikers; buses and subways. Over half of households in NYC do not own a car, a figure that goes down to <a href="https://www.hunterurban.org/wp-content/uploads/2024/06/Car-Light-NYC-Studio-May-2024.pdf" target="_blank"> less than 1 in 4</a> in Manhattan.<br>' +
                '<br> So, why do we give so much of our valuable streetscape to cars? Especially in a time where we are actively tolling vehicles to enter lower Manhattan?<br>' +
                '<br>Scroll through to see how much of the space is devoted to cars: and how much is not.',
            location: {
                center: [-73.99647, 40.76686], //centered on Manhattan
                zoom: 11,
                pitch: 0,
                bearing: 28.9 //Manhattan North!
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'all-streets-line', //showing all the  city streets, by street width
                    opacity: 1,
                    duration: 10
                }
            ],
            onChapterExit: [
                {
                    layer: 'all-streets-line', //and having the layer go away to scroll to the next chapter
                    opacity: 0,
                    duration: 100,
                }
            ]
        },
        {
            id: 'second-identifier', //chapter two
            alignment: 'left',
            hidden: false,
            title: 'the Congestion Relief Zone',
            description: 'Since January 2025 (almost 6 months ago, at the time of publishing), all cars entering Manhattan below 60th Street (the area shown in <span style="display:inline-block;width:10px;height:10px;background-color:lemonchiffon;border-radius:50%;margin-left:4px;"></span> yellow) are charged a toll fee. <br>' +
                '<br> Though <a href="https://congestionreliefzone.mta.info/" target="_blank">the MTA says</a> 60k fewer vehicles are entering the zone, this has yet to be followed with a response in programming or infrastructure that supports car-free travel. (Maybe why measured pedestrians are only up 4%).',
            //  description text editing from ChatGPT
            location: {
                center: [-74.02, 40.75], //new map parameters for the rest of the chapters
                zoom: 11.5, //new zoom to highlight the Congestion Relief Zone
                pitch: 0,
                bearing: 28.9,
            },
            mapAnimation: 'easeTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'CBD-fill', //new layer! now showing the Congestion Relief Zone
                    opacity: 0.75,
                    duration: 100
                },
                {
                    layer: 'CBD-only-fill', //inverse polygon of the Congestion Relief Zone to highlight for the rest of the map
                    opacity: 0,
                    duration: 110
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
                },
            ]
        },
        {
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Vehicles remain the default on Manhattan streets.',
            description: 'This is every street in the Congestion Relief Zone that continues to allow, or even prioritize, cars.',
            location: {
                center: [-74.02, 40.745],
                zoom: 12,
                pitch: 0,
                bearing: 28.9,
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'CBD-only-fill',
                    opacity: 0.5,
                    duration: 110
                },
                {
                    layer: 'streets-line', //showing the car-allowed streets in the Congestion Relief Zone
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
            title: 'Pedestrian space is increasing but still limited.',
            description: 'Times Square, and the Broadway Connection, stand out as converting to a pedestrian plaza over a decade ago, completely closing or severly limiting car traffic. <p>' +
                '<p> Pedestrian plazas<span style="display:inline-block;width:10px;height:10px;background-color:darkblue;border-radius:50%;margin-left:4px;"></span> are more permanent changes (i.e. along Broadway) and Open Streets<span style="display:inline-block;width:10px;height:10px;background-color:steelblue;border-radius:50%;margin-left:4px;"></span> are mostly temporary closures (i.e. on Saturday afternoons).<br>' +
                '<br> Besides being community spaces and providing more room for pedestrians, <a href="https://nyc.streetsblog.org/2024/11/18/car-free-streets-are-good-for-business-yet-another-report-shows" target="_blank">the city transportation agency (DOT)</a> has reported that car-free streets also increase local economic activity.',
            location: {
                center: [-74.02, 40.745],
                zoom: 12,
                pitch: 0,
                bearing: 28.9
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'CBD-only-fill',
                    opacity: 0.5,
                    duration: 110
                },
                {
                    layer: 'openStreets-fill',
                    opacity: 1,
                    duration: 200
                },
                {
                    layer: 'openStreets-line',
                    opacity: 1,
                    duration: 200
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
            title: 'Bike lanes are becoming more common, along with bike share.',
            description:
                'Over the past two decades, NYC has added <a href="https://www.nyc.gov/html/dot/downloads/pdf/connecting-to-the-core.pdf" target="_blank">over 140 miles of bike lanes</a> in the Congestion Pricing Zone.<br>' +
                '<br>With CitiBike expanding bike share stations<span style="display:inline-block;width:10px;height:10px;background-color:darkorange;border-radius:50%;margin-left:6px;"></span>, biking is more convenient and common than ever, though safety is still a concern, especially for unprotected lanes.<p>'+
                '<p><strong>Bike lane by type:</strong><br>' + //I tried so hard, with ChatGPT, to have this legend be a popup/go elsewhere, but it just wouldn't work, so here it is in the description. Thanks CoPilot for helping me write this comment :)
                '<span style="display:inline-block;width:10px;height:10px;background-color:#219177;border-radius:50%;margin-left:6px;"></span> Protected<br>' +
                '<span style="display:inline-block;width:10px;height:10px;background-color:#38c266;border-radius:50%;margin-left:6px;"></span> Conventional (alongside cars)<br>' +
                '<span style="display:inline-block;width:10px;height:10px;background-color:#88E788;border-radius:50%;margin-left:6px;"></span> Signed/marked route (little to no supportive infrastructure)',
            location: {
                center: [-74.02, 40.745],
                zoom: 12,
                pitch: 0,
                bearing: 28.9,
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: 'showLegendPopup',
            onChapterEnter: [
                {
                    layer: 'CBD-only-fill',
                    opacity: 0.5,
                    duration: 110
                },
                {
                    layer: 'citiBike-point', //CitiBike stations
                    opacity: 1,
                    duration: 100
                },
                {
                    layer: 'bikeLanes-line', //bike lanes
                    opacity: 1,
                    duration: 100
                }
            ],
            onChapterExit: [
                {
                    layer: 'citiBike-point',
                    opacity: 0,
                    duration: 100
                },
                {
                    layer: 'bikeLanes-line',
                    opacity: 0,
                    duration: 100
                }
            ]
        },
        {
            id: 'sixth-chapter',
            alignment: 'left',
            hidden: false,
            title: 'Bus lanes are a work in progress, despite first coming to the zone in the 1980s.',
            description: 'So far, 13 miles of bus lanes<span style="display:inline-block;width:10px;height:10px;background-color:darkred;border-radius:50%;margin-left:4px;"></span> have been implemented across the zone. ' +
                'Most notably, 14th Street, around Union Square, became a busway (allowing limited other vehicle access) in 2019, <a href="https://www.nyc.gov/html/dot/downloads/pdf/connecting-to-the-core.pdf" target="_blank"> resulting in increased ridership and bus speeds</a>.',
            location: {
                center: [-74.02, 40.745],
                zoom: 12,
                pitch: 0,
                bearing: 28.9
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'busLanes-line', //bus lanes (and busways)
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
        {
            id: 'seventh-chapter',
            alignment: 'left',
            hidden: false,
            title: 'Imagine what else we could do with this space...',
            image: 'data/seventeenth.png',
            description: 'Besides the economic benefits already felt and proven, designing streets for uses other than cars has a multitude of benefits<br>'+
            '<br>Paris, France, has worked to replace cars with bike space, and trees, and has seen <a href="https://www.washingtonpost.com/climate-solutions/2025/04/12/air-pollution-paris-health-cars/target="_blank">dramatic improvements</a> to their air quality.<br>'+
            '<br>Check out Transportation Alternatives and their <a href="https://nyc25x25.org/illustrated" target="_blank">Converting Car Space Into Space for People to Transform New York City</a> campaign in advocating for safer, prettier, healthier streets. <br>',
            location: {
                center: [-74.02, 40.745],
                zoom: 12,
                pitch: 0,
                bearing: 28.9
            },
            // mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'all-streets-line', //showing all the  city streets, by street width
                    opacity: 1,
                    duration: 100
                },
            ],
            onChapterExit: [
                {
                    layer: 'all-streets-line',
                    opacity: 0,
                    duration: 100
                }
            ]
        }
    ]
};

document.querySelectorAll('.step').forEach(step => {
    if (!step.textContent.trim()) {
        step.style.display = 'none';
    }
});