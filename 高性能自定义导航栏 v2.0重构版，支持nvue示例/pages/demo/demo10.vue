<template>
	<view>
		<hx-navbar ref="hxnb" :config="config"/>
		

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
					// 状态栏字体颜色，只支持黑 '#000000'和白'#ffffff'两种颜色。为数组则是滑动变色['#ffffff','#000000']
					statusBarFontColor: ['#ffffff','#000000'],
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

</style>
