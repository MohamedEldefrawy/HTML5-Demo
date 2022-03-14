export {PageGenerator}

class GeoLocationLocator {

    _longitude;
    _latitude;

    get longitude() {
        return this._longitude;
    }

    set longitude(value) {
        this._longitude = value;
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(value) {
        this._latitude = value;
    }


    getCurrentGeoLocation() {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position.coords);
            });
        });
    }
}

class PageGenerator {

    render() {
        let geoLocator = new GeoLocationLocator();
        let latitudeElement = document.getElementById("long-value");
        let longitudeElement = document.getElementById("lat-value");

        geoLocator.getCurrentGeoLocation().then((coords) => {
            geoLocator.longitude = coords.longitude;
            geoLocator.latitude = coords.latitude;
            latitudeElement.innerHTML = geoLocator.latitude;
            longitudeElement.innerHTML = geoLocator.longitude;
        })

    }
}