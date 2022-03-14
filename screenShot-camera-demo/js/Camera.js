class Camera {
    _video;
    _canvas;
    _screenShot;


    constructor() {
        this._screenShot = document.getElementById("screenShot-img");
        this._canvas = document.getElementById("screenShotArea");
        this._video = document.getElementById("videoElement");
    }

    setImageFromLocalStorage() {
        if (localStorage.image) {
            this._screenShot.src = localStorage.image;
        }
    }

    async startCamera() {
        this._screenShot = document.getElementById("screenShot-img");
        this._canvas = document.getElementById("screenShotArea");
        this._video = document.getElementById("videoElement");

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false},)
            this._video.srcObject = stream;
        }
    }

    takeScreenShot() {
        this._screenShot = document.getElementById("screenShot-img");
        this._canvas = document.getElementById("screenShotArea");
        this._video = document.getElementById("videoElement");

        this._canvas.width = this._video.videoWidth;
        this._canvas.height = this._video.videoHeight;

        let context = this._canvas.getContext("2d");
        context.drawImage(this._video, 0, 0, this._canvas.width, this._canvas.height);

        // Other browsers will fall back to image/png
        let imgAsStr = this._canvas.toDataURL("image/webp");
        this._screenShot.src = imgAsStr;

        if (!localStorage.getItem("image")) {
            localStorage.setItem("image", this._screenShot.src)
        }
    }

    stopCamera() {

        this._screenShot = document.getElementById("screenShot-img");
        this._canvas = document.getElementById("screenShotArea");
        this._video = document.getElementById("videoElement");

        let tracks = this._video.srcObject.getTracks();


        this._video.srcObject = null;
    }


}

window.addEventListener('load', () => {
    let camera = new Camera();
    let btnScreenShot = document.getElementById("btnScreenShot");
    let btnStop = document.getElementById("btnStop");
    let btnStart = document.getElementById("btnStartCamera");

    btnScreenShot.addEventListener('click', camera.takeScreenShot);
    btnStop.addEventListener('click', camera.stopCamera);
    btnStart.addEventListener('click', camera.startCamera);
});