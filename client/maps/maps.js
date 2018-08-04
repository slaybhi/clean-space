

var markedPoints= [
    {
        latitude: 9.931233,
        longitude:  76.267304,
        level:'critical'
    },
    {
        latitude: 10.015861,
        longitude:  76.341867,
        level: 'on alert' 
    },
    {
        latitude: 10.527642,
        longitude:  76.214435,
        level: 'clean'
    },
    {
        latitude: 10.107570,
        longitude:  76.345662,
        level: 'clean'
    },
];

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hyaXJhbTk4IiwiYSI6ImNqa2Y0NTk0bjAzdGMzcnM3enNsNmM1d24ifQ.QVOrH27sDYsWSZVpLvr6fg';
var map = L.map('map').setView([9.9312, 76.2673], 12);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function loadMarkers(markedPoints) {
    for(var i=0; i< markedPoints.length; i++) {
    new L.marker([markedPoints[i].latitude, markedPoints[i].longitude]).addTo(map)
    .bindPopup(markedPoints[i].level)
    .on('mouseover', function(e){
        this.openPopup();
    })
    .on('mouseout', function(e) {
        this.closePopup();
    });
    }

}

loadMarkers(markedPoints);


// for contributors part


var map2 = L.map('map2').setView([9.9312, 76.2673], 15);
var i = 0;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map2);

map2.on('click', function(e) {
    new L.marker([e.latlng.lat, e.latlng.lng]).addTo(map2)
    .bindPopup('location ' + i)
    .on('mouseover', function(e){
        this.openPopup();
    })
    .on('mouseout', function(e) {
        this.closePopup();
    })
    .on('contextmenu', function(e) {
        map2.removeLayer(this)
    })
    i++;
});

// search feature 

var geocoder = new google.maps.Geocoder();

function findLocation() {
    var textToSearch = document.getElementById('search-bar').value;

    geocoder.geocode( { "address": textToSearch }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
            var location = results[0].geometry.location,
                lat      = location.lat(),
                lng      = location.lng();
                addToMap(lat, lng, textToSearch);
        }
    });
    

}


function addToMap(lat, lng, txt) {
    new L.marker([lat, lng]).addTo(map2)
    .bindPopup(txt)
    .on('mouseover', function(e){
        this.openPopup();
    })
    .on('mouseout', function(e) {
        this.closePopup();
    })
    .on('contextmenu', function(e) {
        map2.removeLayer(this)
    })
}


