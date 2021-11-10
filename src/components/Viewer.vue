<template>
    <div id="container"></div>
</template>
<script>
import OpenSeadragon from 'openseadragon'


export default {
    name: 'Viewer',
    data() {
        return {
            viewer: null
        }
    },
    mounted: function() {
        this.initViewer()
    },
    methods: {
        async initViewer() {
            //let json = await this.getInfoJson()
            this.viewer = OpenSeadragon({
                id: 'container',
                prefixUrl: '//openseadragon.github.io/openseadragon/images/'
            })
            this.viewer.addTiledImage({
                tileSource: 'https://www.artic.edu/iiif/2/b3974542-b9b4-7568-fc4b-966738f61d78/info.json'
            })
        },
        async getInfoJson(){
            let res = await fetch('https://www.artic.edu/iiif/2/b3974542-b9b4-7568-fc4b-966738f61d78/info.json');
            let json = await res.json()
            return json
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