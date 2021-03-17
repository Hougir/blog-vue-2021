const Mock = require('mockjs');
export default [
    // 站点信息
    {
        url: '/mock/site',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: {
                    avatar: 'https://mybucket-2020-7-21.oss-cn-beijing.aliyuncs.com/blog/%E7%8E%8B%E4%B9%8B%E5%89%91.png',
                    slogan: 'Think like a man of action, act like a man of thought.',
                    name: '浩然剑',
                    domain: 'https://www.yellowhao.top',
                    notice: '语言少一点，思想多一些。要像行动者那样思考，要像思考者那样行动。—亨利·柏格森',
                    desc: '一枚It技术的小学生'
                }
            }
        }
    },
    // 站点社交信息
    {
        url: '/mock/social',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: [
                    {
                        id: 1,
                        title: 'QQ',
                        icon: 'iconqq',
                        color: '#1AB6FF ',
                        href: 'http://wpa.qq.com/msgrd?v=3&uin=974932539&site=qq&menu=yes'
                    },
                    {
                        id: 2,
                        title: 'Gitee',
                        icon: 'icongitee',
                        color: '#d81e06',
                        href: 'https://gitee.com/huanghao1204'
                    },
                    {
                        id: 3,
                        title: 'GitHub',
                        icon: 'icongithub',
                        color: '',
                        href: 'https://github.com/yellowhao1204/blog-vue-2021'
                    },
                    {
                        id: 4,
                        title: 'CSDN',
                        icon: 'iconcsdn',
                        color: 'red',
                        href: 'https://blog.csdn.net/m0_55988151'
                    }
                ]
            }
        }
    }
]
