<template>
    <view class="x12">
		<view class="x12" style="font-size: 12pt; margin-top: -20upx;">
			<view class="x12 padding-big" style="padding-top: 80upx; font-size: 14pt; font-weight: bold;">
				重置密码
			</view>
			<view class="x12">
				<view class="x12 bg-white padding-big" style="margin-top: 1px;">
					<view class="x-auto" style="width: 140upx;">新密码</view>
					<view class="x-auto  padding-left"><input type="text" password="true" v-model="password" placeholder="请输入密码"  @input="dlRegBut"></view>
				</view>
				<view class="x12 bg-white padding-big" style="margin-top: 1px;">
					<view class="x-auto" style="width: 140upx;">确认密码</view>
					<view class="x-auto  padding-left"><input type="text" password="true" v-model="tpassword" placeholder="再次输入密码"  @input="dlRegBut"></view>
				</view>
			</view>
			<view class="btn-row x12" style="margin-top: 80upx;">			
				<button type="primary" class="primary" v-if="but==false" style="background:rgba(155,155,155,1); border-radius:24px; width: 525upx;">确认重置密码</button>
				<button type="primary" class="primary" v-if="but==true" @tap="register" style="background:#F65A2A; border-radius:24px; width: 525upx;">确认重置密码</button>
			</view>
		</view>
    </view>
</template>

<script>import url from '../../main.js';
    import service from '../../service.js';
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
                account: '',
                password: '',
				tpassword: '',
				but:false,
            }
        },
		onLoad(data) {
			this.account = '';
			this.account = data.mobile;
		},
        methods: {
            register() {
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
				//获取信息
				var arr ={
						mobile: this.account,
						newpwd: this.password,
						openid: '',
					};
				var pdata = url.getSignStr(arr);
				//组织数据
				uni.request({
					url:url.websiteUrl+'/api_v2/membercenter/modify_the_password',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						if(res.data.status=='n'){
							uni.showToast({
								title: res.data.info,
								duration: 2000,
								icon:'none',
							});
							return;
						}
						uni.redirectTo({
							url:"/pages/login/reset_pwd_tz"
						});
					},
					fail: () => {},
					complete: () => {}
				});
            },
			dlRegBut(){
				if (this.password.length > 5 && this.tpassword.length > 5 && this.tpassword==this.password) {
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
