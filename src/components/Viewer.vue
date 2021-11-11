<template>
    <div id="container"></div>
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
        /*this.viewer.addHandler('animation-finish', function(event) {
            // event.eventSource references the viewer
            console.log(event)
        })*/
        //this.viewer.addHandler('tile-loaded', function(event) {
          //  console.log(event)
        //})
        this.viewer.addHandler('open', (viewer) => {
            //this.viewer.world.getItemAt(0).lastDrawn.forEach(x => console.log(x))
            //console.log(viewer)
            let tiledImg = this.viewer.world.getItemAt(0)
            tiledImg.addHandler('fully-loaded-change', function() {
                ///console.log(viewer.eventSource.drawer.canvas.toDataURL())
                let tile = tiledImg.lastDrawn[0]
                //viewer.eventSource.addOverlay(tiledImg.lastDrawn[0])
                let canvas = document.createElement("canvas")
                //div.style.height = tile.bounds.height
                //div.style.width = tile.bounds.width
                /*let overlay = new OpenSeadragon.Overlay({
                    element: div,
                    location: tile.bounds,
                    className: 'overlay'
                })*/
                canvas.id = 'test'
                canvas.className = 'overlay'
                viewer.eventSource.addOverlay({
                    element: canvas,
                    location: tile.bounds,
                })
            })
        })

        
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
        /*viewer: {
            handler() {
                /*this.viewer.addHandler('tile-drawn', function() {
                    this.img = this.viewer.drawer.canvas.toDataURL('image/png')
                    console.log(this.img)
                })
                //console.log(this.viewer.world)
                console.log('test')
                //this.onFinish()
            }
        }*/
    },
    methods: {
        initViewer() {
            this.viewer = OpenSeadragon({
                id: 'container',
                prefixUrl: '//openseadragon.github.io/openseadragon/images/',
                crossOriginPolicy: 'Anonymous'
            })
            //this.getImg()
        },
        onFinish() {
            this.viewer.addHandler('animation-finish', function() {
                console.log(this.viewer.viewport.getBounds())
            })
        }
        /*,
        getImg() {
            this.viewer.addHandler('open', function() {
                this.img = this.viewer.drawer.canvas.toDataURL('image/png')
                console.log(this.img)
            })
        }*/
    }
}
</script>
<style scoped>
    #container {
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