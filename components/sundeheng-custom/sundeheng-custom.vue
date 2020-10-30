<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<!-- <image src="https://div.buy315.com.cn/xcx_imgs/content_top.png" ></image> -->
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action">
					<text  @tap="BackPage" v-if="isBack" class="cuIcon-back"></text>
					<slot  @tap="BackPage" v-if="isBack" name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]" >
					<slot name="content"></slot>
				</view>
				<view class="" style="padding-right: 20rpx; font-size: 30rpx;" @click="rightcli">
					<slot name="right"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				bgImage:''
			};
		},
		name: 'sundeheng-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			rightcli(){
				this.$emit('rightcli')
			}
		}
	}
</script>

<style>
	@import "main.css";
	
	@font-face {
		font-family: "cuIcon";

		src: url(https://div.buy315.com.cn/xcx_imgs/content_top.png)format('svg');
		src: url('//at.alicdn.com/t/font_533566_yfq2d9wdij.eot?t=1545239985831');
		/* IE9*/
		src: url('//at.alicdn.com/t/font_533566_yfq2d9wdij.eot?t=1545239985831#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:data:image/jpeg;base64,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') format('woff'),
			url('//at.alicdn.com/t/font_533566_yfq2d9wdij.ttf?t=1545239985831') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
			url('') format('svg');
		/* iOS 4.1- */
	}
	[class*="cuIcon-"] {
		font-family: "cuIcon";
		font-size: inherit;
		font-style: normal;
	}
	
	.cuIcon-back:before {
		content: "\e679";
	}
</style>
