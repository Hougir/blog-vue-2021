<template>
    <div id="layout-header" :class="{'fixed':fixed,'hidden':hidden}" @click.stop="mobileShow=false">
        <div class="site-logo">
            <router-link to="/">
                <img src="@/assets/site-logo.svg" alt="">
                <p class="site-name">blog-vue-2021</p>
            </router-link>
        </div>
        <div class="menus-btn" @click.stop="mobileShow=!mobileShow">
            Menus
        </div>
        <div class="site-menus" :class="{'mobileShow':mobileShow}" @click.stop="mobileShow=!mobileShow">
            <div class="menu-item header-search"><header-search/></div>
            <div class="menu-item"><router-link to="/">首页</router-link></div>
            <div class="menu-item hasChild">
                <a href="#">文章</a>
                <div class="childMenu" v-if="category.length">
                    <div class="sub-menu" v-for="item in category" :key="item.title"><router-link :to="`/category/${item.title}`">{{item.title}}</router-link></div>
                </div>
            </div>
            <div class="menu-item"><router-link to="/friend">友链</router-link></div>
            <div class="menu-item"><router-link to="/about">关于</router-link></div>
          <div class="menu-item">
            <span v-if="loginInfo.id">
              <a href="javascript:void(0);" @click="dialogVisible = true">
                <img
                    :src="loginInfo.avatar"
                    width="30"
                    height="30"
                    alt
                    style="margin-top: 10px"
                >
              </a>
            </span>
            </div>

          <el-dialog
              title="用户信息"
              :visible.sync="dialogVisible"
              width="30%"
              top="12vh"
              center
              :modal="false"
              style="margin-left: 1200px;height: 800px;text-align: center"
              align="center"
          >
            <div style="text-align: center">
              <span><img :src="loginInfo.avatar"></span><br><br>
              <span>昵称: {{ loginInfo.nickname }}</span><br><br>
              <span>琴瑟在御，莫不静好</span><br><br>
              <a href="javascript:void(0);">进入后台</a><br><br>
              <a href="javascript:void(0);" @click="logout()">退出</a>
            </div>

          </el-dialog>
        </div>
    </div>
</template>

<script>
    import Utils from '@/assets/js/utils'
    import { getUrlKey } from '@/utils';
    import HeaderSearch from '@/components/header-search'
    import {fetchCategory} from '../../api'
    import cookie from 'js-cookie'
    import {getLoginInfo} from '@/api/login'
    import { mapMutations  } from 'vuex'
    export default {
        name: "layout-header",
        components: {HeaderSearch},
        data() {
            return {
              dialogVisible: false,
                lastScrollTop: 0,
                fixed: false,
                hidden: false,
                category: [],
                mobileShow: false,
              token: '',
              loginInfo: {
                id: '',
                age: '',
                avatar: '',
                mobile: '',
                nickname: '',
                sex: ''
              }
            }
        },
      created() {
        //this.token = this.$route.query.token
        this.token = getUrlKey("token",window.location.href)
        //alert(this.token)
        // 将用户token保存到vuex中
        if (this.token != null && this.token != '') {
          this.changeLogin({ token: this.token})
          this.$router.push('/admin/blogs')
          if (this.token) {
            this.wxLogin()
          }
        }
        this.showInfo()
      },
      computed: {

      },
      mounted(){
            window.addEventListener('scroll', this.watchScroll)
            this.fetchCategory()
        },
        beforeDestroy () {
            window.removeEventListener("scroll", this.watchScroll)
        },
      methods: {
        ...mapMutations ([
          'changeLogin'
        ]),
        getToken(){


        },
        showInfo() {
          //debugger
          var jsonStr = localStorage.getItem("ucenter");
          if (jsonStr != null && jsonStr != '') {
            this.loginInfo = JSON.parse(jsonStr)
          }
        },
        logout() {
          //debugger
          localStorage.setItem('ucenter', null)
          localStorage.setItem('token', null)
          this.dialogVisible = false
          //跳转页面
          window.location.href = "/"
        },
        wxLogin() {
          if (this.token == '' || null == this.token) return
          //把token存在cookie中、也可以放在localStorage中
          localStorage.setItem('token', this.token)
          localStorage.setItem('ucenter', null)
          //登录成功根据token获取用户信息
          getLoginInfo().then(response => {
            this.loginInfo = response.data
            //将用户信息记录cookie
            localStorage.setItem('ucenter', JSON.stringify(this.loginInfo))
          })
        },
          watchScroll() {
              let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
              if (scrollTop===0){
                  this.fixed = false;
              } else if (scrollTop>=this.lastScrollTop){
                  this.fixed = false;
                  this.hidden = true;
              } else {
                  this.fixed = true
                  this.hidden = false
              }
              this.lastScrollTop = scrollTop
          },
          fetchCategory() {
              fetchCategory().then(res => {
                  this.category = res.data
              }).catch(err => {
                  console.log(err)
              })
          }
      }
    }
</script>

<style scoped lang="less">
    #layout-header {
        position: fixed;
        top: 0;
        z-index: 9;
        width: 100%;
        height: 80px;
        padding: 0 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: .3s all ease;
        -webkit-transition: .3s all ease;
        -moz-transition: .3s all linear;
        -o-transition: .3s all ease;
        -ms-transition: .3s all ease;
        &.hidden{
            top: -100px;
        }
        &.fixed{
            background-color: #FFFFFF;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }

    .site-logo {
        text-align: center;

        img {
            width: 60px;
            height: 60px;
        }

        p.site-name {
            font-size: 15px;
            font-weight: bold;
            position: relative;
            top: -10px;
        }
    }
    .menus-btn{
        display: none;
        visibility: hidden;
    }
    .site-menus {
        display: flex;
        align-items: center;

        .menu-item {
            min-width: 60px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            position: relative;
            a{
                padding: 12px 10px;
                color: #545454;
                font-weight: 500;
                font-size: 16px;
                &:hover {
                    color: #ff6d6d;
                }
            }
            &:not(:last-child) {
                margin-right: 15px;
            }
            &.hasChild:hover .childMenu{
                opacity:1;
                visibility: visible;
                transform: translateY(-5px);
            }
        }
        .childMenu{
            width: 130px;
            background-color: #FDFDFD;
            border-radius: 3px;
            border: 1px solid #ddd;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 55px;
            z-index: 2;
            opacity: 0;
            visibility: hidden;
            transition: .7s all ease;
            -webkit-transition: .6s all ease;
            -moz-transition: .6s all linear;
            -o-transition: .6s all ease;
            -ms-transition: .6s all ease;
            &:before,&:after{
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 8px solid white;
                top: -8px;
                left: 20px;
            }
            &:before {
                top: -9px;
                border-bottom: 8px solid #ddd;
            }
            .sub-menu{
                height: 40px;
                line-height: 40px;
                position: relative;
                &:not(:last-child):after{
                    /*position: absolute;*/
                    content: '';
                    width: 50%;
                    height: 1px;
                    color: #ff6d6d;
                    bottom: 0;
                    left: 25%;
                    z-index: 99;
                }
            }
        }
    }
    @media (max-width: 960px){
        #layout-header{
            padding: 0 20px;
        }
    }
    @media (max-width: 600px){
        #layout-header{
            padding: 0 10px;
        }
        .menus-btn{
            display: block;
            visibility: visible;
        }
        .site-menus{
            position: absolute;
            display: none;
            visibility: hidden;
            background-color: #F9F9F9;
            width: 100%;
            left: 0;
            top: 80px;
            z-index: -9;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            .menu-item{
                position: relative;
                height: unset;
                &:not(:last-child) {
                    margin-right: 0;
                }
            }
            .childMenu{
                position: relative;
                width: 100%;
                top: 0;
                background-color: #F3F3F3;
                opacity: 1;
                visibility: visible;
                border: none;
                box-shadow: none;
                &:before,&:after{
                    content: '';
                    position: relative;
                    width: 0;
                    height: 0;
                    border-left: 0;
                    border-right: 0;
                    border-bottom: 0;
                }
            }
        }
        .site-menus.mobileShow{
            display: inline-block;
            visibility: visible;
            z-index: 99;
        }
    }
</style>
