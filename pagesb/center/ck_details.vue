<template>
	<view class="x12" style="font-size: 12pt; line-height: 24px;">
		<view class="x12 bg-white" style="width: 690upx; padding: 30upx; line-height: 32px;">
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">次卡名称</span></view>
				<view class="float-left">{{cl_list.title}}</view>
			</view>
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">次卡卡号</span></view>
				<view class="float-left">{{cl_list.number}}</view>
			</view>
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">购买价格</span></view>
				<view class="float-left">{{cl_list.price}}{{deployinfo.monetary_unit}}</view>
			</view>
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">剩余次数</span></view>
				<view class="float-left">{{cl_list.available_limits}}</view>
			</view>
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">已用次数</span></view>
				<view class="float-left">{{cl_list.usenum}}</view>
			</view>
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">购买时间</span></view>
				<view class="float-left">{{cl_list.addtime}}</view>
			</view>
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">购买渠道</span></view>
				<view class="float-left">{{cl_list.buy_channel}}</view>
			</view>
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">使用限制</span></view>
				<view class="float-left">{{cl_list.sy_limit_types}}</view>
			</view>
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">有效时间</span></view>
				<view class="float-left">{{cl_list.validity_types}}</view>
			</view>			
			<view class="x12">
				<view class="float-left" style="width: 180upx;"><span class="text-gray">次卡状态</span></view>
				<view class="float-left">{{cl_list.status_name}}</view>
			</view>			
		</view>
		<view class="x12 bg-white"  style=" width: 690upx; padding: 30upx;margin-top: 10px;">
			<view class="x12" style="padding-bottom: 10upx;">每次消费包含商品</view>
			<view class="x12 text-gray" style="font-size: 10pt;" v-for="(item,index) in cl_list.goods" :key="index">
				<view class="float-left">{{item.goods_title}}</view>
				<view class="float-right">{{item.num}}{{item.unit}}</view>
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
					console.log(res.data);
					this.cl_list = res.data.data.card[0];
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
		background-color: #f5f5f5;
	}
	.detial img{
		min-width: 100%;
	}
</style>
