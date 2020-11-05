<template>
	<view>
		<!-- <hx-navbar :config="config"/> -->
		<view class="address" @click="getLocation">需要您的地理位置授权</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// config:{
				// 	title: '地理位置',
				// 	color: '#ffffff',
				// 	backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				// 	statusBarFontColor:'#fff',
				// },
			}
		},
		methods: {
			// 获取地理位置
			getLocation(that) {
			    uni.getSetting({
			        success(res) {
			            console.log(res)
			            if (!res.authSetting['scope.userLocation']) {
			                uni.authorize({
			                    scope: 'scope.userLocation',
			                    success() {
			                        console.log('授权weizhi')
			 
			                    },
			                    fail() {
			                        uni.hideLoading();
			                        uni.showModal({
			                            title: '温馨提示',
			                            content: '您已拒绝授权，是否去设置打开？',
			                            confirmText: "确认",
			                            cancelText: "取消",
			                            success: function(res) {
			                                console.log(res);
			                                if (res.confirm) {
			                                    console.log('用户点击确认')
			                                    uni.openSetting({
			                                        success: (res) => {
			                                            console.log(res)
			                                            res.authSetting = {
			                                                "scope.userLocation": true,
			                                            }
			                                            console.log("openSetting: success");
														uni.switchTab({
															url:'../home/index'
														})
			                                        }
			                                    });
			                                } else {
			                                    console.log('用户点击取消')
			                                }
			                            }
			                        });
			 
			                    }
			                })
			            } else {
			                console.log('获取位置')
			                uni.navigateTo({
			                    url: '../home/index',
			                })
			            }
			        },
			        fail(res) {
			            uni.hideLoading()
			            console.log('uni.getSetting 失败回调')
			            console.log(res);
			        }
			    })
			}
		},
	}
</script>

<style>
.address{
	text-align: center;
	font-size: 26upx;
	height: 90upx;
	width: 710upx;
	background-color: #FE0000;
	line-height: 90upx;
	color: #fff;
	border-radius: 10upx;
	margin-top: 150upx;
	margin-left: 20upx;
}	
</style>
