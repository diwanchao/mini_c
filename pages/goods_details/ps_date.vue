<template>
    <view>
		<view class="x12">
			<view class="x-auto text-center height width200" :style="strxheight">
				<view class="x12 margin-smll-bottom" v-for="(t_itme,t_index) in oneMenu.slot" :key="t_index">
					<view class="x12 bg-white" style="border-left: #F65A2A solid 6upx; width: 194upx;" v-if="t_index == date_id">{{t_itme.date}}</view>
					<view class="x12 bg-gray"  style="border-left: #F5F5F5 solid 6upx; width: 194upx; overflow:hidden;  text-overflow:ellipsis; white-space:nowrap;" @click="getGoods(t_itme.dates)" v-else>{{t_itme.date}}</view>
				</view>
			</view>
			<view class="x-auto" style="width: 550upx; font-size: 10pt;">
				<view class="x12 text-333 text-default">
					<view class="x-auto" style="width: 540upx; font-size: 11pt; padding-left: 10upx;">
						<view class="x12 border-top border-gray" style="width: 520upx; padding:0upx 20upx 0upx 0; line-height: 80upx;"  v-for="(s_itme,s_index) in shopList" :key="s_index">
							<view class="x12">
								<view class="x12"  style="overflow:hidden;  text-overflow:ellipsis; white-space:nowrap;" @click="goPay(s_index,s_itme)" v-if="s_itme.show==1">
									<view class="x-auto" v-if="s_itme.now!=''">{{s_itme.now}}</view>
									<view class="x-auto" v-else>{{s_itme.start_time}}-</view>
									<view class="x-auto" v-if="s_itme.now==''">
										{{s_itme.end_time}}
									</view>
									<view class="x-auto float-right" style="padding-top:6upx;">
										<image src="https://div.buy315.com.cn/xcx_imgs/xz.png"  mode="aspectFill" style="width: 30upx; height: 30upx;" v-if="s_index == date_ids"></image>
									</view>
								</view>
							</view>
							
						</view>
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
				oneMenu:[],
				shopList:[],
				login:false,
				memberinfo:[],
				strxheight:'font-size: 11pt;background-color:#f5f5f5;',
				shoppingCarts:[],
				shoppingCartNum:0,
				date_id:0,
				date_ids:0,
				date_time:'',
				date_name:'',
				now:'',
				xshopInfo:[],
				date:'2020-09-24',
				today:'',
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				if(values){
					this.xshopInfo = values;
				}
				if (value) {
					//console.log(value);
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}
				if(valuex){
					this.shoppingCarts = valuex;
				}
			} catch (e) {
				// error
			}
			this.date_id = data.date_id;
			this.date_ids = data.date_ids;
			this.date_time = data.dates;
			uni.getSystemInfo({
				success: res => {
					var xheight = res.windowHeight-5;
					this.strxheight = 'font-size: 11pt; height: '+xheight+'px; background-color:#f5f5f5;';
					//console.log(res.windowHeight);
				}
			});
			this.getClass();
			
			//console.log(this.date_ids);
			//this.getGoods('2019-03-03');
			//console.log(this.date_ids,this.date_id);
		},
		methods: {
			getClass(data){
				//console.log(data);
				//console.log(this.date_ids);
				//获取信息
				var arr ={
						stores_id:this.xshopInfo.store.stores_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_base/time_slot',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						// console.log(res.data.data);
						this.date_time = res.data.data.slot[0].date;
						this.oneMenu = res.data.data;
						this.shopList = res.data.data.slot[this.date_id].slots;	
						this.today = this.date_list
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getGoods(data){
				//console.log(data);				
				this.date_ids = data;
				for(let i in this.oneMenu.slot){
					if(this.oneMenu.slot[i].dates===data){
						
						this.date_time = this.oneMenu.slot[i].dates;
						// this.date_name = this.oneMenu.slot[i].date;
						this.now = this.oneMenu.slot[i].now;
						this.date_id = i;
						// console.log(this.date_id)
						this.shopList = this.oneMenu.slot[i].slots;
						this.today_time = this.oneMenu.slot[i].date
						// this.today = this.oneMenu.slot[i]
						// console.log(this.today_time)

					}		
				}
			},
			goPay(data,list){
				console.log(this.today_time)
				console.log(this.date_id);
				this.date_name = list.dates
				this.date_ids = data;
				//下面的程序执行了返回时向上级页面传参，并跳转到指定的页面
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				//#ifdef MP-WEIXIN
				prevPage.setData({
					psDate: {
						// today:this.today_time,
						dates:this.today_time,
						date_name:this.date_name,
						show:list.show,
						start_time:list.start_time,
						end_time:list.end_time,
						date_id:this.date_id,
						date_ids:data,
						now:this.now,
					},
					
				});
				//#endif
				// #ifdef APP-PLUS
					prevPage.$vm.dates = this.date_time;
					prevPage.$vm.date_name = this.date_name;
					prevPage.$vm.show = list.show;
					prevPage.$vm.start_time = list.start_time;
					prevPage.$vm.end_time = list.end_time;
					prevPage.$vm.date_id = this.date_id;
					prevPage.$vm.date_ids = data;
					prevPage.$vm.now = this.now;
					prevPage.$vm.today = this.today;
				// #endif
				uni.navigateBack({
					delta: 1
				});
				return;
			}
		}
	}

</script>
<style>
	.borderOrange{
		border-bottom:#F3A346 solid 3px;
	}
	.width200{
		width: 200upx;padding-top:10upx;
	}
	.glance-slidenav-tabbar{height: 60upx;display: inline-block;display: flex;z-index: 1;}
</style>
