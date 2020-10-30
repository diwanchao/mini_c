<template>
    <view>
		<view class="x12 padding" style="font-size: 11pt;">			
			<view class="x-auto float-left" style="width: 600upx; border-radius: 40upx; padding: 0upx 0; background-color:#ccc;">
				<view class="x-auto" style="padding: 23upx 0 0 28upx;">
					<image src="https://div.buy315.com.cn/xcx_imgs/sec.png" style="width: 28upx; height: 28upx;"></image>
				</view>
				<view class="x-auto" style="color:rgba(255,255,255,1); padding:0 0 0 10upx; width: 520upx;">
					<input placeholder="请输入商品名称" class=" input" style="height: 34upx; padding:18upx 0;" v-model="goods_title"/>
				</view>
			</view>	
			<view class="x-auto text-center float-right" style="width: 110upx; padding-top: 0upx;">
				<view class="x-auto text-center float-right bg-red text-white" @click="serchAll" style="width: 110upx; height:85upx; font-size: 11pt; background-color: #F65A2A; line-height: 85upx; border-radius:40upx;">
					搜索
				</view>
			</view>
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
			goods_title:'',
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
</style>
