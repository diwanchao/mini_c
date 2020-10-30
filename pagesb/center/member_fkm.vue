<template>
		<view class="x12 padding-big" style="font-size: 10pt;">
			<view class="x12" style="width:658upx;height:40px; font-size: 12pt; padding-left:28upx; line-height: 40px; background:rgba(245,245,245,1);border-radius:4px 4px 0px 0px;border:1px solid rgba(204,204,204,1);">
				会员卡/付款码
			</view>
			<view class="x12 bg-white padding-big text-center" style="width:632upx;border-left: #CCCCCC solid 1upx;border-right: #CCCCCC solid 2upx;">
				<view class="x12">
					<image :src="yemxList.card_img"  mode="aspectFill" style="width: 444upx; height: 210upx;"></image>
				</view>
				
				<view class="x12 padding-top">
					<image :src="yemxList.qrcode_imgs"  mode="aspectFill" style="width: 444upx; height: 444upx;"></image>
				</view>
				<view class="x12 padding-little-top" style="color: #9B9B9B; font-size: 11pt;">
					在门店扫描会员码识别身份或消费
				</view>
				<view class="x12" style="color: #393D4A; font-size: 12pt;">
					{{yemxList.card_code}}
				</view>
				<view class="x12 padding-top">
					<image :src="yemxList.barcode_img"  mode="widthFix" style="width: 444upx;"></image>
				</view>
			</view>
			<view class="x12 text-center" style="width:686upx;height:40px; line-height: 40px; background:rgba(245,245,245,1);border-radius:0px 0px 4px 4px;border:1px solid rgba(204,204,204,1);">
				<view class="x4" style="display: none;">
					<view class="x-auto" style=" margin-top:6upx; padding:0 10upx 0 25upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/hyzx.png"  mode="aspectFill" style="width: 28upx; height: 28upx;"></image>
					</view>
					<view class="x-auto">会员专享价</view>
				</view>
				<view class="x4" style="display: none;">
					<view class="x-auto" style=" margin-top:4upx; padding:0 10upx 0 25upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/ljjf.png"  mode="aspectFill" style="width: 32upx; height: 28upx;"></image>
					</view>
					<view class="x-auto">累计积分</view>
				</view>
				<view class="x4" style="display: none;">
					<view class="x-auto" style=" margin-top:4upx; padding:0 10upx 0 10upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/yhj.png"  mode="aspectFill" style="width: 34upx; height: 26upx;"></image>
					</view>
					<view class="x-auto">使用优惠券</view>
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
			memberinfo:[],
			login:false,
			yemxList:[],
			}
		},
		onReady:function(e){
			//获取信息
			var arr ={
					openid: this.memberinfo.openid,
					dynamic:1,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/member_card/index',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data);
					this.yemxList = res.data.data;
					uni.stopPullDownRefresh();
					return;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onLoad:function(){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					if(!this.login){
						uni.navigateTo({
							url:"/pages/login/login"
						})
						return;
					}
				}
			} catch (e) {
				// error
			}
			this.yemx();
		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.yemx();
		},
		methods: {
			yemx(){
				var xxxthis =this;
				//var xxx = [];
				setInterval(function () {
					//获取信息
					var arr ={
							openid: xxxthis.memberinfo.openid,
							dynamic:1,
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/member_card/index',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(res.data);
							xxxthis.yemxList = res.data.data;
							uni.stopPullDownRefresh();
							return;
						},
						fail: () => {},
						complete: () => {}
					});
				}, 90000);
			},
			goCzQr(data){
				uni.navigateTo({
					url:"member_cz_qr?paymoney="+data
				})
			}
		}
	}

</script>
<style>
	page{
		background-color: #393D4A;
	}
	.borderOrange{
		border-bottom:#F3A346 solid 3px;
	}
	.glance-slidenav-tabbar{height: 100upx;display: inline-block;display: flex;z-index: 1;}
</style>
