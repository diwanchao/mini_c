<template>
	<view>
			<view class="x12 text-center bg-white padding-big" style="color: #393D4A;">
				<view class="x12" style="font-size: 12pt;">{{member_info.mobile}}</view>
				<view class="x12" style="font-size: 11pt;">{{member_info.grade_name}}</view>
			</view>
			<view class="x12 padding-big bg-white text-333" style="margin-top: 10px;font-size: 12pt;">
				<view class="x12">
					<view class="x-auto">姓名</view>
					<view class="x6 padding-left">
						<input placeholder="姓名" v-model="member_info.name"/>
					</view>
				</view>				
				<view class="x12 padding-top margin-top border-top border-gray">
					<view class="x-auto">性别</view>
					<view class="x-auto padding-left text-gray">
						<radio-group class="radio-group" @change="radioChange">
							<label class="radio" v-for="item in items" :key="item" style="margin-right: 20upx;">
								<radio :value="item.name" :checked="item.checked" />{{item.value}}
							</label>
						</radio-group>
					</view>
				</view>
				<view class="x12 margin-top border-top border-gray" style="padding-top: 10rpx;">
					<view class="x-auto" style="padding-top: 18rpx;">生日</view>
					<view class="x6 padding-left" style="width: 550upx;">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
					<view class="x-auto float-right"  style="padding-top: 24upx;">
						<image src="https://div.buy315.com.cn/xcx_imgs/yjt.png" style="width: 16upx; height: 28upx;"></image>
					</view>
				</view>
				<view class=" x12 padding-top border-top border-gray" v-if="headimgs==true" style="margin-top: 18rpx;">
					<view class="x-auto">
						<view class="">头像</view>
						<view class='text-big text-blue' style="color: #007AFF; text-decoration: underline;" @tap='deleteImagex'>
							清空
						</view>
					</view>
					<view class="x9">
						<image :src="member_info.img" mode="" style="width: 100upx; height: 100upx; float: left; margin-left: 30upx;"></image>
					</view>
				</view>
				<view class="uploads x12 border-top border-gray" style="width: 100%; margin-top: 18rpx;" v-else>
					<!-- 图片上传 -->
					<view class='upload-image-view'>
						<!-- 标题已经省略 -->
						<!-- <view class='title'>上传xxxx图片</view> -->
						<view class="x-auto">
							<view class="">头像<input placeholder="请选择" v-model="member_info.head_img_id" style="display: none;"/></view>
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				areaListOne: [],
				imageList: [], //保存图片路径集合
				imageLength: 1, //限制图片张数
				sourceTypeIndex: 2, //添加方式限制
				sizeTypeIndex: 2, //图片尺寸限制

				headimgs:false,
				login:false,
				memberinfo:[],
				items: [{
							name: '2',
							value: '男',
							checked: 'true'
						},
						{
							name: '1',
							value: '女',
							checked: 'false'
						}
					],
				member_info:[],
				date: currentDate,
			}
		},
		onLoad:function(data){
			//console.log(data);
			try {//从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				if (value) {
					this.memberinfo = value;
					this.login = true;
					//this.poor_status = data.poor_status;
					//console.log(data.poor_status);
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
			//获取信息
			var arr ={
					openid: this.memberinfo.openid,
				};
			var pdata = url.getSignStr(arr);
			uni.request({
					url:url.websiteUrl+'/api_v2/membercenter/member_info',
					method:'POST',
					dataType:'json',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:pdata,
					success: res => {
						//console.log(res.data.data);
						this.member_info = res.data.data;
						this.date = res.data.data.birthday;
						for(let i in this.items){
							if(this.items[i].value==this.member_info.sex){
								this.items[i].checked = true;
							}else{
								this.items[i].checked = false;
							}

						}
						if(this.member_info.head_img_id>0){
							this.headimgs = true;
						}
					}
			});
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 120;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			radioChange: function (e) {
				//console.log('radio发生change事件，携带value值为：' + e.detail.value);
				//console.log(e.detail.value);
				if(e.detail.value==2){
					this.member_info.sex = '男';
				}else{
					this.member_info.sex = '女';
				}
			},
			//选择图片
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					// #ifdef MP-WEIXIN
					sizeType: sizeType[this.sizeTypeIndex],
					// #endif
					count: this.imageLength - this.imageList.length,
					success: (res) => {
						//console.log(res.tempFilePaths);
						this.imageList = this.imageList.concat(res.tempFilePaths);
						//获取信息
						var arr ={
							};
						var pdata = url.getSignStr(arr);
						for (let m in res.tempFilePaths) {
						uni.uploadFile({
							url: url.websiteUrl+'/api_v2/imgupload/index', //仅为示例，非真实的接口地址
							filePath: this.imageList[m],
							name: 'upload_name',
							formData: pdata,
							success: (uploadFileRes) => {
								let str = JSON.parse(uploadFileRes.data);
								//console.log(str);
								this.member_info.head_img_id = str.data.imgs_id;
							}
						});
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
				this.member_info.head_img_id = '';
				var that = this;
				var images = that.imageList;
				images.splice(0,4);
				that.imageList = images;
			},
			deleteImagex(){
				this.headimgs = false;
				this.member_info.head_img_id = '';
			},
			setLoading(){
				//console.log(this.member_info);
				//console.log(this.member_info.sex);return;
				//获取信息
				var arr ={
						openid:this.memberinfo.openid,
						head_img_id:this.member_info.head_img_id,
						name:this.member_info.name,
						sex:this.member_info.sex,
						birthday:this.date,
					};
				var pdata = url.getSignStr(arr);
				uni.request({
						url:url.websiteUrl+'/api_v2/membercenter/modify_member_info',
						method:'POST',
						dataType:'json',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:pdata,
						success: res => {
							//console.log(res.data);
							if(res.data.status=='n'){
								uni.showToast({
									icon: 'none',
									title: res.data.info
								});
								return;
							}
							//跳回到会员中心
							uni.navigateBack({
								delta: 1
							});
							return;
						}
				});
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
