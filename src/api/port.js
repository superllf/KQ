import service from '@/http/net.js'

// 查询产品详情 
export function productDetail(data) {
	return service({
		url: '/cms/product/detail',
		method: 'get',	
		params:data
	})
}


// 查询资讯详情 
export function informationDetail(data) {
	return service({
		url: '/cms/information/detail',
		method: 'get',	
		params:data
	})
}

// 搜索最热资讯列表 
export function informationHot(data) {
	return service({
		url: '/cms/information/hot',
		method: 'get',	
		params:data
	})
}

// 检查是否已收藏该资讯 
export function informationCheck(data) {
	return service({
		url: '/user/collect/information/check',
		method: 'get',	
		params:data
	})
}

// 收藏资讯 
export function informationCollect(data) {
	return service({
		url: '/user/collect/information',
		method: 'post',	
		data:data
	})
}


// 课程详情 
export function courseDetail(data) {
	return service({
		url: '/education/course/detail',
		method: 'get',	
		params:data
	})
}


// 查询课程评价列表 
export function appraiseList(data) {
	return service({
		url: '/ecommerce/appraise/course',
		method: 'get',	
		params:data
	})
}

// 查询花絮详情 
export function fragmentDetail(data) {
	return service({
		url: '/cms/fragment/detail',
		method: 'get',	
		params:data
	})
}


// 查询花絮评论 
export function fragmentcommentDetail(data) {
	return service({
		url: '/cms/fragment-comment',
		method: 'get',	
		params:data
	})
}



// 花絮 点赞
export function fragmentlike(data) {
	return service({
		url: '/cms/fragment-like',
		method: 'put',	
		params:data
	})
}


// 花絮 取消点赞
export function fragmentdislike(data) {
	return service({
		url: '/cms/fragment-like/dislike',
		method: 'put',	
		params:data
	})
}

// 花絮评论 点赞
export function fragmentcommentlike(data) {
	return service({
		url: '/cms/fragment-comment-like',
		method: 'put',	
		params:data
	})
}


// 花絮评论 取消点赞
export function fragmentcommentdislike(data) {
	return service({
		url: '/cms/fragment-comment-like/dislike',
		method: 'put',	
		params:data
	})
}


// 查询拼团订单详情 
export function tradeDetail(data) {
	return service({
		url: '/ecommerce/trade-promotion/detail',
		method: 'get',	
		params:data
	})
}


// 查询协议详情 
export function commonDetail(data) {
	return service({
		url: '/common/pt-config',
		method: 'get',	
		params:data
	})
}

