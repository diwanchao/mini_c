<template>
	<view>
			<view class="x12 padding-big bg-white text-333" style="margin-top: 10px;font-size: 12pt;">
				<view class="x12">
					<view class="x-auto">原因</view>
					<view class="x6 padding-left" style="width: 560upx;">
						<view class="x-auto" v-for="(xitem,index) in th_tags" :key="index" >
							<view class="x-auto" style="border: #F65A2A solid 1px; font-size: 10pt; color: #fff; border-radius:2px; padding:2px 6px; margin:0 5px 6px 0; background:#F65A2A;" v-if="xitem.site==2">{{xitem.text}}</view>
							<view class="x-auto" style="border: #999 solid 1px; font-size: 10pt; color: #666; border-radius:2px; padding:2px 6px; margin:0 5px 6px 0;" @click="gbTag(xitem.reason)" v-else>{{xitem.text}}</view>
						</view>
					</view>
				</view>
				<view class="uploads x12 border-top border-gray" style="width: 100%; margin-top: 18rpx;">
					<!-- 图片上传 -->
					<view class='upload-image-view'>
						<!-- 标题已经省略 -->
						<!-- <view class='title'>上传xxxx图片</view> -->
						<view class="x-auto">
							<view class="">照片<input placeholder="请选择" v-model="th_img" style="display: none;"/></view>
							<view class='text-big text-blue' style="color: #007AFF; text-decoration: underline;" @tap='deleteImage'>
								清空
							</view>
						</view>
						<view class="x9 padding-left">
						<block v-for="(image,index) in imageList" :key="index">
							<view class='image-view' style="width: 100upx; height: 100upx; float: left;">
								<image :src="image" :data-src="image" @tap="previewImage"></image>
								<view class='del-btn' :data-index="index" @tap='deleteImage(index)' style="display: none;">
									<view class='baicha'></view>这里是单独删除每张图片但不完善
								</view>
							</view>
						</block>
						</view>
						<view class='add-view' v-if="imageList.length < imageLength" @tap="chooseImage">
							<view class="cross">
								<view class="transverse-line"></view>
								<view class="vertical-line"></view>
							</view>
						</view>
					</view>
					<!-- 图片上传 -->
				</view>
				<view class="x12 padding-top border-top border-gray">
					<view class="x-auto">描述</view>
					<view class="x6 padding-left">
						<textarea placeholder="描述具体退货原因" v-model="th_ms" style="width: 560upx;"/>
					</view>
				</view>
			</view>
			<view class="btn-row x12" style="margin-top: 80upx;">				
				<button type="primary" class="primary" @tap="setLoading" style="background:#F65A2A; border-radius:24px; width: 525upx;">提交</button>
			</view>

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
				areaListOne: [],
				imageList: [], //保存图片路径集合
				imageLength: 3, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制

				login:false,
				memberinfo:[],
				xshopInfo:[],
				order_code:'',
				goodslist:[],
				
				th_yy:0,
				th_img:'',//多张图片都会隔开
				th_ms:'',//
				th_tags:[],
			}
		},
		onLoad:function(data){
			this.goodslist = data.goods;
			this.order_code = data.order_code;
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const values = uni.getStorageSync('xshopInfo');
				//console.log(uni.getStorageSync('shoppingCarts'));
				if(values){
					this.xshopInfo = values;
				}
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
			this.getThTag();
		},
		methods: {
			//选择图片
			chooseImage: async function() {
				//#ifdef APP-PLUS
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageLength-this.imageList.length,
					success: (res) => {
						var xxcb = this.imageList.concat(res.tempFilePaths);
						var xxxll = [];
						var a = 1;
							for(var i in xxcb){
								xxxll[i] = {
									name:'upload_name'+a,
									uri:xxcb[i],
								}
								a++;
						}
						var arr ={
							};
						var pdata = url.getSignStr(arr);
						uni.uploadFile({
							url: url.websiteUrl+'/api_v2/imgupload/batchs', //仅为示例，非真实的接口地址
							filePath:'',
							name:'',
							files:xxxll,
							formData: {
								appid:pdata.appid,
								sign:pdata.sign,
							},
							header:{
								'content-type':'multipart/form-data'
							},
							success: (uploadFileRes) => {
								let str = JSON.parse(uploadFileRes.data);
								var ximgs = '';
								for(var b in str.data){
									ximgs += str.data[b].imgs_id + ',';
								}
								this.th_img = ximgs;
								this.imageList = xxcb;
							}
						});
						//}
					}
				})
				//#endif
				//#ifdef MP-WEIXIN
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						//count: this.imageLength - this.imageList.length,
						count: 1,
						success: (res) => {
							var xxcb = this.imageList.concat(res.tempFilePaths);
							//console.log(this.imageList);
							let mx = xxcb.length-1;
							var arr ={
								};
							var pdata = url.getSignStr(arr);
							//for (let m in res.tempFilePaths) {
							uni.uploadFile({
								url: url.websiteUrl+'/api_v2/imgupload/index', //仅为示例，非真实的接口地址
								filePath: xxcb[mx],
								name: 'upload_name',
								formData: {
									appid:pdata.appid,
									sign:pdata.sign,
								},
								success: (uploadFileRes) => {
									let str = JSON.parse(uploadFileRes.data);
									this.th_img = str.data.imgs_id+','+this.th_img;
									this.imageList = xxcb;
								}
							});
							//}
						}
					})
				//#endif
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
				this.th_img = '';
				var that = this;
				var images = that.imageList;
				images.splice(0,4);
				that.imageList = images;
			},
			deleteImagex(){
				this.headimgs = false;
				this.th_img = '';
			},
			setLoading(){
				//获取信息
				var arr ={
						order_code:this.order_code,
						member_openid:this.memberinfo.openid,
						reason:this.th_yy,
						stores_id:this.xshopInfo.store.stores_id,
						imgs:this.th_img,
						content:this.th_ms,
						goods:this.goodslist,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
						url:url.websiteUrl+'/api_v2/mall_order/refund_apply',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							if(res.data.status=='n'){
								return;
							}
							setTimeout(function(){
								//跳回到会员中心
								uni.switchTab({
									url:"/pages/center/center"
								})
							},2000);
							return;
						}
				});
			},
			//退货原因标签
			getThTag(){
				//获取信息
				var arr ={
					};
				var pdata = url.getSignStr(arr);
				uni.request({
						url:url.websiteUrl+'/api_v2/mall_base/refund_reason',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							if(res.data.data.length<=0){
								uni.showToast({
									icon: 'none',
									title: '请设置退货标签'
								});
								return;
							}
							var th_tags = [];
							var mi = 0;
							for(var i in res.data.data){
								th_tags[mi] = {
									reason:res.data.data[i].reason,
									text:res.data.data[i].text,
									site:1,
								}
								mi++;
							}
							this.th_tags = th_tags;
						}
				});
			},
			//改变退货标签的状态
			gbTag(reason){
				for(var i in this.th_tags){
					this.th_tags[i].site = 1;
					if(this.th_tags[i].reason==reason){
						this.th_tags[i].site = 2;
						this.th_yy = this.th_tags[i].reason;
					}
				}
			}
		}
	}
</script>

<style>
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

		page {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: flex-start;
			background-color: #F5F5F5;
		}

		.body-view {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: flex-start;
		}

		.info-table {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: flex-start;
			background-color: #FFFFFF;
		}

		.info-table .info-table-row {
			height: 120upx;
			width: 92%;
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1upx solid rgba(204, 204, 204, 1);
		}

		.info-table .info-table-row .table-row-left {
			height: 40upx;
			font-size: 28upx;
			font-weight: 400;
			color: rgba(28, 28, 28, 1);
			line-height: 40upx;
		}

		.info-table .info-table-row .table-row-right {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.info-table .info-table-row .table-row-right image {
			width: 13upx;
			height: 24upx;
		}

		.info-table .info-table-row .table-row-right input {
			width: 560upx;
			height: 40upx;
			font-size: 28upx;
			font-weight: 400;
			color: rgba(28, 28, 28, 1);
			line-height: 40upx;
		}

		.table-btn-view {
			position: fixed;
			bottom: 27upx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.table-btn-view .save-btn {
			width: 92%;
			height: 90upx;
			background: rgba(0, 170, 255, 1);
			border-radius: 10upx;
			color: #FFFFFF;
		}

		.uploads{
			width: 92%;
		}
</style>
