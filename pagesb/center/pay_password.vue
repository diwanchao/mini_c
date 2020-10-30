<template>
    <view class="x12">
		<view class="x12 padding-big" style="font-size: 11pt; color: #9B9B9B;">
			设置支付密码，保障资金安全	
		</view>
		<view class="x12" style="font-size: 12pt;">
			<view class="x12">
				<view class="x12 bg-white  padding-big">
					<view class="x-auto" style="width: 160upx;">手机号码</view>
					<view class="x-auto  padding-left">{{memberinfo.mobile}}</view>
				</view>
				<view class="x12 bg-white padding-big" style="margin-top: 1px;">
					<view class="x-auto" style="width: 160upx;">验证码</view>
					<view class="x-auto  padding-left" style="width: 200upx;"><input type="number" v-model="captcha" placeholder="4位短信验证码"  @input="dlRegBut"></view>
					<view class="x-auto float-right">					
						<button type="primary" plain="true" size="mini" style="margin-top: -6upx; background-color: #F65A2A; border: 0; color: #fff;" @tap="hqyzm" v-if="iscaptcha==2">重新获取</button>
						<button type="primary" plain="true" size="mini" style="margin-top: -6upx; background-color: #F65A2A; border: 0; color: #fff;" @tap="hqyzm" v-if="iscaptcha==1">获取验证码</button>
						<button type="primary" plain="true" size="mini" disabled="true" style="margin-top: -6upx;background-color: #9B9B9B; border: 0; color: #fff;" v-if="iscaptcha==0">{{s}}s后重新获取</button>
					</view>
				</view>
				<view class="x12 bg-white padding-big" style="margin-top: 10px;">
					<view class="x-auto" style="width: 160upx;">新支付密码</view>
					<view class="x-auto  padding-left"><input type="text" password="true" v-model="password" placeholder="6位数字支付密码"  @input="dlRegBut"></view>
				</view>
				<view class="x12 bg-white padding-big" style="margin-top: 1px;">
					<view class="x-auto" style="width: 160upx;">确认密码</view>
					<view class="x-auto  padding-left"><input type="text" password="true" v-model="tpassword" placeholder="再次输入密码"  @input="dlRegBut"></view>
				</view>
			</view>
			<view class="btn-row x12" style="margin-top: 80upx;">			
				<button type="primary" class="primary" v-if="but==false" style="background:rgba(155,155,155,1); border-radius:24px; width: 525upx;">确认修改密码</button>
				<button type="primary" class="primary" v-if="but==true" @tap="register" style="background:#F65A2A; border-radius:24px; width: 525upx;">确认修改密码</button>
			</view>
		</view>
    </view>
</template>

<script>import url from '../../main.js';
    import service from '../../service.js';
	//import uniCountdown from "@/components/uni-countdown.vue";
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
		//components: {uniCountdown},
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
				default: 59
			},
			
		},
        data() {
            return {
                account: '',
                password: '',
				tpassword: '',
				captcha:'',
				iscaptcha:1,
				timer: null,
				d: '00',
				h: '00',
				i: '00',
				s: '00',
				leftTime: 0,
				seconds: 0,
				but:false,
				memberinfo:[],
				login:false,
            }
        },
		onLoad() {
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');				
				if (value) {
					//console.log(value);
					this.memberinfo = value;
					this.account = this.memberinfo.mobile;
					this.login = true;
					//console.log(value);
				}else{
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
			} catch (e) {
				// error
			}
		},
		
		beforeDestroy() {
			clearInterval(this.timer)
		},
        methods: {
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
					this.iscaptcha = 2;
				}else{
					this.iscaptcha = 0;
				}
			},
            register() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
				var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
		
                //if (reg.test(this.account)==false) {
		if (this.account=='') {
                	uni.showToast({
                		icon: 'none',
                		title: '手机号不正确'
                	});
                	return;
                }
				//console.log(this.captcha.length);
				if (this.captcha.length != 4) {
				    uni.showToast({
				        icon: 'none',
				        title: '验证码不正确'
				    });
				    return;
				}
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
				if (this.password != this.tpassword) {
					uni.showToast({
						icon: 'none',
						title: '两次输入的密码不一致'
					});
					return;
				}
                const data = {
                    account: this.account,
                    password: this.password
                }
				//检查验证码是否正确
				//获取信息
				var arr2 ={
						mobile: this.account,
						captcha: this.captcha,
						sms_type:'注册验证码',
					};
				var pdata2 = url.getSignStr(arr2);
				//组织数据
				uni.request({
					url:url.websiteUrl+'/api_v2/sms/captcha_verification',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata2,
					success: res => {
						
						if(res.data.status=='n'){
							uni.showToast({
								title: res.data.info,
								duration: 2000,
								icon:'none',
							});
						}
						return;
					},
					fail: () => {},
					complete: () => {}
				});
				//获取信息
				var arr ={
						mobile: this.account,
						openid: this.memberinfo.openid,
						newpwd: this.password,
					};
				var pdata = url.getSignStr(arr);
				//组织数据注册
				uni.request({
					url:url.websiteUrl+'/api_v2/membercenter/modify_the_pay_password',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);return;
						if(res.data.status=='y'){
							uni.showToast({
								title: '修改成功',
								duration: 1000,
								icon:'none',
							});							
							setTimeout(function () {
								uni.navigateBack({
									delta: 1
								});
							}, 2000);
						}else{
							uni.showToast({
								title: res.data.info,
								duration: 1000,
								icon:'none',
							});
						}
						//console.log(this.towMenu);
					},
					fail: () => {},
					complete: () => {}
				});
            },
			hqyzm(){				
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				//console.log(this.account);return;
				var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				//if (reg.test(this.account)==false) {
				if (this.account=='') {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				this.created();
				//获取信息
				var arr ={
						mobile: this.account,
						sms_type:'注册验证码',
					};
				var pdata = url.getSignStr(arr);			
				
				//组织数据注册
				uni.request({
					url:url.websiteUrl+'/api_v2/sms/sms_captcha',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);					
					},
					fail: () => {},
					complete: () => {}
				});
				
			},
			gologin() {
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			dlRegBut(){
				var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
				//if (reg.test(this.account)!=false && this.captcha.length == 4 && this.password.length > 5 && this.tpassword.length > 5 && this.tpassword.length==this.password.length) {
				if (this.account!='' && this.captcha.length == 4 && this.password.length > 5 && this.tpassword.length > 5 && this.tpassword.length==this.password.length) {
				    this.but = true;
				}else{
					this.but = false;
				}
			}
        }
    }
</script>

<style>
page{
		background-color: #F5F5F5;
	}
</style>
