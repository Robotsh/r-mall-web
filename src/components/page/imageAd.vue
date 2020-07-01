<template>
    <div>
        <van-swipe :autoplay="3000" v-if="whellList.type=='1'" :style="'height:'+height+'px'">
            <van-swipe-item v-for="(image,index) in whellList.carousels" :key="index">
                <a :href="image.url" v-if="image.type=='1'">
                    <img v-lazy="image.url+''" style="width: 100%;"/>
                </a>
            </van-swipe-item>
        </van-swipe>
<!--                <ul v-if="data.type=='2'">-->
<!--                    <li v-for="(image,index) in data.imagelist" :key="index" class="cap-image-ad__content"-->
<!--                        :style="'margin:'+data.imagegap+'px 0px;'">-->
<!--                        <div class="image-wrapper">-->
<!--                            <a :href="image.url">-->
<!--                                <img alt="" class="cap-image-ad__image" v-lazy="image.src+''"/>-->
<!--                            </a>-->
<!--                        </div>-->
<!--                    </li>-->
<!--                </ul>-->

<!--                        <div v-if="buttonList.type=='5'" class="cap-image-ad__image-nav" style="overflow-x: scroll">-->
<!--                            <div v-for="(item,index) in buttonList.carousels" :key="index" class="cap-image-ad__image-nav"-->
<!--                                 :style="'width:20%;margin-right:'+0+'px;'">-->
<!--                                <a :href="item.link" class="cap-image-ad__link cap-image-ad__link&#45;&#45;image-nav">-->
<!--                                    <div class="cap-image-ad__image">-->
<!--                                        <img :src="item.src+'?w=640'" style="width: 100%; "/>-->
<!--                                    </div>-->
<!--                                </a>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                <div v-if="data.type=='3'||data.type=='4'" class='cap-image-ad__image-nav'-->
<!--                     style='overflow-x:scroll;'>-->
<!--                    <div v-for="(item,index) in data.imagelist" :key="index" class="image-wrapper"-->
<!--                         :style="'width:'+(data.type=='3'?'80':'40')+'%;margin-right:'+data.imagegap+'px;'">-->
<!--                        <a :href="item.link" class="cap-image-ad__link cap-image-ad__link&#45;&#45;image-nav">-->
<!--                            <div class="cap-image-ad__image">-->
<!--                                <img :src="item.src+'?w=640'" style="width: 100%; "/>-->
<!--                            </div>-->
<!--                        </a>-->
<!--                    </div>-->
<!--                </div>-->
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'imageAd',
        components: {},
        props: {
            data: Object
        },

        data() {
            return {
                whellList: [],
                height: 0
            }
        },

        methods: {},
        created() {
            //查询首页的轮播图
            axios({
                method: 'post',
                url: 'http://192.168.230.1:8079/home/carouselList',
                params: {
                    type: 1
                },
            }).then((res) => {
                this.whellList = res.data;
                let that = this;
                let image = res.data.carousels[0];
                window.console.log(image);
                let img = new Image();
                img.src = image.url;
                let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                img.onload = function () {
                    that.height = Math.ceil(img.height / img.width * width);
                }
            });
        }
    }
</script>

<style>

</style>
