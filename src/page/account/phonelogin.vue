<template>
    <div>
        <headerNav title="手机号登录"/>
        <div style="background:url(https://haitao.nos.netease.com/f866dd18-12f0-4bb2-be6d-5cac85cf2627.png) center 18px no-repeat;background-size:161px;">
            <div style="padding-top: 70px;">
                <van-cell-group>
                    <van-field
                            placeholder="请输入手机号"
                            v-model="phone"
                    />
                    <van-field
                            placeholder="请输入邮箱   (用于接收验证码)"
                            v-model="email"
                    />
                    <van-field
                            center
                            clearable
                            placeholder="请输入短信验证码"
                            v-model="code"
                    >
                        <van-button slot="button" size="small" type="primary" @click="sendVerifycode()"
                                    :disabled="!disabledCodeBtn">{{codeText}}
                        </van-button>
                    </van-field>
                </van-cell-group>
                <div style="margin: 10px;">
                    <van-button size="large" type="primary" style="height: 45px;line-height:45px;" @click="goLogin()">
                        登录
                    </van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmail} from 'vant/es/utils/validate/email'
    import {isMobile} from 'vant/es/utils/validate/mobile'
    import axios from "axios"
    import {mapMutations} from 'vuex';


    function verifyPhone(phone, email, toast) {
        let result = false;
        if (phone == '') {
            toast('手机号不能为空')
        } else if (!isMobile(phone)) {
            window.console.log(phone);
            toast('请输入有效的手机号码')
        } else if (!isEmail(email)) {
            toast('请输入有效的邮箱')
        } else {
            result = true;
        }
        return result;
    }

    export default {
        data() {
            return {
                content: '发送验证码',
                totalTime: 10,
                canClick: true, //添加canClick
                disabledCodeBtn: true,
                password: '',
                phone: "",
                codeText: '获取验证码',
                code: '',
                email: ''
            }
        },
        methods: {
            async sendVerifycode() {
                let phone = this.phone;
                let email = this.email;
                let toast = this.$toast;
                if (!verifyPhone(phone, email, toast)) {
                    window.console.log();
                } else {
                    this.countDown(60)
                    let params = new URLSearchParams();
                    params.append('phone', phone);
                    params.append('email', email);
                    axios({
                        method: 'post',
                        url: 'http://192.168.230.1:8079/home/getCode',
                        params: params,
                    }).then((res) => {
                        window.console.log(res.data);
                        window.console.log(res.data.data)
                        if (res.data.type == 'success') {
                            this.$toast("登录成功");
                            window.console.log(res.data.data());
                        } else {
                            this.$toast(res.data.data)
                        }
                    })
                }
            },
            ...mapMutations(['changeLogin']),
            goLogin() {
                let phone = this.phone;
                let email = this.email;
                let code = this.code;
                let that = this;
                window.console.log(12351411);
                let params = new URLSearchParams();
                params.append('phone', phone);
                params.append('email', email);
                params.append("code", code);
                axios({
                    method: 'post',
                    url: 'http://192.168.230.1:8079/home/userLogin',
                    params: params,
                }).then(res => {
                    window.console.log(res.data.data);
                    if (res.data.type === 'success') {
                        that.$toast("登录成功");
                        that.userToken = 'Bearer ' + res.data.data;
                        // 将用户token保存到vuex中
                        that.changeLogin({Authorization: that.userToken});
                        window.location.pathname = '/'
                    } else {
                        that.$toast(res.data.data)
                    }
                })
            },

            countDown(time) {
                if (time === 0) {
                    this.disabledCodeBtn = true;
                    this.codeText = "获取验证码";
                    return
                } else {
                    this.disabledCodeBtn = false;
                    this.codeText = '重新发送(' + time + ')';
                    time--
                }
                setTimeout(() => {
                    this.countDown(time)
                }, 1000)
            },

        }
    }
</script>

<style>

</style>
