<template>
	<view>
		<hx-navbar :config="config"/>
		  <view class="nav">
		    <view class="icon_wjcc"><image class="icon_wjccs" src="https://div.buy315.com.cn/xcx_imgs/baopin.png"></image></view>
		  <!--  <view class="icon_text">晚间特价：9.9三件起</view> -->
		  </view> 
		<!-- 商品 -->
		<view>
		  <view class="shop_one" v-for='(item,index) in goodsinfo' >  
		    <view><image class="one_icon" :src="item.imgs_original"></image></view @click="gotonewdetail(item)">
		    <view class="text2" @click="gotonewdetail(item)">
		      <view style="width: 75%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{item.goods_title}} <text class="shengyu">已售{{item.sales_volume}}件</text></view>
			   <view class="text10">海量爆品 当日达</view>
		      <view class="text3">
		        <view><text class="text5">{{item.sdp_price}}</text></view>
		       <!-- <view class="tetx4">{{item.zhek}}</view> -->
		        <view class="tetx6">{{item.retail_price}}</view>
		      </view>
		    </view>
		    <view class="text9" @click="jrShoppingCart(1,item,item.group_id,'dh'+item.group_id+'-'+item.barcode_id)">
		      <view class="tetx7">{{item.shengy}}</view>
		      <view class="text8"><image class="shop_img01" src="https://div.buy315.com.cn/xcx_imgs/jia.png"></image></view>
		    </view>
		  </view>
		  <view class="Suspension" @click="gotogouwuc">
		  	 <view><image class="Suspensionimg" src="https://div.buy315.com.cn/xcx_imgs/gouwuche.png"></image></view>
		  </view>
		</view>
	</view>
</template>

<script>
	import url from '../../main.js';
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
				config:{
					title: '爆品好货',
					color: '#ffffff',
					backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
					statusBarFontColor:'#fff'
				},
				active_rules:[1,2,3],
				height:'',
				goodsinfo:[],
			}
		},
		created() {

		},
		onLoad() {
			console.log('dsgftdgsufg')
			// 获取系统高度
			uni.getSystemInfo({
				success:(res) =>{
					this.height = res.statusBarHeight + this.CustomBar
					// this.height = uni.getSystemInfoSync()['statusBarHeight'] + 45;
					console.log(this.height)
				}
			})
			this.getexlosIve();
		},
		methods: {
		gotogouwuc(){
			uni.switchTab({
				url:'/pages/shoppingcart/shoppingcart'
			})
		},
			jrShoppingCart(num_s,goods_info){
				uni.showToast({
				      title: '加入成功',
				      duration: 1000,
					  icon:'none'
				     });
				//num_s参数   0和1，0为减，1为加
				//goods_info参数  一维数组
				//console.log(goods_info);
				//console.log(this.shoppingCarts);return;
				//限购数量和购物车数量对比
				for(let ixs in this.shoppingCarts){
					if(this.shoppingCarts[ixs].barcode_id==goods_info.barcode_id){
						if(goods_info.astrict_num !== '' && ((parseFloat(this.shoppingCarts[ixs].num)+1) > goods_info.astrict_num)){
							uni.showToast({
							    icon: 'none',
							    title: '商品【'+this.shoppingCarts[ixs].goods_title+'】限购'+goods_info.astrict_num+goods_info.unit
							});
							return;
						}
					}					
				}
				//如果重复，查询下重复的商品在购车的数量
				var snum = 0;
				for(let ix in this.shoppingCarts){
					if(this.shoppingCarts[ix].barcode_id==goods_info.barcode_id  && this.shoppingCarts[ix].stores_id==this.xshopInfo.store.stores_id){
						snum = parseFloat(this.shoppingCarts[ix].num);
					}					
				}
				//只留下不重复的
				var glistx = [];
				var mxx = 0;
				for(let i in this.shoppingCarts){
					if(this.shoppingCarts[i].barcode_id!=goods_info.barcode_id  && this.shoppingCarts[i].stores_id==this.xshopInfo.store.stores_id && this.shoppingCarts[i].status==1){
						glistx[mxx] = {
							stores_id:this.xshopInfo.store.stores_id,
							barcode_id:this.shoppingCarts[i].barcode_id,
							category_id:this.shoppingCarts[i].category_id,
							goods_id:this.shoppingCarts[i].goods_id,
							goods_title:this.shoppingCarts[i].goods_title,
							img:this.shoppingCarts[i].img,
							original_price:this.shoppingCarts[i].original_price,
							price:this.shoppingCarts[i].price,
							promotion:this.shoppingCarts[i].promotion,
							num:this.shoppingCarts[i].num,
							unit:this.shoppingCarts[i].unit,
							spec:this.shoppingCarts[i].spec,
							site:this.shoppingCarts[i].site,
							status:this.shoppingCarts[i].status,
							remark:this.shoppingCarts[i].remark,
							sgt_ids:this.shoppingCarts[i].sgt_ids,							
						}
						mxx++;
						//console.log(12344555);
					}					
				}
				//this.shoppingCarts = glistx;
				//console.log(this.shoppingCarts);
				var glist = [];
				var mx = 0;
				glist[mx] = {
					stores_id:this.xshopInfo.store.stores_id,
					barcode_id:goods_info.barcode_id,
					category_id:goods_info.category_id,
					goods_id:goods_info.goods_id,
					goods_title:goods_info.goods_title,
					img:goods_info.img,
					original_price:goods_info.original_price,
					price:goods_info.price,
					promotion:goods_info.promotion,
					num:snum+1,
					unit:goods_info.unit,
					spec:this.spec,
					site:2,
					status:1,
					remark:goods_info.remark,
					sgt_ids:goods_info.sgt_ids,					
				}
				//console.log(glist);
				this.shoppingCarts = glistx.concat(glist);
				
				//写入缓存
				uni.setStorage({
					key: 'shoppingCarts',
					data:this.shoppingCarts,
					success: function () {
					}
				});
				this.sumShoppingCartNum();
				//console.log(this.shoppingCarts);
			},
			sumShoppingCartNum(){
				//合计购物车数量
				var snum = 0;
				for(let i in this.shoppingCarts){
					if(this.shoppingCarts[i].stores_id==this.xshopInfo.store.stores_id){
						snum+=parseFloat(this.shoppingCarts[i].num);
					}					
				}
				this.shoppingCartNum = snum;
			},
			chooseItem(item, n, event, index) {
				if (this.selectArr[n] != item) {
					this.$set(this.selectArr, n, item);
					this.$set(this.subIndex, n, index);
					
					//对比下面2个数组来切换商品信息
					var selectArrx = [];
					var str_xzSpec = "";
					var k1 = 0;
					for (let y1 in this.selectArr) {
						if(this.selectArr[y1] != ""){
							selectArrx[k1] = this.selectArr[y1];
							str_xzSpec += this.selectArr[y1]+",";
							k1++;
						}
					}
					if(selectArrx.length == this.choice.choice_spec.length){
						var goodsAttr = [];
						for (let y2 in this.goodsinfos) {
							var str_sp = "";
							for (let y3 in this.goodsinfos[y2].specs) {
								str_sp += this.goodsinfos[y2].specs[y3].spec_attr_val_name+",";
							}
							if(str_sp == str_xzSpec){
								goodsAttr = this.goodsinfos[y2];
							}
						}
						this.goodsinfo = goodsAttr;
						this.get_xxb(this.goodsinfo.barcode_id,this.goodsinfo.price);
						//读出对应的商品备注
						var choice_tag = [];
						var k = 0;
						for (let i in this.choice.choice_tag) {
							if(this.choice.choice_tag[i].barcode_id == this.goodsinfo.barcode_id){
								choice_tag[k] = {
									goods_tag:this.choice.choice_tag[i].goods_tag,
								}
								k++;
							}
						}
						this.choice_tag = choice_tag;
					}
				} else {
					this.$set(this.selectArr, n, '');
					this.$set(this.subIndex, n, -1); //去掉选中颜色
				}
				this.checkItem(n);
			},
			checkItem(clickIndex) {
				var option = this.simulatedDATA.specifications;
				for (let i = 0, len = option.length; i < len; i++) {
					if (i == clickIndex) {
						continue;
					}
					let len2 = option[i].list.length;
					for (let j = 0; j < len2; j++) {
						if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
							continue;
						}
						let choosed_copy = [...this.selectArr];
						this.$set(choosed_copy, i, this.simulatedDATA.specifications[i].list[j].name);
						let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');
						if (this.shopItemInfo.hasOwnProperty(choosed_copy2)) {
							this.$set(this.simulatedDATA.specifications[i].list[j], 'isShow', true);
						} else {
							this.$set(this.simulatedDATA.specifications[i].list[j], 'isShow', false);
						}
					}
				}
			},
			initializeData() {
				//计算有多小种可选路径
				let result = this.simulatedDATA.difference.reduce(
					(arrs, items) => {
						return arrs.concat(
							items.attribute6.split(',').reduce(
								(arr, item) => {
									return arr.concat(
										arr.map(item2 => {
											//利用对象属性的唯一性实现二维数组去重
											if (!this.shopItemInfo.hasOwnProperty([...item2, item])) {
												this.shopItemInfo[[...item2, item]] = items;
											}
											return [...item2, item];
										})
									);
								},
								[
									[]
								]
							)
						);
					},
					[
						[]
					]
				);
			},
			//选择单位或备注
			ggxz(type,data,xdata){
				if(type==1){
					//切换单位
					var choice_unit = [];
					for(let u in this.choice_unit){
						this.choice_unit[u].site = 1;
						if(this.choice_unit[u].unit_id == data){
							this.choice_unit[u].site = 2;
						}
						choice_unit[u] = {
								unit:this.choice_unit[u].unit,
								unit_id:this.choice_unit[u].unit_id,
								site:this.choice_unit[u].site,
						}
					}
					this.choice_unit = choice_unit;
					//切换单位的时候切换商品数据
					for(let g in this.goodsinfos){
						if(this.goodsinfos[g].unit_id == data){
							this.goodsinfo = this.goodsinfos[g];
						}
					}
					this.get_xxb(this.goodsinfo.barcode_id,this.goodsinfo.price);
				}
				if(type==3){//备注信息的选中效果
					var oneTag = [];
					for(let u in this.choice_tag){
							//console.log(this.choice_tag[u].goods_tag.name);
							var threeTag = [];
							for(let u3 in this.choice_tag[u].goods_tag.tag){
								if(this.choice_tag[u].goods_tag.name == xdata){
									this.choice_tag[u].goods_tag.tag[u3].site = 1;
								}
								if(this.choice_tag[u].goods_tag.name == xdata && this.choice_tag[u].goods_tag.tag[u3].tag_name == data){
									this.choice_tag[u].goods_tag.tag[u3].site = 2;
								}
								threeTag[u3] = {
									tag_id:this.choice_tag[u].goods_tag.tag[u3].tag_id,
									tag_name:this.choice_tag[u].goods_tag.tag[u3].tag_name,
									site:this.choice_tag[u].goods_tag.tag[u3].site,
								}
							}
							
							if(this.choice_tag[u].goods_tag.name == xdata){
								this.choice_tag[u].goods_tag.site = 1;
							}
							if(this.choice_tag[u].goods_tag.name == xdata && data=="自定义"){
								this.choice_tag[u].goods_tag.site = 2;
							}
						oneTag[u] = {
							goods_tag:{
								name:this.choice_tag[u].goods_tag.name,
								tag:threeTag,
								site:this.choice_tag[u].goods_tag.site,
								t_name:this.choice_tag[u].goods_tag.t_name,
								is_must:this.choice_tag[u].goods_tag.is_must,
								sgt_id:this.choice_tag[u].goods_tag.sgt_id,
							},
						}
					}
					this.choice_tag = oneTag;
				}
			},
			gotonewdetail(item){
				console.log('fhesuortgieoa')
				console.log(item.barcode_id)
				uni.navigateTo({
					url:"../goods_details/goods_details?barcode_id=" + item.barcode_id
				})
			
			},
			getexlosIve(data){
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
				var arr ={
					stores_id:this.xshopInfo.store.stores_id,
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/stores/gethotmoneygoodslist',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						this.goodsinfo = res.data.data;
						this.exlosleng = res.data.total
						console.log(res.data.data)
				
					}
				})
			},
		}
	}
</script>

<style>
/* pages/index/market.wxss */
page{
	background-color: #f7f7f7;
}
.nav{
  position: relative;
}
.icon_wjccs{
  height: 350rpx;
  width: 710rpx;
  margin-left: 20rpx;
  border-radius: 10rpx;
  margin-top: 20rpx;
}
.icon_text{
  position: absolute;
  top: 220rpx;
  color: #fff;
  width: 750rpx;
  left: 30%;
}
.marth_text{
  display: flex;
  align-items: center;
  height: 67rpx;
  line-height: 67rpx;
  justify-content: center;
  font-size: 36rpx;
  font-weight: bold;
  color: #FE0000;
}
.icon_left{
  height: 26rpx;
  width: 26rpx;
  margin-right: 20rpx;
}
.icon_right{
  height: 26rpx;
  width: 26rpx;
  margin-left: 20rpx;
}
.marth_time{
  display: flex;
}
.text1{
  font-size: 28rpx;
  margin-left: 20rpx;
  font-weight: bold;
  height: 81rpx;
  line-height: 81rpx;
}
.market_times{
  display: flex;
  color: #fff;
  width: 130rpx;
  justify-content: space-around;
  font-size: 24rpx;
  align-items: center;
}
.market_times view{
  background-color: #FE0000;
  width: 30rpx;
  height: 30rpx;
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
  width:100%;//自己调整
  word-break:keep-all;/* 不换行 */
  white-space:nowrap;/* 不换行 */
  overflow:hidden;
  text-overflow:ellipsis;
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
/* 会员 */
.vip{
  position: relative;
  margin-left: 20rpx;
  height: 98rpx;
  width: 710rpx;
}
.vip_icon{
  height: 98rpx;
  width: 710rpx;
}
.vip_text{
  font-size: 36rpx;
  color: #333;
  font-weight: bold;
  position: absolute;
  top: 25rpx;
  left: 200rpx;
}
/* 优惠券 */
.maret_group{
  height: 130rpx;
  width: 710rpx;
  background-color: #fff;
  margin-top: 20rpx;
  margin-left: 20rpx;
}
.scroll_market{
  white-space: nowrap;
}
.market_icon{
  height: 110rpx;
  width: 252rpx;
}
.market_yhj{
  display: inline-block;
  height: 110rpx;
  width: 252rpx;
  margin-right: 60rpx;
  position: relative;
  margin-top: 10rpx;
}
.money1{
  font-size: 28rpx;
  color: #FD857D;
  font-family: Microsoft YaHei;
  position: absolute;
  top: 35rpx;
  left: 5rpx;
}
.money2{
  font-size: 74rpx;
  color: #FD857D;
  position: absolute;
  top: -10rpx;
  left: 20rpx;
  font-weight: bold;
  letter-spacing: -10rpx;
}
.money3{
  font-size: 26rpx;
  color: #FD857D;
  position: absolute;
  top: 15rpx;
  left: 100rpx;
  font-weight: bold;
  font-family: RS_TeCuHei;
}
.money4{
  font-size: 20rpx;
  color: #FD857D;
  position: absolute;
  top: 50rpx;
  left: 100rpx;
  font-family: SimHei;
}
.money5{
  font-size: 20rpx;
  color: #FD857D;
  position: absolute;
  top: 80rpx;
  left: 25rpx;
  font-family: SimHei;
}
/* 更多精彩 */
.more{
  height: 110rpx;
  display: flex;
  justify-content: center;
  padding-top: 20rpx;
}
.more_icon{
  height: 46rpx;
  width: 260rpx; 
}
/* 其他频道 */
.other_one{
  height: 200rpx;
  width: 710rpx;
  background-color: #a6d47a;
  border-radius: 20rpx;
  margin-left: 20rpx;
  position: relative;
  margin-bottom: 50rpx;
}
.other_gou{
  font-size: 40rpx;
  color: #fff;
  height: 70rpx;
  line-height: 70rpx;
  padding-top: 10rpx;

}
.other_bao{
  font-size: 23rpx;
  color: #fff;
  height: 40rpx;
  line-height: 40rpx;
}
.other_cha{
  height: 50rpx;
  background-color: #70bc26;
  border-radius: 20rpx;
  position: absolute;
  right: 97rpx;
  font-size: 24rpx;
  color: #fff;
  width: 150rpx;
  top: 130rpx;
  line-height: 50rpx;
}
.other_text{
  width: 345rpx;
  height: 200rpx;
  text-align: center;
  position: absolute;
  right: 0;
}
.other_icon{
  height: 215rpx;
  width: 365rpx;
  position: absolute;
  bottom: 12rpx;
  margin-top: 30rpx;
}
.other_one1{
  background-color: #fcb490;
}
.other_cha1{
  background-color: #ff874b;
}
/* 规则 */
.active_footer{
  /* height: 306rpx; */
  width: 710rpx;
  border: 3rpx solid;
  border-image: linear-gradient(#1848BB,#4AB8F1)3;
  margin-top: -30rpx;
  /* opacity: 0.2; */
  border-radius: 5rpx;
  margin-left: 20rpx;
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  
}
.active_imgs{
  position: relative;
}
.active_img{
  height: 46rpx;
  width: 184rpx;
  position: relative;
  z-index: 10;
  left: 40%;
}
.active_rules{
  font-size: 24rpx;
  color: #333333;
  width: 660rpx;
  text-align: left;
  padding-left: 20rpx;
  padding-top: 54rpx;
  padding-right: 20rpx;
  line-height: 40rpx;
  z-index: 10;
}
.text10{
	font-size: 24upx;
	color: #999;
}
.shop_img01{
	height: 50upx;
	width: 50upx;
	margin-top: 80rpx;
}
.topimg{
	height: var(--status-bar-height); 
	width: 100%;
}
.shengyu{
	position: absolute;
	right: 20rpx;
	font-size: 24rpx;
	color: #999;
}
.Suspension{
	position: relative;
	height: 80upx;
	width: 80upx;
	background-color: #FC8282;
	border-radius: 50%;
	position: fixed;
	right: 40rpx;
	bottom: 50rpx;
}
.Suspensionimg{
	height: 35upx;
	width: 35upx;
	position: absolute;
	left: 20upx;
	top: 25upx;
}
</style>
