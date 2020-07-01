<template>
    <div>
        <headerNav title="登录"/>
        <div style="background:url(https://haitao.nos.netease.com/f866dd18-12f0-4bb2-be6d-5cac85cf2627.png) center 18px no-repeat;background-size:161px;">
            <div style="padding-top: 70px;">
                <van-cell-group>
                    <van-field
                            v-model="tel"
                            type="tel"
                            label="手机号"
                            placeholder="请输入手机号"
                            :error-message="errorMessage.userInput"
                    />
                    <van-field
                            type="password"
                            v-model="password"
                            label="密码"
                            placeholder="请输入密码"
                            :error-message="errorMessage.pwdInput"

                    />
                </van-cell-group>
                <div style="margin: 10px;">
                    <van-button size="large" type="primary" style="height: 45px;line-height:45px;"
                                v-on:click="userLogin()">登录
                    </van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>import axios from 'axios';
import JsEncrypt from 'jsencrypt'

export default {

    props: {
        data: Object,
    },
    data() {
        return {
            buttonList: [],
            tel: '',
            password: '',
            errorMessage: {userInput: "", pwdInput: "", zipCode: ""},
        }
    },

    methods: {


        userLogin() {
            window.console.log(this.phone);
            let params = new URLSearchParams();
            let encrypt = new JsEncrypt()
            // 公钥
            encrypt.setPublicKey(
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkBiZpzUAETelvbe8Q8g8BGjCvEC7i+McdFNlevcThgBsEu+qELhj+bGeAWdmRzOq0hTUBdiNU4ydyai4+Ru1btjzYfIncjlGefbsL7JtVquKhsH5C1AVaaJsKZagZMZUFyZV6QVwCmERYFmP3duq1sqSWA/VFO1MZJ9mCUMj1twD8YN7ftZGW3w2G/xSihq9yZS6ANzTGgdO8TDJsEMLb+uE7A5ymsX8RDwguaI/TkoFt3KcW/YNHlLzmpRJ58+QXz01T4QdkGOQhbKvUzyEaYKW3g7stHcfkq/cwla/GI4PrqcBjLh2laHYQZbdm5DwkWexEsb2VF9Jd1b39M8dywIDAQAB'
            )
            encrypt.setPrivateKey(
                'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQGJmnNQARN6W9t7xDyDwEaMK8QLuL4xx0U2V69xOGAGwS76oQuGP5sZ4BZ2ZHM6rSFNQF2I1TjJ3JqLj5G7Vu2PNh8idyOUZ59uwvsm1Wq4qGwfkLUBVpomwplqBkxlQXJlXpBXAKYRFgWY/d26rWypJYD9UU7Uxkn2YJQyPW3APxg3t+1kZbfDYb/FKKGr3JlLoA3NMaB07xMMmwQwtv64TsDnKaxfxEPCC5oj9OSgW3cpxb9g0eUvOalEnnz5BfPTVPhB2QY5CFsq9TPIRpgpbeDuy0dx+Sr9zCVr8Yjg+upwGMuHaVodhBlt2bkPCRZ7ESxvZUX0l3Vvf0zx3LAgMBAAECggEAZAywoyhpo4q/ybqJPYcKJQWYMJ3Bmp9WYm6FR5vGMoSYhY1ix7k/sV9iFhd1LHrzYGqVzHlPp3M7G4nK5SwYDZ8VXiyEtwqNpKGN3JBG2qbAyFBmWzR/qZjdAQNU2qPaPzie7eyYnpxHNF77RVAAjqKYegyEJsOdB0Cl2EiF2ehZ+eCJvrq+SHyT0VN/xelLSNt+b6sOHVfWjDzmgOIDI5EM/KHw/vgxAtVdho7+rzN85FsOFgYmjUT+d52aYxi9WsjJkV2Ez0tC6mf+0XA6YBpdh9lRzwWYLSETrKj81XZ5NvMHRObM9HGJXOpt+tFiGRx7936KHlprLLIIq9BUAQKBgQDpp75SVLSFea+atCsIRAzwXbFCRGwR8a3K5k4F/ZSehQ/9cHeP3lia2VQvW9aIfH6+y7XK9zw0RPtPCgdo+09Ad5Lps2ZpCwad2FAOcw+BiYBrdvgiknw53MDeCCPcih98Kfl5g2SEEBVw9C4fy+JioinHSj6y0Z0Vedx0wrbXgwKBgQCd4E32OIJD7KE9tnLb9BcRMJ8EGGGlBqaize1H2eErt0GDFcod9c33Op9jtQn5cKgaf/Iuu2K7kz8XzT3szT+t8ycHxamkbSYd8THJ9YO35DZkGV5L4tar0PnKzUzvhvExr/7qBGNUTb+LOgjnunEuo/+BQS6ZwwDMnS3hXM0GGQKBgQCni4Mr4lV4CKPlGSBqUvG8QlLjI9EipNxsS+zS2t0BNoUaxNTXMybyErkNJJuXTz5LbiOzoMlo6bYTHSvnGZ3gql2MevoKhL9/3Ca71cHer0yIwsx3bfbqPuOF0ux0Lg8Zp7eebJtdH3NghZe1cSuqcoHmx9RhwXEUf0eX6i/WJQKBgEsMf8MWJcaITDX77ynkJLsFM/JMbM54FOq7nZpUVpfja38W8pe/a4OlGHPbcbxj82V1gPj6Fvs4CfwUkuVoxGa6eclWC0igokgFijeJQG5ATCLVdF/6mzXeB4CCi5opuap3EWTJZTaEJxPWKLmPhZI4X5NgGvj5G/4okdDZvpSxAoGBANQlCHZLJCLkf4M+Yh0M+ud4qnwwybBOfQq5EoSOLxCwHTO4A8TTKBOx6oghm3eYAvPkxYc62QWBBRuhcNGOgOgrx+AbGcVIZUOm4G28IYb2gAqmkHnyvSWggrGgQuomMWWblcoCoC8DJIeIr4ft9CKrgtpoJ3vVoie3K00CQNXG'
            )
            let Pwd = this.$encruption(this.password);
            window.console.log(encrypt.decrypt('LDfAI+4dQbWozMoH6ScOLnh97apDHqlXudXArbwL2hcyFRycZgP1gLntxLzBNA+mvDyQsAeE/rglGRIGFwb8uShEbC+XKnYJMgr6/BH8NKPoVEgdIQMZHcFCrF4EdPricOC2S6CYLbF3O7AKB9zE6pDjN9Ywa7bndxst6M9X7MK+hJVg0PB9YsjTAvsziglEXt5Jy8vSjL++6B1M6VtPPoHZjeDE5/Gs72tuXGvolxu70oh5F52NFNBj5PnXI9pGTKmtPgj7vQ856qe3ydIncJFfAqqw7I3L4HMxTaiTxQOnOVDbK9hcWPJufyHNZK387hoaUZ4kWiE45HxOeWU+2A=='));
            params.append('password', Pwd);
            params.append('phone', this.tel);
            axios({
                method: 'post',
                url: 'http://192.168.230.1:8079/home/userLogin',
                params: params,
            }).then((res) => {
                if (res.data == 'ok') {
                    this.$router.go(-1);
                } else {
                    this.$Message.error(res.data.message);
                }
            })
        }
    }

}
</script>

<style>

</style>
