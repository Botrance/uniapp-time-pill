<template> 
    <view class="container">
      <text class="page-header">胶囊信息</text>
      <view class="main">
        <form method="post" style="margin-bottom: 30rpx;">
          <view><text>胶囊Key:</text><input class="put-input" :value="uid" type="text"></view>
        </form>
      </view>
  </view>
  </template>
  
<script  lang="ts">
import { defineComponent} from 'vue'
import store from '@/store/index.js'

  export default defineComponent({
    setup(){
      let uid='';
      uid =store.state.uid;
      console.log(uid);
      return{
        uid
      }
    },
  })
</script>

<style lang="scss" scoped>
	.container {
	margin-top: 20rpx;
	width: 750rpx;
	padding: 0 10rpx;
	margin-left: 8rpx;
		.page-header {
			font-size: 48rpx;
			font-weight: 600;
			line-height: 28rpx;
			border-bottom: 0 solid #9CF;
			padding: 0 0 7rpx 0;
			margin-bottom: 10rpx;
			color: #555;
		}

		.main {
			width: 650rpx;
			padding-bottom: 60rpx;
			
			form{
				.put-input{
					  display: inline-block;
					  width: 450rpx;
					  float: left;
					  margin-top: 10rpx;
					  margin-left: 10rpx;
					  padding: 5rpx;
					  border: 1rpx solid #D9D9D9;
					  border-top: 1rpx solid silver;
					  color: #333;
					  font-family: inherit;
					  font-weight: inherit;
				}
				
				
				text {
					float: left;
					margin-top: 15rpx;
				}
				
		}
	}
	
  
}
</style>
