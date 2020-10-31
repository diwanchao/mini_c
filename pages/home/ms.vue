<template>
	<view>
		<hx-navbar :config="config"/>
		<view class="x12 bg-white">
			<view class="x12"  style="width: 750upx;" v-if="goodsList.length>0">
				<view class="x4" style="font-size: 10pt; width: 250upx; padding:0 0 2upx 0; background-color: #f5f5f5;" v-for="(g_item,g_index) in goodsList" :key="g_index">
					<view class="x12 bg-white"  @click="goDetails(g_item)" style="width: 210upx; padding: 30upx 20upx;" v-if="(g_index+1)%3==0">
						<view class="x12">
							<image :src="g_item.img1_thumb"  mode="aspectFill" style="width: 209upx; height: 209upx;"></image>
						</view>						
						<view class="x12">
							<view class="x12" style="height: 74upx;overflow:hidden;  font-size: 28upx; width: 100%;">
								{{g_item.goods_title}}
							</view>
							<view class="x12">
								<view class="x-auto" style="color: #F65A2A; font-size: 12pt;">
									{{deployinfo.monetary_symbol}}{{g_item.price}}
								</view>
							</view>
						</view>
					</view>
					<view class="x12 bg-white"  @click="goDetails(g_item)" style="width: 209upx; padding: 30upx 20upx;" v-else>
						<view class="x12">
							<image :src="g_item.img1_thumb"  mode="aspectFill" style="width: 209upx; height: 209upx;"></image>
						</view>
						<view class="x12">
							<view class="x12" style="height: 74upx;overflow:hidden; text-overflow:ellipsis; font-size: 28upx;">
								{{g_item.goods_title}}
							</view>
							<view class="x12">
								<view class="x-auto" style="color: #F65A2A; font-size: 12pt;">
									{{deployinfo.monetary_symbol}}{{g_item.price}}
								</view>								
							</view>
						</view>
					</view>
				</view>				
								
			</view>
			<view class="x12 text-center" style="padding-top: 100px; background-color: #F6F6F6;" v-if="goodsList.length==0">{{ms_info}}</view>
		</view>
	</view>
</template>
<script>
	import url from '../../main.js';
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
				  path: '/pages/home/ms?member_openid='+mv.openid+"&stores_id="+xv.store.stores_id
				}
			} catch (e) {
				// error
			}
			
		  },
		//#endif
		data() {
			return {
				deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
				//refreshing: false,
				login:false,
				memberinfo:[],
				shoppingCarts:[],
				xshopInfo:[],
				indexInfo:[],
				shoppingCartNumP:0,
				config:{
					title: '秒杀详情',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
				goodsList:[],
				dataZs:[],
				img:'',
				limit:30,
				page:0,
				ms_info:'',
			}
		},
		onPullDownRefresh() {
		    try {//从本地缓存中同步获取指定 key 对应的内容。
		    	const value = uni.getStorageSync('memberinfo');
		    	const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				if(values){
					this.xshopInfo = values;
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
			this.page = 0;
			this.goodsList=[];
			this.getHome(this.dataZs);
			uni.stopPullDownRefresh();
		},
		onShow:function(e){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const valuex = uni.getStorageSync('shoppingCarts');
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
				if(valuex){
					this.shoppingCarts = valuex;
				}
				
			} catch (e) {
				// error
			}
		},
		onLoad(data) {
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				//console.log(values);
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
			uni.setNavigationBarTitle({
				title: data.title
			});
			if(data.member_openid!=undefined){
				//将推荐人id写入缓存
				uni.setStorage({
					key: 'tjr_member_openid',
					data:data.member_openid,
					success: function () {
					}
				});
			}
			//console.log(data);
			this.dataZs = data;
			this.getHome(data);
		},
		onReachBottom() {
		    this.getHome(this.dataZs,'add');
		},
		methods: {
			getHome(data,action = 'add'){
				this.sData = data;
				//console.log(data);
				//获取信息
				var arr ={
						stores_id:this.xshopInfo.store.stores_id,
						limit:this.limit,
						offset:this.page*this.limit,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/app_seckill/aapi_seckill/get_goods_list',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						if(res.data.total==0){
							this.ms_info = '没有秒杀商品';
						}
						var max_page = res.data.total/this.limit;
						if(max_page<=this.page){
							// uni.showToast({
							//     icon: 'none',
							//     title: '已到底'
							// });
							return;
						}
						if(res.data.status=='y'){
							//this.img = res.data.data.group.img;
							var datax = res.data.data;
						}else{
							var datax = [];
							uni.showToast({
							    icon: 'none',
							    title: '已到底'
							});
						}
						if (action === 'refresh') {
							this.goodsList = [];
						}						
						datax.forEach(item => {							
							this.goodsList.push(item);
						});
						this.page = this.page+1;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goDetails(s_itme) {
				//console.log(s_itme);
				uni.navigateTo({
					url:"../goods_details/ms_goods_details?barcode_id="+s_itme.barcode_id+"&s_id="+s_itme.s_id
				})
			}
		}
	}
</script>
<style>
	page {
		background-color: #F6F6F6;
	}
	.body-a{
		width: 96%; height: auto; padding:2%;
	}
	.imgwidth{width: 750upx; height:324upx;}
	.classification{
		background-color: #fff;
		width: 680upx;
		padding:30upx 20upx;
		height: auto;
		border-radius:10upx;
		float:left;
		margin-bottom:18upx;
	}
	.classification view{
		width: 170upx;
		height: auto;
		float:left;
		margin:10upx 0upx;
		text-align:center;
		font-size:28upx;
		color:#333;
	}
	.classification view image{
		width: 100upx;
		height: 100upx;
	}
	.tctj{
		background-color: #fff;
		width: 680upx;
		padding:30upx 20upx;
		height: auto;
		border-radius:10upx;
		float:left;
		margin-bottom:18upx;
	}
	.tctj-title{
		width: 100%;
		height: auto;
		float:left;
		border-bottom:1px #F6F6F6 solid;
		padding-bottom:15upx;
		margin-bottom:30upx;
		font-size:32upx;
		font-weight: 700;
	}
	.title_s{
		width: 20upx;
		height: 28upx;
		float:left;
		margin-top:10upx;
		border-left:#FFCC00 solid 3px;
	}
	.title_t{
		width: auto;
		height: auto;
		float:left;
	}
	.tctj-body{
		width: 100%;
		height: auto;
		float:left;
	}
	.tctj-body-5{
		width: 50%;
		height: auto;
		float:left;
		margin:20upx 0upx;
	}
	.tctj-body-left{
		width: 120upx;
		height: auto;
		float:left;
	}
	.tctj-body-left image{
		width: 120upx;
		height: 120upx;
		float:left;
	}
	.tctj-body-right{
		width: 180upx;
		height: auto;
		float:left;
		padding-left:20upx;
		line-height:1.2em;
	}
	.tctj-body-right-title{
		font-size:28upx;
		color:#333;
	}
	.tctj-body-right-describe{
		font-size:28upx;
		color:#666;
	}
	.tctj-body-right-price{
		font-size:28upx;
		color:#E84C3E;
		font-weight: 700;
	}
	.bunner{
		width: 100%;
		height: auto;
		float:left;
	}
	.bunner image{
		width: 720upx;
		height: 180upx;
	}
</style>
