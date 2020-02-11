<template>
<!--        <div :class='(data.type == "1" ? "cap-image-ad__image-nav" : "cap-image-ad__slide cap-image-ad__text-nav")'-->
<!--             :style='"overflow-x:"+(data.showtype == "1" ? "hidden" : "scroll")+"; background-color:"+data.backgroundcolor'>-->
<!--            <div v-if="data.type == '1'" v-for="(item,index)  in data.imagelist" :key="index" class="image-wrapper"-->
<!--                 :style="'width:'+ data.width+'%; margin-right: 0px;'">-->
<!--                <a :href="item.link" class="cap-image-ad__link cap-image-ad__link&#45;&#45;image-nav" :style="'color:'+data.color">-->
<!--                    <div class="cap-image-ad__image">-->
<!--                        <img v-lazy="item.src+'?w=320'" style="width: 100%; "/>-->
<!--                    </div>-->
<!--                    <h3 v-if="item.title!=''" class="cap-image-ad__nav-title">{{item.title}}</h3>-->
<!--                </a>-->
<!--            </div>-->
<!--            <a v-if="data.type=='2'" v-for="(item,index) in data.imagelist" :key="index" :href="item.link"-->
<!--               class="text-nav-wrapper"-->
<!--               :style="'width:'+data.width+'%; color: '+data.color+'; background-color: '+data.backgroundcolor"><h3-->
<!--                    class="cap-image-ad__nav-title">{{item.title}}</h3></a>-->
<!--        </div>-->
    <div :class='(buttonList.type == "2" ? "cap-image-ad__image-nav" : "cap-image-ad__slide cap-image-ad__text-nav")' :style='"overflow-x:hidden; background-color:"+buttonList.backgroundcolor'>
        <div v-if="buttonList.type == '2'" v-for="(item,index)  in buttonList.carousels" :key="index" class="image-wrapper" :style="'width:'+ data.width+'%; margin-right: 0px;'">
            <a :href="item.url"  class="cap-image-ad__link cap-image-ad__link--image-nav" :style="'color:'+buttonList.color">
                <div class="cap-image-ad__image">
                    <img v-lazy="item.url+'?w=320'" style="width: 100%; "/>
                </div>
            </a>
        </div>
<!--        <a v-if="data.type=='2'" v-for="(item,index) in data.imagelist" :key="index" :href="item.link" class="text-nav-wrapper" :style="'width:'+data.width+'%; color: '+data.color+'; background-color: '+data.backgroundcolor">-->
<!--            <h3 class="cap-image-ad__nav-title">{{item.title}}-->
<!--            </h3>-->
<!--        </a>-->
    </div>
</template>

<script>
    import axios from 'axios';




    export default {

        name: 'imageText',
        props: {
            data: Object
        },
        data() {
            return {
                buttonList: [],
                height: 0
            }
        },
        created: function () {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8079/home/carouselList',
                params: {
                    type: 2
                },
            }).then((res) => {
                this.buttonList = res.data;
                // console.log(res.data.carousels);

            })
            // var length = res.data.carousels.length / 2;
            // if (true) {
            //     width = 100 / 5;
            // } else {
            //     width = (100 * 0.95) / (this.data.shownumber - 1);
            // }
            let width = 100 /5;
            this.data.width = width;
        }
    }
</script>

<style>

</style>
