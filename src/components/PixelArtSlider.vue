<template>
    <div 
        id="img-comp-slider"
        @mousedown="ready"
        @touchstart="ready"
    ></div>    
</template>

<script>
export default {
    name: 'PixelArtSlider',
    props: {
        loadSlider: {
            type: Boolean
        }
    },
    data() {
        return {
            height: null,
            width: null,
            clicked: false
        }
    },
    created: function() {
        window.addEventListener('resize', () => {
            let w, h;
            let img = document.getElementById("img-comp-overlay");
            w = img.offsetWidth;
            h = img.offsetHeight;
            img.style.width = (w / 2) + "px";

            let slider = document.getElementById("img-comp-slider");
            this.repositionSlider(h, w, slider);
        });
    },
    watch: {
        loadSlider: {
            handler() {
                if (this.loadSlider) {
                    this.compareImages();
                    this.width = document.getElementById("pixelitimg").offsetWidth;
                }
            },
            deep: true
        }
    },
    /**
     * 
     * Image comparison slider based on https://www.w3schools.com/howto/howto_js_image_comparison.asp
     * 
     **/
    methods: {
        ready(event) {
            event.preventDefault();
            this.clicked = true;
            window.addEventListener("mousemove", this.move);
            window.addEventListener("touchmove", this.move);
        },
        finished() {
            this.clicked = false;
        },
        move(event) {
            if (!this.clicked) return;
            let pos = this.getCursorPos(event);
            if (pos < 0) pos = 0;
            if (pos > this.width) pos = this.width;
            this.slide(pos);
        },
        slide(x) {
            /*resize the image:*/
            let img;
            img = document.getElementById("img-comp-overlay");
            let slider;
            slider = document.getElementById("img-comp-slider");
            img.style.width = x + "px";
            /*position the slider:*/
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        },
        getCursorPos(event) {
            let a, x = 0;
            event = event || window.event;
            /* get the x positions of the image:*/
            a = document.getElementById("img-comp-overlay").getBoundingClientRect();
            /* calculate the cursor's x coordinate, relative to the image:*/
            x = event.pageX - a.left;
            /* consider any page scrolling:*/
            x = x - window.pageXOffset;
            return x;
        },
        compareImages() {
            document.getElementById("img-comp-slider").style.visibility = "visible";
            let w, h;
            let img = document.getElementById("img-comp-overlay");
            w = img.offsetWidth;
            h = img.offsetHeight;
            img.style.width = (w / 2) + "px";

            let slider = document.getElementById("img-comp-slider");
            this.repositionSlider(h, w, slider);

            window.addEventListener("mouseup", this.finished);
            window.addEventListener("touchup", this.finished);
        },
        repositionSlider(h, w, slider) {
            slider.style.top = (h /2) - (slider.offsetHeight / 2) + "px";
            slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        }
    }
}
</script>

<style>
#img-comp-slider {
  position: absolute;
  z-index:9;
  cursor: ew-resize;
  /* set the appearance of the slider */
  width: 40px;
  height: 40px;
  background-color: #000;
  opacity: 0.7;
  border-radius: 50%;

  visibility: hidden;
}
</style>