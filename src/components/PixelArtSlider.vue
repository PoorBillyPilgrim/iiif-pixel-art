<template>
    <div 
        class="img-comp-slider"
        @mousedown="ready"
        @mouseup="finished"
        @touchstart="ready"
        @touchend="finished"
        @mousemove="move"
    ></div>    
</template>

<script>
export default {
    name: 'PixelArtSlider',
    data() {
        return {
            height: null,
            width: null//,
            //clicked: false
        }
    },
    methods: {
        ready(event) {
            event.preventDefault();
            this.clicked = true;
            console.log(event);
        },
        finished(event) {
            console.log(event)
        },
        move(event) {
            if (!this.clicked) return;
            console.log(this.getCursorPos(event))
        },
        getCursorPos(event) {
            let a, x = 0;
            event = event || window.event;
            /*get the x positions of the image:*/
            a = document.getElementById("pixelitimg").getBoundingClientRect();
            /*calculate the cursor's x coordinate, relative to the image:*/
            x = event.pageX - a.left;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            return x;
        }
    }
}
</script>

<style>
.img-comp-slider {
  position: absolute;
  z-index:9;
  cursor: ew-resize;
  /*set the appearance of the slider:*/
  width: 40px;
  height: 40px;
  background-color: #000;
  opacity: 0.7;
  border-radius: 50%;
}
</style>