<template>
	<view class="container">
	    <text class="page-header">添加胶囊</text>
	    <view class="main">
	        <form method="post">
	
	            <text>你的名字</text><text v-if="pillErr.name==='blank'" class="err">名字不能为空</text>
	            <input class="put-input" name="name" v-model="pill.name"  type="text" >
	            
	            <text>你的邮箱</text><text v-if="pillErr.email==='blank'" class="err">邮箱不能为空</text>
	            <text v-if="pillErr.email==='style'" class="err">邮箱格式错误</text>
	            <input class="put-input" name="email" v-model="pill.email"  type="text">
	
	            <text>打开时间</text><text v-if="pillErr.time==='blank'" class="err">时间不能为空</text>
	            <text v-if="pillErr.time==='style'" class="err">时间格式错误</text>
	            <input class="put-input" name="time" v-model="pill.time"  type="text"> 
	            <text class="tips">打开时间之前，胶囊内容是看不到的。</text>
	
	            <text>胶囊内容</text><text v-if="pillErr.content==='blank'" class="err">内容不能为空</text>
	            <textarea name="content" v-model="pill.content"  maxlength='5000'></textarea>
	            <text class="tips">胶囊内容不能超过5000字。</text>
	
	            <text style="margin-top: 10rpx;">未到期提示信息</text>
	            <textarea name="tips" v-model="pill.info" maxlength='100'></textarea>
	
	            <text class="tips">在打开时间之前打开胶囊，会看到提示信息。</text>
	
	            <view  style="margin-top: 20rpx;" @click.prevent="putPill"><button>添加胶囊</button></view>
		            
	        </form>
	    </view>
	</view>
</template>

<script lang="ts">
import { defineComponent, reactive} from 'vue'
import dayjs from 'dayjs'
import store from '@/store/index.js'
	interface PillData{
	  uid:string
	  name:string
	  email:string
	  time:string
	  content:string
	  info:string
	}
	
	interface errData{
	  name:string
	  email:string
	  time:string
	  content:string
	  error:string
	}
	
	export default defineComponent({
	  setup(){
	   
	    const nowTime=dayjs().format("YYYY-MM-DD HH:mm:ss");
	    const pill:PillData=reactive({uid:'',name:'',email:'',time:nowTime,content:'',info:''});
	    const pillErr:errData=reactive({name:'',email:'',time:'',content:'',error:'no'});
		
		console.log(store.state.uid);
		
	    function errCheck(){
			const emailCk = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			const timeCk= /^(\d{4})(-)(\d{1,2})(-)(\d{1,2}) (\d{1,2})(:)(\d{1,2})(:)(\d{1,2})$/;
			pillErr.name='';pillErr.email='';pillErr.time='';pillErr.content='';pillErr.error='no';

			if(pill.name===''){pillErr.name='blank';pillErr.error='yes';}

			if(pill.email===''){pillErr.email='blank';pillErr.error='yes';}
			else if(!emailCk.test(pill.email)){pillErr.email='style';pillErr.error='yes';}

			if(pill.time===''){pillErr.time='blank';pillErr.error='yes';}
			else if(!timeCk.test(pill.time)){pillErr.time='style';pillErr.error='yes';}
			else if(timeCk.test(pill.time)){timeCheck(pill.time);}
			if(pill.content===''){pillErr.content='blank';pillErr.error='yes';}
	    }
	
	    function timeCheck(value:string){
			
			let days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

			let otime = value.split(" ");
			let date=otime[0].split("-")
			let time=otime[1].split(":")

			let year = parseInt(date[0], 10);
			let month = parseInt(date[1], 10);
			let day = parseInt(date[2], 10);

			let hour=parseInt(time[0],10);
			let minute=parseInt(time[1],10);
			let second=parseInt(time[2],10);
			console.log(year,month,day,hour,minute,second);

			if (month > 12 || month < 1||year>9999||year<=0) {pillErr.time='style';pillErr.error='yes';}
			if((year % 4 == 0 && year % 100 != 0)||(year % 400 == 0))days[2] = 29;
			if (day > days[month]){pillErr.time='style';pillErr.error='yes';}

			if(hour>=24||hour<0||minute>=60||minute<0||second>=60||second<0){pillErr.time='style';pillErr.error='yes';}
	    }
		
		function uuid() {
		    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		        var r = Math.random() * 16 | 0,
		            v = c == 'x' ? r : (r & 0x3 | 0x8);
		        return v.toString(16);
		    });
		}
	
	    function putPill(){
	
			errCheck();
			if(pillErr.error==='yes'){console.log(pillErr);return;}

			let uid=uuid();
			pill.uid=uid;
			console.log(pill);

			const db = uniCloud.database();
			//云数据库可用则提交数据后跳转，否则数据存储到本地
			db.collection('pill').add({
				"uid":pill.uid,
				"name":pill.name,
				"email":pill.email,
				"time":pill.time,
				"content":pill.content,
				"info":pill.info
			}).then(()=>{
				console.log("data cloud-store success");
				store.commit('setUid',pill.uid);
				uni.clearStorageSync();
				uni.redirectTo({
					url:'/pages/putdone/putdonePage',
				})
			}).catch((err)=>{
				console.log(err);
				console.log('data cloud-store failed');
				uni.setStorage({
				key: pill.uid,
				data: JSON.stringify(pill),
				success: function () {
					console.log('data local-store success');
					console.log(uni.getStorageInfoSync().keys);
					store.commit('setUid',pill.uid);
					uni.redirectTo({
						url:'/pages/putdone/putdonePage'
					})
					}
				});
			});
			
			
	    }
		
	    return{
	      pill,pillErr,putPill
	    }
	  },
	})
</script>

<style lang="scss" scoped>
	.container {
		margin-top: 20rpx;
		min-height: 1350rpx;
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
				
				.err {
					color: #900;
					margin-bottom: 5rpx;
				}
				
				.put-input, textarea {
					  display: inline-block;
					  width: 100%;
					  margin-bottom: 10rpx;
					  padding: 5rpx;
					  border: 1rpx solid #D9D9D9;
					  border-top: 1rpx solid silver;
					  color: #333;
					  font-family: inherit;
					  font-weight: inherit;
					  font-family: "Lucida Grande", "Lucida Sans Unicode", Helvetica, Arial, Verdana, sans-serif;
				}
				
				.put-input{
					width: 450rpx;
				}
				
				textarea{
					margin-bottom: 0;
				}
				
				text {
					display: block;
					margin-bottom: 2rpx;
				}
				
				.tips {
					padding: 0;
					margin: 0;
					color: #999;
					background-color: #f6f6f6;
				}
					
				button {
					display: inline-block;
					padding: 5rpx 10rpx;
					-moz-border-radius: 10rpx;
					-webkit-border-radius: 10rpx;
					border-radius: 10rpx;
					background-color:red;
					filter: none;
					border: 1rpx solid red;
					color: #fff;
				}
				
			}
		}

	}

	
</style>
