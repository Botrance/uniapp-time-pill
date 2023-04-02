<template>
	<view class="home-main">
	    <image class="home-logo" src="@/static/home-logo.png"/>
	    <text class="home-title">时间胶囊</text >
		 <view class="home-router-box">
			 <navigator class="home-router-link" url='../put/putPage'><text>Putpill · 添加</text></navigator>
			 <navigator class="home-router-link" url='../open/openPage'><text>Openpill · 打开</text></navigator>
		</view>
	    <view class="home-footer">
	        <a href="/open/38e7687f-15e4-263c-8a8c-bb1d89ea49e0">什么是时间胶囊</a> <!-- · -->
	<!--        <a href="http://www.timepill.net/">回胶囊日记</a> -->
	    </view>
	  </view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
	$basic-width:500rpx;
	$basic-height:250rpx;
	.home-main {
	  align-items: center;
	  width: $basic-width;
	  margin: auto;
	  padding: 0;
	  
	  .home-logo {
	    border: 0;
	    width: $basic-width;
	    height: $basic-height;
		margin-top: 100rpx;
	    margin-bottom: 5rpx;
	  }
	  
	  .home-title {
		display: block;
	    text-align: center;
	    font-size: 42rpx;
	    line-height: 42rpx;
		font-weight: 600;
	    padding-bottom: 25rpx;
	  }
	  
	  .home-router-box {
		margin-top: 50rpx;
	    padding: 0 40rpx;  margin-bottom: 0;
	  
	  }
	  
	  .home-router-link {
	    display: block;
	    color: #333;
	    text-align: center;
		
		text {
			margin-top: 20rpx;
			display: block;
			font-size: 48rpx;
		}
		
		&:hover{
			background-color: transparent;
			color: red;
		}
	  }
	  
	  .home-footer {
	    clear: both;
	    padding-top: 80rpx;
	    text-align: center;
		
		a {
	      color: #999;
		  &:hover{
			   color: #fff;
			   background-color: red;
		  }
		}
	  }
	  
	}
</style>
