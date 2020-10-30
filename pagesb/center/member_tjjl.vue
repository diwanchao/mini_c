<template>
    <view>
		<view class="x12 padding-big bg-white text-center" v-if="superior.length!=0">
			<view class="float-left">
				<image :src="superior.img"  mode="aspectFill" style="width: 100upx; height: 100upx; border-radius:100upx;"></image>
			</view>
			<view class="float-left" style="font-size: 11pt; color: #747C96; text-align:left; padding-left: 16px;">
				<view>我的上级<span v-if="superior.name!='**'">：{{superior.name}}</span></view>
				<view style="color: #393D4A;font-size: 12pt;"><span style="font-size: 15pt; color: #F65A2A;">{{superior.mobile}}</span></view>
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
		<view class="x12 padding" v-if="xid==0">
			<view class="x12 bg-white padding-big margin-bottom" style="border-radius: 6px; line-height: 38upx;" v-for="(xitme,xindex) in subordinate" :key="xindex">
				<view class="x6" style="font-size: 12pt; width: 400upx; color: #393D4A;">
					<view v-if="xitme.name!='**'">{{xitme.name}}</view>
					<view>{{xitme.mobile}}</view>
				</view>
				<view class="x6 float-right text-right" style="font-size: 14pt; width: 250upx; color: #00AAEE;">
					<image :src="xitme.img"  mode="aspectFill" style="width: 65upx; height: 65upx; border-radius:65upx;"></image>
				</view>
			</view>
			<view class="x12 text-center padding-big" v-if="subordinate.length==0">
				<image src="https://div.buy315.com.cn/xcx_imgs/wts.png"  mode="aspectFill" style="width: 132upx; height: 140upx;"></image>
			</view>
		</view>
		<view class="x12 padding" v-if="xid==1">
			<view class="x12 bg-white padding-big margin-bottom" style="border-radius: 6px; line-height: 38upx;" v-for="(yitme,yindex) in yemxList" :key="yindex">
				<view class="x6" style="font-size: 12pt; width: 400upx; color: #393D4A;">
					<view>{{yitme.addtime}}</view>
					<view>{{yitme.xnote}}</view>
				</view>
				<view class="x6 float-right text-right" style="font-size: 14pt; width: 250upx; color: #00AAEE;">
					{{yitme.points_num}}
				</view>
			</view>
			<view class="x12 text-center padding-big" v-if="yemxList.length==0">
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
					'name':'分享记录',
				},
				{
					'_id':1,
					'name':'积分奖励',
				}
			],
			yemxList:[],
			superior:[],
			subordinate:[],
			limit:30,
			page:0,
			xlimit:30,
			xpage:0,
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
			this.yemx();
		},
		onPullDownRefresh() {
			//console.log("下拉刷新");
			//this.refreshing = true;
			this.limit=30;
			this.page=0;
			this.xlimit=30;
			this.xpage=0;
			this.yemxList=[];
			this.superior=[];
			this.subordinate=[];
			this.yemx(this.xid);
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
		    this.yemx(this.xid,'add');
		},
		methods: {
			yemx(data,action = 'refresh'){
				//console.log(action);
				this.xid = data;
				if(data==1){
					var im = 'sr';					
				}else{
					var im = '';
					this.xid = 0;
				}
				if(this.xid==0){
					//console.log(this.memberinfo.openid);
					//console.log(this.page*this.limit);
					var arr ={
							member_openid: this.memberinfo.openid,
							limit:this.limit,
							offset:this.page*this.limit,
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/member_side/recommends',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(res.data);
							this.superior = res.data.data.superior;
							var max_page = res.data.total/this.limit;
							if(max_page<=this.page){
								uni.showToast({
									icon: 'none',
									title: '已到底'
								});
								return;
							}
							if(res.data.status=='y'){
								var datax = res.data.data.subordinate;
							}else{
								var datax = [];
								uni.showToast({
									icon: 'none',
									title: '已到底'
								});
							}
							if (action === 'refresh') {
								this.subordinate = [];
							}
							datax.forEach(item => {							
								this.subordinate.push(item);
							});
							this.page = this.page+1;
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					//console.log(this.xpage*this.xlimit);
					var arr ={
							openid: this.memberinfo.openid,
							status:im,
							type:2,
							limit:this.xlimit,
							offset:this.xpage*this.xlimit,
						};
					var pdata = url.getSignStr(arr);
					uni.request({
						url:url.websiteUrl+'/api_v2/membercenter/member_integral',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(res.data);
							var max_page = res.data.total/this.xlimit;
							if(max_page<=this.xpage){
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
							this.xpage = this.xpage+1;
						},
						fail: () => {},
						complete: () => {}
					});
				}
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
