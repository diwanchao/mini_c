<template>
	<view>
		
	 <!-- <hx-navbar :config="config"/> -->
	<view class="_notice">
		<view class="rowes" v-for="(item,index) in getRowselist" :key="index" >
			<view @click="goDetails(item)">
				<image class="rower_image" :src="item.imgs_original" mode=""></image>
			</view>
			<view class="_notice" @click="goDetails(item)" style="padding-left: 20upx;">
				<view class="titlesss">{{item.goods_title}}</view>
				<view class="money">
					<view class="money_p">￥{{item.retail_price}}</view>
					<!-- <view class="money_h">￥{{item.moeys}}</view> -->
				</view>
			</view>
<!-- 			<view @click="addToCart">
				<image  class="imgmore" src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode=""></image>
			</view> -->
		</view>
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
				// config:{
				// 	title: '浏览记录',
				// 	color: '#ffffff',
				// 	backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				// 	statusBarFontColor:'#fff'
				// },
				getRowselist:[
					{
						id:0,
						img:'https://div.buy315.com.cn/xcx_imgs/pj1.png',
						title:'这是一个美丽的笑脸',
						moey:'30.00',
						moeys:'40.00',
						barcode_id:'',
					},
					{
						id:1,
						img:'https://div.buy315.com.cn/xcx_imgs/pj1.png',
						title:'这是一个美丽的笑脸',
						moey:'25.00',
						moeys:'40.00',
						barcode_id:'',
					}
				],
			}
		},
		created() {
			this.getRowselists();
		},
		onLoad() {
			
		},
		
	
		methods: {
			
			goDetails(item) {
				console.log(item.barcode_id);
				uni.navigateTo({
					url:"../goods_details/goods_details?barcode_id=" + item.barcode_id
				})
			},
			addToCart() {
				//加入购物前先检查有没有选择规格
				if(this.choice.choice_spec.length > 0){
					var selectArrx = [];
					var k1 = 0;
					for (let y1 in this.selectArr) {
						if(this.selectArr[y1] != ""){
							selectArrx[k1] = this.selectArr[y1];
							k1++;
						}
					}
					if(selectArrx.length < this.choice.choice_spec.length){
						uni.showToast({
							title: '请选择规格',
							duration: 1000,
							icon:"none",
						});
						return;
					}
				}
				
				//组织要提交的备注信息
				var bjRemark = "";
				var tag_name = "";
				var bzInt = "";
				var sgt_ids = "";
				var allbzxzInt = "";
				for (let b in this.choice_tag) {
					if(this.choice_tag[b].goods_tag.is_must==1){
						tag_name += this.choice_tag[b].goods_tag.name+",";
						allbzxzInt  += this.choice_tag[b].goods_tag.sgt_id+",";
					}
					var str_bz = "";
					var sgt_ids_b = "";
					var bzInt_b = "";
					for (let b1 in this.choice_tag[b].goods_tag.tag) {
						if(this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0){
							str_bz = this.choice_tag[b].goods_tag.name+":【"+this.choice_tag[b].goods_tag.tag[b1].tag_name+"】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if(this.choice_tag[b].goods_tag.is_must==1){
								bzInt_b  = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
						if(this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0){
							str_bz = this.choice_tag[b].goods_tag.name+":【"+this.choice_tag[b].goods_tag.t_name+"】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if(this.choice_tag[b].goods_tag.is_must==1){
								bzInt_b  = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
					}
					if(str_bz!=''){
						bjRemark += str_bz+",";
						sgt_ids += sgt_ids_b+",";
						if(this.choice_tag[b].goods_tag.is_must==1){
							bzInt += bzInt_b+",";
						}
					}
				}
				//检查备注信息是不是必须选择，如果是要先选择备注信息
				if(allbzxzInt != bzInt){
					uni.showToast({
						title: "请选择："+tag_name,
						duration: 1000,
						icon:"none",
					});
					return;
				}
				uni.showToast({
					title: '加入成功',
					duration: 1000
				});
				//console.log(this.goodsinfo);
				var xxx={
					stores_id:this.xshopInfo.store.stores_id,
					barcode_id:this.goodsinfo.barcode_id,
					category_id:this.goodsinfo.category_id,
					goods_id:this.goodsinfo.goods_id,
					goods_title:this.goodsinfo.goods_title,
					img:this.goodsinfo.imgs[0],
					original_price:this.goodsinfo.original_price,
					price:this.goodsinfo.price,
					promotion:this.goodsinfo.promotion,
					unit:this.goodsinfo.unit,
					astrict_num:this.goodsinfo.astrict_num,
					spec:this.spec,
					site:2,
					remark:bjRemark,
					sgt_ids:sgt_ids,
				};
				//console.log(xxx);
				//console.log(this.goodsinfo);return;
				this.jrShoppingCart(1,xxx);
			},
			getRowselists(data){
				try {//从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					//console.log(value);
					if(values){
						this.xshopInfo = values;
						this.stores_name = values.store.stores_name;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if(valuex){
						this.shoppingCarts = valuex;
					}
				}catch (e) {
								// error
				}
				// this.barcode_id = data.barcode_id;
				var arr ={
					stores_id:this.xshopInfo.store.stores_id,
					// barcode_id:data.barcode_id,
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/get_member_store_browsing_records',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						this.getRowselist = res.data.list;

					}
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.rowes{
		height: 190upx;
		width: 710upx;
		background-color: #fff;
		margin-left: 20upx;
		margin-top: 20upx;
		border-radius: 10upx;
		box-sizing: border-box;
		display: flex;
		position: relative;
	}
	.rowes:last-child{
		margin-bottom: 20upx;
	}
	.rower_image{
		height: 150upx;
		width: 150upx;
		border-radius: 10upx;
		margin-top: 20upx;
		margin-left: 20upx;
	}
	._notice{
		height: 150upx;
		line-height: 75upx;
		box-sizing: border-box;
		width: 100%;
		margin-top: 20upx;
	}
	.titlesss{
		font-size: 28upx;
		color: #333;
		width: 70%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.money{
		display: flex;
		font-size: 30upx;
		color: #fe0000;
		align-items: center;
	}
	.money .money_p{
		font-weight: bold;
	}
	.money .money_h{
		font-size: 24upx;
		color: #999;
		text-decoration: line-through;
		font-weight: none;
		margin-left: 20upx;
	}
	.imgmore{
		height: 50upx;
		width: 50upx;
		position: absolute;
		right: 20upx;
		top: 70upx;
	}
</style>
