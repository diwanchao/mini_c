<template>
	<view>
		<hx-navbar ref="hxnb" :config="config" @clickBtn="onClickBtn"/>
		
		<view class="ctn">
			<view class="icons" v-for="(item,i) in icons" :key="i" >
				<view class="hxicon" v-html="item"></view>
				<text>{{item}}</text>
			</view>
		</view>
		<view class="" style="clear: both;">
			
		</view>

		<view style="font-size: 18px;margin: 30px 16px 16px;color: #F0AD4E;text-align: center;">如何导入字体文件？下面手把手教学。</view>
		
		<view style="font-size: 18px;margin: 16px;color: #F0AD4E;text-align: center;">建议打开源文件查看教程</view>
		
		<text class="" >
			1、在 https://www.iconfont.cn/ 新建自己的字体库，图标都添加好
			
			2、然后你的字体库中有如下字符，找到 .ttf 结尾的链接，然后用浏览器下载
			
			@font-face {
			  font-family: 'hxicon';
			  src: url('//at.alicdn.com/t/font_2009392_p959zum1sck.eot');
			  src: url('//at.alicdn.com/t/font_2009392_p959zum1sck.eot?#iefix') format('embedded-opentype'),
			  url('//at.alicdn.com/t/font_2009392_p959zum1sck.woff2') format('woff2'),
			  url('//at.alicdn.com/t/font_2009392_p959zum1sck.woff') format('woff'),
			  url('//at.alicdn.com/t/font_2009392_p959zum1sck.ttf') format('truetype'),
			  url('//at.alicdn.com/t/font_2009392_p959zum1sck.svg#hxicon') format('svg');
			}
			
			3、打开网址ttf转base64字符的网址： https://www.giftofspeed.com/base64-encoder/ 
			
			4、上传你的刚下载的ttf文件，然后复制转换好的base64字符串，新建一个iconfont.css文件
			
			5、然后把 base64 粘贴到下面字符串中，然后设置一个字体名称：font-family:"自定义字体名";
			@font-face {  
			  font-family: "hxicon";  
			  src: url(data:font/truetype;charset=utf-8;base64,转换的base64内容) format('truetype');  
			}
			6、设置一个唯一的类名方便使用 .hxicon
			.hxicon{
				font-family:"hxicon" !important;
				font-size:24px;font-style:normal;
				-webkit-font-smoothing: antialiased;
				-webkit-text-stroke-width: 0.2px;
				-moz-osx-font-smoothing: grayscale;
			}
			7、最后则再项目中App.vue中style标签里引入iconfont.css文件
			
				@import "./font/iconfont.css";  
			
			8、在任意组件中使用 unicode
				
			
			9、这教程就完成了！
			
			注意：如果是nave且为app端时，还需在 javascript 中加入如下代码：可以参考hx-navbar组件源码
			
			var domModule = weex.requireModule('dom');
			// 这里的b64 为你的base64字符串
			var b64 = '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'
			domModule.addRule('fontFace', {
				'fontFamily': "hxcion",
				 'src': "url('data:font/truetype;charset=utf-8;base64,"+b64+"')"
			});
		</text>
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				config:{
					color: '#ffffff',
					backgroundColor: [1,['#6970ff','#ff55ff']],
					// 设置字体,该名字为你自己设置的类名,使用该组件内置的字体则不需要使用该属性，
					font: 'hxicon',
					// icon 则为字体 unicode
					rightButton:[{
						key: '定位',
						icon: '&#xe651;',
						position: 'left'
					},{
						key: '收藏',
						icon: '&#xe64c;',
						position: 'left'
					},{
						key: '设置',
						icon: '&#xe68a;',
						position: 'left'
					},{
						key: '关闭',
						icon: '&#xe646;',
						position: 'left'
					},{
						key: '搜索',
						icon: '&#xe65c;',
						position: 'left'
					},{
						key: 'btn5',
						icon: '&#xe6eb;',
						position: 'left'
					}]
				},
				icons:['&#xe646;','&#xe64b;','&#xe64c;', '&#xe650;','&#xe651;','&#xe65c;','&#xe661;','&#xe68a;','&#xe6ea;','&#xe6eb;','&#xe679;','&#xe6a3;'],
			}
		},
		onPageScroll(e) {
			// 重点，用到滑动切换必须加上
			this.$refs.hxnb.pageScroll(e);
		},
		methods: {
			onClickBtn(data){
				//console.log(data);
				uni.showToast({
				    title: `key为 ${data.key} 的按钮`,
					icon:'none',
				    duration: 1300
				});
			},
		}
	}
</script>

<style lang='scss'>
	@import "@/components/hx-navbar/iconfont.css";
	.ctn{
		
		display: block;
	}
	.icons{
		padding: 16px 0;
		display: flex;
		flex: 1;
		flex-direction: column;
		float: left;
		text-align: center;
		width: 33.3333vw;
		text{
			font-size: 18px;
		}
	}
	.hxicon{
		font-size: 40px;
	}
</style>