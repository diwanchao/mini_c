<template>
	<view>
		<view class="x12 bg-white padding-big text-333 text-big">		
			<view class="x12 padding-small-bottom padding-top  border-bottom border-gray" v-for="(item_pj,index_pj) in pjList" :key="index_pj" v-if="pjList.length>0">
				<view class="x12">
					<view class="x-auto" v-if="item_pj.head_img!=''">
						<image :src="item_pj.head_img" style="width: 48upx; height: 48upx; border-radius: 48upx;"></image>
					</view>
					<view class="x-auto" v-else>
						<image src="https://div.buy315.com.cn/xcx_imgs/logo.png" style="width: 48upx; height: 48upx; border-radius: 48upx;"></image>
					</view>
					<view class="x-auto padding-small-left" v-if="item_pj.name!=''">
						{{item_pj.name}}
					</view>
					<view class="x-auto padding-small-left" v-else>
						匿名
					</view>
					<view class="evaluation" v-if="item_pj.evaluate == 1 ">
						好评
					</view>
					<view class="evaluation" v-if="item_pj.evaluate == 2 ">
						差评
					</view>
					<view class="x12 padding-top" v-if="item_pj.img1!='' || item_pj.img2!='' || item_pj.img3!=''">
						<view class="x-auto margin-right" v-if="item_pj.img1!=''" style="margin-right: 20upx;">
							<image :src="item_pj.img1" style="width: 100upx; height: 100upx;"></image>
						</view>
						<view class="x-auto margin-right" v-if="item_pj.img2!=''" style="margin-right: 20upx;">
							<image :src="item_pj.img2" style="width: 100upx; height: 100upx;"></image>
						</view>
						<view class="x-auto" v-if="item_pj.img3!=''">
							<image :src="item_pj.img3" style="width: 100upx; height: 100upx;"></image>
						</view>
					</view>
					<view class="x12">
						{{item_pj.content}}
					</view>
				</view>
			</view>
			<view class="x12 text-center padding-top"  v-if="pjList.length==0">暂无评论</view>
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
			shoppingCarts:[],
			xshopInfo:[],
			pjList:[],
			limit:10,
			page:0,
			barcode_id:[],
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
							const value = uni.getStorageSync('memberinfo');
							const valuex = uni.getStorageSync('shoppingCarts');
							const values = uni.getStorageSync('xshopInfo');
							if(values){
								this.xshopInfo = values;
								this.stores_name = values.store.stores_name;
							}
							if (value) {
								this.memberinfo = value;
								this.login = true;
							}
							if(valuex){
								this.shoppingCarts = valuex;
							}
			} catch (e) {
							// error
			}
			this.barcode_id = data;
			this.pjList = [];
			this.page = 0;
			this.limit = 10;
			this.getData(data);
		},
		onPullDownRefresh() {
			//console.log(this.status.status);return;
			this.pjList = [];
			this.page = 0;
			this.limit = 10;
			this.getData(this.barcode_id);
		},
		onReachBottom() {
			this.getData(this.barcode_id,'add');
		},
		methods: {
			getData(data,action = 'add'){
				//console.log(data);
				//获取信息
				var arr ={
						stores_id:this.xshopInfo.store.stores_id,
						barcode_id:data.barcode_id,
						member_openid: this.memberinfo.openid,
						limit:this.limit,
						offset:this.page*this.limit,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_shop_v2/goods_evaluate',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						var max_page = res.data.total/this.limit;
						if(max_page<=this.page){
							// uni.showToast({
							//     icon: 'none',
							//     title: '已到底'
							// });
							return;
						}
						if(res.data.status=='y'){
							var datax = res.data.data;
						}else{
							var datax = [];
							uni.showToast({
							    icon: 'none',
							    title: '已到底'
							});
						}						
						if (action === 'refresh') {
							this.pjList = [];
						}						
						datax.forEach(item => {							
							this.pjList.push(item);
						});
						this.page = this.page+1;
						uni.stopPullDownRefresh();
						return;
						
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F6F6;
	}
	.eval_all{
		position: relative;
	}
	.evaluation{
		position: absolute;
		right: 10upx;
		font-size: 28upx;
		color: #999;
	
	}
</style>
