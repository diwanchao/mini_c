<template>
	<view>
		<hx-navbar ref="hxnb" :config="config">
			<block slot="max" >
				<view class="center-max"  style="background-color: #00aaff;">
					<text class="color hx_font_size" style="color: #2C405A;">中间最大100%</text>
				</view>
			</block>
			<block slot="maxSwitch" >
				<view class="center-max"  style="background-color: #ffa12e;">
					<text class="color hx_font_size">滑动后的效果</text>
				</view>
			</block>
		</hx-navbar>
		
		
		
		<image src="/static/xj.jpg" mode="" style="width: 100%;"></image>
		<view style="background: #FFFFFF;padding:0 15px 15px;" v-for="(item,index) in 4" :key="index">
			
			<text>{{item}}.{{doc}}</text>
			<view style="padding-top: 15px;"/>
			<text>{{doc2}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{
					title: '这里是新疆',
					maxSlot: true,
					maxSlotSwitch: true,
				},
				
				"doc": "没到过新疆的人，闭上眼睛想想跳入脑海中的新疆元素肯定是草原、骆驼、马、羊和扎着许多小辫的维吾尔族姑娘。",
				"doc2": "其实现在新疆的城市和内地没任何区别，千篇一律，千人一面，乏善可陈。但是，新疆和内地确实不同，城市之外有荒无人烟的辽阔戈壁，浩瀚如海的沙漠，碧波荡漾的草原，还有宝石般的高山湖泊，巍峨的天山昆仑和阿勒泰山及纵横交错的河流及广阔田野。"
			}
		},
		onPageScroll(e) {
			// 重点，用到滑动切换必须加上
			this.$refs.hxnb.pageScroll(e);
		},
		methods: {
			
		}
	}
</script>

<style>
	.hx_font_size{
		font-size: 18px;
	}
	.color{
		color: #ffffff;
	}
	
	.center-max{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		background-color: #ffb521;
		height: 44px;
		justify-content: center;
		align-items: center;
		padding: 0 14px 0 50px;
	}
</style>
