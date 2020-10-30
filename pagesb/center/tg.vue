<template>
    <view>
		<view class="x12 padding" v-for="item in tg_arr" :key="item"  @click="goZt(item.type,item.jump_id,'公告')">
			<view class="x12 bg-white padding-big" style="border-radius: 6px;">
				<view class="x-auto" style="font-size: 12pt; width: 634upx; color: #393D4A; padding-top: 0upx; padding-left: 20upx;">
					<view class="x12">
						<view class="x-auto">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="x12 text-center padding-big" v-if="tg_arr.length==0">
			<image src="https://div.buy315.com.cn/xcx_imgs/wts.png"  mode="aspectFill" style="width: 132upx; height: 140upx;"></image>
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
			areaList:[],
			datanum:0,
			xshopInfo:[],
			tg_arr:[],
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
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
				if(values){
					this.xshopInfo = values;
				}
			} catch (e) {
				// error
			}
			//console.log(this.xshopInfo);
			this.getGg();
		},
		methods: {
			getGg(){
				//获取公告信息
				var arr ={
							stores_id:this.xshopInfo.store.stores_id,
						};
				var pdata = url.getSignStr(arr);
				uni.request({
								url:url.websiteUrl+'/api_v2/mall_base/announce',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:pdata,
								success: res => {
									//console.log(res.data);
									this.tg_arr = res.data.data;
								}
				});
			},
			//专题
			goZt(type,jump_id,title,group_id,gtype){
					//1商品详情
					//2分组
					//3自定义
					//4次卡
					//5分类
					//group_id==1000秒杀分组
					//console.log(type,group_id);
					if(gtype==1){
						uni.navigateTo({
							url:"/pages/home/ms"
						})
					}else{
						if(type==1){
							//跳转到商品详情
							uni.navigateTo({
								url:"/pages/goods_details/goods_details?barcode_id="+jump_id
							})
						}else if(type==2){
							uni.navigateTo({
								url:"/pages/home/zt?group_id="+jump_id+"&title="+title
							})
						}else if(type==4){
							uni.navigateTo({
								url:"/pages/home/ck_list?title="+title
							})
						}else if(type==5){
							uni.navigateTo({
								url:"/pages/home/classgoods?category_id="+jump_id+"&title="+title
							})
						}else if(type==6){
							uni.navigateTo({
								url:"/pages/home/ms"
							})
						}else if(type==7){
							uni.navigateTo({
								url:"/pages/home/xjj_list"
							})
						}else{
							uni.navigateTo({
								url:"/pages/home/zdy?custom_id="+jump_id+"&title="+title
							})						
						}
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
