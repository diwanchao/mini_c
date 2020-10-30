<template>
	<view>
		<view class="x12" style="position: fixed; z-index: 10000; top: 0; text-align: right;">
			<button style="background:#5BBC6B; color: #fff; margin-top: 20px; margin-right: 20px; font-weight: bold; font-size: 12pt; border: 0;"  size="mini" @click="qrdz">确定</button>
		</view>
		<view class="x12 map_container">
		  <!--定义页面结构，可以使用地图组件也能使用其他组件 -->
		  <map class="map" id="map" :style="'width: 100%; height: '+dtHigeht+'vh;'" :longitude="longitude" :latitude="latitude" scale="14" show-location="true" :markers="markers" bindmarkertap="makertap"></map>
		</view>
		<view class="x12" :style="'background-color: #fff;height: '+dzListHigeht+'vh;'">
			
				<view class="x12 section" style="position:absolute; z-index: 100;">
					<view class="x12" style="background-color: #fff;">
						<input @input="bindInput" placeholder="搜索" focus="true" style="background-color: #fff;" />
				    </view>
				</view>
				<view class="x12" style="margin-top: 20upx;  background-color: #fff; padding-top:30px;">
					<view class="x12" v-if="tips.length>0">
						<view class="x12 text_box" style="padding: 20upx; width: 710upx;" v-for="(item,index) in tips" :key="index"  @click="bindSearch(item)">
							<view class="x-auto" style="width: 650upx;">
							  <view class="x12" style="font-size: 12pt;">{{item.name}}</view>
							  <view class="x12" style="font-size: 10pt; color: #666;">{{item.district}}{{item.address}}</view>
							</view>
							<view class="x-auto" style="width: 50upx; margin-top: 10upx;" v-if="item.site==2">
							  <image src="https://div.buy315.com.cn/xcx_imgs/dtxz.png" style="width: 31upx; height: 30upx;"></image>
							</view>
						</view>
					</view>
					<view class="x12" v-else style="text-align: center; color: #ccc; padding: 20px 0; font-size: 10pt;">没有检索到地址信息</view>
				</view>
			
		</view>
	</view>
</template>
<script>import url from '../../main.js';
var amapFile = require('../../libs/amap-wx.js');
	export default {
		data() {
			return {
				id:0,
				name:'',
				desc:'',
				latitude: '',
				longitude: '',
				markers: [
					{
					                latitude: '',
					                longitude: '',
					                iconPath: 'https://div.buy315.com.cn/xcx_imgs/gwcdw.png'
					            }
				],
				textData: {},
				city: '',
				tips: {},
				dtHigeht:30,
				dzListHigeht:70,
				applet_map_key:"68f0f63d446328818d877549e7b81155",//高德地图的key，后台设置后，这个默认的key会被改变
			}
		},
		onLoad:function(data){
			this.applet_map_key = data.key;
			//默认标记一个当前地址
			var that = this;
			    var myAmapFun = new amapFile.AMapWX({key:data.key});
			    myAmapFun.getRegeo({
			      success: data => {
			        //成功回调
					//console.log(data);
					this.latitude = data[0].latitude;
					this.longitude = data[0].longitude;
					this.markers[0].latitude = data[0].latitude;
					this.markers[0].longitude = data[0].longitude;
					this.id = data[0].id;
					this.name = data[0].name;
					this.desc = data[0].desc;
					//console.log(data);
			      },
			      fail: function(info){
			        //失败回调
			        console.log(info)
			      }
			    })
		},
		methods: {
			//读取地址列表
			bindInput(e){
			    var that = this;
			    var keywords = e.detail.value; 
			    //var key = config.Config.key;
			    var myAmapFun = new amapFile.AMapWX({key: this.applet_map_key});
			    myAmapFun.getInputtips({
			      keywords: keywords,
			      location: '',
			      success: function(data){
					  //console.log(data);
					  var addressList = [];
					  var k1 = 0;
					  for (let y1 in data.tips) {
					  	//console.log(data.tips[y1].location.length);
						if(data.tips[y1].location.length!=0){
							addressList[k1] = {
								adcode:data.tips[y1].adcode,
								address:data.tips[y1].address,
								city:data.tips[y1].city,
								district:data.tips[y1].district,
								id:data.tips[y1].id,
								location:data.tips[y1].location,
								name:data.tips[y1].name,
								typecode:data.tips[y1].typecode,
								site:1,
							}
							k1++;
						}
					  }
					  //console.log(addressList);
					  that.tips = addressList;
			      }
			    })
			},
			//选择地址
			bindSearch(data){
				//console.log(data);
				for (let y1 in this.tips) {
					this.tips[y1].site = 1;
					if(this.tips[y1].id==data.id){
						this.tips[y1].site = 2;
					}
				}
				var location =  data.location;
				var locations = location.split(",");
				//console.log(locations);
				this.latitude = locations[1];
				this.longitude = locations[0];
				this.markers[0].latitude = locations[1];
				this.markers[0].longitude = locations[0];
				this.id = data.id;
				this.name = data.name;
				this.desc = data.district;
			},
			//确认地址
			qrdz(){
				var address = {};
				var i = 0;
				for (let y1 in this.tips) {
					if(this.tips[y1].site==2){
						address = this.tips[y1];
						i++;
					}
				}
				if(i==0){
					uni.showToast({
						icon: 'none',
						title: '请选择地址',
					});
					return;
				}
				var lbsJwd = address.location;
				var locations = lbsJwd.split(",");
				var addressx = {
					adcode:address.adcode,
					address:address.district+address.address,
					city:address.city,
					district:address.district,
					id:address.id,
					lat:locations[1],
					lng:locations[0],
					name:address.name,
					typecode:address.typecode,
					site:address.site,
				}
				//下面的程序执行了返回时向上级页面传参，并跳转到指定的页面
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
					mydata: addressx
				});
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F6F6;
	}
	.map_container{
		/**
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  **/
	}
	.section{
	  height: 30px;
	  width: 100%;
	}
	.section input{
	  width:90%;
	  margin:5px auto;
	  border:1px solid #c3c3c3;
	  height:30px;
	  border-radius: 3px;
	  padding: 0 5px;
	}
	.text_box{
	  border-bottom:1px solid #c3c3c3;
	   background-color: #fff;
	}
</style>
