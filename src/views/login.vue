<template>
  <div style="width: 500px;align-items: center;margin-left: 37%;margin-top: 10%" >
    <div align="center"> <span style="text-align: center;font-size: 28px">后 台 登 录</span> </div>
    <br>
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
    <el-button style="margin-left: 20%;" type="info" @click="dialogVisible = true"> 微 信 </el-button>

    <el-dialog
        title="微信扫码登录"
        :visible.sync="dialogVisible"
        width="20%"
        top="20vh"
        center="true"
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
</template>
<script>
import wxlogin from 'vue-wxlogin'
import cookie from 'js-cookie'
export default {
  data() {
    return {
      dialogVisible: false,
      labelPosition: 'top',
      form: {
        username: undefined,
        password: undefined,
        smsCode: undefined
      },
      countdown: 60,
      timer: '',
      isShowGetCode: true
    };
  },
  components: {
    wxlogin
  },
  created() {
    if (localStorage.getItem("token") != null && localStorage.getItem("token") != ''){
      //跳转页面
      this.$router.push('/admin/blogs')
    }
  },
  methods: {
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

  }
}
</script>
