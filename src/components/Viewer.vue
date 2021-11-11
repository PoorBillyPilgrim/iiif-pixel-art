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
            img: null
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
                    let tile = tiledImg.lastDrawn[0]
                    let canvas = document.createElement("canvas")
                    // test adding tags to overlay
                    canvas.id = 'test'
                    canvas.className = 'overlay'
                    canvas.style.backgroundColor = 'blue'
                    viewer.eventSource.addOverlay({
                        element: canvas,
                        location: tile.bounds,
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