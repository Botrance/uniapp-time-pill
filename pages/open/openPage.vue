<template> 
    <view class="container">
        <text class="page-header">打开胶囊</text>
        <view class="main">
		  <form method="post" style="margin-bottom: 30rpx;">
		    <view>
				<text>胶囊Key</text><input class="put-input" v-model="uid" type="text">
				 <button @click.prevent="openPill">打开胶囊</button>
			</view>
		  </form>
          <view v-if="pill.uid!==''" class="pill" >
            <text v-if="timeOver==='yes'">{{ pill.name }} 在 {{ pill.time }} 对你说：</text>
    
            <text v-if="timeOver==='no'">这颗胶囊未到提取时间，不能打开。</text>
            <text  v-if="timeOver==='no'">打开时间在 <text>{{ pill.time }}</text>，距离现在{{timeGap}}秒。</text>
    
            <view v-if="timeOver==='yes'" class="content">
              <text>
                {{ pill.content }}
              </text>
            </view>
    
            <view v-if="timeOver==='no'" class="content">
              <text>
                <text><text style="font-weight: bold;">{{ pill.name }}</text> 给你留的提示信息：</text>
                {{ pill.content }}
              </text>
            </view>
    
          </view>
        </view>
    </view>
  </template>
  
<script  lang="ts">
import { defineComponent, reactive, ref} from 'vue'
import dayjs from 'dayjs'
interface PillData{
  uid:string
  name:string
  email:string
  time:string
  content:string
  info:string
}

  export default defineComponent({
    setup(){
        const pill:PillData=reactive({uid:'',name:'',email:'',time:'',content:'',info:''});
        const uid=ref('');
        const timeGap=ref(0);
        const timeOver=ref('no');
        const nowTime=dayjs().format("YYYY-MM-DD HH:mm:ss");
		
       function dataBind(data:PillData){
		   pill.uid=data.uid;
		   pill.name=data.name;
		   pill.email=data.email;
		   pill.time=data.time;
		   pill.content=data.content;
		   pill.info=data.info;
		   
		   timeGap.value=dayjs(pill.time).unix()-dayjs(nowTime).unix();
		   timeOver.value=timeGap.value>=0?'no':'yes';
	   }
		
        function openPill(){
			console.log(uid.value);
			const db = uniCloud.database();
			db.collection('pill').where({uid:uid.value}).get()
			.then((res)=>{
				
				// 云数据库可用则拉取数据，并将数据存储到本地
				dataBind(res.result.data[0]);
				
				console.log("data cloud-read success");
				console.log(res.result.data[0]);
				
				uni.setStorage({
				key: pill.uid,
				data: JSON.stringify(pill),
				success: function () {
					console.log('data local-store success')
					console.log(uni.getStorageInfoSync().keys);
					}
				});
				
			})
			.catch((err)=>{
				console.log(err);
				// 云数据库不可用则打印错误信息，查找本地是否有数据
				let pre_pill=uni.getStorageSync(uid.value);
				if (pre_pill) {
					let data = JSON.parse(pre_pill);
					dataBind(data);
					console.log('data local-read success');
					//本地存在数据则每秒向云数据库提交，直到提交成功为止
					let timer = setInterval(() => {
					    db.collection('pill').add({
							"uid":pill.uid,
							"name":pill.name,
							"email":pill.email,
							"time":pill.time,
							"content":pill.content,
							"info":pill.info
						}).then(()=>{console.log("data cloud-store success"); uni.clearStorageSync();clearInterval(timer);}).catch(
							(err)=>{console.log(err);console.log('data cloud-store failed');})
					}, 1000);
					
						
				}
			  })
			
		}
		
        return{
          pill,uid,openPill,timeOver,timeGap
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
					  
					  width: 450rpx;
					  
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
					margin-top: 15rpx;
				}
				
				button {
					margin-top: 20rpx;
					display: inline-block;
					padding: 5rpx 15rpx;
					-moz-border-radius: 10rpx;
					-webkit-border-radius: 10rpx;
					border-radius: 10rpx;
					background-color:red;
					filter: none;
					border: 1rpx solid red;
					color: #fff;
				}
				
			}
			

			.pill{
			
				text {
					font-size: 18rpx;
					line-height: 42rpx;
				}
			
				.content {
					padding: 15rpx 20rpx;
					border: 1rpx solid #ff0033;
				}
			
				text {
					line-height: 1.8em;
				}
			} 
		}
		
	}
	
</style>
