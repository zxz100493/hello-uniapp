<template>
	<view class="main">
		<view class="recordings">
			<view v-for="(recording, index) in recordings" :key="index" @tap="playVoice(recording.path)">
				{{ recording.timestamp }}
				{{ recording.path }}
			</view>
		</view>
		<div class="icon-container" @mousedown="touchStartMicrophone" @touchstart="touchStartMicrophone"
			@mouseup="touchEndMicrophone" @touchend="touchEndMicrophone">
			<view :class="microphoneClass">

			</view>
		</div>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	innerAudioContext.autoplay = true;

	export default {
		data() {
			return {
				text: 'test',
				voicePath: '',
				showMicrophone1: false,
				microphoneClass: "icon t-icon t-icon-Microphone",
				microphoneStyle: "font-size: 100rpx",
				recordings: [] // 新增一个数组用于存储录音记录
			}
		},
		onLoad() {
			let self = this;
			recorderManager.onStop(function(res) {
				console.log('recorder stop' + JSON.stringify(res));
				self.voicePath = res.tempFilePath;
				self.recordings.push({
					path: res.tempFilePath,
					timestamp: new Date().toLocaleString()
				});
			});
		},
		methods: {
			touchStartMicrophone() {
				console.log("start")
				this.startRecord()
				this.microphoneClass = "icon t-icon t-icon-Microphone1 big"
			},
			touchEndMicrophone() {
				console.log("end")
				this.endRecord()
				this.microphoneClass = "icon t-icon t-icon-Microphone"
			},
			startRecord() {
				console.log('开始录音');
				recorderManager.start();
			},
			endRecord() {
				recorderManager.stop();
			},
			playVoice(path) {
				console.log('播放录音' + path+'path');
				console.log(this.recordings);
				// if (this.voicePath) {
				innerAudioContext.src = path;
				innerAudioContext.play();
				// }
			}
		}
	}
</script>

<style>
	body,
	html {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.main {
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
		font-size: 160rpx;
		position: relative;
	}

	.big {
		font-size: 220rpx;
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
		border: 2px solid black;
		/* 光圈颜色，可以根据需要调整 */
		border-radius: 50%;
		animation: rotate 2s linear infinite;
		/* 添加旋转动画 */
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