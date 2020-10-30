<template>
    <view>
		<view class="x12">
			<image src="https://div.buy315.com.cn/xcx_imgs/m_xxb.png"  mode="aspectFill" style="width: 750upx; height: 154upx;"></image>
		</view>
		<view class="x12 padding-big bg-white text-center">
			<view class="x12" style="font-size: 11pt; color: #747C96;">
				<view class="x12">当前希希贝</view>
				<view class="x12" style="color: #393D4A;font-size: 12pt;"><span style="font-size: 15pt; color: #F65A2A;">{{xxb_num}}</span></view>
			</view>
		</view>		
		<view class="x12 height-big bg-white text-center text-default text-gray text-333" style="white-space:nowrap; margin-top: 10rpx;">
			<scroll-view scroll-x= "true" scroll-left="0" scroll-with-animation="true" >
				<view class="glance-slidenav-tabbar">
					<view class="x3" v-for="(itme,index) in oneMenu" :key="index" style="float: left; width: 180upx; padding-left:20upx; padding-right:20upx;">
						<view class="x12 borderOrange" @click="yemx(itme._id)" v-if="xid == itme._id">{{itme.name}}</view>
						<view class="x12" style="overflow:hidden;  text-overflow:ellipsis; white-space:nowrap;" @click="yemx(itme._id)" v-else>{{itme.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="x12 padding">
			<view class="x12 bg-white padding-big margin-bottom" style="border-radius: 6px; line-height: 48upx;" v-for="(xitme,xindex) in yemxList" :key="xindex">
				<view class="x6" style="font-size: 12pt; width: 400upx; color: #393D4A;">
					<view>{{xitme.addtime}}</view>
					<view>{{xitme.remark}}</view>
				</view>
				<view class="x6 float-right text-right" style="font-size: 14pt; width: 250upx; color: #F65A2A; padding-top:25upx" v-if="xitme.num<0">
					{{xitme.num}}
				</view>
				<view class="x6 float-right text-right" style="font-size: 14pt; width: 250upx; color: #00AAEE; padding-top:25upx" v-if="xitme.num>0">
					+{{xitme.num}}
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
			memberinfo:[],
			login:false,
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
			xxb_num:0,
			datanum:0,
			limit:30,
			page:0,
			}
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
			this.yemx(this.xid);
		},
		onPullDownRefresh() {
			this.yemx(this.xid);
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
		    this.yemx(this.xid,'res');
		},
		methods: {
			yemx(data,action = 'add'){
				//console.log(data);
				if(action=='add'){
					this.yemxList = [];
					this.limit = 30;
					this.page = 0;
				}
				this.xid = data;
				if(data==1){
					var im = 'sr';					
				}else if(data==2){
					var im = 'zc';
				}else{
					var im = '';
					this.xid = 0;
				}
				//console.log(this.memberinfo.openid);
				//获取信息
				var arr ={
						member_mark: this.memberinfo.openid,
						xtype:data,
						limit:this.limit,
						offset:this.page*this.limit,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/app_xxb/aapi_xxb/xxb_water',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						this.xxb_num = res.data.xxb_num;
						this.datanum = res.data.total;
						var max_page = res.data.total/this.limit;
						if(max_page<=this.page){
							uni.showToast({
							    icon: 'none',
							    title: '已到底'
							});
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
							this.yemxList = [];
						}						
						datax.forEach(item => {							
							this.yemxList.push(item);
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
	page{
		background-color: #F5F5F5;
	}
	.borderOrange{
		border-bottom:#F3A346 solid 3px;
	}
	.glance-slidenav-tabbar{height: 100upx;display: inline-block;display: flex;z-index: 1;}
</style>
