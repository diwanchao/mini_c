<template>
    <view class="x12">
		<view class="x12">
			<!-- <image src="https://div.buy315.com.cn/xcx_imgs/toplogin.png" style="width: 750upx; height: 180upx;" mode="aspectFit"></image>		 -->
				<image style="margin: 0 auto; height: 100upx; width: 350upx;" src="https://div.buy315.com.cn/xcx_imgs/bg_bg" mode=""></image>
		</view>
		<view class="x12" style="font-size: 12pt; margin-top: -20upx;">
	<!-- 		<view class="x12 padding-big" style="padding-top: 0px; font-size: 14pt; font-weight: bold; margin: 0 auto;">
				请登录
			</view> -->
<!-- 			<view class="x12">
				<view class="x12 bg-white  padding-big">
					<view class="x-auto text-right" style="width: 160upx;">手机号</view>
					<view class="x-auto padding-left"><input type="number" v-model="account" placeholder="请输入手机号"  @input="dlLoginBut"></view>
				</view>
				<view class="x12 bg-white margin-top   padding-big">
					<view class="x-auto text-right" style="width: 160upx;">登录密码</view>
					<view class="x-auto padding-left"><input type="text" password="true" v-model="password" placeholder="请填入登录密码" @input="dlLoginBut"></view>
				</view>
			</view> -->
			<view class="btn-row x12" style="margin-top: 80upx;">
				<!-- <button type="primary" class="primary" v-if="but==false" style="background:rgba(155,155,155,1); border-radius:24px; width: 525upx;">登录</button>
				<button type="primary" class="primary" v-if="but==true" @tap="bindLogin" style="background:#F65A2A; border-radius:24px; width: 525upx;">登录</button> -->
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="dwxlogin == true && deployinfo.one_click_login==1"  style="background:#51A938; color: #fff; border-radius:24px; width: 525upx; margin-top: 10px;">微信手机号快捷登录</button>
			</view>
<!-- 			<view class="x12" style="width:500upx;  color: #393D4A; margin-top: 40upx; padding-left: 130upx; font-size: 11pt;">
				<view class="x-auto" @tap="goReg">
					点此注册
				</view>	
				<navigator url="/pages/login/retrieve_pwd">
					<view class="x-auto float-right">
						忘记密码?
					</view>
				</navigator>
			</view> -->
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
                providerList: [],
                hasProvider: false,
                account: '',
                password: '',
                positionTop: 0,
				but:false,
				xcode:'',
				dwxlogin:false,
				tjr_id:'',
				deployinfo:{},
				login:false
            }
        },
		onShow() {
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const de = uni.getStorageSync('deployinfo');
				if(de){
					this.deployinfo = de;
				}
			} catch (e) {
				// error
			}
			//#ifdef MP-WEIXIN
			wx.login({
			  success: res =>{
				  //console.log(res.code);
				  this.xcode = res.code;
				}
			})
			//#endif
			try {//从本地缓存中同步获取指定 key 对应的内容。
				var value = uni.getStorageSync('tjr_member_openid');
				this.tjr_id = value;
			} catch (e) {
				// error
			}
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			this.dwxlogin = true;
			//#endif
		},
        methods: {
			getPhoneNumber: function (e){
				//console.log(e.detail.iv);
				//console.log(e.detail.encryptedData);
				if(e.detail.errMsg == 'getPhoneNumber:fail user deny'){
					//console.log('拒绝');
				}else{
					wx.checkSession({
					  success: res =>{
					    //session_key 未过期，并且在本生命周期一直有效
						wx.login({
						  success: res =>{
							  this.wxlogin(e.detail.iv,e.detail.encryptedData);
							  this.xcode = res.code;
							}
						})
						
					  },
					  fail () {
					    // session_key 已经失效，需要重新执行登录流程
						wx.login({
						  success: res =>{
							  this.xcode = res.code;
							  this.wxlogin(e.detail.iv,e.detail.encryptedData);
							}
						})
					  }
					})
				}
			  },
			wxlogin(iv,encryptedData){
				if (this.xcode) {
				  //获取信息
				  var arr ={
				  		code: this.xcode,
						iv:iv,
						encryptedData:encryptedData,
						re_openid:this.tjr_id,
				  	};
				  var pdata = url.getSignStr(arr);
				  
				  //组织数据登录
				  uni.request({
				  	url:url.websiteUrl+'/api_v2/member_login/xcx_login',
				  	method:'POST',
				  	dataType:'json',
				  	header:{
				  		'content-type':'application/x-www-form-urlencoded'
				  	},
				  	data:pdata,
				  	success: res => {
				  		//console.log(res);						
						if(res.data.status=='y'){
							uni.showToast({
								title: '登录中...',
								duration: 2000,
								icon:'loading',
							});
							setTimeout(function(){
								uni.setStorage({
									key: 'memberinfo',
									data:{
										mobile: res.data.mobile,
										name: res.data.name,
										openid: res.data.openid,
									},
									success: function () {										
										uni.switchTab({
											url: '../home/index',
										});
									}
								});
							},2000)
						}else{
							uni.showToast({
								title: res.data.info,
								duration: 2000,
								icon:'none',
							});
						}
				  	},
				  	fail: () => {},
				  	complete: () => {}
				  });
				} else {
					uni.showToast({
						title: '登录失败！',
						duration: 2000,
						icon:'none',
					});
				  //console.log('登录失败！' + res.errMsg)
				}
			},
            bindLogin() {
				
				
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
		var reg =/^[0-9]\d{10}$/;	
                //if (reg.test(this.account)==false) {
		if (this.account=='') {
                    uni.showToast({
                        icon: 'none',
                        title: '手机号不正确'
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
				//#ifdef MP-WEIXIN
				wx.login({
				  success: res =>{
					  //console.log(res.code);
					  this.xcode = res.code;
					}
				})
				//#endif
				//获取信息
				var arr ={
						username: this.account,
						pwd: this.password,
						deviceCode:'123',
						code:this.xcode,
					};
				var pdata = url.getSignStr(arr);
				
				//组织数据登录
				uni.request({
					url:url.websiteUrl+'/api_v2/member_login/index',
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
								title: '登录中...',
								duration: 2000,
								icon:'loading',
							});
							setTimeout(function(){
								uni.setStorage({
									key: 'memberinfo',
									data:{
										mobile: res.data.mobile,
										name: res.data.name,
										openid: res.data.openid,
									},
									success: function () {
										//console.log('success');
										uni.switchTab({
											url: '../home/index',
										});
									}
								});
							},2000)
						}else{
							uni.showToast({
								title: res.data.info,
								duration: 2000,
								icon:'none',
							});
							//console.log(res.data.info);
						}
						//console.log(this.towMenu);
					},
					fail: () => {},
					complete: () => {}
				});
            },
			goReg() {
				uni.navigateTo({
					url:"../reg/reg"
				})
			},
			dlLoginBut(){
				var reg =/^[0-9]\d{10}$/;
				//if (this.password.length > 5 && reg.test(this.account)!=false) {
				if (this.password.length > 5 && this.account!='') {
				    this.but = true;
				}else{
					this.but = false;
				}
			},
        }
    }
</script>
<style>
	page{
		background-color: #F5F5F5;
	}
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20px;
    }

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100px;
        height: 100px;
        border: 1px solid #dddddd;
        border-radius: 100px;
        margin: 0 40px;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60px;
        height: 60px;
        margin: 20px;
    }
</style>
