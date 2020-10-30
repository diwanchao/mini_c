<template>
	<view>
		<form @submit="bindFormSubmit">
			<view class="x12 padding-top bg-white padding-bottom border-bottom border-gray">
				<view class="x12 padding-left text-gray">
					<input placeholder="标题" v-model="title"/>
				</view>
			</view>
			<view class="x12 padding-big bg-white text-333">
				<textarea placeholder="问题描述..." auto-focus style="width:100%"  v-model="member_s" />
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
			this.title = '';
			this.member_s = '';
			this.zj_id = data._id;
			//console.log(data);return;
		},
		methods: {
			bindFormSubmit(){
				if (this.title.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写标题'
					});
					return;
				}
				if (this.member_s.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请填写问题描述'
					});
					return;
				}
				//获取信息
				var arr ={
						zj_id: this.zj_id,
						member_id: this.memberinfo.member_id,
						title: this.title,
						member_s: this.member_s,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/store_manage/wd',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						if(res.data.status=='y'){
							//跳转
							uni.navigateBack({
								delta: 1
							});
							return;
						}else{
							//提示
							uni.showToast({
								icon: 'none',
								title: '留言失败'
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
