function drawMap(elements) {
    let map = L.map('mapVirus').setView([0, 0], 1);
    let geoJson = {
        type: 'FeatureCollection',
        features: elements.map((country = {}) => {
            const { countryInfo = {} } = country;
            const { lat, long: lng } = countryInfo;
            return {
                type: 'Feature',
                properties: {
                ...country,
                },
                geometry: {
                type: 'Point',
                coordinates: [ lng, lat ]
                }
            }
        })
    }
    L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}@2x.png?key=lF8Ri61NL9oYuqPvbVE4',{
        size: 512,
        minZoom: 1
    }).addTo(map);

    let geoJsonLayers = new L.GeoJSON(geoJson, {
        pointToLayer: (feature = {}, latlng) => {
            const { properties = {} } = feature;
            const {
                country,
                cases,
                deaths,
                recovered
            } = properties
            
            let casesString = `${cases}`;

            if ( cases > 1000 ) {
                casesString = `${casesString.slice(0, -3)}k+`
            }

            let html = `
                <span class="icon-marker">
                    <span class="icon-marker-tooltip">
                        <h2>${country}</h2>
                        <ul>
                        <li><strong>Confirmed:</strong> ${cases}</li>
                        <li><strong>Deaths:</strong> ${deaths}</li>
                        <li><strong>Recovered:</strong> ${recovered}</li>
                        </ul>
                    </span>
                    ${casesString}
                </span>
            `

            return L.marker( latlng, {
                icon: L.divIcon({
                    className: 'icon',
                    html
                }),
                riseOnHover: true
            });
        }
    });
    geoJsonLayers.addTo(map)
}