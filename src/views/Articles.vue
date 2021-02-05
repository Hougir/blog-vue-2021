<template>
    <div class="articles">
        <banner></banner>
        <div class="site-content animate">
            <!-- 文章目录 -->
<!--            <div id="article-menus">
                <menu-tree :menus="menus" child-label="child"></menu-tree>
            </div>-->
            <main class="site-main">
                <article class="hentry">
                    <!-- 文章头部 -->
                    <header class="entry-header">
                        <!-- 标题输出 -->
                        <h1 class="entry-title">{{blog.title}}</h1>
                        <hr>

                    </header>
                    <!-- 正文输出 -->
                    <div class="entry-content">
                        <p>@[TOC]</p>
                        <h4 id="引言：">引言：</h4>
                        <p>{{blog.summary}}</p>
                        <h4 id="lua-应用场景">{{blog.title}} 应用场景</h4>
<!--                      <article v-html="blog.content" ></article>-->
<!--                      <mavon-editor :ishljs = "true" v-model="blog.content"/>-->
                      <mavon-editor
                          class="md"
                          :value="blog.content"
                          :subfield = "false"
                          :defaultOpen = "'preview'"
                          :toolbarsFlag = "false"
                          :editable="false"
                          :scrollStyle="true"
                          :ishljs = "true"
                          :navigation = "false"
                          :boxShadow = "true"
                          :transition = "true"
                      ></mavon-editor>

                    </div>
                    <!-- 文章底部 -->
                    <section-title>
                        <footer class="post-footer">
                            <!-- 阅读次数 -->
                            <div class="post-like">
                                <i class="iconfont iconeyes"></i>
                                <span class="count">{{ blog.viewsCount }}</span>
                            </div>
                            <!-- 分享按钮 -->
                            <!--                        <div class="post-share">-->
                            <!--                            <ul class="sharehidden">-->
                            <!--                                <li><a href="http://qr.liantu.com/api.php?text=https://zhebk.cn/Web/gongan.html"-->
                            <!--                                       onclick="window.open(this.href, 'renren-share', 'width=490,height=700');return false;"-->
                            <!--                                       class="s-weixin" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/wechat.png"></a></li>-->
                            <!--                                <li>-->
                            <!--                                    <a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
                            <!--                                       onclick="window.open(this.href, 'weibo-share', 'width=730,height=500');return false;"-->
                            <!--                                       class="s-qq" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/qzone.png"></a></li>-->
                            <!--                                <li>-->
                            <!--                                    <a href="http://service.weibo.com/share/share.php?url=https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
                            <!--                                       onclick="window.open(this.href, 'weibo-share', 'width=550,height=235');return false;"-->
                            <!--                                       class="s-sina" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/sina.png"></a></li>-->
                            <!--                                <li>-->
                            <!--                                    <a href="http://shuo.douban.com/!service/share?https://zhebk.cn/Web/gongan.html/&amp;title=公安联网备案记录"-->
                            <!--                                       onclick="window.open(this.href, 'renren-share', 'width=490,height=600');return false;"-->
                            <!--                                       class="s-douban" target="_blank" rel="nofollow noopener noreferrer"><img src="https://cdn.zhebk.cn/usr/themes/Akina/images/douban.png"></a></li>-->
                            <!--                            </ul>-->
                            <!--                            <i class="iconfont show-share"></i>-->
                            <!--                        </div>-->
                            <!-- 赞助按钮 -->
                            <div class="donate" @click="showDonate=!showDonate">
                                <span>赏</span>
                                <ul class="donate_inner" :class="{'show':showDonate}">
                                    <li class="wedonate"><img src="@/assets/img/pay_wechat.jpg"><p>微信</p></li>
                                    <li class="alidonate"><img src="@/assets/img/pay_baby.jpg"><p>支付宝</p></li>
                                </ul>
                            </div>
                            <!-- 文章标签 -->
                            <div class="post-tags">
                                <i class="iconfont iconcategory"></i>
                                <router-link :to="`/category/${blog.title}`" >{{ blog.title }}</router-link>
                            </div>
                        </footer>
                    </section-title>

                  <div class="breadcrumbs">
                    <div id="crumbs">最后更新时间：{{blog.pubTime}}</div>
                  </div>
                    <!--声明-->
                    <div class="open-message">
                        <p>声明：blog-vue-2021博客|版权所有，违者必究|如未注明，均为原创|本网站采用<a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">BY-NC-SA</a>协议进行授权</p>
                        <p>转载：转载请注明原文链接 - <a href="/">{{ blog.title }}</a></p>
                    </div>

                    <!--评论-->
                    <div class="comments">
                        <comment v-for="item in comments" :key="item.comment.id" :comment="item.comment">
                            <template v-if="item.reply.length">
                                <comment v-for="reply in item.reply" :key="reply.id" :comment="reply"></comment>
                            </template>
                        </comment>
                    </div>
                </article>
            </main>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/banner'
    import sectionTitle from '@/components/section-title'
    import comment from '@/components/comment'
    import menuTree from '@/components/menu-tree'
    import {fetchComment} from '../api'
    import {getBlogById} from '../api/Articles'
    export default {
        name: 'articles',
        data(){
          return{
              showDonate: false,
              comments: [],
              menus: [],
            blog: {}
          }
        },
        components: {
            Banner,
            sectionTitle,
            comment,
            menuTree
        },
        methods: {
          //通过id获取数据
          getBlogById(){
            var id = this.$route.params.id
            getBlogById(id).then(res =>{
              if (res.data != null) {
                this.blog = res.data;
              }
            }).catch(err => {
              console.log(err)
            })
          },
          getComment(){
              fetchComment().then(res => {
                  this.comments = res.data || []
              }).catch(err => {
                  console.log(err)
              })
          },
          fetchH(arr,left,right){
              if (right) {
                  return arr.filter(item => item.offsetTop > left && item.offsetTop < right)
              }else {
                  return arr.filter(item => item.offsetTop > left)
              }
          },
          // 生成目录
          /*createMenus(){
              let arr = []
              for(let i=6;i>0;i--){
                  let temp = []
                  let e = document.querySelector(".entry-content").querySelectorAll(`h${i}`)
                  for (let j=0;j<e.length;j++){
                      let child = this.fetchH(arr,e[j].offsetTop,(j+1 === e.length)?undefined:e[j+1].offsetTop)
                      temp.push({
                          h: i,
                          title: e[j].innerText,
                          id: e[j].id,
                          offsetTop: e[j].offsetTop,
                          child
                      })
                  }
                  if (temp.length){
                      arr = temp
                  }
              }
              this.menus = arr
          }*/
        },
        mounted(){
            //this.createMenus()
        },
        created() {
          this.getBlogById()
          this.getComment()
        }
    }
</script>
<style scoped lang="less">
    .site-content {
        position: relative;
        .site-main {
            padding: 80px 0 0 0;
        }
    }
    #article-menus{
        position: sticky;
        top: 0;
        box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
        border-radius: 3px;
        padding: 15px;
        width: 300px;
        transform: translateX(-120%) translateY(150px);
        font-size: 14px;
    }
    article.hentry {
        .entry-header {
            .entry-title {
                font-size: 23px;
                font-weight: 600;
                color: #737373;
                margin: 0.67em 0;

                &:before {
                    content: "#";
                    margin-right: 6px;
                    color: #d82e16;
                    font-size: 20px;
                    font-weight: 600;
                }
            }

            hr {
                height: 1px;
                border: 0;
                background: #EFEFEF;
                margin: 15px 0;
            }

            .breadcrumbs {
                font-size: 14px;
                color: #D2D2D2;
                text-decoration: none;
                margin-bottom: 30px;
            }
        }

        .entry-content {}

        footer.post-footer {
            width: 100%;
            padding: 20px 10px;
            margin-top: 30px;
            height: 65px;
            position: relative;
            i{
                font-size: 18px;
                margin-right: 5px;
            }
            .post-like {
                float: right;
                margin: 7px 0 0 20px;
            }

            .post-share {
                float: right;
                list-style: none;
                margin-right: 20px;
            }

            .donate {
                float: left;
                line-height: 36px;
                border-radius: 100%;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border: 1px solid #2B2B2B;
                &:hover{
                    border: 1px solid goldenrod;
                    span{
                        color: goldenrod;
                    }
                }
                span {
                    color: #2B2B2B;
                    padding: 10px;
                    position: relative;
                    cursor: pointer;
                }

                .donate_inner {
                    display: none;
                    margin: 0;
                    list-style: none;
                    position: absolute;
                    left: 80px;
                    top: -40px;
                    background: #FFF;
                    padding: 10px;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
                    border-radius: 3px;
                    &.show{
                        display: block;
                    }
                    li {
                        float: left;
                    }

                    img {
                        width: 100px;
                    }
                    p {
                        text-align: center;
                        font-size: 15px;
                        color: #D2D2D2;
                        line-height: 1rem;
                    }
                }

                .donate_inner:after, .donate_inner:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 45%;
                    margin-left: -8px;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-right: 8px solid #fff;
                }

                .donate_inner:before {
                    left: -1px;
                    border-right: 8px solid #ddd;
                }

            }

            .post-tags {
                margin: 7px 0 0 20px;
                float: left;
                text-transform: uppercase;
                a:hover{
                    color: #ff6d6d;
                }
            }
        }
        .open-message {
            margin: 50px 0;
            position: relative;
            background: #2B2B2B;
            padding: 10px 30px;
            border-radius: 3px;
            font-size: 14px;
            color: #fff;
            &:after {
                content: "";
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #2B2B2B;
                position: absolute;
                top: -8px;
                left: 48%;
            }
            p {
                margin: 10px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            a {
                color: #A0DAD0;
                padding: 0 5px;
            }
        }
    }
</style>
