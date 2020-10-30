<template>
	<view class="x12 padding" style="font-size: 10pt;">
		<form @submit="bindFormSubmit">
			<view class="x12 padding-big bg-white" style="border-radius: 5upx;">
				<view class="x12 text-center padding-bottom" style="font-size: 16pt;">{{plTitle}}</view>
				<view class="x12 text-center" style="margin-top: 10upx;">
					<view style="width: 480upx; margin: auto; height: auto;">
						<view class="x-auto" v-for="(pitem,pindex) in topMenu" :key="pindex" style="width: 120upx;" @click="xzZt(pitem.id)">
							<view class="x12">
								<image :src="pitem.img"  mode="aspectFill" style="width: 64upx; height: 64upx;" v-if="pitem.site==1"></image>
								<image :src="pitem.img2"  mode="aspectFill" style="width: 64upx; height: 64upx;" v-else></image>
							</view>
							<view class="x12" style="margin-top: 10upx;">{{pitem.subtitle}}</view>
						</view>
					</view>
				</view>
				<view class="x12" style="color: #666666; padding: 10upx 0; margin: 10upx 0;">
					<view class="x-auto"  v-for="(titem,tindex) in tags" :key="tindex" @click="tagTop(titem.id)">
						<view class="x-auto" v-if="titem.site==1"  style="margin:10upx 15upx 5upx 0; border: #CCCCCC solid 1px; padding: 8upx 15upx 10upx 15upx; border-radius: 5upx;">{{titem.title}}</view>
						<view class="x-auto"  style="margin:10upx 15upx 5upx 0; border: #333 solid 1px; color: #333; padding: 8upx 15upx 10upx 15upx; border-radius: 5upx;" v-else>{{titem.title}}</view>
					</view>
				</view>
				<view class="x12 padding-big" style="background-color: #f5f5f5;border-radius: 5upx;">
					<textarea placeholder="把想说的话都写在这里吧" auto-focus style="width:100%; height:140upx; border-radius: 5upx;"  v-model="member_s" />
				</view>
			</view>
			<view class="x12 padding-big bg-white margin-top" style="border-radius: 5upx;">
				<view class="x12" v-for="(gitem,gindex) in goodsInfo" :key="gindex">
					<view class="x12" style="margin-bottom: 10upx;">
						<view class="x-auto" style="padding-top: 5upx;">
							<image :src="gitem.goods_img"  mode="aspectFill" style="width: 60upx; height: 60upx;"></image>
						</view>
						<view class="x-auto padding-left" style="padding-top: 20upx;">{{gitem.title}}</view>
						<view class="x-auto float-right" style="padding-top: 20upx; padding-left: 10upx;">
							<image src="https://div.buy315.com.cn/xcx_imgs/pjct.png"  mode="aspectFill" style="width: 30upx; height: 30upx;" @click="zHc(1,gitem.id)" v-if="gitem.site==1"></image>
							<image src="https://div.buy315.com.cn/xcx_imgs/pjc.png"  mode="aspectFill" style="width: 30upx; height: 30upx;" @click="zHc(1,gitem.id)" v-else></image>
						</view>
						<view class="x-auto float-right" style="padding-top: 20upx;">
							<image src="https://div.buy315.com.cn/xcx_imgs/pjzt.png"  mode="aspectFill" style="width: 30upx; height: 30upx;" @click="zHc(2,gitem.id)" v-if="gitem.site2==1"></image>
							<image src="https://div.buy315.com.cn/xcx_imgs/pjz.png"  mode="aspectFill" style="width: 30upx; height: 30upx;" @click="zHc(2,gitem.id)" v-else></image>
						</view>
					</view>
					<view class="x12"   v-if="gitem.site==2 || gitem.site2==2">
						<view class="x12" style="color: #666666;  padding:0 0 10upx 0; margin:0 0 10upx 0; display: none;"  v-if="gitem.site==2">
							<view class="x-auto"  v-for="(gtitem,gtindex) in gitem.tags" :key="gtindex" @click="tagGoods(1,gitem.id,gtitem.id)">
								<view class="x-auto" v-if="gtitem.site==1"  style="margin:10upx 15upx 5upx 0; border: #CCCCCC solid 1px; padding: 8upx 15upx 10upx 15upx; border-radius: 5upx;">{{gtitem.title}}</view>
								<view class="x-auto"  style="margin:10upx 15upx 5upx 0; border: #333 solid 1px; color: #333; padding: 8upx 15upx 10upx 15upx; border-radius: 5upx;" v-else>{{gtitem.title}}</view>
							</view>
						</view>
						<view class="x12" style="color: #666666;  padding:0 0 10upx 0; margin:0 0 10upx 0; display: none;"  v-if="gitem.site2==2">
							<view class="x-auto"  v-for="(gxitem,gxindex) in gitem.tags2" :key="gxindex" @click="tagGoods(2,gitem.id,gxitem.id)">
								<view class="x-auto" v-if="gxitem.site==1"  style="margin:10upx 15upx 5upx 0; border: #CCCCCC solid 1px; padding: 8upx 15upx 10upx 15upx; border-radius: 5upx;">{{gxitem.title}}</view>
								<view class="x-auto"  style="margin:10upx 15upx 5upx 0; border: #333 solid 1px; color: #333; padding: 8upx 15upx 10upx 15upx; border-radius: 5upx;" v-else>{{gxitem.title}}</view>
							</view>
						</view>
						<view class="x12 padding-big" style="background-color: #f5f5f5;border-radius: 5upx;">
							<textarea placeholder="把想说的话都写在这里吧" auto-focus style="width:100%; height:140upx; border-radius: 5upx;"  v-model="gitem.note" />
						</view>
						<view class="uploads x12 bg-white" style="width: 100%;">
						<!-- 图片上传 -->
						<view class='upload-image-view' style="margin: 5upx 0 10upx 0;">
							<!-- 标题已经省略 -->
							<!-- <view class='title'>上传xxxx图片</view> -->							
							<view class="x9">
								<block v-for="(image,index) in gitem.imageList" :key="index">
									<view class='image-view' style="width: 100upx; height: 100upx; float: left;">
										<image :src="image" :data-src="image"></image>
									</view>
								</block>
							</view>
							<view class='add-view' v-if="gitem.imageList.length < imageLength" @tap="chooseImage(gitem.id)" style="width: 80upx; height: 80upx; border-radius: 5upx;">
								<view class="cross">
									<view class="transverse-line"></view>
									<view class="vertical-line"></view>
								</view>
							</view>
							<view class="x3" style="padding-left: 10upx; font-size: 10pt;">
								<view class="x12">添加照片<input placeholder="请选择" v-model="gitem.imgs" style="display: none;"/></view>
								<view class='x-auto text-blue' style="color: #007AFF; text-decoration: underline;" @tap='deleteImage(gitem.id)'>
									清空
								</view>
							</view>
						
						</view>
						<!-- 图片上传 -->
						</view>
					</view>
				</view>
			</view>
			<view class="btn-row x12" style="margin-top: 80upx;margin-bottom: 80upx;">
				<button  form-type="submit" class="primary" style="background:#F65A2A; border-radius:24px; width: 525upx; color: #fff;" @click="goDetails">提交</button>
			</view>
		</form>
	</view>
</template>
<script>import url from '../../main.js';
	var sourceType = [
		['camera'], //拍照
		['album'], //相册
		['camera', 'album'] //拍照或相册
	]
	var sizeType = [
		['compressed'], //压缩
		['original'], //原图
		['compressed', 'original'] //压缩或原图
	]
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
			plTitle:'',
			tags:[],
			goodsInfo:[],
			/**
			goodsInfo:[
				{
					id:83783,
					goods_img:'https://div.buy315.com.cn/xcx_imgs/syj.png',
					title:'很差,各方面都有问题',
					site:1,
					site2:1,
					note:'',
					imgs:'',//上传商品图片字符串101,123,1234
					imageList:[],
					tags:[
						{
							id:123,
							site:1,
							title:'服务态度差'
						},
						{
							id:345,
							site:1,
							title:'购物体验不好'
						},
						{
							id:678,
							site:1,
							title:'购物体验不好'
						}
					],
					tags2:[
						{
							id:123,
							site:1,
							title:'服务态度好'
						},
						{
							id:345,
							site:1,
							title:'东西很棒'
						}
					]
				},
				{
					id:23233,
					goods_img:'https://div.buy315.com.cn/xcx_imgs/syzx.png',
					title:'很差,各方面都有问题',
					site:1,
					site2:1,
					note:'',
					imgs:'',//上传商品图片字符串101,123,1234
					imageList:[],
					tags:[
						{
							id:123,
							site:1,
							title:'服务态度差'
						},
						{
							id:345,
							site:1,
							title:'购物体验不好'
						},
						{
							id:678,
							site:1,
							title:'购物体验不好'
						}
					],
					tags2:[
						{
							id:123,
							site:1,
							title:'服务态度好'
						},
						{
							id:345,
							site:1,
							title:'东西很棒'
						}
					]
				},
				{
					id:98009,
					goods_img:'https://div.buy315.com.cn/xcx_imgs/pj1.png',
					title:'很差,各方面都有问题',
					site:1,
					site2:1,
					note:'',
					imgs:'',//上传商品图片字符串101,123,1234
					imageList:[],
					tags:[
						{
							id:123,
							site:1,
							title:'服务态度差'
						},
						{
							id:345,
							site:1,
							title:'购物体验不好'
						},
						{
							id:678,
							site:1,
							title:'购物体验不好'
						}
					],
					tags2:[
						{
							id:123,
							site:1,
							title:'服务态度好'
						},
						{
							id:345,
							site:1,
							title:'东西很棒'
						}
					]
				},
			],
			**/
			topMenu:[],
			/**
			topMenu:[
				{
					id:0,
					title:'很差,各方面都有问题',
					img:'https://div.buy315.com.cn/xcx_imgs/pj1t.png',
					img2:'https://div.buy315.com.cn/xcx_imgs/pj1.png',
					site:1,
					subtitle:'很差',
					tags:[
						{
							id:123,
							site:1,
							title:'服务态度差'
						},
						{
							id:345,
							site:1,
							title:'购物体验不好'
						},
						{
							id:678,
							site:1,
							title:'购物体验不好'
						}
					]
				},
				{
					id:1,
					title:'购物体验不好',
					img:'https://div.buy315.com.cn/xcx_imgs/pj2t.png',
					img2:'https://div.buy315.com.cn/xcx_imgs/pj2.png',
					site:1,
					subtitle:'不满意',
					tags:[
						{
							id:123,
							site:1,
							title:'服务态度差'
						},
						{
							id:345,
							site:1,
							title:'购物体验不好'
						}
					]
				},
				{
					id:2,
					title:'服务态度不好',
					img:'https://div.buy315.com.cn/xcx_imgs/pj3t.png',
					img2:'https://div.buy315.com.cn/xcx_imgs/pj3.png',
					site:1,
					subtitle:'满意',
					tags:[
						{
							id:123,
							site:1,
							title:'服务态度差'
						},
						{
							id:345,
							site:1,
							title:'购物体验不好'
						}
					]
				},
				{
					id:3,
					title:'很差,各方面都有问题',
					img:'https://div.buy315.com.cn/xcx_imgs/pj4t.png',
					img2:'https://div.buy315.com.cn/xcx_imgs/pj4.png',
					site:1,
					subtitle:'超赞',
					tags:[
						{
							id:123,
							site:1,
							title:'服务态度差'
						},
						{
							id:345,
							site:1,
							title:'购物体验不好'
						}
					]
				}
			],
			**/
			imageList: [], //保存图片路径集合
			imageLength: 3, //限制图片张数
			sourceTypeIndex: 2, //添加方式限制
			sizeTypeIndex: 2, //图片尺寸限制

			login:false,
			memberinfo:[],
			xshopInfo:[],
			member_s:'',
			goods_evaluate:[],
			order_code:[],
			evalxs:2,
			}
		},
		onLoad:function(data){
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				if(values){
					this.xshopInfo = values;					
				}
				if (value) {
					this.memberinfo = value;
					this.login = true;
					//console.log(value);
				}
			} catch (e) {
				// error
			}
			this.imageList = [];
			this.member_s = '';
			this.hqPzXx();
			this.order_code = data;
			//console.log(this.goodsInfo);
			//console.log(data);return;
		},
		methods: {
			goDetails(){
				uni.redirectTo({
					url:'pagesb/center/order_list?status=" + 3'
				})
			},
			//获取评论配置信息
			hqPzXx(){
				//获取信息
				var arr ={
						stores_id:this.xshopInfo.store.stores_id,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_base/get_evaluate_info',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						if(res.data.status=='y'){
							var evaluate = res.data.data.evaluate;
							var pj = [];
							var ix = 0;
							for(let i in evaluate){
								var pjtag = [];
								var mx = 0;
								for(let m in evaluate[i].tag){
									pjtag[mx] = {
										id:evaluate[i].tag[m].tag_id,
										title:evaluate[i].tag[m].tag_name,
										site:1,
									}
									mx++;
								}
								pj[ix] = {
									id:evaluate[i].pj_id,
									title:evaluate[i].describe,
									img2:(evaluate[i].img!='')?(evaluate[i].img):('https://div.buy315.com.cn/xcx_imgs/pj1.png'),
									img:(evaluate[i].img2!='')?(evaluate[i].img2):('https://div.buy315.com.cn/xcx_imgs/pj1t.png'),
									site:1,
									subtitle:evaluate[i].title,
									tags:pjtag,
								}
								ix++;
							}
							this.topMenu = pj;
							this.plTitle = this.topMenu[0].title;
							this.tags = this.topMenu[0].tags;
							this.topMenu[0].site = 2;
							//console.log(res.data.data.goods_evaluate);
							//商品的tag标签，需要在下一个接口组装
							this.goods_evaluate = res.data.data.goods_evaluate;
							this.pjOrderGoodsInfo(this.order_code,res.data.data.goods_evaluate);
						}
					}
				});
			},
			//评价订单的商品详情
			pjOrderGoodsInfo(data,goods_evaluate){
				//获取信息
				var arr ={
						order_code:data.order_code,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/evaluate_info',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//循环并重新组装商品标签信息
						//console.log(this.goods_evaluate);
						var pjtag = [];
						for(var c in goods_evaluate[0].good_tag){
							pjtag[c] = {
								id:Number(goods_evaluate[0].good_tag[c].tag_id),								
								site:1,
								title:goods_evaluate[0].good_tag[c].tag_name
							}
						}
						var pjtag2 = [];
						for(var m in goods_evaluate[1].bad_tag){
							pjtag2[m] = {
								id:Number(goods_evaluate[1].bad_tag[m].tag_id),								
								site:1,
								title:goods_evaluate[1].bad_tag[m].tag_name
							}
						}
						//循环并重新组装商品信息
						//console.log(res.data.data.goods);
						var goods = res.data.data.goods;
						//console.log(goods);
						var goodspj = [];
						var tagsxx = [
							{
								id:123,
								site:1,
								title:'服务态度差'
							},
							{
								id:345,
								site:1,
								title:'购物体验不好'
							},
							{
								id:678,
								site:1,
								title:'购物体验不好'
							}
						];
						var tags2xx = [
							{
								id:1099,
								site:1,
								title:'服务态度好'
							},
							{
								id:1890,
								site:1,
								title:'东西很棒'
							}
						];
						//console.log(pjtag);
						//console.log(pjtag2);
						//console.log(tagsxx);
						//console.log(tags2xx);
						for(let i in goods){
							goodspj[i] = {
								id:goods[i].barcode_id,
								goods_img:goods[i].img,
								title:goods[i].goods_title,
								site:1,
								site2:1,
								note:'',
								imgs:'',//上传商品图片字符串101,123,1234
								imageList: [],
								tags:[],
								tags2:[],
							}
						}
						this.goodsInfo = goodspj;
						//console.log(goodspj);\

					}
				});
			},
			//点击商品的标题选项
			tagGoods(s,a,b){
				//console.log(s,a,b);
				//第一个参数，状态，踩还是赞
				//第二个参数商品的唯一id
				//第三个参数标签的唯一id
				//console.log(this.goodsInfo);
				if(s==2){//赞
					//console.log('赞');					
					for (let i in this.goodsInfo) {
						if(this.goodsInfo[i].id==a){
							//下面这个for是将踩下面的标签的选中效果去掉
							for (let m in this.goodsInfo[i].tags) {
								this.goodsInfo[i].tags[m].site = 1;
							}
							//下面这个for是将赞下面的标签加上或者去掉选中效果
							for (let m in this.goodsInfo[i].tags2) {
								if(this.goodsInfo[i].tags2[m].id==b){
									if(this.goodsInfo[i].tags2[m].site==2){
										this.goodsInfo[i].tags2[m].site = 1;
									}else{
										this.goodsInfo[i].tags2[m].site = 2;
									}
								}
							}
							
						}
					}
				}else{//踩
					//console.log('踩');
					for (let i in this.goodsInfo) {						
						if(this.goodsInfo[i].id==a){
							//下面这个for是将赞下面的标签的选中效果去掉
							for (let m in this.goodsInfo[i].tags2) {
								this.goodsInfo[i].tags2[m].site = 1;
							}
							//下面这个for是将踩下面的标签加上或者去掉选中效果
							for (let m in this.goodsInfo[i].tags) {
								if(this.goodsInfo[i].tags[m].id==b){
									if(this.goodsInfo[i].tags[m].site==2){
										this.goodsInfo[i].tags[m].site = 1;
									}else{
										this.goodsInfo[i].tags[m].site = 2;
									}
								}
							}
							
						}
					}
				}
				//console.log(this.goodsInfo);
			},
			//点击头部的标签选项
			tagTop(b){	
				//console.log(b);return;
				for(let i in this.topMenu){
					for(let m in this.topMenu[i].tags){
						if(this.topMenu[i].tags[m].id==b && this.topMenu[i].tags[m].site==1){
							this.topMenu[i].tags[m].site = 2;
						}else if(this.topMenu[i].tags[m].id==b && this.topMenu[i].tags[m].site==2){
							this.topMenu[i].tags[m].site = 1;
						}
					}
				}
			},
			//商品的赞或踩
			zHc(stats,tmid){
				//console.log(stats);
				//console.log(tmid);
				//console.log(this.goodsInfo);
				//第一个参数：状态
				//第二个参数条码id
				for(let i in this.goodsInfo){					
					//this.goodsInfo[i].site2 = 1;
					//this.goodsInfo[i].site = 1;
					if(stats==1 && this.goodsInfo[i].id==tmid){
						this.goodsInfo[i].site2 = 1;
						this.goodsInfo[i].site = 2;
						this.evalxs = 2;
					}
					if(stats==2 && this.goodsInfo[i].id==tmid){
						this.goodsInfo[i].site = 1;
						this.goodsInfo[i].site2 = 2;
						this.evalxs = 1;
					}
				}
				console.log(this.goodsInfo);
			},
			xzZt(data){
				for(let i in this.topMenu){
					for(let m in this.topMenu[i].tags){
						this.topMenu[i].tags[m].site = 1;
					}
					this.topMenu[i].site = 1;
					if(this.topMenu[i].id==data){
						this.topMenu[i].site = 2;
						this.plTitle = this.topMenu[i].title;
						this.tags = this.topMenu[i].tags;
					}
				}
			},
			//选择图片
			chooseImage: async function(xdata) {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					//count: this.imageLength - this.imageList.length,
					count: 1,
					success: (res) => {
						for (let i in this.goodsInfo) {
							if(this.goodsInfo[i].id == xdata){
								this.goodsInfo[i].imageList = this.goodsInfo[i].imageList.concat(res.tempFilePaths);
								//for (let m in res.tempFilePaths) {
								let mx = this.goodsInfo[i].imageList.length-1;
								//获取信息
								var arr ={
									};
								var pdata = url.getSignStr(arr);
								uni.uploadFile({
									url: url.websiteUrl+'/api_v2/imgupload/index', //仅为示例，非真实的接口地址
									filePath: this.goodsInfo[i].imageList[mx],
									name: 'upload_name',
									formData: pdata,
									success: (uploadFileRes) => {
										let str = JSON.parse(uploadFileRes.data);
										this.goodsInfo[i].imgs = this.goodsInfo[i].imgs+','+str.data.imgs_id;
									}
								});
								//}
							}
						}
					}
				})
			},
			//预览图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			//删除图片
			deleteImage: function(e) {
				//console.log(e);
				//console.log(this.imageList);return;
				for (let i in this.goodsInfo) {
					if(this.goodsInfo[i].id == e){
						this.goodsInfo[i].imgs = '';
						var that = this;
						var images = that.goodsInfo[i].imageList;
						images.splice(0,4);
						that.goodsInfo[i].imageList = images;
					}
				}
			},

			bindFormSubmit(){
				//console.log(this.topMenu);
				var tNum = 0;
				var pj_id = 0;
				for(let i in this.topMenu){
					if(this.topMenu[i].site==2){
						tNum = tNum+1;
						pj_id = this.topMenu[i].id;
					}
				}
				if(tNum<=0){
					uni.showToast({
						icon: 'none',
						title: '请对服务进行综合评价'
					});
					return;
				}				
				//console.log(this.tags);
				var tTags = '';
				for(let i in this.tags){
					if(this.tags[i].site==2){
						tTags += this.tags[i].id+',';
					}
				}
				//console.log(this.goodsInfo);
				var goods_evaluate = [];
				var mx = 0;
				for(let i in this.goodsInfo){
					var tag_ids = '';
					var evalx = 1;
					for(let m in this.goodsInfo[i].tags){
						if(this.goodsInfo[i].tags[m].site==2){
							tag_ids += this.goodsInfo[i].tags[m].id+','
							evalx = 2;
						}
					}
					for(let m in this.goodsInfo[i].tags2){
						if(this.goodsInfo[i].tags2[m].site==2){
							tag_ids += this.goodsInfo[i].tags2[m].id+','
							evalx = 1;
						}
					}
					goods_evaluate[mx] = {
						barcode_id:this.goodsInfo[i].id,
						tag_id:tag_ids,
						//evaluate:evalx,//踩还是赞，如果使用了商品标签就要用这个
						evaluate:(this.goodsInfo[i].site==2)?(2):((this.goodsInfo[i].site2==2)?(1):(1)),//踩还是赞，因为没有使用商品标签所以用的这个
						content:this.goodsInfo[i].note,
						img:this.goodsInfo[i].imgs,
						anonymity:1,
					}
					mx++;
				}
				//console.log(goods_evaluate);return;
				//获取信息
				var arr ={
						stores_id:this.xshopInfo.store.stores_id,
						member_openid: this.memberinfo.openid,
						order_code: this.order_code.order_code,
						pj_id: pj_id,
						tag_id: tTags,
						content: this.member_s,
						anonymity: 1,
						goods_evaluate: JSON.stringify(goods_evaluate),
					};
				var pdata = url.getSignStr(arr);
				uni.request({
					url:url.websiteUrl+'/api_v2/mall_order/evaluate',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data);
						if(res.data.status=='y'){
							console.log('yghfuirehtir')
								//跳转到会员中心
								uni.switchTab({
									url:'/pages/center/center'
								})
							// uni.redirectTo({
							// 	// url:"../../pagesb/center/order_list?status=" + ''
							// 	url:"/pagesb/center/order_list?status=" + '' 
							// })
							// this.bindFormSubmit();
						
							//跳转
							//下面的程序执行了返回时向上级页面传参，并跳转到指定的页面
							// var pages = getCurrentPages();
							// var prevPage = pages[pages.length - 1]; //上一个页面
							// //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
							// //#ifdef MP-WEIXIN
							// prevPage.setData({
							// 	mydata: 3
							// });
							// //#endif				
							// uni.navigateBack({
							// 	delta: 2
							// });
							// return;
						}else{
							//提示
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							return;
						}
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F6F6;
	}
			/* 第一套图片上传样式（内部图标相机） */
		.upload-image-view {
			width: 100%;
			margin: 20upx 0 20upx 0;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}

		.upload-image-view .title {
			width: 100%;
			font-family: PingFang-SC-Regular;
			font-size: 24upx;
			color: #4a4a4a;
			margin-bottom: 15upx;
			line-height: 100%;
		}

		.upload-image-view .info {
			width: 100%;
			font-family: PingFang-SC-Regular;
			font-size: 24upx;
			color: #ff4259;
			height: 24upx;
			margin-top: 15upx;
			line-height: 24upx;
		}

		.upload-image-view .image-view {
			height: 130upx;
			width: 130upx;
			position: relative;
			margin: 15upx 15upx 15upx 0upx;
			border-radius: 8upx;
		}

		.upload-image-view .image-view image {
			height: 100%;
			width: 100%;
			border-radius: 8upx;
		}

		.upload-image-view .image-view .del-btn {
			background-color: #f67371;
			border-radius: 50%;
			width: 25upx;
			height: 25upx;
			position: absolute;
			top: -12upx;
			right: -12upx;
			z-index: 2;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.upload-image-view .image-view .del-btn .baicha {
			display: inline-block;
			width: 20upx;
			height: 5upx;
			background: #fff;
			line-height: 0;
			font-size: 0;
			vertical-align: middle;
			-webkit-transform: rotate(45deg);
		}

		.upload-image-view .image-view .del-btn .baicha:after {
			content: '/';
			display: block;
			width: 20upx;
			height: 5upx;
			background: #fff;
			-webkit-transform: rotate(-90deg);
		}

		.upload-image-view .add-view {
			height: 115upx;
			width: 115upx;
			margin: 15upx 15upx 15upx 0upx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 255, 255, 0.00);
			border: 3upx dashed #979797;
			border-radius: 8upx;
		}

		/* 相机 */

		.upload-image-view .add-view .xiangji {
			height: 40upx;
			width: 48upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}

		.upload-image-view .add-view .xiangji .tixing {
			width: 10upx;
			height: 7upx;
			background-color: #fff;
			border-right: 10upx solid #fff;
			border-bottom: 7upx solid #b2b2b2;
			border-left: 10upx solid #fff;
		}

		.upload-image-view .add-view .xiangji .changfx {
			height: 32upx;
			width: 48upx;
			border-radius: 5%;
			background-color: #b2b2b2;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.upload-image-view .add-view .xiangji .changfx .yuan1 {
			height: 20upx;
			width: 20upx;
			border-radius: 50%;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.upload-image-view .add-view .xiangji .changfx .yuan2 {
			height: 10upx;
			width: 10upx;
			border-radius: 50%;
			background-color: #b2b2b2;
		}

		/* 第二套图片上传样式（内部图标 十字架）*/

		/* 十字架 */
		.upload-image-view .add-view .cross {
			height: 48upx;
			width: 48upx;
			display: flex;
			flex-wrap: wrap;
			position: relative;
		}

		.upload-image-view .add-view .cross .transverse-line {
			height: 100%;
			width: 48%;
			position: absolute;
			border-right: 3upx solid #5A5A5A;
			top: 0;
			left: 0;
		}

		.upload-image-view .add-view .cross .vertical-line {
			height: 48%;
			width: 100%;
			position: absolute;
			border-bottom: 3upx solid #5A5A5A;
			top: 0;
			left: 0;
		}
</style>
