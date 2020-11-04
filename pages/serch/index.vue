<template>
    <view>
		<hx-navbar :config="config" />
		<view class="x12 padding search_add" style="font-size: 11pt;">			
			<view class="this_search">
				<view class="x-auto" >
					<image class="this_imgsearch" src="https://div.buy315.com.cn/xcx_imgs/search.png" style="width: 28upx; height: 28upx;"></image>
				</view>
				<view class="x-auto" >
					<input placeholder="请输入商品名称" class=" input"  v-model="goods_title"/>
				</view>	
			</view>	
			<view class="search_txt" @click="serchAll" >
				搜索
			</view>
		</view> 
		<viwe style="margin-top: 120upx;">
			<viwe class="zanwushik"><image class="imgthis" src="../../static/hui.png"></image></viwe>
			<viwe class="textwenzi">暂未搜索到商品</viwe>
		</viwe>
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
			goods_title:'',
			config:{
				title:'搜索页面',
				color: '#ffffff',
				backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				statusBarFontColor:'#fff',
			},
			}
		},
		onLoad:function(){
			this.goods_title = '';
		},
		methods: {
			serchAll(){
				uni.navigateTo({
					url:"../serch/goods_list?goods_title="+this.goods_title
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #f7f7f7
	}
	.tctj-body-left{
		width: 120upx;
		height: auto;
		float:left;
		padding-left: 36upx;
	}
	.tctj-body-left image{
		width: 120upx;
		height: 120upx;
		float:left;
	}
	.tctj-body-right{
		width: 540upx;
		height: auto;
		float:left;
		padding-left:20upx;
		line-height:1.2em;
	}
	.tctj-body-right-title{
		font-size:28upx;
		color:#333;
		height: 80upx;
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
	.this_search{
		width: 630rpx;
		height: 60rpx;
		border-radius: 25upx;
		background-color: #fff;
		font-size: 24upx;
		color: #C0C0C0;
		line-height: 60upx;
	}	
	.search_txt{
		font-size: 24upx;
		color: #333;
		margin-top: 20upx;
		margin-left: 20upx;
	}
	.add_sea{
		margin-left: 20upx;
		display: flex;
		align-items: center;
	}
	.address{
		display: flex;
		top: 40upx;
		right: 20upx;
		font-size: 24upx;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.add_img2{
		height: 40upx;
		width: 40upx;
		margin-right: 20upx;
	}
	/* 搜索 */
	.search{
		height: 60upx;
		width: 550upx;
		background-color: #fff;
		border-radius: 30upx;
		top: 30upx;
		/* right: 20upx; */
	}
	.search_01{
		left: 40upx;
		top: 15upx;
		height: 30upx;
		width: 30upx;
	}
	.text1{
		font-size: 24upx;
		color: #999;
		left: 100upx;
		top: 30upx;
	}
	.search_add{
		display: flex;
	}
	.this_imgsearch{
		margin-left: 30rpx;
		margin-right: 20rpx;
	}
	.imgthis{
		height: 243upx;
		width: 200upx;
		margin: 0 auto;
	}
	.textwenzi{
		font-size: 24upx;
		color: #999999;
		text-align: center;
		width: 750upx;
		display: flex;
		justify-content: center;
		margin-top: 180upx;
	}
	.zanwushik{
		width: 750upx;
		text-align: center;
		display: flex;
		justify-content: center;
	}
</style>
