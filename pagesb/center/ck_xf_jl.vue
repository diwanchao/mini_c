<template>
	<view class="x12">
		<view class="x12 padding">
			<view class="x12 bg-white padding-big margin-bottom" style="border-radius: 6px; line-height: 48upx;" v-for="(xitme,xindex) in cl_list" :key="xindex">
				<view class="x6" style="font-size: 12pt; width: 450upx; color: #393D4A;">
					<view>{{xitme.addtime}}</view>
					<view>单号 {{xitme.order_code}}</view>
					<view>{{xitme.stores_name}}</view>					
				</view>
				<view class="x6 float-right text-right" style="font-size: 14pt; width: 200upx; color: #00AAEE; padding-top:25upx;">
					-{{xitme.use_num}}次
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
			news:[],
			cl_list:[],
			datanum:0,
			limit:30,
			page:0,
			number:'',
			}
		},
		onLoad:function(data){
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
				title: data.title+"使用记录"
			});
			this.cl_list = [];
			this.datanum = 0;
			this.limit = 30;
			this.page = 0;
			this.number = data.number;
			this.getCk();
		},
		onPullDownRefresh(){
			this.cl_list = [];
			this.limit = 30;
			this.page = 0;
			this.getCk();
			uni.stopPullDownRefresh();
			return;
		},
		onReachBottom() {
		    this.getCk();
		},
		methods: {
			getCk(action = 'add'){
				//获取信息
				var arr ={
						member_openid:this.memberinfo.openid,
						number:this.number,
						limit:this.limit,
						offset:this.page*this.limit,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/once_cards/uses',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);return;
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
							this.cl_list = [];
						}						
						datax.forEach(item => {							
							this.cl_list.push(item);
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
	@import '../../common/common.css';
	page {
		background-color: #F6F6F6;
	}
</style>
