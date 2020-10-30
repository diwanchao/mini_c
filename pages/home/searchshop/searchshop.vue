<template>
	<view>
		<hx-navbar :config="config" />
		<view class="serchall">
			<view class="search">
				<view><image class="search_img" src="../https://div.buy315.com.cn/xcx_imgs/search.png"></image></view>
				<input type="text" placeholder="请输入商品信息" class="input_text" v-model="name">
			</view>
			<view class="text1" @click="inputName(index)">搜索</view>
		</view>
		<view class="cou_top after">
		  <view class="top" :class="{'active' : index1==index}" v-for="(item,index) in couTop"  :key="item.id" @tap="clickTab(index)">
		    <text class="t1">{{item.name}}</text>
		  </view>
		</view>
		<view>
		  <view class="shop_one" v-for='(item,index) in goodsList'>
		    <view><image class="one_icon" :src="item.img"></image></view>
		    <view class="text2">
		      <view>{{item.goods_title}}</view>
			  <view class="text10">会员价<text>￥{{item.price}}</text></view>
		      <view class="text3">
		        <view><text class="text5">￥{{item.original_price}}</text></view>
		       <!-- <view class="tetx4">{{item.zhek}}</view> -->
		        <view class="tetx6">{{item.retail_price}}</view>
		      </view>
		    </view>
		    <view class="text9">
		      <!-- <view class="tetx7">{{item.shengy}}</view> -->
		      <view class="text8"><image class="shop_img01" src="../https://div.buy315.com.cn/xcx_imgs/jia.png"></image></view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	import url from '../../../main.js';
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
				name:'',
				config:{
					title:'搜索页面',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff',
				},
				index1:0,
				couTop:[{
					id:0,
					name:'综合'
				},
				{
					id:1,
					name:'销量'
				},
				{
					id:2,
					name:'价格'
				}],
				goodsList:[{
					id:0,
					img:'../https://div.buy315.com.cn/xcx_imgs/kele.jpg',
					name:'[可口可乐] 汽水 碳酸饮料',
					picter:'25.00',
					zhek:'7折',
					husx:'￥30.00',
					shengy:'剩余30件'
					
				},
				{
					id:0,
					img:'../https://div.buy315.com.cn/xcx_imgs/kele.jpg',
					name:'[可口可乐] 汽水 碳酸饮料',
					picter:'25.00',
					zhek:'7折',
					husx:'￥30.00',
					shengy:'剩余30件'
					
				}]
			}
		},
		
		onLoad:function(data){
		
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				this.deployinfo = uni.getStorageSync('deployinfo');
				if(values){
					this.xshopInfo = values;
				}
				if (value) {
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
			//console.log(data);
			this.goodsList = [];
			this.sData = data;
			this.page = 0;
			// this.loadData('add',this.sData);
			//console.log(this.goodsList);
			this.inputName();
		},
		onPullDownRefresh() {
			
			this.goodsList = [];
			this.page = 0;
		    // this.loadData('refresh',this.sData);
		},
		onReachBottom() {
		    // this.loadData('add',this.sData);
		},
		created() {
			// this.initializeData();
			this.checkItem(-1);
		},
		methods: {
			clickTab(index){
				if(this.index1= index){
					this.inputName(index);
				}
				this.index1= index;
				console.log(index)
			},
			inputName(action = 'add',data,index){
				if(this.index1= index){
						this.inputName(index);
					}
			console.log(data,'这是data 哈哈')
				if(action == 'refresh'){
					this.goodsList = [];
					this.page = 0;
					this.limit = 10;
				}
				if(this.name!=undefined){
					// console.log(1);
					console.log(this.name)
					//获取信息
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
							content: this.name,
							member_openid:this.memberinfo.openid,
							limit:this.limit,
							offset:this.page*this.limit,
							// orderby: sum_xnum,
							// sorttype :desc
						};
				}else if(data.goods_code!=undefined){
					//console.log(2);
					//获取信息
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
							barcode: data.goods_code,
							member_openid:this.memberinfo.openid,
							limit:this.limit,
							offset:this.page,
						};
				}else if(data.acom_id != undefined){
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
							acom_id: data.acom_id,
							member_openid:this.memberinfo.openid,
							limit:this.limit,
							offset:this.page,
						};
				}else{
					//console.log(3);
					//获取信息
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
							member_openid:this.memberinfo.openid,
							limit:this.limit,
							offset:this.page,
						};
				}
				//console.log(arr);
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_shop_v2/goods_query',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
							//console.log(res.data);
							if(res.data.data.goods.length == 0){
								this.lim_info="没有搜索到商品";
							}
								this.lim = res.data.total;
								var max_page = res.data.total/this.limit;
								if(max_page<=this.page){
									// uni.showToast({
									//     icon: 'none',
									//     title: '没有搜索到商品'
									// });
									return;
								}
								if(res.data.status=='y'){
									var datax = res.data.data.goods;
									this.goodsList = res.data.data.goods
									console.log(res.data.data.goods)
									console.log(this.goodsList )
								}else{
									var datax = [];
									uni.showToast({
									    icon: 'none',
									    title: '没有搜索到此商品'
									});
								}
								if (action === 'refresh') {
									this.goodsList = [];
								}						
								datax.forEach(item => {
									this.goodsList.push(item);
								});
								this.page = this.page+1;
							if(action == 'refresh'){
								uni.stopPullDownRefresh();
							}							
					}
				});
			},
			// initializeData() {
			// 	//计算有多小种可选路径
			// 	let result = this.simulatedDATA.difference.reduce(
			// 		(arrs, items) => {
			// 			return arrs.concat(
			// 				items.attribute6.split(',').reduce(
			// 					(arr, item) => {
			// 						return arr.concat(
			// 							arr.map(item2 => {
			// 								//利用对象属性的唯一性实现二维数组去重
			// 								if (!this.shopItemInfo.hasOwnProperty([...item2, item])) {
			// 									this.shopItemInfo[[...item2, item]] = items;
			// 								}
			// 								return [...item2, item];
			// 							})
			// 						);
			// 					},
			// 					[
			// 						[]
			// 					]
			// 				)
			// 			);
			// 		},
			// 		[
			// 			[]
			// 		]
			// 	);
			// },
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}

.cou_top{
  font-size: 28rpx;
  color: #333;
  width: 750rpx;
  height: 90rpx;
  background-color: #fff;
  margin-bottom: 17rpx;
}
.cou_top .top{
  width: 33%;
  text-align: center;
  position: relative;
  float: left;
  height: 90rpx;
}
.cou_top .top .t1{
  height: 40rpx;
  line-height: 40rpx;
  display: inline-block;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.cou_top .top.active .t1{
  background-color: #FE0000;
  padding: 0 20rpx;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius:14rpx;
  color: #fff;
  width: 100rpx;
}
/* 商品 */
.shop_one{
  height: 190rpx;
  width: 710rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-left: 20rpx;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20rpx;
}
.one_icon{
  height: 150rpx;
  width: 150rpx;
  border-radius: 10rpx;
  margin-left: 20rpx;
  margin-top: 20rpx;
}
.text2{
  font-size: 28rpx;
  color: #333;
  margin-left: 20rpx;
  height: 150rpx;
  line-height: 50rpx;
}
.text3{
  display: flex;
  font-size: 30rpx;
  color: #fe0000;
  font-weight: bold;
}
.text5{
  font-weight: none;
}
.tetx4{
  font-size: 22rpx;
  margin-left: 20rpx;
}
.tetx6{
  font-size: 24rpx;
  color: #999;
  text-decoration:line-through;
  margin-left: 20rpx;
}
.tetx7{
  font-size: 24rpx;
  color: #fe0000;
  font-weight: bold;
}

.text9{
  position: absolute;
  right: 20rpx;
  line-height: 65rpx;
}
.shop_img01{
	height: 50upx;
	width: 50upx;
	margin-top: 80rpx;
}
	/* 搜索 */
	.search{
		height: 60upx;
		width: 580upx;
		background-color: #fff;
		margin-top: 20rpx;
		margin-left: 20rpx;
		display: flex;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
		align-items: center;
		
	}
	.serchall{
		display: flex;
		justify-content: space-between;
		position: relative;
		align-items: center;
	}
	.search_img{
		height: 30upx;
		width: 30upx;
		padding-left: 20rpx;
	}
	.text1{
		font-size: 24upx;
		color: #666;
		position: absolute;
		right: 20rpx;
	}
	.input_text{
		font-size: 24rpx;
		padding-left: 30rpx;
	}
	.text10{
		font-size: 24rpx;
		color: #FE0000;
	}
	.text10 text{
		padding-right:10rpx;
	}
</style>
