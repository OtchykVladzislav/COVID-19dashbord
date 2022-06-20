function drawMap() {
    let map = L.map('mapVirus').setView([0, 0], 1);
    L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}@2x.png?key=lF8Ri61NL9oYuqPvbVE4',{
        size: 512,
        minZoom: 1
    }).addTo(map);
}