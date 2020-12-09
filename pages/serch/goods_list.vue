<template>
    <view>
		<!-- <hx-navbar :config="config" /> -->
		<view class="search_text" style="padding-top: 80upx;">
			<view class="search_this" v-for="(item,msindex) in goodsList" :key="msindex">
				<view class="search_img" @click="goDetails(item)">
					<image class="this_img" :src="item.img" mode="aspectFill"></image>
					<view class="right_status">
						{{item.delivery_type == 1 ? '次日达' : '及时达'}}
					</view>
				</view>
				<view class="text_two">
					<view class="left_this_text" @click="goDetails(item)">
						<view class="x12 tctj-body-right-title" style="height: auto;">
							<view class="x12 search_shoptitle" >{{item.goods_title}}</view>
							<view class="x12" v-if="(item.price*1) < (item.original_price*1)" >
								<view>{{deployinfo.monetary_symbol}}{{item.original_price}}<span >/{{item.unit}}</span></view>
							</view>
						</view>
						<view class="x12 jianjie">
								真好吃啊
						</view>
						<view class="x12" style="height: 40upx;">
							<view class="manjian">
								满199减100
							</view>
						</view>
						<view class="x12 tctj-body-right-price" >
							{{deployinfo.monetary_symbol}}{{item.price}}<span >/{{item.unit}}</span> <span class="span_span">{{deployinfo.monetary_symbol}}{{item.original_price}}</span>
						</view>
					</view>
					<view class="x-auto float-right this_jia" >
						<view class="x-auto" v-for="(cartitme,cartindex) in shoppingCarts" :key="cartindex" v-if="cartitme.barcode_id==item.barcode_id">
							<view class="x-auto" v-if="cartitme.num>0" @click="jrShoppingCart(0,item)"><image src="https://div.buy315.com.cn/xcx_imgs/jian.png"  mode="aspectFill" style="width: 45upx; height: 45upx;"></image></view>
							<view style="padding: 0 10upx;" class="x-auto" v-if="cartitme.num>0" >{{cartitme.num}}</view>
						</view>
						<view class="x-auto" @click="jrShoppingCart(1,item)"  v-if="item.more==1 && (item.sale_num==='' || item.sale_num>0)"><image src="https://div.buy315.com.cn/xcx_imgs/jia.png"  mode="aspectFill" style="width: 45upx; height: 45upx;"></image></view>
						<view class="x-auto" v-if="item.more==2 && (item.sale_num==='' || item.sale_num>0)">
							<view type="primary"  @click="togglePopup('bottom', 'popup',item)">
								<image src="https://div.buy315.com.cn/xcx_imgs/jia.png"  mode="aspectFill" style="width: 45upx; height: 45upx;"></image>
							</view>
						</view>
						<view class="x-auto" v-if="item.sale_num===0"><image src="https://div.buy315.com.cn/xcx_imgs/jian.png"  mode="aspectFill" style="width: 45upx; height: 45upx;"></image></view>
					</view>
<!-- 					<view class="x12" style="font-size: 8pt; color: #fff; margin-top: 4px; padding-bottom: 4px;">
						<view class="float-left" style="border: #f60 solid 1px; padding: 1px 4px; border-radius:2px;background-color: #f60; margin-right: 5px;" v-if="item.show_month_sales==1">月销 {{item.month_sales}}</view>
						<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;" v-if="item.sale_num>0 && item.show_sale_num==1">库存 {{item.sale_num}}</view>
						<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;" v-if="item.sale_num===0 && item.show_sale_num==1">售罄</view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="x12 text-center " v-if="lim==0">{{lim_info}}
			<viwe >
				<viwe class="zanwushik"><image class="imgthis" src="../../static/hui.png" style="marign-top::;"></image></viwe>
				<viwe class="textwenzi">暂未搜索到商品</viwe>
			</viwe>
		</view>
		<view class="x12 shop-menu">
			
			<view class="Suspension" @click="goGwc">
				<view><image class="Suspensionimg" src="https://div.buy315.com.cn/xcx_imgs/gouwuche.png"></image></view>
			</view>
		<!-- 		<view class="x12 text-center"  @click="goGwc">
					购物车
				</view>	 -->			
	
		</view>
		<!--多规格弹窗的显示开始-->
		<view class="x12" v-if="xpopup==1">
			<uni-popup ref="showpopup" :type="type" @change="change"  style="position: absolute; z-index: 1000000; bottom: 0;">
				<view class="x12 popup-content">
					<view class="x12 border-bottom border-gray" style="width: 700upx; padding-bottom: 10px; margin-bottom:0px;">
						<view class="x-auto" v-for="(item,index) in goodsinfo.imgs" :key="index" v-if="index==0" style="width: 180upx;">
							<image :src="item" style="width: 180upx;height: 180upx;"></image>
						</view>
						<view class="x12 bg-white" style="width: 500upx; padding-left: 20upx;">
							<view class="x12" v-if="goodsinfo.length != 0">
								<view class="x12">
									<view class="x12 text-large" style="font-size: 14pt; color: #393D4A;">{{goodsinfo.goods_title}}</view>
								</view>
								<view class="x12" v-if="goodsinfo.promotion==2">
									<image src="../../static/cx.png" style="width: 70upx; height: 30upx;"></image>
								</view>
								<view class="x12 text-large" style="padding-top: 15upx;">
									<view class="x-auto">
										<view class="x-auto">
											<span style="color:#F65A2A; font-size: 14pt;">{{deployinfo.monetary_symbol}}{{goodsinfo.price}}</span>
										</view>
										<view class="x-auto" style="padding-left: 10upx;">
											<span style="color:#393D4A; font-size: 10pt;">/{{goodsinfo.unit}}</span>
											<span style="font-size: 10pt; color: #999; text-decoration: line-through; font-weight: 100;" v-if="(goodsinfo.price*1) < (goodsinfo.original_price*1)">
												{{deployinfo.monetary_symbol}}{{goodsinfo.original_price}}/{{goodsinfo.unit}}
											</span>
										</view>
									</view>
								</view>
							</view>
							<view class="x12" style="font-size: 10pt; color: #fff; padding-bottom: 4px;" v-if="goodsinfo.show_month_sales==1 || goodsinfo.show_sale_num==1">
								<view class="float-left" style="border: #f60 solid 1px; padding: 1px 4px; border-radius:2px;background-color: #f60; margin-right: 5px;" v-if="goodsinfo.show_month_sales==1">月销 {{goodsinfo.month_sales}}</view>
								<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;" v-if="goodsinfo.sale_num>0 && goodsinfo.show_sale_num==1">库存 {{goodsinfo.sale_num}}</view>
								<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;" v-if="goodsinfo.sale_num===0 && goodsinfo.show_sale_num==1">售罄</view>
							</view>
						</view>
					</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true"   style="height:44vh;" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
						<view class="x12 bg-white text-333 text-big" style=" margin-top:0; padding: 0;">
							<view class="x12"  v-if="choice_unit.length!=0" style="width:690upx; padding: 20upx 0 30upx 0;border-bottom: 1px dashed #EEEEEE;">
								<view class="x12" style="color: #333;font-size: 26upx;font-weight: bold; margin-bottom: 6upx;">规格</view>
								<view class="x12">
									<view v-for="(uitem,uindex) in choice_unit" :key="uindex" class="x-auto" style="margin-top: 16upx;">
										<view class="x-auto  xzbg" v-if="uitem.site==2">{{uitem.unit}}</view>
										<view class="x-auto  mbg"  @click="ggxz(1,uitem.unit_id)" v-else>{{uitem.unit}}</view>
									</view>
								</view>
							</view>
							<view id="vmsimulatedDATA" class="x12 productBox" v-if="simulatedDATA.specifications.length>0" style="border-bottom:1px dashed #EEEEEE; width: 700upx; padding: 10upx 0 20upx 0;">
								<view class="productConten">
									<view class="product-delcom" v-for="(ProductItem,n) in simulatedDATA.specifications" :key="n">
										<view class="product-name" style="font-weight: bold;">{{ProductItem.name}}</view>
										<view class="product-footerlist clearfix">
											<view v-for="(oItem,index) in ProductItem.list" :key="index" v-on:click="chooseItem(oItem.name,n,$event,index)"
											 v-bind:class="[oItem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">{{oItem.name}}</view>
										</view>
									</view>
								</view>
							</view>
							<view class="x12" style="padding: 10upx 0;" v-if="choice_tag.length!=0">
								<view class="x12" v-for="(citem,cindex) in choice_tag" :key="cindex"  style="width:690upx; padding: 30upx 0 10upx 0;">
									<view class="x12" style="color: #333;font-size: 26upx;font-weight: bold; margin-bottom: 6upx;">{{citem.goods_tag.name}}</view>
									<view class="x12">
										<view v-for="(titem,tindex) in citem.goods_tag.tag" :key="tindex" class="x-auto" style="margin-top: 16upx;">
											<view class="x-auto  xzbg" v-if="titem.site==2">{{titem.tag_name}}</view>
											<view class="x-auto  mbg"  @click="ggxz(3,titem.tag_name,citem.goods_tag.name)" v-else>{{titem.tag_name}}</view>
										</view>
									</view>
									<view class="x-auto" v-if="citem.goods_tag.site==2" style="padding:16upx 0 0 0; width: 690upx;">
										<input placeholder="备注"  style="width:658upx;height:66upx; padding: 0 15upx; background:rgba(245,245,245,1);border-radius:4px;border:1px solid rgba(204,204,204,1);"  v-model="citem.goods_tag.t_name"/>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="x12 bg-white text-default text-333">
					<view class="x6 text-white text-center" @click="addToCart" style="line-height: 85upx; background-color: #F65A2A; font-size: 12pt;">
						加入购物车
					</view>
					<view class="x6 text-white text-center"  @click="goToMs" style="line-height: 85upx; background-color: #f0a63b; font-size: 12pt;">
						立即购买
					</view>
				</view>
			</uni-popup>
		</view>
		<!-- 搜索弹窗 -->
		<view class="search_click">
			<view class="x12 padding search_add" style="font-size: 11pt;">
				<view class="this_search">
					<view class="x-auto" >
						<image class="this_imgsearch" src="https://div.buy315.com.cn/xcx_imgs/search.png" style="width: 28upx; height: 28upx;"></image>
					</view>
					<view class="x-auto" >
						<input placeholder="请输入商品名称" class=" input" v-model="goods_title"/>
					</view>	
				</view>	
				<view class="search_txt" @click="serchAll" >
					{{sousuo_t}}
				</view>
			</view>
		</view>
		<view class="search_all" v-if="float_display">
			<view v-if="display" class="del" @click="dell"><image src="https://div.buy315.com.cn/xcx_imgs/del_del.png" mode=""></image></view>
			<view class="history" v-if="display">
				<view class="bt">历史记录</view>
				<view class="list" v-for="(item,index) in history_goods" :key='index' @click="clickTab(item)">{{item}}</view>
			</view>
			<view class="history tuijian">
				<view class="bt">推荐搜索</view>
				<view class="list" v-for="(item,index) in tuijian" :key='index' @click="clickTab(item.name)">{{item.name}}</view>
			</view>
		</view>
		<!--多规格弹窗的显示结束-->
    </view>
</template>
<script>import url from '../../main.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
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
		components: {
			uniPopup
		},
		data() {
			return {
				deployinfo:{},//配置信息货币单位，符号，以及其他的一些配置参数
				// config:{
				// 	title:'搜索页面',
				// 	color: '#ffffff',
				// 	backgroundImg: 'https://div.buy315.com.cn/xcx_imgs/content_top.png',
				// 	statusBarFontColor:'#fff',
				// },
			goodsList:[],
			login:false,
			memberinfo:[],
			sData:[],
			lim:0,
			lim_info:'',
			
			renderImage: false,
			limit:30,
			page:0,
			xshopInfo:[],
			shoppingCarts:[],
			
			//弹窗
			content:'',
			type:'',
			inverted: false,
			//规格滚动
			scrollTop: 0,
			old: {
			    scrollTop: 0
			},
			spec_id:0,
			spec:'',
			goodsinfo:[],
			goodsinfos:[],
			choice:[],
			choice_tag:[],
			choice_unit:[],
			simulatedDATA: { //模拟后台返回的数据 多规格
				"difference": [],
				"specifications": []
			},
			selectArr: [], //存放被选中的值
			shopItemInfo: {}, //存放要和选中的值进行匹配的数据
			subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
			xpopup:1,
			goods_title:'',
			tuijian:[],
			stor_goods_title:[],
			history_goods:[],
			display:true,
			float_display:true,
			sousuo_t:'搜索',
			input_val:''
			}
		},
		onShow:function(){
			this.goods_title = '';
			this.history()
			this.history_goods = uni.getStorageSync('goods_title')
			if(this.history_goods.length == 0){
				this.display = false
			}else{
				this.display = true
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
			this.loadData('add',this.sData);
			//console.log(this.goodsList);
		},
		onPullDownRefresh() {
			this.goodsList = [];
			this.page = 0;
		    this.loadData('refresh',this.sData);
		},
		onReachBottom() {
		    this.loadData('add',this.sData);
		},
		created() {
			this.initializeData();
			this.checkItem(-1);
		},
		methods: {
			serchAll(){
				var stor_goods_title = uni.getStorageSync('goods_title')
				this.goodsList = []
				if(this.sousuo_t == '搜索'){
					if(this.goods_title == ''){
						uni.showToast({
							title:'请输入商品名称'
						})
						return false;
					}
					this.sousuo_t = '取消'
					this.float_display = false
					
				}else{
					this.sousuo_t = '搜索'
					this.float_display = true
					this.history_goods = stor_goods_title
					this.display = true
				}
				console.log('stor_goods_title',stor_goods_title)
				if(stor_goods_title == ''){
					console.log('为空')
					stor_goods_title = []
				}
				var flag = 1
					for(var st = 0; st < stor_goods_title.length; st++){
						if(stor_goods_title[st] == this.goods_title){
							flag = 2
							break;
						}else{
							flag = 1
						}
					}
					if(flag == 1){
						stor_goods_title.push(this.goods_title)
						uni.setStorageSync('goods_title', stor_goods_title);
					}
					this.page = 0;
					this.sData.goods_title = this.goods_title
					this.loadData('add',this.sData);
				// uni.navigateTo({
				// 	url:"../serch/goods_list?goods_title="+this.goods_title
				// })
			},
			history(){
				var xarr = {
				};
				var xpdata = url.getSignStr(xarr);
				uni.request({
					url: url.websiteUrl + '/api_v2/stores/getrecommendedsearch',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: xpdata,
					success: xres => {
						console.log(xres.data);
						this.tuijian = xres.data.data
					}
				});	
			
			},
			clickTab(name){
				this.page = 0;
				this.goodsList = []
				this.sData.goods_title = name
				this.loadData('add',this.sData);
				this.float_display = false
				this.sousuo_t = '取消'
				this.input_val = name
				// uni.navigateTo({
				// 	url:"../serch/goods_list?goods_title="+name
				// })
			},
			dell(){
				uni.setStorageSync('goods_title',[]);
				this.display = false
				this.history_goods = []
			},
			goGwc() {
				uni.switchTab({//reLaunch 这是直接进入，没有滑动效果。switchTab有滑动效果
					url:"../shoppingcart/shoppingcart?acom_id="+this.sData.acom_id
				})
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
			//滚动窗口
			upper(e) {
			            //console.log(e)
			        },
			        lower(e) {
			            //console.log(e)
			        },
			        scroll(e) {
			            //console.log(e)
			            this.old.scrollTop = e.detail.scrollTop
			        },
			        goTop(e) {
			            this.scrollTop = this.old.scrollTop
			            this.$nextTick(function() {
			                this.scrollTop = 0
			            });
			            //uni.showToast({
			                //icon:"none",
			                //title:"纵向滚动 scrollTop 值已被修改为 0"
			            //})
			        },
			//弹出下拉弹窗
			togglePopup(type, open,data) {
					switch (type) {
						case 'bottom':
							this.content = '底部弹出 popup';
							this.xpopup = 1;
							this.getGoodsDetailsInfo(data);
							break
					}
					this.type = type
					this.$nextTick(() => {
						this.$refs['show' + open].open()
					})
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			change(e) {
				//console.log('是否打开:' + e.show)
			},
			//根据商品id查找当前商品基本信息
			getGoodsDetailsInfo(data){
					this.spec_id = 0;
					this.spec = '';
					this.goodsinfo = [];
					this.goodsinfos = [];
					this.choice = [];
					this.choice_tag = [];
					this.simulatedDATA = { //模拟后台返回的数据 多规格
						"difference": [],
						"specifications": []
					};
					this.selectArr = []; //存放被选中的值
					this.shopItemInfo = {}; //存放要和选中的值进行匹配的数据
					this.subIndex = []; //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
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
					} catch (e) {
									// error
					}
					//console.log(this.shoppingCarts);
					this.barcode_id = data.barcode_id;
					//获取信息
					var arr ={
										stores_id:this.xshopInfo.store.stores_id,
										barcode_id:data.barcode_id,
										member_openid: this.memberinfo.openid,
									};
					var pdata = url.getSignStr(arr);
					uni.request({
									url:url.websiteUrl+'/api_v2/mall_shop_v2/goods_details',
									method:'POST',
									dataType:'json',
									header:{
										'content-type':'application/x-www-form-urlencoded'
									},
									data:pdata,
									success: res => {
										//console.log(res.data);
										this.goodsinfo = res.data.data.goods[0];
										//console.log(this.sale_num);
										this.choice = res.data.data;
										//读出默认备注组
										var choice_tag = [];
										var k = 0;
										for (let i in res.data.data.choice_tag) {
											if(res.data.data.choice_tag[i].barcode_id == res.data.data.goods[0].barcode_id){
												//this.choice_tag = res.data.data.choice_tag[i].goods_tag;											
												choice_tag[k] = {
													goods_tag:res.data.data.choice_tag[i].goods_tag,
												}
												k++;
											}
										}
										this.choice_tag = choice_tag;
										for (let i in this.choice_tag) {//默认把备注标签加上一个t_name字段
											this.choice_tag[i].goods_tag.t_name = "";
										}
										//console.log(this.choice_tag);
										//读出默认规格
										var  x_choice_spec = [];
										var str_spec = '';//得到一级规格的名称
										for (let s in res.data.data.choice_spec) {
											var x_list = [];
											for (let s2 in res.data.data.choice_spec[s].val) {
												x_list[s2] = {
													name:res.data.data.choice_spec[s].val[s2].name,
													//spec_attr_val_id:res.data.data.choice_spec[s].val[s2].spec_attr_val_id,
												}
											}
											str_spec += res.data.data.choice_spec[s].name+",";
											x_choice_spec[s] = {
												name:res.data.data.choice_spec[s].name,
												list:x_list,
											}
										}
										//this.simulatedDATA.specifications = x_choice_spec;
										//得到都有哪些规格
										var  s_choice_spec = [];
										for (let sL in res.data.data.goods) {
											var x_str_spec = '';//得到二级规格的名称
											for (let sL2 in res.data.data.goods[sL].specs) {
												x_str_spec += res.data.data.goods[sL].specs[sL2].spec_attr_val_name+",";
											}
											s_choice_spec[sL] = {
												attribute2:str_spec.substring(0,str_spec.length-1),
												attribute6:x_str_spec.substring(0,x_str_spec.length-1),
												uid:sL,
											}
										}
										///**x_choice_spec
										this.simulatedDATA = {
											difference:s_choice_spec,
											specifications:x_choice_spec,
										};
										this.initializeData();//
										this.checkItem(-1);//
										//**/
										//读出默认单位
										for (let u in res.data.data.choice_unit) {
											if(res.data.data.choice_unit[u].unit == res.data.data.goods[0].unit){
												res.data.data.choice_unit[u].site = 2;
											}
											
										}
										this.choice_unit = res.data.data.choice_unit;
										this.goodsinfos = res.data.data.goods;
										this.spec_id = res.data.data.goods[0].spec_id;
										this.spec = res.data.data.goods[0].spec;
									}
					});
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
							duration: 2000,
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
						duration: 2000,
						icon:"none",
					});
					return;
				}
				uni.showToast({
					title: '加入成功',
					duration: 2000
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
				this.jrShoppingCart(1,xxx,'dgg');
			},
			goToMs() {//立即购买
				//检查是否登录，没有登录的跳转到登录界面
				//console.log(this.login);
				uni.showToast({
					title: '正在加载...',
					icon:'none',
					duration: 2000
				});
				try {//从本地缓存中同步获取指定 key 对应的内容。
					var value = uni.getStorageSync('memberinfo');
					if (value.length==0) {
						this.login = false;
					}else{
						this.login = true;
					}
				} catch (e) {
								// error
				}
				if(this.memberinfo.length==0){
					uni.navigateTo({
						url:"/pages/login/login"
					})
					return;
				}
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
							duration: 2000,
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
						duration: 2000,
						icon:"none",
					});
					return;
				}
				//this.hd.is_kill = 1;
				//查询一下有没有默认收货地址
				var aarr ={
						openid: this.memberinfo.openid,
						is_default:1,
					};
				var apdata = url.getSignStr(aarr);
				uni.request({
					url:url.websiteUrl+'/api_v2/member_addres_act/index',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:apdata,
					success: ares => {
						//console.log(ares.data);
						if(ares.data.data.length==0){
							uni.showToast({
							    icon: 'none',
							    title: '请先设置收货地址',
							});
							//this.hd.is_kill = 2;
							uni.navigateTo({
								url:"../goods_details/address_list"
							})
							return;
						}						
						
							
							
							//抢购成功去生成订单
							var goods_l = [];
							goods_l[0] = {
									stores_id:this.xshopInfo.store.stores_id,
									barcode_id:this.goodsinfo.barcode_id,
									num:1,
									remark:bjRemark,
									sgt_ids:sgt_ids,
							}
							//console.log(this.xshopInfo.store.stores_id,this.hd.barcode_id);
							var parr ={
									member_openid: this.memberinfo.openid,
									stores_id:this.xshopInfo.store.stores_id,
									goods:JSON.stringify(goods_l),
								};
							//console.log(arr);return;
							var xpdata = url.getSignStr(parr);
							uni.request({
								url:url.websiteUrl+'/api_v2/mall_order/pre_order',
								method:'POST',
								dataType:'json',
								header:{
									'content-type':'application/x-www-form-urlencoded'
								},
								data:xpdata,
								success: xres => {
									//console.log(res.data);return;
									if(xres.data.status=='y'){
										this.xpopup = 2;
										uni.navigateTo({
											url:"../goods_details/order_sure?order_code="+xres.data.data.order_code+"&goods_l="+JSON.stringify(goods_l)
										})
									}else{
										uni.showToast({
											icon:'none',
											title: xres.data.info,
										});
										return;
									}						
								}
							});
					}
				});
				
			},
			goDetails(item) {
				uni.navigateTo({
					url:"../goods_details/goods_details?barcode_id="+item.barcode_id
				})
			},
				// uni.switchTab({//reLaunch 这是直接进入，没有滑动效果。switchTab有滑动效果
				// 	url:"../shoppingcart/shoppingcart?acom_id="+this.sData.acom_id
				// })
		
			//扫码
			sm(){
				uni.scanCode({
					success: function (res) {
						//console.log('条码类型：' + res.scanType);
						//console.log('条码内容：' + res.result);
						uni.navigateTo({
							url:"../serch/goods_list?goods_code="+res.result
						});
						return;
					}
				});
			},
			loadData(action = 'add',data){
				if(action == 'refresh'){
					this.goodsList = [];
					this.page = 0;
					this.limit = 10;
				}
				if(data.goods_title!=undefined){
					//console.log(1);
					//获取信息
					var arr ={
							stores_id:this.xshopInfo.store.stores_id,
							content: data.goods_title,
							member_openid:this.memberinfo.openid,
							limit:this.limit,
							offset:this.page*this.limit,
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
							// if(res.data.data.goods.length == 0){
							// 	this.lim_info="没有搜索到商品";
							// }
								this.lim = res.data.total;
								var max_page = res.data.total/this.limit;
								if(max_page<=this.page){
									// uni.showToast({
									//     icon: 'none',
									//     title: '已到底'
									// });
									return;
								}
								if(res.data.status=='y'){
									var datax = res.data.data.goods;
								}else{
									var datax = [];
									// uni.showToast({
									//     icon: 'none',
									//     title: '已到底'
									// });
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
			jrShoppingCart(num_s,goods_info){
				//num_s参数   0和1，0为减，1为加
				//goods_info参数  一维数组
				//console.log(num_s);
				//console.log(goods_info);
				//console.log(this.shoppingCarts);return;
				if(num_s==1){
					//console.log(xj);
					//限购数量和购物车数量对比
					for(let ixs in this.shoppingCarts){
						if(this.shoppingCarts[ixs].barcode_id==goods_info.barcode_id){
							if(goods_info.astrict_num !== '' && ((parseFloat(this.shoppingCarts[ixs].num)+1) > goods_info.astrict_num)){
								uni.showToast({
									icon: 'none',
									title: '商品【'+this.shoppingCarts[ixs].goods_title+'】限购'+goods_info.astrict_num+goods_info.unit,
								});
								return;
							}
						}					
					}
				}
				//如果重复，查询下重复的商品在购车的数量
				var snum = 0;
				for(let ix in this.shoppingCarts){
					if(this.shoppingCarts[ix].barcode_id==goods_info.barcode_id){
						snum = parseFloat(this.shoppingCarts[ix].num);
					}					
				}
				//只留下不重复的
				var glistx = [];
				var mxx = 0;
				for(let i in this.shoppingCarts){
					if(this.shoppingCarts[i].barcode_id!=goods_info.barcode_id && this.shoppingCarts[i].stores_id==this.xshopInfo.store.stores_id && this.shoppingCarts[i].status==1){
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
					}					
				}
				//this.shoppingCarts = glistx;
				//console.log(this.shoppingCarts);
				var glist = [];
				var mx = 0;
				//console.log(snum);
				if(num_s!=1 && snum<2){
					console.log(snum+'---');//删除缓存
				}else{
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
						num:(num_s==1)?(snum+1):(snum-1),
						unit:goods_info.unit,
						spec:goods_info.spec,
						site:2,
						status:1,
						remark:goods_info.remark,
						sgt_ids:goods_info.sgt_ids,						
					}
				}
				
				this.shoppingCarts = glistx.concat(glist);
				//console.log(this.shoppingCarts);
				//写入缓存
				uni.setStorage({
					key: 'shoppingCarts',
					data:this.shoppingCarts,
					success: function () {
					}
				});
				//console.log(this.shoppingCarts);
			}
		}
	}
</script>
<style>
	page {
		background-color: #F7F7F7;
		margin: 0 auto;
	}
	.search_this{
		/* height: 190upx; */
		width: 710upx;
		background-color: #fff;
		border-radius: 10upx;
		margin-top: 20upx;
		display: flex;
		margin-left: 20upx;

		box-sizing: border-box;
		position: relative;
	}
	.search_img{
		height: 120upx;
		width: 120upx;
		border-radius: 10upx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 20upx;
		box-sizing: border-box;
	}
	.this_img{
		height: 120upx;
		width: 120upx;
		border-radius: 10upx;
	}
	.left_this_text{
		height: 190upx;
		line-height: 60upx;
		margin-top: 20upx;
		box-sizing: border-box;
	}
	.search_shoptitle{
		font-size: 28upx;
		width: 92%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.this_jia{
		z-index: 999;
		position: absolute;
		right: 20upx;
		bottom: 10upx;
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
		z-index: 9999;
	}
	.Suspensionimg{
		height: 35upx;
		width: 35upx;
		position: absolute;
		left: 20upx;
		top: 25upx;
		z-index: 9999999;
	}
	.text_two{
		padding-left: 40upx;
		box-sizing: border-box;
		width: 80%;
		margin-left: 130upx;
	}
	.textwenzi{
		font-size: 32upx;
		color: #999999;
		text-align: center;
		width: 750upx;
		display: flex;
		justify-content: center;
		margin-top: 180upx;
	}
	.zanwushik{
		width: 750upx;
		text-align: center;
		display: flex;
		justify-content: center;
	}
	.imgthis{
		height: 243upx;
		width: 200upx;
		margin: 0 auto;
	}
	
	
	
	.tctj-body-left{
		width: 120upx;
		height: auto;
		float:left;
		padding-left: 36upx;
	}
	.tctj-body-left image{
		width: 120upx;
		height: 120upx;
		float:left;
	}
	.tctj-body-right{
		width: 540upx;
		height: auto;
		float:left;
		padding-left:20upx;
		line-height:1.2em;
	}
	.tctj-body-right-title{
		font-size:28upx;
		color:#333;
		height: 50upx!important;
	}
	.tctj-body-right-describe{
		font-size:28upx;
		color:#666;
	}
	.tctj-body-right-price{
		font-size:28upx;
		color:#E84C3E;
		font-weight: 700;
	}
	.this_search{
		width: 630rpx;
		height: 60rpx;
		border-radius: 25upx;
		background-color: #fff;
		font-size: 24upx;
		color: #C0C0C0;
		line-height: 60upx;
	}	
	.search_txt{
		font-size: 24upx;
		color: #333;
		margin-top: 20upx;
		margin-left: 20upx;
	}
	.add_sea{
		margin-left: 20upx;
		display: flex;
		align-items: center;
	}
	.address{
		display: flex;
		top: 40upx;
		right: 20upx;
		font-size: 24upx;
		align-items: center;
		justify-content: center;
		color: #fff;
	}
	.add_img2{
		height: 40upx;
		width: 40upx;
		margin-right: 20upx;
	}
	/* 搜索 */
	.search{
		height: 60upx;
		width: 550upx;
		background-color: #fff;
		border-radius: 30upx;
		top: 30upx;
		/* right: 20upx; */
	}
	.search_01{
		left: 40upx;
		top: 15upx;
		height: 30upx;
		width: 30upx;
	}
	.text1{
		font-size: 24upx;
		color: #999;
		left: 100upx;
		top: 30upx;
	}
	.search_add{
		display: flex;
	}
	.this_imgsearch{
		margin-left: 30rpx;
		margin-right: 20rpx;
	}
	.imgthis{
		height: 243upx;
		width: 200upx;
		margin: 0 auto;
	}
	.textwenzi{
		font-size: 24upx;
		color: #999999;
		text-align: center;
		width: 750upx;
		display: flex;
		justify-content: center;
		margin-top: 180upx;
	}
	.zanwushik{
		width: 750upx;
		text-align: center;
		display: flex;
		justify-content: center;
	}
	.history{
		width: 100%;
		padding: 0 25upx;
		box-sizing: border-box;
		float: left;
	}
	.history .bt{
		font-size: 28upx;
		line-height: 92upx;
		width: 100%;
	}
	.history .list{
		height: 50upx;
		line-height: 50upx;
		font-size: 24upx;
		padding: 0 20upx;
		border: 2upx solid #C0C0C0;
		float: left;
		border-radius: 20upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}
	.history::after{
		content: "";
		display: block;
		clear: both;
	}
	.del{
		background-size: 100%;
		position: absolute;
		right: 0upx;
		top: 0;
		padding: 20upx;
	}
	.del image{
		width: 30upx;
		height: 30upx;
		background-size: 100%;
	}
	.search_all{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 100upx;
		left: 0;
		background-color: #f7f7f7;
		z-index: 11111;
	}
	.search_click{
		z-index: 1111111;
		width: 100%;
		height: 100upx;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #F7F7F7;
	}
	.right_status{
		width: 80upx;
		height: 30upx;
		line-height: 30upx;
		font-size: 22upx;
		color: #fff;
		text-align: center;
		border-radius: 15upx;
		background-color: rgba(254, 0, 0, 0.6);
		position: absolute;
		right: 0;
		top: 0;
	}
	.manjian{
		height: 40upx;
		display: inline-block;
		border-radius: 20upx;
		border: 2upx solid #fe0000;
		box-sizing: border-box;
		line-height: 36upx;
		text-align: center;
		padding: 0 10upx;
		font-size: 24upx;
		color: #fe0000;
		float: left;
	}
	.jianjie{
		font-size: 24upx;
		color: #999;
		line-height: 36upx;
		margin-bottom: 6upx;
	}
	.span_span{
		font-size: 24upx;
		color: #999;
		text-decoration:line-through;
		font-weight: 400;
		margin-left: 20upx;
	}
</style>
