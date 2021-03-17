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
                <div><a target="_blank" class="out-link" href="https://www.zbw99.com/class/basketball/">球赛直播</a></div>
            </div>
            <div class="footer-item">
                <div>本站已苟活 {{runTimeInterval}}</div>
                <div><a class="out-link" href="javascript:void(0)" @click="toAdmin">☞后台管理</a></div>
            </div>

          <el-dialog
              title="后台登录"
              center
              :visible.sync="dialogVisible"
              width="40%"
              top="20vh"
              style="height: 800px">
            <div style="width: 66%;align-items: center;margin-left: 16%;margin-top: 1%" >
              <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <el-form-item label="账号">
                  <el-input prefix-icon="el-icon-user" v-model="form.username" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input prefix-icon="el-icon-lock" show-password v-model="form.password" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input prefix-icon="el-icon-phone" type="text" v-model="form.phone" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机验证码">
                  <el-input style="width:70%;" prefix-icon="el-icon-message" v-model="form.smsCode" clearable></el-input>
                  &nbsp;&nbsp;&nbsp;<span v-if="isShowGetCode" class="identiCode" @click="getIdentifyCode">获取验证码</span>
                  <span v-else class="identiCode cancel-pointer">{{countdown }}s后可重试</span>
                </el-form-item>
              </el-form>
              <el-button align="center" style="margin-top: 2%;text-align: center;width: 100%" type="success" @click="login" @keyup.enter.native="login"> 登 录 </el-button>
              <br><br><a href="javascript:void(0);" @click="dialogVisible2 = true" style="margin-left: 47%"><img src="@/assets/img/wx.jpg" width="30" height="30"></a>

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
                  <h2>暂未开放</h2><br>
<!--                  <wxlogin
                      appid="wxed9954c01bb89b47"
                      :scope="'snsapi_login'"
                      :redirect_uri='encodeURIComponent("https://guli.shop/api/ucenter/wx/callback")'
                      :state="'atguigu'"
                      :style="'black'"
                      :href="'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9'"
                      rel="external nofollow">
                  </wxlogin>-->
                  <el-button type="primary" @click="dialogVisible2 = false">账号密码登录</el-button>
                </div>
              </el-dialog>
            </div>

          </el-dialog>
        </div>
        <div class="copyright">| Copyright © 2021 by | <a target="_blank" class="out-link" href="http://blog.yellowhao.top">blog.yellowhao.top</a> | All Rights Reserved |</div>
      <div class="copyright" style="margin-top: 10px"><a target="_blank" class="out-link" href="https://beian.miit.gov.cn">  鄂ICP备2021003585号-1</a></div>
    </div>
</template>

<script>
    import sectionTitle from '@/components/section-title'
    import wxlogin from 'vue-wxlogin'
    import {login, sendSms} from '@/api/login'
    import { mapMutations  } from 'vuex'
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
                phone: undefined,
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
                return this.$store.state.runTimeInterval
            }
        },
        methods:{
          ...mapMutations ([
            'changeLogin'
          ]),
          login() {
            if (!this.checkParams()) {
              this.$message({
                showClose: true,
                message: "请确认信息是否填写",
                type: 'warning'
              });
              return
            }
            login(this.form.username,this.form.password,this.form.smsCode,this.form.phone).then(res =>{
              if (res.code == 20000 && res.data != null) {
                this.$message({
                  showClose: true,
                  message: '恭喜登录成功',
                  type: 'success'
                });
                localStorage.setItem('token',res.data)
                this.dialogVisible = false
                location.reload()
                this.$router.push('/admin/empty')
              }
            }).catch(err => {
              this.$message({
                showClose: true,
                message: err,
                type: 'warning'
              });
            })
          },
            getSocial(){
                this.$store.dispatch('getSocials').then(data =>{
                    this.socials = data
                })
            },
          toAdmin() {
            var token = localStorage.getItem('token')
            if (token) {
              this.$router.push('/admin/empty')
            }else {
              this.dialogVisible = true
            }
          },
          getIdentifyCode() {
            if (!this.form.phone) {
              this.$message({
                showClose: true,
                message: '请填写手机号码',
                type: 'warning'
              });
              return
            }
            if (!/^1[1-9]\d{9}$/.test(this.form.phone)){
              this.$message({
                showClose: true,
                message: '请填写合法的手机号码',
                type: 'warning'
              });
              return
            }
            sendSms(this.form.phone).then(res =>{
              this.countDown()
              this.isShowGetCode = false
              this.$message({
                showClose: false,
                message: res.message,
                type: 'info'
              });
            })

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
          },
          checkParams() {
            if (!this.form.username || !this.form.password || !this.form.smsCode || !this.form.phone){
              return false;
            }
            return true;
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
