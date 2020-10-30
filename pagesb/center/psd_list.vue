<template>
    <view>
		<view class="x12 padding" style="font-size: 11pt; position: fixed; z-index: 1000; top: 0;">
			<view class="x-auto float-left" style="width: 600upx; border-radius: 40upx; padding: 0; background-color:#ccc; height: 70upx;">
				<view class="x-auto" style="padding: 20upx 0 0 28upx;">
					<image src="https://div.buy315.com.cn/xcx_imgs/sec.png" style="width: 28upx; height: 28upx;"></image>
				</view>
				<view class="x-auto" style="color:rgba(255,255,255,1); padding:0 0 0 10upx; width: 520upx;">
					<input placeholder="输入配送小区名称" class=" input" style="height: 50upx; padding:10upx 0;" v-model="psd_name"/>
				</view>
			</view>	
			<view class="x-auto text-center float-right" style="width: 110upx; padding-top: 0upx;">
				<view class="x-auto text-center float-right bg-red text-white" @click="serchPsd" style="width: 110upx; height:70upx; font-size: 11pt; background-color: #F65A2A; line-height: 70upx; border-radius:40upx;">
					搜索
				</view>
			</view>
		</view>
		<view class="x12" style="margin-top: 100upx;">
			<view class="x12 padding"  v-for="(item,index) in tg_arr" :key="index"  @click="fh(item)">
				<view class="x12 bg-white padding-big" style="border-radius: 6px;">
					<view class="x-auto" style="font-size: 12pt; width: 634upx; color: #393D4A; padding-top: 0upx; padding-left: 20upx;">
						<view class="x12">
							<view class="x-auto">{{item.name}}</view>
						</view>
						<view class="x12" style="font-size: 11pt;">联系人：{{item.contact}} 联系电话：{{item.tel}}</view>
						<view class="x12" style="font-size: 11pt;">地址：{{item.address}}</view>
						<view class="x12" style="font-size: 11pt;">距离：{{item.distance}}</view>
					</view>
				</view>
			</view>
			<view class="x12 text-center padding-big" v-if="tg_arr.length==0">
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
		data(data) {
			return {
			memberinfo:[],
			login:false,
			areaList:[],
			datanum:0,
			xshopInfo:[],
			tg_arr:[],
			limit:30,
			page:0,
			xdata:{},
			psd_name:'',//配送小区名称
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
				}else{
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
				if(values){
					this.xshopInfo = values;
				}
			} catch (e) {
				// error
			}
			this.tg_arr = [];
			this.page = 0;
			this.xdata = data;
			this.loadData('add',this.xdata);
		},
		onPullDownRefresh() {
			this.tg_arr = [];
			this.page = 0;
		    this.loadData('refresh',this.xdata);
			setTimeout(() => {
			    uni.stopPullDownRefresh();
			}, 2000);
		},
		onReachBottom() {
		    this.loadData('add',this.xdata);
		},
		methods: {
			//搜索配送点
			serchPsd(){
				this.tg_arr = [];
				this.page = 0;
				this.loadData('add',this.xdata,this.psd_name);
			},
			loadData(action = 'add',data,psd_name=''){
				var arr ={
						lng:data.lng,
						lat:data.lat,
						name:psd_name,
						limit:this.limit,
						offset:this.page*this.limit,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_base/ps_place',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
							//console.log(res.data);
							if(res.data.total==0){
								this.tg_arr = [];
								}
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
									this.tg_arr = [];
								}						
								datax.forEach(item => {
									this.tg_arr.push(item);
								});
								this.page = this.page+1;
							
					}
				});
			},
			fh(data){//返回上级
				//#ifdef MP-WEIXIN
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法2，把数据存到上一个页面中去
				prevPage.setData({
					mydata: data
				});//address:'',xq_name:'请选择',
				//uni.$emit('address',data);
				uni.navigateBack({
					delta: 1
				});	
				//#endif
				// #ifdef APP-PLUS
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.xq_name = data.name;   //修改上一页data里面的searchVal参数值为1211
				prevPage.$vm.address =  data.address;
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
				// #endif
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
