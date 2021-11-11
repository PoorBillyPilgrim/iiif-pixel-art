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
            tile: null
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
            let tiledImg = this.viewer.world.getItemAt(0)
                tiledImg.addHandler('fully-loaded-change', function() {
                    // test adding overlay by grabbing first tile available from lastDrawn array
                    
                    this.tile = tiledImg.lastDrawn[0]
                    console.log(this.tile)
                    let i = 0;
                    this.canvas = document.createElement("canvas")
                    // test adding tags to overlay
                    this.canvas.id = 'tile-' + i
                    this.canvas.className = 'overlay'
                    this.canvas.style.backgroundColor = 'blue'

                    viewer.eventSource.addOverlay({
                        element: this.canvas,
                        location: this.tile.bounds,
                    })
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