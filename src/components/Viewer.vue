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
            viewer: null
        }
    },
    mounted: function() {
        this.initViewer()
    },
    watch: {
        infoJson: {
            handler() {
                /*this.viewer.addTiledImage({
                    tileSource: this.infoJson
                })*/
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
                id: 'container',
                prefixUrl: '//openseadragon.github.io/openseadragon/images/'
            })
            console.log(this.viewer.world)
        }
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
</style>