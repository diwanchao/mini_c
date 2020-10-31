<template>
    <view>
		<hx-navbar :config="config" />
		<view class="rech_top">
		  <image src="https://div.buy315.com.cn/xcx_imgs/my_small.png" class="image"></image>
		  <view class="content">
		    <view class="t1">{{zhanghuyue.money_sum}}</view>
		    <view class="t2">余额（元）</view>
		  </view>
		</view>
<!-- 		<view class="rech_price">
		  <view class="bt">充值金额</view>
		  <view class="list after">
		    <view class="list_li " v-for="(item,index) in list" :key="item.index"  @tap="rechPrice(item.id)" :class="[index1 == item.id ? 'red' : '']">
			{{item.title}}
		    </view>
		  </view>
		</view> -->
		<view class="rech_price" >
			<view class="bt">充值金额</view>
			<view class="list after">
				<view class="list_li" v-for="(itme,index) in yemxList.money_list" :key="index" @click="goCzQr(itme.money,yemxList.pay_methods,itme.id)" :class="[itme.id == index1 ? 'red' : '']">
					{{deployinfo.monetary_symbol}}{{itme.money}}
				</view>
			</view>
		</view>
		<view style="margin-left: 20upx; margin-bottom: 20rpx;">
		<view>充值声明</view>
			<ul style='width: 550upx; line-height: 40upx;'>
				
				<li>充值面额：100元、500元、1000元、3000元；</li>
				<li>购卡充值成功后，不支持提现，除非法律另外规定；</li>
				<li>使用方法，此充值在每日菜场商城消费视同于现金结算，在结算时选择“账户余额”即可使用；</li>
				<li>充值优惠将不定期浮动调整，具体返券金额，请以此页面显示为准。</li>
			</ul>
		</view>
		<view class="zhifu">支付</view>
<!-- 		<view class="x12 padding-big text-center" style="padding-top: 0;"  >
			<input class="uni-input" type="digit" placeholder="如:100.00"  v-model="xmoney" style="background-color: #fff; border-radius: 18pt; text-align: left; height: 90upx; padding:0 50upx;" />
			<view class="x-auto text-center text-white" v-if="xmoney>0" @click="goCzQr(xmoney,yemxList.pay_methods)" style=" width:100%;height:85upx;background:rgba(246,90,42,1); font-size: 14pt; line-height: 85upx; border-radius:18pt;border:1px solid rgba(246,90,42,1);  margin-top: 30upx;">
				支付
			</view>
			<view class="x-auto text-center text-white" v-else style=" width:100%;height:85upx;background:#999; font-size: 14pt; line-height: 85upx; border-radius:18pt;border:1px solid #999;  margin-top: 30upx;">
				充值
			</view>
		</view> -->
		<view class="chongzhixieyi">点击支付即代表同意 <view class="anniuxieyi" @click="gotochongzhi">充值协议</view></view>
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
				deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
			memberinfo:[],
			login:false,
			yemxList:[
				
			],
			zdy:false,
			xmoney:'',
			zhanghuyue:'',
			index1:0,
			index:0,
			list:[{
			  id:'0',
			  title:'充1000元',
			},{
			  id:'1',
			  title:'充500元',
			},{
			  id:'2',
			  title:'充100元',
			},{
			  id:'3',
			  title:'充50元',
			}],
			config:{
				title: '充值金额',
				color: '#ffffff',
				backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				statusBarFontColor:'#fff'
			},
			}
		},
		onLoad:function(){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
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
			} catch (e) {
				// error
			}
			this.yemx();
			this.clickTab()
		},
		methods: {
			rechPrice(data){
				this.index1 = data
				console.log(data)
			},
			gotochongzhi(){
				uni.navigateTo({
					url:'/pagesb/center/chongzhixy'
				})
			},
			yemx(){ 
				//#ifdef APP-PLUS
				if(uni.getSystemInfoSync().platform==='ios'){
					var programtype = 2;
				}else if(uni.getSystemInfoSync().platform==='android'){
					var programtype = 1;
				}else{
					var programtype = 3;
				}
				//#endif
				//#ifdef MP-WEIXIN
					var programtype = 3;
				//#endif
				//获取信息
				var arr ={
						openid: this.memberinfo.openid,
						origin:programtype,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/member_recharge/member_recharge',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						this.yemxList = res.data.data
						return;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goCzQr(data,pay_methods,index){
				this.index1 = index
				console.log(index,'点击成功了')
					this.zdy = false;
					uni.navigateTo({
						url:"member_cz_qr?paymoney="+data+"&pay_methods="+JSON.stringify(pay_methods)
					})
			},
			zdyJe(data){//money
				this.xmoney = '';
				if(data==='zdy'){
					this.zdy = !this.zdy;
				}
			},
			clickTab(index){
				this.index1= index;
				console.log(index)
				console.log('data',index)
				// index = data;
				if(index==1){
					var im = 'sr';					
				}else if(index==2){
					var im = 'zc';
				}else{
					var im = '';
					this.index = 0;
				}				
				//获取信息
				var arr ={
						openid: this.memberinfo.openid,
						status:im,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/membercenter/member_balance',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						this.datanum = res.data.data.length;
						this.listScroll = res.data.data;
						this.zhanghuyue = res.data
						uni.stopPullDownRefresh();
						return;
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}

</script>
<style>
	page{
		background-color: #F7F7F7;
	}
	.borderOrange{
		border-bottom:#F3A346 solid 3px;
	}
	.glance-slidenav-tabbar{height: 100upx;display: inline-block;display: flex;z-index: 1;}
	.rech_top{
	  width:715rpx;
	  height: 200rpx;
	  margin: 0 auto;
	  margin-top: 20rpx;
	  position: relative;
	}
	.rech_top .image{
	  width:715rpx;
	  height: 200rpx;
	  background-size: 100%;
	}
	.rech_top .content{
	  width:715rpx;
	  height: 200rpx;
	  position: absolute;
	  top: 0;
	  left: 0;
	  box-sizing: border-box;
	  padding-top: 15rpx;
	  text-align: center;
	  text-indent: -12rpx;
	  color: #fff;
	}
	.rech_top .content .t1{
	  font-size: 48rpx;
	  line-height: 88rpx;
	}
	.rech_top .content .t2{
	  font-size: 28rpx;
	}
	.vi_inp{
	  width: 710rpx;
	  height: 100rpx;
	  background-color: #fff;
	  margin: 0 auto;
	  margin-top: 20rpx;
	  position: relative;
	}
	.vi_inp .t1{
	  font-size: 30rpx;
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	  left: 25rpx;
	}
	.vi_inp .input{
	  font-size: 24rpx;
	  line-height: 100rpx;
	  height: 100rpx;
	  margin-left: 60rpx;
	}
	.rech_price{
	  width: 100%;
	  padding: 0 30rpx;
	  box-sizing: border-box;
	}
	.rech_price .bt{
	  font-size: 28rpx;
	  line-height: 110rpx;
	  text-indent: 10rpx;
	}
	.rech_price .list{
	  width: 100%;
	}
	.rech_price .list .list_li{
	  width: 330rpx;
	  height: 140rpx;
	  line-height: 140rpx;
	  font-size: 30rpx;
	  color: #333;
	  box-sizing: border-box;
	  border-radius: 20rpx;
	  border: 2rpx solid #FE0000;
	  text-align: center;
	  font-weight: bold;
	  margin-right: 25rpx;
	  margin-bottom: 30rpx;
	}
	.rech_price .list .list_li:nth-child(2n){
	  margin-right: 0;
	}
	.rech_price .list .list_li.red{
	  background-color: #FE0000;
	  color: #fff;
	}
	.red_bt_btn{
	  width: 600rpx;
	  height: 88rpx;
	  line-height: 100rpx;
	  font-size: 36rpx;
	  color: #fff;
	  background-color: #FE0000;
	  text-align: center;
	  border-radius: 60upx;
	  margin-left: 75upx;
	  margin-top: 180upx;
	}
	.after{
		display: flex;
		flex-wrap: wrap;
	}
	.text{
		margin-left: 20upx;
		margin-top: 63upx;
		line-height: 35upx;
	}
	.text1{
		font-size: 28upx;
	}
	.text2{
		font-size: 24upx;
	}
	.tips{
		font-size: 22upx;
		margin-top: 77upx;
		text-align: center;
		color: #999;
		font-weight: 400;
		display: flex;
		justify-content: center;
	}
	.tips .text22{
		color: #0026E8;
		padding-left: 5upx;
	}
	.zhifu{
		height: 88upx;
		width: 600upx;
		background-color: #FE0000;
		border-radius: 40upx;
		text-align: center;
		line-height: 88upx;
		font-size: 36upx;
		color: #fff;
		margin: 0 auto;
	}
	.chongzhixieyi{
		position: absolute;
		bottom: 33upx;
		justify-content: center;
		display: flex;
		font-size: 22upx;
		color: #999;
		margin: 0 auto;
		width: 100%;
	}
	.chongzhixieyi .anniuxieyi{
		color: #0026E8;
		text-decoration: underline;
		font-size: 22upx;
		padding-left: 5upx;
	}
	li{
		font-size: 24upx;
	}
</style>
