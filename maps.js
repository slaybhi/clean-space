mapboxgl.accessToken = 'pk.eyJ1Ijoic2hyaXJhbTk4IiwiYSI6ImNqa2Y0NTk0bjAzdGMzcnM3enNsNmM1d24ifQ.QVOrH27sDYsWSZVpLvr6fg';
var map = L.map('map').setView([9.9312, 76.2673], 14);
var i = 0;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function(e) {
    new L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
    .bindPopup('location ' + i)
    .on('mouseover', function(e){
        this.openPopup();
    })
    .on('mouseout', function(e) {
        this.closePopup();
    })
    .on('contextmenu', function(e) {
        map.removeLayer(this)
    })
    i++;

});

new L.marker([10.028413, 76.328717]).addTo(map)
    .bindPopup('model engineering college')
    .on('mouseover', function(e){
        this.openPopup();
    })
    .on('mouseout', function(e) {
        this.closePopup();
    });

