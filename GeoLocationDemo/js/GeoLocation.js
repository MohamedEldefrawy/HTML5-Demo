// export {PageGenerator}

class GeoLocationLocator {

    _longitude;
    _latitude;


    constructor() {
        this._longitude = 0;
        this._latitude = 0;
    }

    get longitude() {
        console.log("Getter called");
        return this._longitude;
    }

    set longitude(value) {
        console.log("Setter called");
        this._longitude = value;
    }

    get latitude() {
        console.log("Getter called");
        return this._latitude;
    }

    set latitude(value) {
        console.log("Setter called");
        this._latitude = value;
    }

    getCurrentGeoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this._latitude = position.coords.latitude;
                this._longitude = position.coords.longitude;
                // console.log("location reached");
            });
        } else {
            window.alert("Geolocation is not supported by this browser.");
        }
    }
}

class PageGenerator {
    geoLocator;
    longitudeElement;
    latitudeElement;

    constructor() {
        this.geoLocator = new GeoLocationLocator();
        this.latitudeElement = document.getElementById("long-value");
        this.longitudeElement = document.getElementById("lat-value");
    }

    render() {
        this.geoLocator.getCurrentGeoLocation()
        this.latitudeElement.innerHTML = this.geoLocator.latitude;
        this.longitudeElement.innerHTML = this.geoLocator.longitude;

        console.log(this);
    }
}

window.addEventListener('load', (event) => {
    new PageGenerator().render();
});
