<template>
    <div>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="- 没有更多了 -"
                @load="onLoad"
                :offset="130"
        >
            <ul :class="'cap-goods-list__container cap-goods-list__container--'+data.classname+' cap-goods-list__container--'+data.ParameterDictionary.showtype+'   '+(data.ParameterDictionary.type=='6'?'nowrap':'')">
                <li v-if="productlist.length==0" style="width:100%;height:150px;border:0px;">
                    <div style="width:100%;height:150px;"></div>
                </li>
                <li v-for="(item,index) in productlist" :key="index"
                    :class="'cap-goods-list__wrapper  '+(data.ParameterDictionary.type=='3'?(index%3==0?'cap-goods-list__wrapper--hybrid-big ':'cap-goods-list__wrapper--hybrid-small '):'')">

                    <router-link
                            :class="'cap-goods-list__item cap-goods-list__item--'+data.classname+' '+data.ParameterDictionary.showtype+' '+data.aclass"
                            :to="'/product/'+item.sku">
                        <div class="cap-goods-list__photo">
                            <img class="cap-goods-list__img lazy lazyload"
                                 v-lazy="item.img+'?w='+((data.ParameterDictionary.type=='1'||data.ParameterDictionary.type=='3')?'750':'375')"/>
                        </div>
                        <div :class="'cap-goods-list__info has-title has-price '+(data.ParameterDictionary.showtype == 'card'?'has-btn':'')">
                            <h3 style="text-align: center" class="title">{{item.title}}</h3>
                            <p class="sale-info">
                                <span class="sale-price">¥ {{item.price}}</span>
                            </p>
                        </div>
                        <div v-if="data.ParameterDictionary.showtype == 'card'"
                             class="cap-goods-list__buy-btn-wrapper cap-goods-list__buy-btn-wrapper--4">
                            <button class="cap-goods-list__buy-btn-4 van-button van-button--default van-button--small">
                                {{data.ParameterDictionary.buttonvalue}}
                            </button>
                        </div>
                    </router-link>
                </li>
            </ul>
        </van-list>
        <div style="clear:both;"></div>
    </div>
</template>

<script>
    import {getProduct} from "../../api/page.js";
    import axios from 'axios';
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import {List} from 'vant';

    Vue.use(List);

    export default {
        name: 'product',
        data() {
            return {
                productlist: [],
                loading: false,
                finished: false,
                page: 1,//请求第几页
                pageSize: 4,//每页请求的数量
                total: 0,//总共的数据条数
                rows: {},
                noData: false, // 如果没有数据，显示暂无数据
                isLoading: false
            }
        },
        props: {
            data: Object,
        },
        created: function () {
            this.getRoadList();
            let id = this.data.PageSectionId;
            let data = this.data;
            let classname = "big";
            let aclass = "";
            switch ("2") {

                case "1":
                    aclass = "cap-goods-list__item--btn1 cap-goods-list__item--ratio-3-2 cap-goods-list__item--whitespace";
                    break;
                case "2":
                    classname = "small";
                    aclass = "cap-goods-list__item--btn1 cap-goods-list__item--padding";
                    break;
                case "3":
                    classname = "hybrid";
                    aclass = "cap-goods-list__item--big cap-goods-list__item--hybrid-big cap-goods-list__item--btn1 cap-goods-list__item--padding";
                    break;
                case "4":
                    classname = "list";
                    aclass = "cap-goods-list__item--btn4 cap-goods-list__item--padding";
                    break;
                case "5":
                    classname = "three";
                    aclass = "cap-goods-list__item--btn4 cap-goods-list__item--padding";
                    break;
                case "6":
                    classname = "three";
                    break;
            }
            data.classname = classname;
            data.aclass = aclass;
            getProduct(id).then(response => {
                this.productlist = response;
            })
        },
        methods: {
            getRoadList() {
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8079/home/productList',
                    params: {
                        page: this.page,
                        limit: this.pageSize
                    },
                }).then((res) => {
                    this.loading = false;
                    this.productlist = this.productlist.concat(res.data);
                    this.page++;
                    // 如果没有数据，显示暂无数据
                    if (this.productlist.length === 0 && this.page === 1) {
                        this.noData = true;
                    }
                    // 如果加载完毕，显示没有更多了
                    if (res.data.length === 0) {
                        this.finished = true;
                    }
                });
            },
            onLoad() {
                setTimeout(() => {
                    this.getRoadList();
                    this.loading = true
                }, 500)
            },
            onRefresh() {
                setTimeout(() => {
                    // 重新初始化这些属性
                    this.isLoading = false;
                    this.productlist = [];
                    this.page = 1;
                    this.loading = false;
                    this.finished = false;
                    this.noData = false;
                    // 请求信息
                    this.getRoadList()
                }, 5000)
            }
        },
    }

</script>


