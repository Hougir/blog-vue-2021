<template>
    <div id="layout-footer">
        <div class="footer-main">
            <div class="footer-item" v-if="socials.length">
                <div v-for="item in socials" :key="item.id"><a target="_blank" class="out-link" :href="item.href"><i class="iconfont" :class="item.icon"></i>{{item.title}}</a></div>
            </div>
            <div class="footer-item">
                <div style="font-size:17px;font-weight: bold;">资源</div>
                <div><a target="_blank" class="out-link" href="https://segmentfault.com/weekly?utm_source=sf-footer">每周精选</a></div>
                <div><a target="_blank" class="out-link" href="https://www.jmjc.tech/">简明教程</a></div>
                <div><a target="_blank" class="out-link" href="https://www.liaoxuefeng.com/">sdssa的官方网站</a></div>
            </div>
            <div class="footer-item">
                <div>本站已苟活 {{runTimeInterval}}</div>
                <div><a class="out-link" href="javascript:void(0)" @click="dialogVisible = true">☞后台管理</a></div>
            </div>

          <el-dialog
              title="后台登录"
              :visible.sync="dialogVisible"
              width="40%"
              top="20vh"
              style="height: 800px">
            <div style="width: 500px;align-items: center;margin-left: 16%;margin-top: 1%" >
              <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <el-form-item label="账号">
                  <el-input prefix-icon="el-icon-user" v-model="form.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input prefix-icon="el-icon-lock" show-password v-model="form.password" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机验证码">
                  <el-input style="width:398px;" prefix-icon="el-icon-message" v-model="form.smsCode" clearable></el-input>
                  &nbsp;&nbsp;&nbsp;<span v-if="isShowGetCode" class="identiCode" @click="getIdentifyCode">获取验证码</span>
                  <span v-else class="identiCode cancel-pointer">{{countdown }}s后可重试</span>
                </el-form-item>
              </el-form>
              <el-button style="margin-left: 20%;margin-top: 10%" type="success"> 登 录 </el-button>
              <el-button style="margin-left: 20%;" type="info" @click="dialogVisible2 = true"> 微 信 </el-button>

              <el-dialog
                  title="微信扫码登录"
                  :visible.sync="dialogVisible2"
                  width="20%"
                  center
                  top="11%"
                  :modal="false"
                  style="height: 600px"
                  append-to-body
              >
                <div style="text-align: center">
                  <wxlogin
                      appid="wxed9954c01bb89b47"
                      :scope="'snsapi_login'"
                      :redirect_uri='encodeURIComponent("http://guli.shop/api/ucenter/wx/callback")'
                      :state="'atguigu'"
                      :style="'black'"
                      :href="'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9'"
                      rel="external nofollow">
                  </wxlogin>
                  <el-button type="primary" @click="dialogVisible = false">账号密码登录</el-button>
                </div>
              </el-dialog>
            </div>

          </el-dialog>
        </div>
        <div class="copyright">Copyright © 2021 by <a target="_blank" class="out-link" href="https://www.yellowhao.top">yellowhao.top</a> . All rights reserved. | <a target="_blank" class="out-link" href="http://www.beian.miit.gov.cn">渝ICP备17015355号-1</a></div>
    </div>
</template>

<script>
    import sectionTitle from '@/components/section-title'
    import wxlogin from 'vue-wxlogin'
    export default {
        name: "layout-footer",
        data(){
            return{
                socials: [],
              dialogVisible: false,
              dialogVisible2: false,
              labelPosition: 'top',
              form: {
                username: undefined,
                password: undefined,
                smsCode: undefined
              },
              countdown: 60,
              timer: '',
              isShowGetCode: true
            }
        },
        components:{
            sectionTitle,
            wxlogin
        },
        computed:{
            runTimeInterval() {
                return this.$store.state.runTimeInterval;
            }
        },
        methods:{
            getSocial(){
                this.$store.dispatch('getSocials').then(data =>{
                    this.socials = data
                })
            },
          getIdentifyCode() {
            this.countDown()
            this.isShowGetCode = false
            alert("验证码为:666666")
          },
          countDown() {
            const self = this
            this.timer = setInterval(() => {
              self.countdown--
              if (self.countdown === 0) {
                clearInterval(self.timer)
                self.countdown = 60
                self.isShowGetCode = true
              }
            }, 1000)
          }
        },
        created(){
            this.getSocial();
            this.$store.dispatch('initComputeTime');
        }
    }
</script>

<style scoped lang="less">
#layout-footer{
    padding: 2%;
    border-top: 1px solid #F7F7F7;
    font-size: 13px;
    color: #9c9c9c;
    a.out-link:hover{
        color: #ff6d6d;
    }
    .footer-main{
        max-width: 800px;
        margin: 0 auto 20px auto;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        .footer-item{
            flex: 1;
            & > div:not(:last-child){
                margin-bottom: 10px;
            }
            i{
                margin-right: 10px;
            }
        }
    }
    .copyright{
        text-align: center;
    }
}
    /*****/
    @media (max-width: 800px){
        #layout-footer{
            .footer-main .footer-item:nth-child(3){
                flex: 2;
            }
        }
    }
    @media (max-width: 600px){
        #layout-footer{
            .footer-main {
                display: block;
                .footer-item{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-wrap: wrap;
                    & > div{
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
    /*****/
</style>
