<template>
    <view class="x12 text-center">
		<view class="x12" style="margin-top: 30%;">
			<image src="https://div.buy315.com.cn/xcx_imgs/cg.png"  mode="aspectFill" style="width: 96upx; height: 96upx;"></image>
		</view>
		<view class="x12" style="font-size: 20pt; margin-top: 30upx;">
			密码重置成功！
		</view>
		<view class="x12" style="font-size: 12pt; margin-top: 100upx;" @click="goIndex">
			{{s}}s后，<span style="text-decoration: underline;">返回登录</span>
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
		name: "uni-countdown",
		props: {
			showDay: {
				type: Boolean,
				default: true
			},
			showColon: {
				type: Boolean,
				default: true
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			borderColor: {
				type: String,
				default: "#000000"
			},
			color: {
				type: String,
				value: "#000000"
			},
			splitorColor: {
				type: String,
				default: "#000000"
			},
			day: {
				type: Number,
				default: 0
			},
			hour: {
				type: Number,
				default: 0
			},
			minute: {
				type: Number,
				default: 0
			},
			second: {
				type: Number,
				default: 5
			},
			
		},
		data() {
			return {
			memberinfo:[],
			login:false,
			timer: null,
			d: '00',
			h: '00',
			i: '00',
			s: '00',
			leftTime: 0,
			seconds: 0,
			but:false,
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
				}
			} catch (e) {
				// error
			}
			this.created();
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			goIndex(){
				uni.redirectTo({
					url:"/pages/login/login"
				})
			},
			created(e) {
				this.seconds = this.toSeconds(this.day, this.hour, this.minute, this.second)
				this.countDown()
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds < 0) {
						this.timeUp()
						return
					}
					this.countDown()
				}, 1000)
			},
			toSeconds(day, hours, minutes, seconds) {
				return (day * 60 * 60 * 24) + (hours * 60 * 60) + (minutes * 60) + seconds
			},
			timeUp() {
				clearInterval(this.timer)
				this.$emit('timeup')
			},
			countDown() {
				let seconds = this.seconds
			    let [day, hour, minute, second] = [0, 0, 0, 0]
				if (seconds > 0) {
					day = Math.floor(seconds / (60 * 60 * 24))
					hour = Math.floor(seconds / (60 * 60)) - (day * 24)
					minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
					second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
				} else {
					this.timeUp()
				}
			    if (day < 10) {
			    	day = '0' + day
			    }
				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
			    this.d = day
				this.h = hour
				this.i = minute
				this.s = second
				if(second==0){
					uni.redirectTo({
						url:"/pages/login/login"
					})
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