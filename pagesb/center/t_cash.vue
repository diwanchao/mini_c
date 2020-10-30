<template>
	<view>
		<form @submit="bindFormSubmit">
			<view class="x12 padding-top padding-bottom border-bottom border-gray bg-white">
				<view class="x3 text-right">收款账户</view>
				<view class="x6 padding-left  text-gray">
					<picker class="picker-item" mode="selector" :range="areaListOne"  range-key="bank_code" @change="oneChange">
						<view>{{oneValue}}</view>
					</picker>
				</view>
			</view>
			<view class="x12 padding-top bg-white padding-bottom border-bottom border-gray">
				<view class="x12">
					<view class="x3 text-right">提现金额</view>
					<view class="x6 padding-left  text-gray"><input placeholder="提现金额" v-model="money"/></view>
				</view>
			</view>
			<view class="x12 padding-big">
				<button form-type="submit" class="bg-red text-white"  style="border:0;"> 提交 </button>
			</view>
		</form>
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
			news:[],
			login:false,
			memberinfo:[],
			title:'',
			member_s:'',
			zj_id:0,

			areaListOne: [],
			oneValue: '-选择收款账户-',
			business_id:0,
			money:'',
			bank_id:0,
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}
			} catch (e) {
				// error
			}
			if(!this.login){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				return;
			}
			this.business_id = data.business_id;
			//获取信息
			var arr ={
					business_id: data.business_id,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
				url:url.websiteUrl+'/api_v2/bank_manage/index',
				method:'POST',
				dataType:'json',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:pdata,
				success: res => {
					//console.log(res.data);return;
					this.areaListOne = res.data.data;
				}
			});
		},
		methods: {
			oneChange(evt) {
				this.oneValue = this.areaListOne[evt.detail.value].bank_code;
				this.bank_id = this.areaListOne[evt.detail.value].bank_id;
			},
			bindFormSubmit(){
				//console.log(this.business_id);return;
				if (this.money.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '输入提现金额'
					});
					return;
				}
				if (this.bank_id < 1) {
					uni.showToast({
						icon: 'none',
						title: '请选择收款账户'
					});
					return;
				}
				//console.log(this.business_id);
				//console.log(this.bank_code);
				//console.log(this.bank_name);
				//console.log(this.bank_type);
				//获取信息
				var arr ={
						business_id: this.business_id,
						bank_id: this.bank_id,
						money: this.money,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/bank_manage/withdraw_cash',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);return;
						if(res.data.status=='y'){
							//跳转
							uni.showToast({
								title: res.data.info,
								duration: 2000
							});
							setTimeout(function () {
								uni.switchTab({
									url:"/pages/center/center"
								})
							}, 2000);
							return;
						}else{
							//提示
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							return;
						}
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F6F6;
	}
</style>
