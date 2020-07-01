<template>
    <div>
        <headerNav title="注册"/>
        <div style="background:url(https://haitao.nos.netease.com/f866dd18-12f0-4bb2-be6d-5cac85cf2627.png) center 18px no-repeat;background-size:161px;">
            <div style="padding-top: 70px;">
                <van-cell-group>
                    <van-field
                            placeholder="请输入手机号"
                            v-model="phone"

                    />
                    <van-field
                            center
                            clearable
                            placeholder="请输入短信验证码"
                    >
                        <van-button slot="button" size="small" type="primary" @click="sendVerifycode()"
                                    :disabled="!disabledCodeBtn">{{codeText}}
                        </van-button>
                    </van-field>
                </van-cell-group>
                <div style="margin: 10px;">
                    <van-button size="large" type="primary" style="height: 45px;line-height:45px;">注册</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                content: '发送验证码',
                totalTime: 10,
                canClick: true, //添加canClick
                disabledCodeBtn: true,
                password: '',
                phone: '',
                codeText: '获取验证码'

            }
        },
        methods: {
            async sendVerifycode() {
                let phone = this.phone;
                let reg = /^1[3456789]\d{9}$/;
                if (phone == '') {
                    this.$toast('手机号不能为空')
                } else if (!reg.test(phone)) {
                    this.$toast('请输入有效的手机号码')
                } else {
                    this.countDown(60)
                }
            },

            countDown(time) {
                if (time === 0) {
                    this.disabledCodeBtn = true
                    this.codeText = "获取验证码"
                    return
                } else {
                    this.disabledCodeBtn = false;
                    this.codeText = '重新发送(' + time + ')'
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
