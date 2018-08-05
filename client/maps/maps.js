
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
                sendMarker(lat, lng, textToSearch);
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
    });

    console.log('checking');
}


// getting the data from the server
var newRequest = new XMLHttpRequest();

function getMarkers() {
    newRequest.onreadystatechange = function() {
        if(newRequest.readyState === XMLHttpRequest.DONE) {
          if(newRequest.status === 200) {
            var result = newRequest.responseText;
            result = JSON.parse(result);
            parseMarker(result);
          }
        }
      }
      var url = 'http://localhost:3000/getMarker/';
      newRequest.open('GET',url, true);
      newRequest.send(null);
}


function parseMarker(result) {
    for(var i=0; i<result.length; i++) {
        new L.marker([result[i].lat, result[i].lng]).addTo(map)
        .bindPopup(result[i].name)
        .on('mouseover', function(e){
            this.openPopup();
        })
        .on('mouseout', function(e) {
            this.closePopup();
        })
        .on('contextmenu', function(e) {
            map.removeLayer(this)
        });
    
    }
}

function sendMarker(lat, lng, txt) {
    
}

getMarkers();
