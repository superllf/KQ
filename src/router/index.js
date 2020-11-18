import Vue from 'vue'
import VueRouter from 'vue-router'

const login = ()=> import('View/Login/index.vue')
const shopDetail = ()=> import('View/shopDetail.vue')
const newsDetail = ()=> import('View/newsDetail.vue')
const liveDetail = ()=> import('View/liveDetail.vue')
const onloadDetail = ()=> import('View/onloadDetail.vue')
const groupDetail = ()=> import('View/groupDetail.vue')
const flowerDetail = ()=> import('View/flowerDetail.vue')
const joinGroup = ()=> import('View/joinGroup.vue')
const intagralDetail = ()=> import('View/intagralDetail.vue')
const agreement = ()=> import('View/agreement.vue')
const share = ()=> import('View/share.vue')

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: login,
	},
	{
		path: '/login',
		name: 'login',
		component: login,
	},
	{
		path: '/shopDetail',
		name: 'shopDetail',
		title:"产品详情",
		component: shopDetail,
	},
	{
		path: '/newsDetail',
		name: 'newsDetail',
		title:"资讯详情",
		component: newsDetail,
	},
	{
		path: '/liveDetail',
		name: 'liveDetail',
		title:"直播课程介绍",
		component: liveDetail,
	},
	{
		path: '/onloadDetail', 
		name: 'onloadDetail',
		title:"线下课程详情",
		component: onloadDetail,
	},
	{
		path: '/groupDetail', 
		name: 'groupDetail',
		title:"拼团限时优惠免费课程详情",
		component: groupDetail,
	},
	{
		path: '/flowerDetail', 
		name: 'flowerDetail',
		title:"花絮详情",
		component: flowerDetail,
	},
	{
		path: '/joinGroup', 
		name: 'joinGroup',
		title:"拼团",
		component: joinGroup,
	},
	{
		path: '/intagralDetail', 
		name: 'intagralDetail',
		title:"积分课程详情",
		component: intagralDetail,
	},
	{
		path: '/agreement', 
		name: 'agreement',
		title:"用户协议",
		component: agreement,
	},
	{
		path: '/share', 
		name: 'share',
		title:"分享落地页",
		component: share,
	},
]

const router = new VueRouter({
  routes
})

export default router
