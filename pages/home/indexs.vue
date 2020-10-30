<template>
	<view v-if="xShow==true">
		<view class="x12" style="height:100vh; background-color: #000000; position: fixed; z-index: 100000000000; top: 0; left: 0; opacity:0.5;"
		 v-if="tcStatus==2"></view>
		<view class="x12" style="width: 550upx;  height: 890upx; position: fixed; z-index: 100000000010; top: 10vh; left: 100upx; border-radius: 10upx;"
		 v-if="tcStatus==2">
			<view class="x12">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" style="width: 550upx;  height: 890upx;  border-radius: 10upx;">
					<swiper-item v-for="(item,index) in tcGgList" :key="index" style="width: 550upx;  height: 890upx; border-radius: 10upx; ">
						<image :src="item.img_big" style="width: 550upx; height: 890upx; border-radius: 10upx; " @click="goZt(item.type,item.jump_id,item.name)"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="x12 text-center">
				<image src="https://div.buy315.com.cn/xcx_imgs/gbfc.png" style="background-size: 100%;" @click="gbTc"></image>
			</view>
		</view>
		<view class="x12" style="position: fixed; z-index: 100000; top: 0;background-color: #F6F6F6;">
			<sundeheng-custom bgColor="" bgImage='' @rightcli='rightcli'>
				<block slot="content">每日菜场</block>
			</sundeheng-custom>
			<view class="bg_Image_address">
				<image class="bg_Image_address" src="https://div.buy315.com.cn/xcx_imgs/content_top1.png" smode=""></image>
				<view class="x-auto text-center topSearch_top">
					<!-- [切换▾] -->
					<view class="bgAddress" @click="address_list">
						<image class="bgAddress_imgage" src="https://div.buy315.com.cn/xcx_imgs/dw.png" mode=""></image>
						<view class="bgAddress_text">{{stores_name}}</view>
					</view>
					<view class="x-auto float-right" @click="serchList" style="width: 580upx; border-radius: 40upx; padding: 10upx 0; background:rgba(255,255,255,0.62);">
						<view class="x-auto" style="padding: 8upx 0 0 28upx;">
							<image src="https://div.buy315.com.cn/xcx_imgs/sec.png" style="width: 28upx; height: 28upx;"></image>
						</view>
						<view class="x-auto" style="color:rgba(255,255,255,1); padding:4upx 0 0 10upx;">输入商品名称</view>
					</view>
				</view>
			</view>

			<view class="x12 bgTop_x12">
				<view class="" v-if="homeGoods.scan_code_buy==1" style="width: 450upx; height: 72upx; padding: 20upx; margin: auto;  border:1px solid rgba(204,204,204,1); background-color: #fff; border-radius: 12upx;">
					<view class="x12">
						<view class="x-auto" style="width: 222upx; border-right:#CCCCCC solid 4upx;" @click="sm">
							<view class="x-auto" style="padding: 12upx 10upx 0 10upx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/sysm.png" style="width: 52upx; height: 48upx;"></image>
							</view>
							<view class="x-auto">
								<view style="font-size: 11pt;">扫码购</view>
								<view style="font-size: 8pt; color:rgba(116,124,150,1);">结账免排队</view>
							</view>
						</view>
						<view class="x-auto" style="width: 220upx;" @click="memberfkm">
							<view class="x-auto" style="padding: 12upx 10upx 0 30upx;">
								<image src="https://div.buy315.com.cn/xcx_imgs/syhyk.png" style="width: 48upx; height: 36upx;"></image>
							</view>
							<view class="x-auto">
								<view style="font-size: 11pt;">会员卡</view>
								<view style="font-size: 8pt; color:rgba(116,124,150,1);">会员付款码</view>
							</view>
						</view>
					</view>
				</view>
				<view class="" @click="memberfkm" v-else style="width: 235upx; height: 72upx; padding: 20upx; margin: auto; margin-top: -56upx; border:1px solid rgba(204,204,204,1); background-color: #fff; border-radius: 12upx;">
					<view class="x12">
						<view class="x-auto" style="padding: 12upx 10upx 0 30upx;">
							<image src="https://div.buy315.com.cn/xcx_imgs/syhyk.png" style="width: 48upx; height: 36upx;"></image>
						</view>
						<view class="x-auto">
							<view style="font-size: 11pt;">会员卡</view>
							<view style="font-size: 8pt; color:rgba(116,124,150,1);">会员付款码</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 			<view class="x12 text-center" style="font-size: 11pt; line-height: 60upx; color: #747C96;">
				由 {{stores_name}} 为您配送
			</view> -->
		</view>
		<view class="x12" style="width: 750upx; height: 200upx; margin-top:100upx"></view>
		<view class="x12" v-if="tg_str!='' && announce_seat==1" @click="goTgList" style="height:70upx; background-color: #fffbe8; padding-top: 10upx;">
			<view class="example-body">
				<uni-notice-bar :scrollable="true" :text="tg_str" style="height:90upx;" />
			</view>
		</view>
		<!-- 分类 -->
		<view class="x12 bg_images" v-if="bannerLen>0">
			<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" indicator-active-color="#c0c0c0" :interval="interval"
			 :duration="duration">
				<swiper-item v-for="(item,index) in homeGoods.banner" :key="index">
					<image :src="item.img" mode="" class="imgwidth" @click="goZt(item.type,item.jump_id,item.name)"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="x12 text-center uuuuiw" v-if="iconsLen>0">
			<view class="x12" style="width: 187upx; margin-top: 20upx;" v-for="(ico_item,ico_index) in homeGoods.icons" :key="ico_index"
			 @click="goZt(ico_item.type,ico_item.jump_id,ico_item.name)">
				<view class="x12" style="height: 120upx; padding-top: 4upx; width: 187upx;">
					<image :src="ico_item.img" style="width: 120upx; height: 120upx;"></image>
				</view>
				<view class="x12" style="margin-top: 10upx; color: #393D4A;">{{ico_item.name}}</view>
			</view>
		</view>
		<!-- <view class="x12" style="width: 690upx; height: 120upx; padding: 0 30upx 0 30upx;" v-if="orderStatus==2">
			<swiper :indicator-dots="false" :autoplay="autoplay" :interval="interval" :duration="duration" style="width: 690upx; height: 120upx;">
				<swiper-item v-for="(item,index) in order_info" :key="index" style="width: 686upx; height: 100upx;">
					<view class="x12" style="width: 686upx; height: 100upx; border: #ddd solid 1px; border-radius: 100upx;" @click="goOrderDinfo(item)">
						<view class="x-auto" style="width:180upx; height: 100upx; text-align: center; background-color: #F35727; border-radius: 100upx 0 0 100upx; color: #ffffff; font-size: 11pt;">
							<view class="x12" style="margin-top: 10upx;">最近订单</view>
							<view class="x12">{{item.order_day}}</view>
						</view>
						<view class="x-auto" style="width:330upx; height: 100upx;font-size: 11pt; padding-left: 10upx; margin-top: 10upx;">
							<view class="x12" style="color:#F35727;font-weight: bold;">{{item.logistics}}</view>
							<view class="x12" style="font-size: 10pt;color:#666;" v-if="item.mode==1 && item.send_type==1">骑手已出发，开始计时！</view>
							<view class="x12" style="font-size: 10pt;color:#666;" v-else>{{item.order_code}}</view>
						</view>
						<view class="x-auto" style="width:140upx; height: auto; line-height: 50upx; text-align: center; border:#F35727 solid 1px; border-radius: 30upx; color: #F35727; font-size: 11pt;font-weight: bold; margin-top:24upx;"
						 v-if="item.mode==1 && item.send_type==1">查看轨迹</view>
						<view class="x-auto" style="width:140upx; height: auto; line-height: 50upx; text-align: center; border:#F35727 solid 1px; border-radius: 30upx; color: #F35727; font-size: 11pt;font-weight: bold; margin-top:24upx;"
						 v-else>查看详情</view>
					</view>
				</swiper-item>
			</swiper>
		</view> -->
		<view class="x12" v-for="(hitem,hindex) in homeGoods.groups" :key="hindex">
			<view class="x12 bg-white" v-if="hitem.group_type==3">
				<view class="x12" style="height: 272upx;" @click="goZt(2,hitem.group_id,hitem.title,hitem.group_id,hitem.gtype)">
					<image class="bannerImages" :src="hitem.img_big"></image>
				</view>
				<view class="x12 new_x12_listall" style="">
					<view class="x4 new_x4_list" style="font-size: 10pt; width: 250upx; padding:0 0 2upx 0; " v-for="(g_item,g_index) in hitem.goods"
					 :key="g_index">
						<view class="x12 bg-white" style="width: 210upx; padding: 30upx 20upx;" v-if="(g_index+1)%3==0">
							<view class="x12" @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
								<image :src="g_item.img" mode="aspectFill" style="height: 150upx;"></image>
							</view>
							<view class="x12">
								<view class="x12 titleList" style="line-height: 40upx; overflow:hidden; width: 100%; font-size: 28upx; "
								 @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
									{{g_item.goods_title}}
								</view>
								<view class="x12" style="line-height: 50upx; color: #666; font-size: 24upx;" v-if="g_item.spec_str == undefined ? g_item.spec_str :''">
									{{g_item.spec_str}}
								</view>
								<view class="x12" style="height: 30px;">
									<view class="x-auto" style="color: #F65A2A; font-size: 12pt;">
										{{deployinfo.monetary_symbol}}{{g_item.price}}
									</view>

									<view class="x-auto float-right" v-if="hitem.gtype!=1">
										<view class="x-auto float-right" v-if="g_item.sale_num===0" style="padding-top: 5upx;">
											<view class="x-auto">
												<image src="https://div.buy315.com.cn/xcx_imgs/jia2.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
											</view>
										</view>
										<view class="x-auto float-right" v-else>
											<view class="x-auto float-right" v-if="g_item.more==1" style="padding-top: 5upx;" :id="'dh'+hitem.group_id+'-'+g_item.barcode_id"
											 @click="jrShoppingCart(1,g_item,hitem.group_id,'dh'+hitem.group_id+'-'+g_item.barcode_id)">
												<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
												 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
												<view class="x-auto">
													<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
												</view>
											</view>
											<view class="x-auto float-right" v-else style="padding-top: 5upx;">
												<button type="primary" @click="togglePopup('bottom', 'popup',g_item)" style=" width:auto; height:auto; padding:0; border:0;border-color:#fff;line-height: 35upx; background:#fff;display:inline;">
													<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
													 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
													<view class="x-auto">
														<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
													</view>
												</button>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="x12 bg-white" style="width: 209upx; padding: 30upx 20upx;" v-else>
							<view class="x12" @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
								<image :src="g_item.img" mode="aspectFill" style="height: 150upx;"></image>
							</view>
							<view class="x12">
								<view class="x12 titleList" 
								 @click="goDetails(g_item,hitem.group_id,hitem.gtype)" >
									{{g_item.goods_title}}
								</view>
								<view class="x12" style="line-height: 50upx; color: #666; font-size: 24upx;" v-if="g_item.spec_str == undefined ? g_item.spec_str :''">
									{{g_item.spec_str}}
								</view>
								<view class="x12" style="height: 30px;">
									<view class="x-auto" style="color: #F65A2A; font-size: 12pt;">
										{{deployinfo.monetary_symbol}}{{g_item.price}}
									</view>
									<view class="x-auto float-right" v-if="hitem.gtype!=1">
										<view class="x-auto float-right" v-if="g_item.sale_num===0" style="padding-top: 5upx;">
											<view class="x-auto">
												<image src="https://div.buy315.com.cn/xcx_imgs/jia2.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
											</view>
										</view>
										<view class="x-auto float-right" v-else>
											<view class="x-auto float-right" v-if="g_item.more==1" style="padding-top: 5upx;" :id="'dh'+hitem.group_id+'-'+g_item.barcode_id"
											 @click="jrShoppingCart(1,g_item,hitem.group_id,'dh'+hitem.group_id+'-'+g_item.barcode_id)">
												<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
												 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
												<view class="x-auto">
													<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
												</view>
											</view>
											<view class="x-auto float-right" v-else style="padding-top: 5upx;">
												<button type="primary" @click="togglePopup('bottom', 'popup',g_item)" style=" width:auto; height:auto; padding:0; border:0;border-color:#fff;line-height: 35upx; background:#fff;display:inline;">
													<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
													 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
													<view class="x-auto">
														<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
													</view>
												</button>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="x12 bg-white" v-if="hitem.group_type==2">
				<view class="x12" style="height: 272upx;" @click="goZt(2,hitem.group_id,hitem.title,hitem.group_id,hitem.gtype)">
					<image :src="hitem.img_big" style="width: 750upx; height: 272upx;"></image>
				</view>
				<view class="x12" style="width: 750upx;">
					<view class="x6" style="font-size: 12pt; width: 375upx; padding:0 0 2upx 0; background-color: #f5f5f5;" v-for="(g_item,g_index) in hitem.goods"
					 :key="g_index">
						<view class="x12 bg-white" style="width: 335upx; padding: 30upx 20upx;" v-if="(g_index+1)%2==0">
							<view class="x12" @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
								<image :src="g_item.img" mode="aspectFill" style="width: 334upx; height: 334upx;"></image>
							</view>
							<view class="x12">
								<view class="x12 titleList" @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
									{{g_item.goods_title}}
								</view>
								<view class="x12" style="line-height: 50upx; color: #666; font-size: 24upx;" v-if="g_item.spec_str == undefined ? g_item.spec_str :''">
									{{g_item.spec_str}}
								</view>
								<view class="x12">
									<view class="x-auto" style="color: #F65A2A; font-size: 14pt;">
										{{deployinfo.monetary_symbol}}{{g_item.price}}<span style="color: #666; font-size: 10pt;">/{{g_item.unit}}</span>
									</view>
									<view class="x-auto float-right" v-if="hitem.gtype!=1">
										<view class="x-auto float-right" v-if="g_item.sale_num===0" style="padding-top: 5upx;">
											<view class="x-auto">
												<image src="https://div.buy315.com.cn/xcx_imgs/jia2.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
											</view>
										</view>
										<view class="x-auto float-right" v-else>
											<view class="x-auto float-right" v-if="g_item.more==1" style="padding-top: 5upx;" :id="'dh'+hitem.group_id+'-'+g_item.barcode_id"
											 @click="jrShoppingCart(1,g_item,hitem.group_id,'dh'+hitem.group_id+'-'+g_item.barcode_id)">
												<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
												 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
												<view class="x-auto">
													<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
												</view>
											</view>
											<view class="x-auto float-right" v-else style="padding-top: 5upx;">
												<button type="primary" @click="togglePopup('bottom', 'popup',g_item)" style=" width:auto; height:auto; padding:0; border:0;border-color:#fff;line-height: 35upx; background:#fff;display:inline;">
													<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
													 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
													<view class="x-auto">
														<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
													</view>
												</button>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="x12 bg-white" style="width: 334upx; padding: 30upx 20upx;" v-else>
							<view class="x12" @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
								<image :src="g_item.img" mode="aspectFill" style="width: 334upx; height: 334upx;"></image>
							</view>
							<view class="x12">
								<view class="x12 titleList" @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
									{{g_item.goods_title}}
								</view>
								<view class="x12" style="line-height: 50upx; color: #666; font-size: 24upx;" v-if="g_item.spec_str == undefined ? g_item.spec_str :''">
									{{g_item.spec_str}}
								</view>
								<view class="x12">
									<view class="x-auto" style="color: #F65A2A; font-size: 14pt;">
										{{deployinfo.monetary_symbol}}{{g_item.price}}<span style="color: #666; font-size: 10pt;">/{{g_item.unit}}</span>
									</view>
									<view class="x-auto float-right" v-if="hitem.gtype!=1">
										<view class="x-auto float-right" v-if="g_item.sale_num===0" style="padding-top: 5upx;">
											<view class="x-auto">
												<image src="https://div.buy315.com.cn/xcx_imgs/jia2.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
											</view>
										</view>
										<view class="x-auto float-right" v-else>
											<view class="x-auto float-right" v-if="g_item.more==1" style="padding-top: 5upx;" :id="'dh'+hitem.group_id+'-'+g_item.barcode_id"
											 @click="jrShoppingCart(1,g_item,hitem.group_id,'dh'+hitem.group_id+'-'+g_item.barcode_id)">
												<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
												 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
												<view class="x-auto">
													<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
												</view>
											</view>
											<view class="x-auto float-right" v-else style="padding-top: 5upx;">
												<button type="primary" @click="togglePopup('bottom', 'popup',g_item)" style=" width:auto; height:auto; padding:0; border:0;border-color:#fff;line-height: 35upx; background:#fff;display:inline;">
													<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
													 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
													<view class="x-auto">
														<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
													</view>
												</button>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="x12 bg-white" v-if="hitem.group_type==1">
				<view class="x12" style="height: 272upx;" @click="goZt(2,hitem.group_id,hitem.title,hitem.group_id,hitem.gtype)">
					<image :src="hitem.img_big" style="width: 750upx; height: 272upx;"></image>
				</view>
				<view class="x12" style="font-size: 16pt; width: 750upx; padding:0 0 20upx 0; background-color: #f5f5f5;" v-for="(g_item,g_index) in hitem.goods"
				 :key="g_index">
					<view class="x12 bg-white" style="width: 710upx; padding: 30upx 20upx;">
						<view class="x12" @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
							<image :src="g_item.img_big" mode="aspectFill" style="width: 710upx; height: 710upx;"></image>
						</view>
						<view class="x12">
							<view class="x12 titleList"  @click="goDetails(g_item,hitem.group_id,hitem.gtype)">
								{{g_item.goods_title}}
							</view>
							<view class="x12" style="line-height: 50upx; color: #666; font-size: 24upx;" v-if="g_item.spec_str == undefined ? g_item.spec_str :''">
								{{g_item.spec_str}}
							</view>
							<view class="x12">
								<view class="x-auto" style="color: #F65A2A; font-size: 18pt;">
									{{deployinfo.monetary_symbol}}{{g_item.price}}<span style="color: #666; font-size: 10pt;">/{{g_item.unit}}</span>
								</view>
								<view class="x-auto float-right" v-if="hitem.gtype!=1">
									<view class="x-auto float-right" v-if="g_item.sale_num===0" style="padding-top: 5upx;">
										<view class="x-auto">
											<image src="https://div.buy315.com.cn/xcx_imgs/jia2.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
										</view>
									</view>
									<view class="x-auto float-right" v-else>
										<view class="x-auto float-right" v-if="g_item.more==1" style="padding-top: 5upx;" :id="'dh'+hitem.group_id+'-'+g_item.barcode_id"
										 @click="jrShoppingCart(1,g_item,hitem.group_id,'dh'+hitem.group_id+'-'+g_item.barcode_id)">
											<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
											 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
											<view class="x-auto">
												<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
											</view>
										</view>
										<view class="x-auto float-right" v-else style="padding-top: 5upx;">
											<button type="primary" @click="togglePopup('bottom', 'popup',g_item)" style=" width:auto; height:auto; padding:0; border:0;border-color:#fff;line-height: 35upx; background:#fff;display:inline;">
												<view class="x-auto" :animation="animationData" style="background:#F65A2A;height:35upx;width:35upx; position: absolute; border-radius: 35upx;"
												 v-for="(ditem,dindex) in amintiond_list" :key="dindex" v-if="ditem.type==hitem.group_id && ditem.barcode_id==g_item.barcode_id"></view>
												<view class="x-auto">
													<image src="https://div.buy315.com.cn/xcx_imgs/jia.png" mode="aspectFill" style="width: 35upx; height: 35upx;"></image>
												</view>
											</button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--多规格弹窗的显示开始-->
		<view class="x12" v-if="xpopup==1">
			<uni-popup ref="showpopup" :type="type" @change="change" style="position: absolute; z-index: 1000000; bottom: 0;">
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
									<image src="https://div.buy315.com.cn/xcx_imgs/cx.png" style="width: 70upx; height: 30upx;"></image>
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
								<view class="float-left" style="border: #f60 solid 1px; padding: 1px 4px; border-radius:2px;background-color: #f60; margin-right: 5px;"
								 v-if="goodsinfo.show_month_sales==1">月销 {{goodsinfo.month_sales}}</view>
								<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;"
								 v-if="goodsinfo.sale_num>0 && goodsinfo.show_sale_num==1">库存 {{goodsinfo.sale_num}}</view>
								<view class="float-left" style="border: #FF9900 solid 1px; padding: 1px 4px; border-radius:2px; background-color: #FF9900;"
								 v-if="goodsinfo.sale_num===0 && goodsinfo.show_sale_num==1">售罄</view>
							</view>
						</view>
					</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" style="height:44vh;" @scrolltoupper="upper" @scrolltolower="lower"
					 @scroll="scroll">
						<view class="x12 bg-white text-333 text-big" style=" margin-top:0; padding: 0;">
							<view class="x12" v-if="choice_unit.length!=0" style="width:690upx; padding: 20upx 0 30upx 0;border-bottom: 1px dashed #EEEEEE;">
								<view class="x12" style="color: #333;font-size: 26upx;font-weight: bold; margin-bottom: 6upx;">规格</view>
								<view class="x12">
									<view v-for="(uitem,uindex) in choice_unit" :key="uindex" class="x-auto" style="margin-top: 16upx;">
										<view class="x-auto  xzbg" v-if="uitem.site==2">{{uitem.unit}}</view>
										<view class="x-auto  mbg" @click="ggxz(1,uitem.unit_id)" v-else>{{uitem.unit}}</view>
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
								<view class="x12" v-for="(citem,cindex) in choice_tag" :key="cindex" style="width:690upx; padding: 30upx 0 10upx 0;">
									<view class="x12" style="color: #333;font-size: 26upx;font-weight: bold; margin-bottom: 6upx;">{{citem.goods_tag.name}}</view>
									<view class="x12">
										<view v-for="(titem,tindex) in citem.goods_tag.tag" :key="tindex" class="x-auto" style="margin-top: 16upx;">
											<view class="x-auto  xzbg" v-if="titem.site==2">{{titem.tag_name}}</view>
											<view class="x-auto  mbg" @click="ggxz(3,titem.tag_name,citem.goods_tag.name)" v-else>{{titem.tag_name}}</view>
										</view>
									</view>
									<view class="x-auto" v-if="citem.goods_tag.site==2" style="padding:16upx 0 0 0; width: 690upx;">
										<input placeholder="备注" style="width:658upx;height:66upx; padding: 0 15upx; background:rgba(245,245,245,1);border-radius:4px;border:1px solid rgba(204,204,204,1);"
										 v-model="citem.goods_tag.t_name" />
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
					<view class="x6 text-white text-center" @click="goToMs" style="line-height: 85upx; background-color: #f0a63b; font-size: 12pt;">
						立即购买
					</view>
				</view>
			</uni-popup>
		</view>
		<!--多规格弹窗的显示结束-->
		<view class="x12" v-if="tg_str!='' && announce_seat==2" style="height: 70upx;"></view>
		<view class="x12" v-if="tg_str!='' && announce_seat==2" style="position:fixed; z-index: 1000; bottom: 0;">
			<view class="x12" @click="goTgList" style="height:70upx; background-color: #fffbe8; padding-top: 10upx;">
				<view class="example-body">
					<uni-notice-bar :scrollable="true" :text="tg_str" style="height:90upx;" />
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	// Vue.component('sundeheng-custom',sundehengCustom)
	import url from '../../main.js';
	import sundehengCustom from '@/components/sundeheng-custom/sundeheng-custom.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';


	export default {
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) { //分享
			try { //从本地缓存中同步获取指定 key 对应的内容。
				var mv = uni.getStorageSync('memberinfo');
				var xv = uni.getStorageSync('xshopInfo');
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: xv.store.stores_name,
					path: '/pages/home/index?member_openid=' + mv.openid + "&stores_id=" + xv.store.stores_id
				}
			} catch (e) {
				// error
			}

		},
		//#endif
		components: {
			uniPopup,
			uniNoticeBar,
			sundehengCustom
		},
		data() {
			return {
				xShow: false,
				textData: {
					name: '',
					desc: '',
				},
				markers: '',
				deployinfo: {
					monetary_symbol: '￥',
				}, //配置信息货币单位，符号，以及其他的一些配置参数
				indicatorDots: true,
				autoplay: true,
				interval: 8000,
				duration: 1000,
				//refreshing: false,
				login: false,
				memberinfo: [],
				shoppingCarts: [],
				xshopInfo: [],
				indexInfo: [],
				shoppingCartNumP: 0,
				stores_name: '',
				homeGoods: [],
				address: true,
				animationData: {},
				amintiond_list: [],
				wheight: 500,
				jdxx: [],
				maddress: '',
				bannerLen: 0,
				iconsLen: 0,
				lng: '',
				lat: '',
				tjr_member_openid: '',
				tjr_xshopInfo: [],
				tjr_stores_id: 0,
				hhhj: '',
				goodsTitle:'',

				tg_str: '', //通告
				announce_seat: 1,
				//弹窗
				content: '',
				type: '',
				inverted: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				spec_id: 0,
				spec: '',
				goodsinfo: [],
				goodsinfos: [],
				choice: [],
				choice_tag: [],
				choice_unit: [],
				simulatedDATA: { //模拟后台返回的数据 多规格
					"difference": [],
					"specifications": []
				},
				selectArr: [], //存放被选中的值
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
				xpopup: 1, //是否显示规格
				xSt_key: 2,
				tzStatus: 2,
				tcStatus: 1, //弹窗状态
				tcGgList: [], //弹窗广告列表
				orderStatus: 1, //最新订单是否显示//默认不显示
				order_info: [], //最新订单
			}
		},
		onPullDownRefresh() {
			try { //从本地缓存中同步获取指定 key 对应的内容。
				const value = uni.getStorageSync('memberinfo');
				const valuex = uni.getStorageSync('shoppingCarts');
				const values = uni.getStorageSync('xshopInfo');
				if (values) {
					this.xshopInfo = values;
				}
				if (value) {
					this.memberinfo = value;
					this.login = true;
				}
				if (valuex) {
					this.shoppingCarts = valuex;
				}
			} catch (e) {
				// error
			}
			this.getHome();
			uni.stopPullDownRefresh();
		},
		onReady: function(e) {
			var xthis = this;
			uni.getNetworkType({
				success: function(res) {
					if (res.networkType !== 'none') {
						xthis.getBanben();
					}
				}
			});
			if (xthis.xSt_key == 1) {
				var dsqId = setInterval(function() {
					uni.getNetworkType({
						success: function(res) {
							if (res.networkType !== 'none') {
								xthis.getShop();
								clearInterval(dsqId);
							}
						}
					});
				}, 1000)
			} else {
				xthis.getShop();
			}
		},
		onShow: function(e) {
			var xthis = this;
			if (xthis.xSt_key == 1) {
				var dsqId = setInterval(function() {
					uni.getNetworkType({
						success: function(res) {
							if (res.networkType !== 'none') {
								xthis.xshow(xthis);
								clearInterval(dsqId);
							}
						}
					});
				}, 1000)
			} else {
				xthis.xshow(xthis);
			}
		},
		onLoad(data) {
			this.getnewList();
			console.log('s*****************rd')
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					console.log('s*****************rd')
				}
			});
			console.log('******************', '查询页面')
			///wx.login({success: res => {console.log(res.code);},});
			uni.showLoading({
				title: '加载中'
			});
			var xthis = this;
			try { //从本地缓存中同步获取指定 key 对应的内容.
				var xSt = uni.getStorageSync('startup');
				if (xSt) {
					xthis.xSt_key = xSt.key;
				}
				if (xthis.xSt_key == 1) {
					var dsqId = setInterval(function() {
						uni.getNetworkType({
							success: function(res) {
								if (res.networkType !== 'none') {
									xthis.xlode(xthis, data);
									uni.setStorage({
										key: 'startup',
										data: [],
										success: function() {}
									});
									clearInterval(dsqId);
								}
							}
						});
					}, 1000)
				} else {
					xthis.xlode(xthis, data);
				}
			} catch (e) {
				// error
			}
		},
		created() {
			this.initializeData();
			this.checkItem(-1);
		},
		methods: {
			// 新人判断
			// getnewList(){
			// 	var arr = {
			// 		mobile:''
			// 	};
			// 	var pdata = url.getSignStr(arr);
			// 	uni.request({
			// 		url: url.websiteUrl + '/api_v2/member/check_member_is_new_people',
			// 		method: 'POST',
			// 		dataType: 'json',
			// 		header: {
			// 			'content-type': 'application/x-www-form-urlencoded'
			// 		},
			// 		data: pdata,
			// 		success: res => {

			// 		},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// },
			goOrderDinfo(data) {
				uni.navigateTo({
					url: "/pagesb/center/order_details?order_id=" + data.order_id + "&order_code=" + data.order_code
				})
			},
			//关闭弹窗
			gbTc() {
				this.tcStatus = 1;
				uni.showTabBar();
			},
			SJwat() { //APP小版本升级
				uni.showLoading({
					title: '正在安装,请稍后...'
				});
				uni.downloadFile({
					url: url.websiteUrl + '/download/zxsc/sc.wgt',
					success: (downloadResult) => {
						//console.log(downloadResult);
						if (downloadResult.statusCode === 200) {
							plus.runtime.install(downloadResult.tempFilePath, {
								force: false
							}, function() {
								//console.log('install success...');
								uni.hideLoading();
								plus.runtime.restart();
							}, function(e) {
								//console.error('install fail...');
								uni.hideLoading();
								uni.showToast({
									title: '安装失败',
									icon: 'none'
								});
							});
						}
					}
				});
			},
			//检查服务器上app的版本，然后跳转到对应的地方进行升级
			getBanben() {
				// #ifdef APP-PLUS
				//获取默认门店是否存在
				var arr = {};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/base/client_editions',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						if (res.data.status == 'y') {
							if (uni.getSystemInfoSync().platform === 'android') {
								//console.log(plus.runtime.versionCode);
								//如果是安卓
								if (plus.runtime.version != res.data.data.mall_android) {
									var url = res.data.data.mall_android_url; // 跳转到安卓下载地址--						
									uni.showModal({
										title: '提示',
										content: '有新的版本需要更新',
										success: res => {
											if (res.confirm) {
												plus.runtime.openURL(url);
											} else if (res.cancel) {
												//console.log('用户点击取消');
											}
										}
									});
								}
							}
							if (uni.getSystemInfoSync().platform === 'ios') {
								//如果是ios
								if (plus.runtime.version != res.data.data.mall_ios) {
									var url = res.data.data.mall_ios_url; // 跳转到苹果商店
									uni.showModal({
										title: '提示',
										content: '有新的版本需要更新',
										success: res => {
											if (res.confirm) {
												plus.runtime.openURL(url);
											} else if (res.cancel) {
												//console.log('用户点击取消');
											}
										}
									});
								}
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
				//#endif
			},
			xshow(xthis) {
				try { //从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const values = uni.getStorageSync('xshopInfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const de = uni.getStorageSync('deployinfo');
					if (de) {
						xthis.deployinfo = de;
						//console.log(JSON.stringify(de));
					}
					//console.log(values.store.stores_id);
					if (value) {
						xthis.memberinfo = value;
						xthis.login = true;
					}
					if (valuex) {
						xthis.shoppingCarts = valuex;
					}
					if (values) {
						xthis.xshopInfo = values;
						if (values.address.address == undefined) {
							xthis.maddress = values.current;
						} else {
							xthis.maddress = values.address.xq_name + values.address.mbh;
						}
						//console.log(values.store.stores_name);
						xthis.stores_name = values.store.stores_name;
						uni.setNavigationBarTitle({
							title: values.store.stores_name
						});
					}
					//获取默认门店是否存在
					var arr = {
						//stores_id:values.store.stores_id,
						xtype: 2,
					};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/stores/index',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							//console.log(res);
							if (res.data.total == 0) {
								xthis.getShop();
							} else {
								xthis.getHome();
							}
							//console.log(res.data);						
							if (xthis.memberinfo.length != 0) {
								xthis.getMer(); //检查会员是否存在
							}
							xthis.getOrderInfo();
							//xthis.getHome();
						},
						fail: () => {},
						complete: () => {}
					});
				} catch (e) {
					// error
				}
			},
			xlode(xthis, data) { //lode
				// #ifdef APP-PLUS
				//查询配置信息货币的单位，符号，以及其他配置信息//并且写入缓存
				var apparr = {};
				var apppdata = url.getSignStr(apparr);
				uni.request({
					url: url.websiteUrl + '/api_v2/mall_base/base_set',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: apppdata,
					success: appres => {
						if (appres.data.status == 'y') {
							//console.log(appres);
							//写入缓存
							uni.setStorage({
								key: 'deployinfo',
								data: appres.data.data,
								success: function() {}
							});
						}
					}
				});
				//读取安装的插件
				uni.request({
					url: url.websiteUrl + '/api_v2/apps/index',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: apppdata,
					success: appsres => {
						//console.log(appsres);return;
						if (appsres.data.status == 'y') {
							//写入缓存
							uni.setStorage({
								key: 'appsinfo',
								data: appsres.data.data.apps,
								success: function() {}
							});
						}
					}
				});
				//#endif
				if (data.scene != undefined) {
					var xscene = decodeURIComponent(data.scene);
					var xx = xscene.split('&');
					if (xx[0] != undefined) {
						var x_mid = xx[0].split('=');
						var x_mid_s = x_mid[1];
					}
					if (xx[1] != undefined) {
						var x_stores_id = xx[1].split('=');
						var x_stores_id_s = x_stores_id[1];
					}
				}
				if (data.member_openid != undefined) {
					xthis.tjr_member_openid = data.member_openid;
					//console.log(1);
					//将推荐人id写入缓存
					uni.setStorage({
						key: 'tjr_member_openid',
						data: data.member_openid,
						success: function() {}
					});
				}
				if (data.mid != undefined || data.scene != undefined) {
					var mid = 0;
					if (data.mid != undefined) {
						mid = data.mid;
					}
					if (data.scene != undefined) {
						mid = x_mid_s;
					}
					//将会员id转换成member_openid
					var arr = {
						member_openid: mid,
					};
					var pdata = url.getSignStr(arr);
					uni.request({
						url: url.websiteUrl + '/api_v2/member/member_info',
						method: 'POST',
						dataType: 'json',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: pdata,
						success: res => {
							if (res.data.status == 'y') {
								var member_openid = res.data.data.member_openid;
							} else {
								var member_openid = '';
							}
							xthis.tjr_member_openid = member_openid;
							//将推荐人id写入缓存
							uni.setStorage({
								key: 'tjr_member_openid',
								data: member_openid,
								success: function() {}
							});
						}
					});

				}
				if (data.stores_id != undefined || (data.scene != undefined && xx[1] != undefined)) {
					var stores_id = 0;
					if (data.stores_id != undefined) {
						stores_id = data.stores_id;
					}
					if (data.scene != undefined && xx[1] != undefined) {
						stores_id = x_stores_id_s;
					}
					xthis.tjr_stores_id = stores_id;
					//获取上级推荐人的店铺信息
					xthis.getTjrShop(stores_id);
				}
			},
			//查询配置信息//并且写入缓存
			getGg() {
				//获取公告信息
				var xarr = {};
				var xpdata = url.getSignStr(xarr);
				uni.request({
					url: url.websiteUrl + '/api_v2/mall_base/base_set',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: xpdata,
					success: xres => {
						if (xres.data.status == 'y') {
							//console.log(xres.data.data);
							this.announce_seat = xres.data.data.announce_seat;
							//获取公告信息
							var arr = {
								stores_id: this.xshopInfo.store.stores_id,
							};
							var pdata = url.getSignStr(arr);
							uni.request({
								url: url.websiteUrl + '/api_v2/mall_base/announce',
								method: 'POST',
								dataType: 'json',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: pdata,
								success: res => {
									//console.log(res.data);
									var tg_str = ''
									for (let i in res.data.data) {
										tg_str += res.data.data[i].name + " ";
									}
									this.tg_str = tg_str;
									this.xShow = true;
									uni.hideLoading();
								}
							});
						}
					}
				});

			},
			//获取订单信息
			getOrderInfo() {
				var xarr = {
					status_dx: '2,3',
					member_openid: this.memberinfo.openid,
					limit: 10,
					offset: 0,
				};
				var xpdata = url.getSignStr(xarr);
				uni.request({
					url: url.websiteUrl + '/api_v2/mall_order/order_query',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: xpdata,
					success: xres => {
						//console.log(xres.data);
						if (this.memberinfo.length != 0 && xres.data.data.order_info.length > 0) {
							this.orderStatus = 2;
						} else {
							this.orderStatus = 1;
						}
						if (xres.data.status == 'y') {
							this.order_info = xres.data.data.order_info;
						}
					}
				});

			},
			goTgList() {
				uni.navigateTo({
					url: "/pagesb/center/tg"
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
						if (this.selectArr[y1] != "") {
							selectArrx[k1] = this.selectArr[y1];
							str_xzSpec += this.selectArr[y1] + ",";
							k1++;
						}
					}
					if (selectArrx.length == this.choice.choice_spec.length) {
						var goodsAttr = [];
						for (let y2 in this.goodsinfos) {
							var str_sp = "";
							for (let y3 in this.goodsinfos[y2].specs) {
								str_sp += this.goodsinfos[y2].specs[y3].spec_attr_val_name + ",";
							}
							if (str_sp == str_xzSpec) {
								goodsAttr = this.goodsinfos[y2];
							}
						}
						this.goodsinfo = goodsAttr;
						//读出对应的商品备注
						var choice_tag = [];
						var k = 0;
						for (let i in this.choice.choice_tag) {
							if (this.choice.choice_tag[i].barcode_id == this.goodsinfo.barcode_id) {
								choice_tag[k] = {
									goods_tag: this.choice.choice_tag[i].goods_tag,
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
			ggxz(type, data, xdata) {
				if (type == 1) {
					//切换单位
					var choice_unit = [];
					for (let u in this.choice_unit) {
						this.choice_unit[u].site = 1;
						if (this.choice_unit[u].unit_id == data) {
							this.choice_unit[u].site = 2;
						}
						choice_unit[u] = {
							unit: this.choice_unit[u].unit,
							unit_id: this.choice_unit[u].unit_id,
							site: this.choice_unit[u].site,
						}
					}
					this.choice_unit = choice_unit;
					//切换单位的时候切换商品数据
					for (let g in this.goodsinfos) {
						if (this.goodsinfos[g].unit_id == data) {
							this.goodsinfo = this.goodsinfos[g];
						}
					}
				}
				if (type == 3) { //备注信息的选中效果
					var oneTag = [];
					for (let u in this.choice_tag) {
						//console.log(this.choice_tag[u].goods_tag.name);
						var threeTag = [];
						for (let u3 in this.choice_tag[u].goods_tag.tag) {
							if (this.choice_tag[u].goods_tag.name == xdata) {
								this.choice_tag[u].goods_tag.tag[u3].site = 1;
							}
							if (this.choice_tag[u].goods_tag.name == xdata && this.choice_tag[u].goods_tag.tag[u3].tag_name == data) {
								this.choice_tag[u].goods_tag.tag[u3].site = 2;
							}
							threeTag[u3] = {
								tag_id: this.choice_tag[u].goods_tag.tag[u3].tag_id,
								tag_name: this.choice_tag[u].goods_tag.tag[u3].tag_name,
								site: this.choice_tag[u].goods_tag.tag[u3].site,
							}
						}

						if (this.choice_tag[u].goods_tag.name == xdata) {
							this.choice_tag[u].goods_tag.site = 1;
						}
						if (this.choice_tag[u].goods_tag.name == xdata && data == "自定义") {
							this.choice_tag[u].goods_tag.site = 2;
						}
						oneTag[u] = {
							goods_tag: {
								name: this.choice_tag[u].goods_tag.name,
								tag: threeTag,
								site: this.choice_tag[u].goods_tag.site,
								t_name: this.choice_tag[u].goods_tag.t_name,
								is_must: this.choice_tag[u].goods_tag.is_must,
								sgt_id: this.choice_tag[u].goods_tag.sgt_id,
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
			togglePopup(type, open, data) {
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
				//console.log(e);
				//console.log('是否打开:' + e.show)
			},
			//根据商品id查找当前商品基本信息
			getGoodsDetailsInfo(data) {
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
				try { //从本地缓存中同步获取指定 key 对应的内容。
					const value = uni.getStorageSync('memberinfo');
					const valuex = uni.getStorageSync('shoppingCarts');
					const values = uni.getStorageSync('xshopInfo');
					//console.log(value);
					if (values) {
						this.xshopInfo = values;
						this.stores_name = values.store.stores_name;
					}
					if (value) {
						this.memberinfo = value;
						this.login = true;
					}
					if (valuex) {
						this.shoppingCarts = valuex;
					}
				} catch (e) {
					// error
				}
				//console.log(this.shoppingCarts);
				this.barcode_id = data.barcode_id;
				//获取信息
				var arr = {
					stores_id: this.xshopInfo.store.stores_id,
					barcode_id: data.barcode_id,
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/mall_shop_v2/goods_details',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						//console.log(res.data);
						this.goodsinfo = res.data.data.goods[0];
						//console.log(this.sale_num);
						this.choice = res.data.data;
						//读出默认备注组
						var choice_tag = [];
						var k = 0;
						for (let i in res.data.data.choice_tag) {
							if (res.data.data.choice_tag[i].barcode_id == res.data.data.goods[0].barcode_id) {
								//this.choice_tag = res.data.data.choice_tag[i].goods_tag;											
								choice_tag[k] = {
									goods_tag: res.data.data.choice_tag[i].goods_tag,
								}
								k++;
							}
						}
						this.choice_tag = choice_tag;
						for (let i in this.choice_tag) { //默认把备注标签加上一个t_name字段
							this.choice_tag[i].goods_tag.t_name = "";
						}
						//console.log(this.choice_tag);
						//读出默认规格
						var x_choice_spec = [];
						var str_spec = ''; //得到一级规格的名称
						for (let s in res.data.data.choice_spec) {
							var x_list = [];
							for (let s2 in res.data.data.choice_spec[s].val) {
								x_list[s2] = {
									name: res.data.data.choice_spec[s].val[s2].name,
									//spec_attr_val_id:res.data.data.choice_spec[s].val[s2].spec_attr_val_id,
								}
							}
							str_spec += res.data.data.choice_spec[s].name + ",";
							x_choice_spec[s] = {
								name: res.data.data.choice_spec[s].name,
								list: x_list,
							}
						}
						//this.simulatedDATA.specifications = x_choice_spec;
						//得到都有哪些规格
						var s_choice_spec = [];
						for (let sL in res.data.data.goods) {
							var x_str_spec = ''; //得到二级规格的名称
							for (let sL2 in res.data.data.goods[sL].specs) {
								x_str_spec += res.data.data.goods[sL].specs[sL2].spec_attr_val_name + ",";
							}
							s_choice_spec[sL] = {
								attribute2: str_spec.substring(0, str_spec.length - 1),
								attribute6: x_str_spec.substring(0, x_str_spec.length - 1),
								uid: sL,
							}
						}
						///**x_choice_spec
						this.simulatedDATA = {
							difference: s_choice_spec,
							specifications: x_choice_spec,
						};
						this.initializeData(); //
						this.checkItem(-1); //
						//**/
						//读出默认单位
						for (let u in res.data.data.choice_unit) {
							if (res.data.data.choice_unit[u].unit == res.data.data.goods[0].unit) {
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
				if (this.choice.choice_spec.length > 0) {
					var selectArrx = [];
					var k1 = 0;
					for (let y1 in this.selectArr) {
						if (this.selectArr[y1] != "") {
							selectArrx[k1] = this.selectArr[y1];
							k1++;
						}
					}
					if (selectArrx.length < this.choice.choice_spec.length) {
						uni.showToast({
							title: '请选择规格',
							duration: 2000,
							icon: "none",
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
					if (this.choice_tag[b].goods_tag.is_must == 1) {
						tag_name += this.choice_tag[b].goods_tag.name + ",";
						allbzxzInt += this.choice_tag[b].goods_tag.sgt_id + ",";
					}
					var str_bz = "";
					var sgt_ids_b = "";
					var bzInt_b = "";
					for (let b1 in this.choice_tag[b].goods_tag.tag) {
						if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0) {
							str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.tag[b1].tag_name + "】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if (this.choice_tag[b].goods_tag.is_must == 1) {
								bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
						if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0) {
							str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.t_name + "】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if (this.choice_tag[b].goods_tag.is_must == 1) {
								bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
					}
					if (str_bz != '') {
						bjRemark += str_bz + ",";
						sgt_ids += sgt_ids_b + ",";
						if (this.choice_tag[b].goods_tag.is_must == 1) {
							bzInt += bzInt_b + ",";
						}
					}
				}
				//检查备注信息是不是必须选择，如果是要先选择备注信息
				if (allbzxzInt != bzInt) {
					uni.showToast({
						title: "请选择：" + tag_name,
						duration: 2000,
						icon: "none",
					});
					return;
				}
				uni.showToast({
					title: '加入成功',
					duration: 2000
				});
				//console.log(this.goodsinfo);
				var xxx = {
					stores_id: this.xshopInfo.store.stores_id,
					barcode_id: this.goodsinfo.barcode_id,
					category_id: this.goodsinfo.category_id,
					goods_id: this.goodsinfo.goods_id,
					goods_title: this.goodsinfo.goods_title,
					img: this.goodsinfo.imgs[0],
					original_price: this.goodsinfo.original_price,
					price: this.goodsinfo.price,
					promotion: this.goodsinfo.promotion,
					unit: this.goodsinfo.unit,
					astrict_num: this.goodsinfo.astrict_num,
					spec: this.spec,
					site: 2,
					remark: bjRemark,
					sgt_ids: sgt_ids,
				};
				//console.log(xxx);
				//console.log(this.goodsinfo);return;
				this.jrShoppingCart(1, xxx, 'dgg');
			},
			goToMs() { //立即购买
				//检查是否登录，没有登录的跳转到登录界面
				//console.log(this.login);
				uni.showToast({
					title: '正在加载...',
					icon: 'none',
					duration: 2000
				});
				try { //从本地缓存中同步获取指定 key 对应的内容。
					var value = uni.getStorageSync('memberinfo');
					if (value.length == 0) {
						this.login = false;
					} else {
						this.login = true;
					}
				} catch (e) {
					// error
				}
				if (this.memberinfo.length == 0) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
					return;
				}
				//加入购物前先检查有没有选择规格
				if (this.choice.choice_spec.length > 0) {
					var selectArrx = [];
					var k1 = 0;
					for (let y1 in this.selectArr) {
						if (this.selectArr[y1] != "") {
							selectArrx[k1] = this.selectArr[y1];
							k1++;
						}
					}
					if (selectArrx.length < this.choice.choice_spec.length) {
						uni.showToast({
							title: '请选择规格',
							duration: 2000,
							icon: "none",
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
					if (this.choice_tag[b].goods_tag.is_must == 1) {
						tag_name += this.choice_tag[b].goods_tag.name + ",";
						allbzxzInt += this.choice_tag[b].goods_tag.sgt_id + ",";
					}
					var str_bz = "";
					var sgt_ids_b = "";
					var bzInt_b = "";
					for (let b1 in this.choice_tag[b].goods_tag.tag) {
						if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id > 0) {
							str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.tag[b1].tag_name + "】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if (this.choice_tag[b].goods_tag.is_must == 1) {
								bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
						if (this.choice_tag[b].goods_tag.tag[b1].site == 2 && this.choice_tag[b].goods_tag.tag[b1].tag_id == 0) {
							str_bz = this.choice_tag[b].goods_tag.name + ":【" + this.choice_tag[b].goods_tag.t_name + "】";
							sgt_ids_b = this.choice_tag[b].goods_tag.sgt_id;
							if (this.choice_tag[b].goods_tag.is_must == 1) {
								bzInt_b = this.choice_tag[b].goods_tag.sgt_id;
							}
						}
					}
					if (str_bz != '') {
						bjRemark += str_bz + ",";
						sgt_ids += sgt_ids_b + ",";
						if (this.choice_tag[b].goods_tag.is_must == 1) {
							bzInt += bzInt_b + ",";
						}
					}
				}
				//检查备注信息是不是必须选择，如果是要先选择备注信息
				if (allbzxzInt != bzInt) {
					uni.showToast({
						title: "请选择：" + tag_name,
						duration: 2000,
						icon: "none",
					});
					return;
				}
				//this.hd.is_kill = 1;
				//查询一下有没有默认收货地址
				var aarr = {
					openid: this.memberinfo.openid,
					is_default: 1,
				};
				var apdata = url.getSignStr(aarr);
				uni.request({
					url: url.websiteUrl + '/api_v2/member_addres_act/index',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: apdata,
					success: ares => {
						//console.log(ares.data);
						if (ares.data.data.length == 0) {
							uni.showToast({
								icon: 'none',
								title: '请先设置收货地址',
							});
							//this.hd.is_kill = 2;
							uni.navigateTo({
								url: "../goods_details/address_list"
							})
							return;
						}

						//抢购成功去生成订单
						var goods_l = [];
						goods_l[0] = {
							stores_id: this.xshopInfo.store.stores_id,
							barcode_id: this.goodsinfo.barcode_id,
							num: 1,
							remark: bjRemark,
							sgt_ids: sgt_ids,
						}
						//console.log(this.xshopInfo.store.stores_id,this.hd.barcode_id);
						var parr = {
							member_openid: this.memberinfo.openid,
							stores_id: this.xshopInfo.store.stores_id,
							goods: JSON.stringify(goods_l),
						};
						//console.log(arr);return;
						var xpdata = url.getSignStr(parr);
						uni.request({
							url: url.websiteUrl + '/api_v2/mall_order/pre_order',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: xpdata,
							success: xres => {
								//console.log(res.data);return;
								if (xres.data.status == 'y') {
									this.xpopup = 2;
									uni.navigateTo({
										url: "../goods_details/order_sure?order_code=" + xres.data.data.order_code + "&goods_l=" + JSON.stringify(
											goods_l)
									})
								} else {
									uni.showToast({
										icon: 'none',
										title: xres.data.info,
									});
									return;
								}
							}
						});
					}
				});

			},
			//#ifdef MP-WEIXIN			
			//跳转到另外的小程序
			tz() {
				wx.navigateToMiniProgram({
					appId: 'wxba05b8fc5f43289c',
					path: 'pages/common/blank-page/index?weappSharePath=pages%2Fhome%2Fdashboard%2Findex%3Fkdt_id%3D41594443',
					extraData: {
						foo: 'bar'
					},
					envVersion: 'release',
					success(res) {
						// 打开成功
					}
				})
			},
			//#endif
			//检查会员是否存在
			getMer() {
				var arr = {
					member_openid: this.memberinfo.openid,
				};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/member/member_info',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						//console.log(res.data);
						if (res.data.status == 'n' || res.data.data.status != 1) {
							try {
								const value = uni.getStorageSync('memberinfo');
								//写入缓存
								uni.setStorage({
									key: 'memberinfo',
									data: [],
									success: function() {}
								});
								const xvalue = uni.getStorageSync('memberinfo');
							} catch (e) {
								// error
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//购物车动画效果
			shopCart(barcode_id, type, v) {
				//console.log(v);
				var glist = [];
				glist[0] = {
					barcode_id: barcode_id,
					type: type,
				}
				this.amintiond_list = glist;
				uni.getSystemInfo({
					success: res => {
						this.wheight = res.windowHeight + 60;
					}
				});
				//console.log(this.wheight);
				var animation = uni.createAnimation({
					duration: 400,
					transformOrigin: "50% 50%",
					timingFunction: "linear",
					delay: 0
				})
				animation.translate(0, 0).step({
					duration: 10
				})
				this.animationData = animation.export()
				let view = uni.createSelectorQuery().select("#" + v);
				view.boundingClientRect(data => {
					animation.translate(-20, -20).step({
						duration: 50
					}).translate(-40, -10).step({
						duration: 50
					}).translate(-data.left + 240, this.wheight - data.bottom).step({
						duration: 150
					})
					this.animationData = animation.export()
				}).exec();
				setTimeout(function() {
					this.amintiond_list = [];
				}.bind(this), 400)

			},
			//扫码
			sm() {
				uni.scanCode({
					success: function(res) {
						//console.log('条码类型：' + res.scanType);
						//console.log('条码内容：' + res.result);
						//this.jrShoppingCart(1,goods_info);
						uni.navigateTo({
							url: "../serch/sm_goods_list?goods_code=" + res.result
						});
						return;
					}
				});
			},
			//搜索
			serchList() {
				uni.navigateTo({
					url: "../serch/index"
				})
			},
			//已经修改成店铺切换
			address_list() {
				uni.navigateTo({
					url: "/pagesb/center/xxmd"
				})
			},
			//获取门店信息
			getShop(s_lat = false, s_lng = false) {
				var xxx = this;
				//获取用户当前经纬度
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						//console.log('当前位置的经度：' + res.longitude);
						//console.log('当前位置的纬度：' + res.latitude);
						xxx.lng = (s_lng == false) ? (res.longitude) : (s_lng);
						xxx.lat = (s_lat == false) ? (res.latitude) : (s_lat);
						//获取信息
						var arr = {
							lng: xxx.lng,
							lat: xxx.lat,
							member_openid: xxx.memberinfo.openid,
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url: url.websiteUrl + '/api_v2/mall_base/get_store_address',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: pdata,
							success: res => {
								//console.log(res.data.data);
								//console.log(sort(res.data));

								xxx.xshopInfo = res.data.data;
								//console.log(this.xshopInfo.store.stores_id);
								//写入缓存
								uni.setStorage({
									key: 'xshopInfo',
									data: res.data.data,
									success: function() {}
								});
								uni.setStorage({
									key: 'shoppingCarts',
									data: [],
									success: function() {}
								});
								if (res.data.data.address.length == 0) {
									xxx.maddress = res.data.data.current;
								} else {
									xxx.maddress = res.data.data.address.xq_name + res.data.data.address.mbh;
								}
								xxx.stores_name = res.data.data.store.stores_name;
								uni.setNavigationBarTitle({
									title: res.data.data.store.stores_name
								});
								//获取弹窗广告列表
								var tarr = {
									stores_id: res.data.data.store.stores_id,
								};
								var tpdata = url.getSignStr(tarr);
								uni.request({
									url: url.websiteUrl + '/api_v2/mall_base/popup',
									method: 'POST',
									dataType: 'json',
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									data: tpdata,
									success: tres => {
										if (tres.data.status == 'y') {
											if (tres.data.data.length > 0) {
												uni.hideTabBar();
												this.tcGgList = tres.data.data;
												this.tcStatus = 2;
											}
										}
									},
									fail: () => {},
									complete: () => {}
								});
								xxx.getHome();
							}
						});
					},
					fail: res => {
						//console.log('当前位置的经度：' + res.longitude);
						//console.log('当前位置的纬度：' + res.latitude);
						xxx.lng = '';
						xxx.lat = '';
						//获取信息
						var arr = {
							lng: xxx.lng,
							lat: xxx.lat,
							member_openid: xxx.memberinfo.openid,
						};
						var pdata = url.getSignStr(arr);
						uni.request({
							url: url.websiteUrl + '/api_v2/mall_base/get_store_address',
							method: 'POST',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: pdata,
							success: res => {
								//console.log(res.data.data);
								//console.log(sort(res.data));

								xxx.xshopInfo = res.data.data;
								//console.log(this.xshopInfo.store.stores_id);
								//写入缓存
								uni.setStorage({
									key: 'xshopInfo',
									data: res.data.data,
									success: function() {}
								});
								uni.setStorage({
									key: 'shoppingCarts',
									data: [],
									success: function() {}
								});
								if (res.data.data.address.length == 0) {
									xxx.maddress = res.data.data.current;
								} else {
									xxx.maddress = res.data.data.address.xq_name + res.data.data.address.mbh;
								}
								xxx.stores_name = res.data.data.store.stores_name;
								uni.setNavigationBarTitle({
									title: res.data.data.store.stores_name
								});
								//获取弹窗广告列表
								var tarr = {
									stores_id: res.data.data.store.stores_id,
								};
								var tpdata = url.getSignStr(tarr);
								uni.request({
									url: url.websiteUrl + '/api_v2/mall_base/popup',
									method: 'POST',
									dataType: 'json',
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									data: tpdata,
									success: tres => {
										if (tres.data.status == 'y') {
											if (tres.data.data.length > 0) {
												uni.hideTabBar();
												this.tcGgList = tres.data.data;
												this.tcStatus = 2;
											}
										}
									},
									fail: () => {},
									complete: () => {}
								});
								xxx.getHome();
							}
						});
					},
				});
			},
			//合计购物车数量
			sumShoppingCartNum() {
				//合计购物车数量
				var snum = 0;
				for (let i in this.shoppingCarts) {
					if (this.shoppingCarts[i].stores_id == this.xshopInfo.store.stores_id) {
						snum += parseFloat(this.shoppingCarts[i].num);
					}
				}
				this.shoppingCartNum = snum;
				uni.setTabBarBadge({
					index: 2,
					text: '' + snum + '',
				});
			},
			memberfkm() {
				if (this.memberinfo.length == 0) {
					uni.showToast({
						title:'请先登录',
						icon:'none',
					})
					// uni.navigateTo({
					// 	url: "/pages/login/login"
					// })
					return;
				}
				uni.navigateTo({
					url: "/pagesb/center/member_fkm"
				})
			},
			getHome() {
				var apparr = {};
				var apppdata = url.getSignStr(apparr);
				uni.request({
					url: url.websiteUrl + '/api_v2/mall_base/base_set',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: apppdata,
					success: appres => {
						if (appres.data.status == 'y') {
							//console.log(appres.data.data);
							this.deployinfo = appres.data.data;
							//console.log(this.memberinfo);
							var xstoresId = (this.xshopInfo.length != 0) ? (this.xshopInfo.store.stores_id) : ('');
							var xopenid = (this.memberinfo.length != 0) ? (this.memberinfo.openid) : ('');
							if (xstoresId > 0) {
								//获取信息
								var arr = {
									stores_id: xstoresId,
									member_openid: xopenid,
								};
								var pdata = url.getSignStr(arr);
								uni.request({
									url: url.websiteUrl + '/api_v2/mall_shop_v2/index',
									method: 'POST',
									dataType: 'json',
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									data: pdata,
									success: res => {
									
										this.bannerLen = res.data.data.banner.length;
										this.iconsLen = res.data.data.icons.length;
										this.homeGoods = res.data.data;
										if(this.homeGoods)
										this.getGg();
										console.log(this.homeGoods.groups);
										this.sumShoppingCartNum();
									}
								});
							}
						}
					}
				});

			},
			jrShoppingCart(num_s, goods_info, type, v) {
				//num_s参数   0和1，0为减，1为加
				//goods_info参数  一维数组				
				//console.log(goods_info);
				//console.log(goods_info);
				//if(num_s==1){
				//console.log(123);
				//return;
				//}
				//限购数量和购物车数量对比
				for (let ixs in this.shoppingCarts) {
					if (this.shoppingCarts[ixs].barcode_id == goods_info.barcode_id) {
						if (goods_info.astrict_num !== '' && ((parseFloat(this.shoppingCarts[ixs].num) + 1) > goods_info.astrict_num)) {
							uni.showToast({
								icon: 'none',
								title: '商品【' + this.shoppingCarts[ixs].goods_title + '】限购' + goods_info.astrict_num + goods_info.unit
							});
							return;
						}
					}
				}
				//如果重复，查询下重复的商品在购车的数量
				var snum = 0;
				for (let ix in this.shoppingCarts) {
					if (this.shoppingCarts[ix].barcode_id == goods_info.barcode_id) {
						snum = this.shoppingCarts[ix].num;
					}
				}
				//只留下不重复的
				var glistx = [];
				var mxx = 0;
				for (let i in this.shoppingCarts) {
					if (this.shoppingCarts[i].barcode_id != goods_info.barcode_id && this.shoppingCarts[i].stores_id == this.xshopInfo
						.store.stores_id && this.shoppingCarts[i].status == 1) {
						glistx[mxx] = {
							stores_id: this.xshopInfo.store.stores_id,
							barcode_id: this.shoppingCarts[i].barcode_id,
							category_id: this.shoppingCarts[i].category_id,
							goods_id: this.shoppingCarts[i].goods_id,
							goods_title: this.shoppingCarts[i].goods_title,
							img: this.shoppingCarts[i].img,
							original_price: this.shoppingCarts[i].original_price,
							price: this.shoppingCarts[i].price,
							promotion: this.shoppingCarts[i].promotion,
							num: this.shoppingCarts[i].num,
							unit: this.shoppingCarts[i].unit,
							spec: this.shoppingCarts[i].spec,
							site: this.shoppingCarts[i].site,
							status: this.shoppingCarts[i].status,
							remark: this.shoppingCarts[i].remark,
							sgt_ids: this.shoppingCarts[i].sgt_ids,
						}
						mxx++;
					}
				}
				//this.shoppingCarts = glistx;
				//console.log(glistx);
				var glist = [];
				var mx = 0;
				//console.log(snum);
				glist[mx] = {
					stores_id: this.xshopInfo.store.stores_id,
					barcode_id: goods_info.barcode_id,
					category_id: goods_info.category_id,
					goods_id: goods_info.goods_id,
					goods_title: goods_info.goods_title,
					img: goods_info.img,
					original_price: goods_info.original_price,
					price: goods_info.price,
					promotion: goods_info.promotion,
					num: (num_s == 1) ? (snum + 1) : (snum - 1),
					unit: goods_info.unit,
					spec: goods_info.spec,
					site: 2,
					status: 1,
					remark: goods_info.remark,
					sgt_ids: goods_info.sgt_ids,
				}

				this.shoppingCarts = glistx.concat(glist);
				//console.log(this.shoppingCarts);
				//console.log(this.shoppingCarts);
				//写入缓存
				uni.setStorage({
					key: 'shoppingCarts',
					data: this.shoppingCarts,
					success: function() {}
				});
				//console.log(this.shoppingCarts);
				this.sumShoppingCartNum();
				if (type != "dgg") {
					//调取动画效果
					this.shopCart(goods_info.barcode_id, type, v);
				}
				//console.log(this.shoppingCarts);
			},
			goDetails(s_itme, group_id, gtype) {
				//console.log(s_itme);
				if (gtype == 1) {
					uni.navigateTo({
						url: "../goods_details/ms_goods_details?barcode_id=" + s_itme.barcode_id + "&s_id=" + s_itme.s_id
					})
				} else {
					uni.navigateTo({
						url: "../goods_details/goods_details?barcode_id=" + s_itme.barcode_id
					})
				}

			},
			//专题
			goZt(type, jump_id, title, group_id, gtype) {
				//1商品详情
				//2分组
				//3自定义
				//4次卡
				//5分类
				//group_id==1000秒杀分组
				//console.log(type,jump_id,title,group_id,gtype);return;
				this.tcStatus = 1;
				uni.showTabBar();
				if (gtype == 1) {
					uni.navigateTo({
						url: "../home/ms"
					})
				} else {
					if (type == 1) {
						//跳转到商品详情
						uni.navigateTo({
							url: "../goods_details/goods_details?barcode_id=" + jump_id
						})
					} else if (type == 2) {
						uni.navigateTo({
							url: "../home/zt?group_id=" + jump_id + "&title=" + title
						})
					} else if (type == 4) {
						uni.navigateTo({
							url: "../home/ck_list?title=" + title
						})
					} else if (type == 5) {
						uni.navigateTo({
							url: "../home/classgoods?category_id=" + jump_id + "&title=" + title
						})
					} else if (type == 6) {
						uni.navigateTo({
							url: "../home/ms"
						})
					} else if (type == 7) {
						uni.navigateTo({
							url: "../home/xjj_list"
						})
					} else if (type == 8) {
						uni.navigateTo({
							url: "/pagesb/center/xxmd"
						})
					} else {
						uni.navigateTo({
							url: "../home/zdy?custom_id=" + jump_id + "&title=" + title
						})
					}
				}
			},
			//获取当前上级推荐人分享的店铺
			getTjrShop(storesId) {
				//获取信息
				var arr = {};
				var pdata = url.getSignStr(arr);
				uni.request({
					url: url.websiteUrl + '/api_v2/shop/index',
					method: 'POST',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: pdata,
					success: res => {
						//console.log(res.data.data);
						for (var i in res.data.data) {
							if (res.data.data[i].stores_id == storesId) {
								try { //从本地缓存中同步获取指定 key 对应的内容。
									var xvs = uni.getStorageSync('xshopInfo');
									//写入缓存
									var xxx = {
										address: xvs.address,
										current: xvs.current,
										store: res.data.data[i],
									}
								} catch (e) {
									// error
								}
								//this.hhhj = res.data.data[i];
								try {
									uni.setStorage({
										key: 'xshopInfo',
										data: xxx,
										success: function() {}
									});
								} catch (e) {
									// error
								}
								try { //从本地缓存中同步获取指定 key 对应的内容。
									const value = uni.getStorageSync('memberinfo');
									const values = uni.getStorageSync('xshopInfo');
									const valuex = uni.getStorageSync('shoppingCarts');
									//console.log(values);
									if (values) {
										this.xshopInfo = values;
										if (values.address.address == undefined) {
											this.maddress = values.current;
										} else {
											this.maddress = values.address.xq_name + values.address.mbh;
										}
										//console.log(values.store.stores_name);
										this.stores_name = values.store.stores_name;
										uni.setNavigationBarTitle({
											title: values.store.stores_name
										});
									}
									if (value) {
										this.memberinfo = value;
										this.login = true;
									}
									if (valuex) {
										this.shoppingCarts = valuex;
									}
								} catch (e) {
									// error
								}
								this.getHome();
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});

			}
		}
	}
</script>
<style>
	page {
		background-color: #F7F7F7;
		width: 100%;
		overflow-x: hidden;
	}

	.width100 {
		width: 30upx;
		height: 30upx;
		background: blue;
		float: left;
	}

	.new_x12_listall {
		width: 100%;
		position: relative;
		background-color: transparent;
		margin-top: -80upx;
		padding: 0 20upx;
		box-sizing: border-box;
		justify-content: space-between;
		display: flex;
		/* background-color: #fff; */
		width: 710upx;
		margin-left: 20upx;
		margin-bottom: 40upx;
	}

	.new_x4_list {
		width: 210upx !important;
		border-radius: 20upx;
		overflow: hidden;
		box-shadow: 1px 2px 3px 0px rgba(4, 0, 0, 0.2);
	}

	.new_x4_list>.x12 {
		box-sizing: border-box;
	}

	.body-a {
		width: 96%;
		height: auto;
		padding: 2%;
	}

	.imgwidth {
		width: 710upx;
		height: 300upx;
		margin-left: 20upx;
		border-radius: 20upx;
	}

	.classification {
		background-color: #fff;
		width: 680upx;
		padding: 30upx 20upx;
		height: auto;
		border-radius: 10upx;
		float: left;
		margin-bottom: 18upx;
	}

	.classification view {
		width: 170upx;
		height: auto;
		float: left;
		margin: 10upx 0upx;
		text-align: center;
		font-size: 28upx;
		color: #333;
	}

	.classification view image {
		width: 100upx;
		height: 100upx;
	}

	.tctj {
		background-color: #fff;
		width: 680upx;
		padding: 30upx 20upx;
		height: auto;
		border-radius: 10upx;
		float: left;
		margin-bottom: 18upx;
	}

	.tctj-title {
		width: 100%;
		height: auto;
		float: left;
		border-bottom: 1px #F6F6F6 solid;
		padding-bottom: 15upx;
		margin-bottom: 30upx;
		font-size: 32upx;
		font-weight: 700;
	}

	.title_s {
		width: 20upx;
		height: 28upx;
		float: left;
		margin-top: 10upx;
		border-left: #FFCC00 solid 3px;
	}

	.title_t {
		width: auto;
		height: auto;
		float: left;
	}

	.tctj-body {
		width: 100%;
		height: auto;
		float: left;
	}

	.tctj-body-5 {
		width: 50%;
		height: auto;
		float: left;
		margin: 20upx 0upx;
	}

	.tctj-body-left {
		width: 120upx;
		height: auto;
		float: left;
	}

	.tctj-body-left image {
		width: 120upx;
		height: 120upx;
		float: left;
	}

	.tctj-body-right {
		width: 180upx;
		height: auto;
		float: left;
		padding-left: 20upx;
		line-height: 1.2em;
	}

	.tctj-body-right-title {
		font-size: 28upx;
		color: #333;
	}

	.tctj-body-right-describe {
		font-size: 28upx;
		color: #666;
	}

	.tctj-body-right-price {
		font-size: 28upx;
		color: #E84C3E;
		font-weight: 700;
	}

	.bunner {
		width: 100%;
		height: auto;
		float: left;
	}

	.bunner image {
		width: 720upx;
		height: 180upx;
	}

	.uuuuiw {
		background: rgba(245, 245, 245, 1);
		font-size: 10pt;
		padding: 0;
		width: 100%;
		padding: 15upx 0 35upx 0;
	}

	button::after {
		border: none;
	}

	/* 	.bgImage_top{
		height: 300upx;
		width: 750upx;
	} */
	.bg_Image_address {
		height: 172upx;
		width: 750upx;
		box-sizing: border-box;
		position: relative;
	}

	.bgAddress_imgage {
		height: 30upx;
		width: 30upx;
		margin-right: 20upx;
	}

	.bgAddress {
		display: flex;
		font-size: 24upx;
		color: #fff;
		align-items: center;
	}

	.topSearch_top {
		display: flex;
		font-size: 11pt;
		color: #fff;
		font-weight: bold;
		position: absolute;
		margin-top: -20upx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) !important;
	}

	.bgAddress_text {
		margin-right: 20upx;
		width: 70upx;
		overflow: hidden; //超出的文本隐藏 
		/* text-overflow:ellipsis; //溢出用省略号显示 */
		white-space: nowrap; //溢出不换行
	}

	/* 	.padding{
		height: 70upx;
	} */
	.bg_Images_top {
		padding: 0;
	}

	.bg_images {
		margin-top: calc(var(--status-bar-height) + 5px);
		padding-top: 40upx;
		box-sizing: border-box;
	}

	.bgImages_text {
		color: #fff;
	}

	.bannerImages {
		border-radius: 20upx;
		width: 710upx;
		height: 224upx;
		margin-left: 20upx;
	}

	.bgTop_text {
		color: #fff;
		position: absolute;
		font-size: 24upx;
		text-align: center;
	}

	.bgTop_x12 {
		position: absolute;
		bottom: -58upx;
		/* top: calc(var(--status-bar-height) + 88px); */
	}
	.titleList{
		display: -webkit-box;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-align: justify;
		line-height: 40upx;
		font-size: 28upx;
		margin-bottom: 10upx;
	}
</style>
