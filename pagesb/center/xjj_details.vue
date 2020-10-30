<template>
	<view class="x12">
		<view class="x12 padding-big" style="font-size: 10pt;">
			<view class="x12" style="width:658upx;height:40px; font-size: 12pt; padding-left:28upx; line-height: 40px; background:rgba(245,245,245,1);border-radius:4px 4px 0px 0px;border:1px solid rgba(204,204,204,1);">
				向商家展示
			</view>
			<view class="x12 bg-white padding-big text-center" style="width:632upx;border-left: #CCCCCC solid 1upx;border-right: #CCCCCC solid 2upx;border-radius: 0px 0px 4px 4px;">
				<view class="x12 padding-top">
					<image :src="cl_list.mcode_barcode"  mode="aspectFill" style="width: 444upx; height:99upx;"></image>
				</view>
				<view class="x12 padding-little-top" style="color: #9B9B9B; font-size: 11pt;">
					在门店扫描此码核销劵
				</view>
				<view class="x12" style="color: #393D4A; font-size: 12pt;">
					{{cl_list.mcode}}
				</view>
				<view class="x12 padding-top">
					<image :src="cl_list.mcode_qrcode"  mode="aspectFill" style="width: 444upx; height: 444upx;"></image>
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
			deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
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
				this.deployinfo = uni.getStorageSync('deployinfo');
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
			//获取信息
			var arr ={
					member_openid:this.memberinfo.openid,
					mcode:data.mcode,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/app_coupon_offset/aapi_coupon_offset/member_coupon',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data);
					this.cl_list = res.data.data[0];
					//this.detial = res.data.data.content;
					//console.log(this.towMenu);
				}
			});
		},
		methods: {
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