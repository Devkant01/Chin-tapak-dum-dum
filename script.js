const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// pre-load all images
const frames = {
    curIndex: 0,
    maxIndex: 293
};

let imgLoaded = 0;
const images = [];

function preLoader() {
    //loading all images
    for (var i = 0; i <= frames.maxIndex; i++) {
        const img = new Image();
        img.src = `./images/frame_${(i + 1).toString().padStart(4, '0')}.jpeg`;
        img.onload = () => {
            console.log(imgLoaded);
            if (imgLoaded === frames.maxIndex) {
                console.log("All Images Loaded Successfully");
                loadImage(frames.curIndex); //After loading current index of currently loaded image
                startAnimation();
            }
            imgLoaded++;
        }
        images.push(img);
    }    
}

function loadImage(index) {
    if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];

        //scaling images such that each time image take full width and height of canvas.
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        // to show images at center of canvas
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        // draw image on canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingQuality = "high";
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.curIndex = index;

    }
}

function startAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            // markers: true
        }
    });

    tl.to(frames, {
        curIndex: frames.maxIndex,
        onUpdate: function () {
            loadImage(Math.floor(frames.curIndex));
            console.log("hi: ",Math.floor(frames.curIndex));
        }
    });
}

gsap.to(".container .firstPart", {
    backgroundPositionX: "0%",
    stagger: 1,
    scrollTrigger: {
        trigger: ".container",
        scrub: 1,
        start: "top 80%",
        end: "bottom bottom",
        pin: true
    }
});


preLoader()
