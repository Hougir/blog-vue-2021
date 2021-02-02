import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Utils from '../assets/js/utils'

Vue.use(VueRouter)

export const constantRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页'}
    },
    /*{
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
        meta: { title: '后台登录'}
    },*/
    {
        path: '/category/:cate',
        name: 'category',
        component: () => import('../views/Home'),
        meta: { title: '分类', params: 'cate'}
    },
    {
        path: '/search/:words',
        name: 'search',
        component: () => import('@/views/Home'),
        meta: { title: '搜索', params: 'words'}
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About'),
        meta: { title: '关于'}
    },
    {
        path: '/friend',
        name: 'friend',
        component: () => import('@/views/Friend'),
        meta: { title: '友链'}
    },
    {
        path: '/article/:id',
        name: 'article',
        component: () => import('@/views/Articles'),
        meta: { title: '文章'}
    },
    {
        path: '/admin/empty',
        name: 'empty',
        component: () => import('@/views/admin/empty'),
        meta: { title: '博客列表',requireAuth: true}
    },
    {
        path: '/admin/blogs',
        name: 'blogs',
        component: () => import('@/views/admin/blogs'),
        meta: { title: '博客列表',requireAuth: true}
    }
]
const createRouter = () => new VueRouter({
    //mode: 'history',
    base: process.env.NODE_ENV,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()

router.beforeEach((to, from, next) => {
    // 默认requiresAuth为false才不需要登录，其他都要
    // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
    if (to.matched.some(r => r.meta.requireAuth) !== false) {
        let token = localStorage.getItem('token')
        if (token) {
            console.log("有token==>" + token.toString())
            next();
        } else {
            localStorage.removeItem('token')
            next({
                path: "/",
                query: {
                    redirect: to.fullPath
                } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
            });
        }
    } else {
        next(); //如果无需token,那么随它去吧
    }


    let title = 'blog-vue-2021'
    if (to.meta.params){
        title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
    }else {
        title = `${to.meta.title} - ${title}`
    }
    document.title = title
    if (to.path == "/") {
        Utils.$emit('page',undefined)
    }
    if (to.path !== from.path) {
        store.dispatch('setLoading', true);
    }

})
router.afterEach((to, from) => {
    // 最多延迟 关闭 loading
    setTimeout(() => {
        store.dispatch('setLoading', false);
    }, 500)
})
export default router
