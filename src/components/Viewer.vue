<template>
    <div id="openseadragon"></div>
</template>
<script>
import OpenSeadragon from 'openseadragon'


export default {
    name: 'Viewer',
    props: {
        infoJson: String
    },
    data() {
        return {
            viewer: null,
            canvas: null,
            tiledImage: null
        }
    },
    mounted: function() {
        this.initViewer()
    },
    watch: {
        infoJson: {
            handler() {
                this.viewer.open({
                    tileSource: this.infoJson
                })
            },
            deep: true
        }
    },
    methods: {
        initViewer() {
            this.viewer = OpenSeadragon({
                id: 'openseadragon',
                prefixUrl: '//openseadragon.github.io/openseadragon/images/',
                crossOriginPolicy: 'Anonymous'
            })
            this.addOverlay()
            
        },
        addOverlay() {
            this.viewer.addHandler('open', (viewer) => {
                this.tiledImage = this.viewer.world.getItemAt(0)
                this.canvas = document.createElement("canvas")
                // test adding tags to overlay
                this.canvas.id = 'pixelitcanvas'
                this.canvas.className = 'overlay'
                this.canvas.style.backgroundColor = 'blue'
                this.canvas.style.opacity = '0.5'
                viewer.eventSource.addOverlay({
                    element: this.canvas,
                    location: this.tiledImage.getBounds()
                })
            })
        }
    }
}
</script>
<style scoped>
    #openseadragon {
        height: 500px;
        width: 100%;
    }

    .openseadragon-canvas:focus {
        outline: none;
    }

    .overlay {
        background-color: blue;
    }
</style>