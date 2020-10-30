<template>
	<view class="x12" style="padding:35upx 25upx 15upx 25upx; width: 700upx;">
		<view class="x12" style="margin-bottom:20upx;" v-for="(item,index) in cl_list" :key="index" @click="goDetails(item)">
			<image :src="item.img_big" mode="" style="width: 700upx; height: 260upx; float: left; border-radius: 10upx;"></image>
		</view>
	</view>
</template>

<script>import url from '../../main.js';
	export default {
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {//分享
			try {//从本地缓存中同步获取指定 key 对应的内容。
				var mv = uni.getStorageSync('memberinfo');
				var xv = uni.getStorageSync('xshopInfo');
				if (res.from === 'button') {// 来自页面内分享按钮
				  console.log(res.target)
				}
				return {
				  title: xv.store.stores_name,
				  path: '/pages/home/index?member_openid='+mv.openid+"&stores_id="+xv.store.stores_id
				}
			} catch (e) {
				// error
			}
			
		  },
		//#endif
		data() {
			return {
			login:false,
			memberinfo:[],
			xshopInfo:[],
			cl_list:[],
			limit:30,
			page:0,
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				//console.log(values);
				if(values){
					this.xshopInfo = values;
					this.stores_name = values.store.stores_name;
				}
				if (value) {
					this.memberinfo = value;
					this.login = true;
				}				
			} catch (e) {
				// error
			}
			uni.setNavigationBarTitle({
				title: data.title
			});
			this.getCk();
		},
		onPullDownRefresh(){
			this.cl_list = [];
			this.limit = 30;
			this.page = 0;
			this.getCk();
			uni.stopPullDownRefresh();
			return;
		},
		onReachBottom() {
		    this.getCk();
		},
		methods: {
			//跳转到详情
			goDetails(data){
				uni.navigateTo({
					url:"../home/ck_details?once_card_id="+data.once_card_id+"&title="+data.title
				});
			},
			getCk(action = 'add'){
				//获取信息
				var arr ={
						channel:2,
						limit:this.limit,
						offset:this.page*this.limit,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/once_cards/index',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);return;
						var max_page = res.data.total/this.limit;
						if(max_page<=this.page){
							uni.showToast({
							    icon: 'none',
							    title: '已到底'
							});
							return;
						}
						if(res.data.status=='y'){
							var datax = res.data.data.card;
						}else{
							var datax = [];
							uni.showToast({
							    icon: 'none',
							    title: '已到底'
							});
						}
						if (action === 'refresh') {
							this.cl_list = [];
						}						
						datax.forEach(item => {							
							this.cl_list.push(item);
						});
						this.page = this.page+1;
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #FFFFFF;
	}
	.detial img{
		min-width: 100%;
	}
</style>
