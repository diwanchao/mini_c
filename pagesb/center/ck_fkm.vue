<template>
	<view class="x12">
		<view class="x12 padding-big" style="font-size: 10pt;">
			<view class="x12" style="width:658upx;height:40px; font-size: 12pt; padding-left:28upx; line-height: 40px; background:rgba(245,245,245,1);border-radius:4px 4px 0px 0px;border:1px solid rgba(204,204,204,1);">
				向商家展示
			</view>
			<view class="x12 bg-white padding-big text-center" style="width:632upx;border-left: #CCCCCC solid 1upx;border-right: #CCCCCC solid 2upx;border-radius: 0px 0px 4px 4px;">
				<view class="x12 padding-top">
					<image :src="cl_list.barcode_img"  mode="aspectFill" style="width: 444upx; height:99upx;"></image>
				</view>
				<view class="x12 padding-little-top" style="color: #9B9B9B; font-size: 11pt;">
					在门店扫描此码扣次消费
				</view>
				<view class="x12" style="color: #393D4A; font-size: 12pt;">
					{{cl_list.number}}
				</view>
				<view class="x12 padding-top">
					<image :src="cl_list.qrcode_img"  mode="aspectFill" style="width: 444upx; height: 444upx;"></image>
				</view>
			</view>
		</view>
		<view class="x12 float-left" style="width: 690upx; padding:0 30upx;">
			<view class="x12" style="background-color:#4F5466; border-radius:8upx;">
				<view class="x12"  @click="goDetails(cl_list)" style="height: 100upx; background-color: #4F5466; border-radius:8upx 8upx 0 0; border-bottom: #393D4A solid 1px;">
					<view class="x-auto text-white text-big" style="padding-top: 30upx; padding-left: 25upx;">
						<view class="x-auto" style="padding-top: 4upx; padding-right: 20upx; display: none;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 32upx; height: 32rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/zfmm.png" style="width: 28upx; height: 32upx;"></image>
							</view>
						</view>
						<view class="x-auto" style="font-size: 11pt; padding-top: 2upx;">次卡详情</view>
					</view>
					<view class="x-auto float-right"  style="padding-top: 30upx; padding-right: 25upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
					</view>
				</view>
				<view class="x12" @click="goXfJl(cl_list)" style="height: 100upx; background-color: #4F5466; border-radius:0 0 8upx 8upx;">
					<view class="x-auto text-white text-big" style="padding-top: 30upx; padding-left: 25upx;">
						<view class="x-auto" style="padding-top: 4upx; padding-right: 20upx; display: none;">
							<view style="display: table-cell; vertical-align: middle; text-align: center; width: 32upx; height: 32rpx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/zfmm.png" style="width: 28upx; height: 32upx;"></image>
							</view>
						</view>
						<view class="x-auto" style="font-size: 11pt; padding-top: 2upx;">扣减记录</view>
					</view>
					<view class="x-auto float-right"  style="padding-top: 30upx; padding-right: 25upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
					</view>
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
			login:false,
			memberinfo:[],
			xshopInfo:[],
			cl_list:[],
			}
		},
		onLoad:function(data){
			this.login = false;
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				//console.log(values);
				if(values){
					this.xshopInfo = values;
					this.stores_name = values.store.stores_name;
				}
				if (value && value.length!=0) {
					this.memberinfo = value;
					this.login = true;
				}				
			} catch (e) {
				// error
			}
			uni.setNavigationBarTitle({
				title: data.title
			});
			//获取信息
			var arr ={
					members:this.memberinfo.openid,
					usedup:1,
					number:data.number,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/once_cards/member_card',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data);
					this.cl_list = res.data.data.card[0];
					//this.detial = res.data.data.content;
					//console.log(this.towMenu);
				}
			});
		},
		methods: {
			//跳转到详情
			goDetails(data){
				uni.navigateTo({
					url:"/pagesb/center/ck_details?number="+data.number+"&title="+data.title
				});
			},
			//跳转到消费记录
			goXfJl(data){
				uni.navigateTo({
					url:"/pagesb/center/ck_xf_jl?number="+data.number+"&title="+data.title
				});
			}
		}
	}
</script>

<style>
	@import '../../common/common.css';
	page {
		background-color: #393D4A;
	}
	.detial img{
		min-width: 100%;
	}
</style>
