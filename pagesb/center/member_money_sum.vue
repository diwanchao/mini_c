<template>
    <view>
		<view class="x12">
			<image src="https://div.buy315.com.cn/xcx_imgs/cztop.png"  mode="aspectFill" style="width: 750upx; height: 154upx;"></image>
		</view>
		<view class="x12 padding-big bg-white">
			<view class="x6" style="font-size: 11pt; color: #747C96;">
				<view class="x12">当前余额</view>
				<view class="x12" style="color: #393D4A;font-size: 12pt;">{{deployinfo.monetary_symbol}}<span style="font-size: 15pt; color: #F65A2A;">{{yemxList.money_sum}}</span></view>
			</view>
			<view class="x6 text-right" style="padding-top: 15upx;">
				<navigator url="member_cz">
					<view class="x-auto float-right">
						<image src="https://div.buy315.com.cn/xcx_imgs/qcz.png"  mode="aspectFill" style="width: 154upx; height: 56upx;"></image>
					</view>
				</navigator>
			</view>
		</view>		
		<view class="x12 height-big bg-white text-center text-default text-gray text-333" style="white-space:nowrap; margin-top: 10rpx;">
			<scroll-view scroll-x= "true" scroll-left="0" scroll-with-animation="true" >
				<view class="glance-slidenav-tabbar">
					<view class="x3" v-for="(itme,index) in oneMenu" :key="index" style="float: left; width: 180upx; padding-left:20upx; padding-right:20upx;">
						<view class="x12 borderOrange" v-on:click="yemx(index)" v-if="xid == itme._id">{{itme.name}}</view>
						<view class="x12" style="overflow:hidden;  text-overflow:ellipsis; white-space:nowrap;" v-on:click="yemx(index)" v-else>{{itme.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="x12 padding">
			<view class="x12 bg-white padding-big margin-bottom" style="border-radius: 6px; line-height: 48upx;" v-for="(xitme,xindex) in yemxList.data" :key="xindex">
				<view class="x6" style="font-size: 12pt; width: 400upx; color: #393D4A;">
					<view>{{xitme.addtime}}</view>
					<view>{{xitme.xnote}}</view>
				</view>
				<view class="x6 float-right text-right" style="font-size: 14pt; width: 250upx; color: #F65A2A; padding-top:25upx;" v-if="xitme.money_num<0">
					{{xitme.str}}
				</view>
				<view class="x6 float-right text-right" style="font-size: 14pt; width: 250upx; color: #00AAEE; padding-top:25upx;" v-if="xitme.money_num>0">
					{{xitme.str}}
				</view>
			</view>
			<view class="x12 text-center padding-big" v-if="datanum==0">
				<image src="https://div.buy315.com.cn/xcx_imgs/wts.png"  mode="aspectFill" style="width: 132upx; height: 140upx;"></image>
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
			xid:0,
			oneMenu:[
				{
					'_id':0,
					'name':'全部明细',
				},
				{
					'_id':1,
					'name':'收入',
				},
				{
					'_id':2,
					'name':'支出',
				},
			],
			yemxList:[],
			datanum:0,
			}
		},
		onLoad:function(options){
			// console.log()
			// let pages = getCurrentPages();
			// let prevpage = pages[pages.length - 2];
			// console.log(prevpage.route)
			// if(prevpage.route == pagesb/center/member_czcg_ts){
			// 	uni.navigateBack({
			// 		url:''
			// 	})
			// }
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
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
		onUnload(){
			uni.switchTab({
				url:'/pages/center/center'
			})
			console.log('111111111')
		},
		
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.yemx();
		},
		methods: {
			yemx(data){
				this.xid = data;
				if(data==1){
					var im = 'sr';					
				}else if(data==2){
					var im = 'zc';
				}else{
					var im = '';
					this.xid = 0;
				}				
				//获取信息
				var arr ={
						openid: this.memberinfo.openid,
						status:im,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/membercenter/member_balance',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						this.datanum = res.data.data.length;
						this.yemxList = res.data;
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
	page{
		background-color: #F5F5F5;
	}
	.borderOrange{
		border-bottom:#F3A346 solid 3px;
	}
	.glance-slidenav-tabbar{height: 100upx;display: inline-block;display: flex;z-index: 1;}
</style>
