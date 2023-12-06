<template>
	<view class="main">
		<button @tap="startRecord">
		</button>
		<div class="icon-container" @touchstart="toggleMicrophone1" @touchend="toggleMicrophone1">
			<svg class="icon" aria-hidden="true" v-if="!showMicrophone1">
				<use xlink:href="#icon-Microphone"></use>
			</svg>
		</div>
		<div v-if="showMicrophone1" class="icon">
		  <svg class="icon-Microphone1" aria-hidden="true">
		    <use xlink:href="#icon-Microphone1"></use>
		  </svg>
		  <div class="circle-animation"></div>
		</div>
		<!-- <button @tap="endRecord">停止录音</button>
		<button @tap="playVoice">播放录音</button> -->
	</view>
</template>

<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;

export default {
	data() {
		return {
			text: 'uni-app',
			voicePath: '',
			showMicrophone1: false,
		}
	},
	onLoad() {
		let self = this;
		recorderManager.onStop(function (res) {
			console.log('recorder stop' + JSON.stringify(res));
			self.voicePath = res.tempFilePath;
		});
	},
	methods: {
		toggleMicrophone() {
		            this.showMicrophone1 = !this.showMicrophone1;
		        },
		startRecord() {
			console.log('开始录音');

			recorderManager.start();
		},
		endRecord() {
			console.log('录音结束');
			recorderManager.stop();
		},
		playVoice() {
			console.log('播放录音' + this.voicePath);

			if (this.voicePath) {
				innerAudioContext.src = this.voicePath;
				innerAudioContext.play();
			}
		}
	}
}
</script>

<style>
	body, html {
	    margin: 0;
	    padding: 0;
	    overflow: hidden;
	}
.main{
	background-color: #3a3f50;
	width: 100%;
	height: 100vh;
	display: flex;
	    justify-content: center;
	    align-items: center;
	    overflow: hidden;
}
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 100rpx;
    position: relative;
  }
	
	.icon-container {
	    position: absolute;
	    bottom: 0;
	    left: 50%;
	    transform: translateX(-50%);
	}
	
  .icon-Microphone1 {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .circle-animation {
    position: absolute;
    width: 100%;
    height: 100%;
    /* border: 2px solid rgba(225, 225, 225, 0.5); /* 光圈颜色，可以根据需要调整 */ 
    border: 2px solid black; /* 光圈颜色，可以根据需要调整 */
    border-radius: 50%;
    animation: rotate 2s linear infinite; /* 添加旋转动画 */
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
