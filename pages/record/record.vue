<template>
	<view>
		<!-- Contacts Section -->
		<view class="center">
			<!-- <view class="contacts">
				<text class="fas fa-bars fa-2x"></text>
				<text class="contacts-title">Contacts</text>
				<view v-for="(contact, index) in contacts" :key="index" class="contact">
					<view :class="['pic', contact.pic]"></view>
					<view class="badge">{{ contact.badge }}</view>
					<view class="name">{{ contact.name }}</view>
					<view class="message">{{ contact.message }}</view>
				</view>
			</view> -->

			<!-- Chat Section -->
			<view class="contact bar">
				<view class="chat-header">
					<view :class="['pic', currentContact.pic]"></view>
					<view class="name">{{ currentContact.name }}</view>
					<view class="seen">{{ currentContact.lastSeen }}</view>
				</view>
			</view>
			<view class="chat chat-scroll">
				<!-- Chat Header -->
				<scroll-view id="scrollview" class="chat " :scroll-top="scrollTop" scroll-y="true" @scroll="scroll">
					<!-- Chat Header -->
					<!-- Messages Container -->
					<view class="messages chat-room" id="chat" ref="chatRef">
						<!-- Messages -->
						<view v-for="(message, index) in messages" :key="index">
							<view class="time">{{ message.time }}</view>
							<view :class="['message', message.sender === 'parker' ? 'parker' : 'left']">
								{{ message.content }}
							</view>
						</view>

						<!-- Typing Indicator -->
						<view class="message stark">
							<view class="typing typing-1"></view>
							<view class="typing typing-2"></view>
							<view class="typing typing-3"></view>
						</view>
					</view>
				</scroll-view>

				<!-- Input Area -->
				<view class="input">
					<!-- <text class="fas fa-camera"></text> -->
					<!-- <text class="far fa-laugh-beam"></text> -->
					<text class="icon t-icon t-icon-Microphone Microphone"></text>
					<input placeholder="Type your message here!" @confirm="sendMessage" @keydown.enter="sendMessage"
						type="text" v-model="newMessage" />
					<text class="icon t-icon t-icon-Microphone Microphone"></text>
				</view>
			</view>
		</view>
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
				recordings: [], // 新增一个数组用于存储录音记录
				contacts: [{
						pic: 'rogers',
						badge: 14,
						name: 'Steve Rogers',
						message: "That is America's ass 🇺🇸🍑"
					},
					// ... other contacts
				],
				currentContact: {
					pic: 'stark',
					name: 'Tony Stark',
					lastSeen: 'Today at 12:56'
				},
				messages: [{
						time: 'Today at 11:41',
						sender: 'parker',
						content: "Hey, man! What's up, Mr Stark? 👋"
					},
					// ... other messages
				],
				newMessage: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0
				},
				// chatHeight: '94vh',
			}
		},
		mounted() {
			const res = uni.getSystemInfoSync(); //获取手机可使用窗口高度     api为获取系统信息同步接口
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100) -
				70; //像素   因为给出的是像素高度 然后我们用的是upx  所以换算一下 
			this.scrollToBottom(); //创建后调用回到底部方法
		},
		beforeDestroy() {
			console.log('beforeDestroy')
			// 在组件销毁之前移除事件监听
			uni.$off('newMessage', this.scrollChatToBottom);
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
			let deviceHeight = 0
			console.log('on load')
		},
		methods: {
			scroll: function(e) {
				console.log('scroll')
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			getChatElement() {
				// 获取 chat 元素的引用
				this.chat = this.$refs.chatRef;
				console.log('get chat element')
				// 在页面加载后等待一小段时间再获取 chat 元素的高度等信息
				setTimeout(() => {
					this.scrollChatToBottom();
				}, 1000);
			},
			scrollChatToBottom() {
				// 确保 chat 元素的引用存在
				if (!this.chat) {
					this.getChatElement();
					return;
				}
				// 滚动 chat 到底部
				this.chat.scrollTop = this.chat.scrollHeight - this.chat.clientHeight;
				// 获取 chat 元素的引用

			},
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
				console.log('播放录音' + path + 'path');
				console.log(this.recordings);
				// if (this.voicePath) {
				innerAudioContext.src = path;
				innerAudioContext.play();
				// }
			},
			sendMessage() {
				console.log('message')
				if (this.newMessage.trim() !== '') {

					this.chatWithMsg(this.newMessage)

				}
			},
			scrollToBottom() {
				let that = this;
				console.log('that', that)
				let query = uni.createSelectorQuery();
				query.selectAll('.messages').boundingClientRect();
				query.select('#scrollview').boundingClientRect();
				query.exec((res) => {
					that.style.mitemHeight = 0;
					res[0].forEach((rect) => that.style.mitemHeight = that.style.mitemHeight + rect.height + 40);
					setTimeout(() => {
						if (that.style.mitemHeight > (that.style.contentViewHeight - 100)) {
							that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight + 60;
							console.log('scrolltop', that.scrollTop)
						}
					}, 100)
				});
			},
			chatWithMsg(msg) {
				const currentTime = new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				});

				const newChat = {
					time: currentTime,
					sender: 'parker',
					content: msg
				};
				this.messages.push(newChat);
				this.newMessage = ''; // 清空输入框
				console.log('new chat before send chat', newChat)
				uni.request({
					url: '/chat/test', //仅为示例，并非真实接口地址。
					data: {
						msg: msg
					},
					success: (res) => {
						let data = res.data.data;
						let response = JSON.parse(data);

						const aiChat = {
							time: currentTime,
							sender: 'ai',
							content: response.result
						};
						console.log('new chat after chat', newChat)
						this.messages.push(aiChat);

						this.scrollToBottom(); // 滚动到底部
						console.log('Message sent, scrolling to bottom...');
					},
					fail: (res) => {
						console.log('get失败');
						console.log(res.data);
					}
				});
			}
		}
	}
</script>

<style>
	/* 添加响应式设计的 CSS 规则 */
	@media only screen and (max-width: 768px) {
		.center {
			left: 50%;
			transform: translateX(-50%);
			background-color: #000000;
		}

		.contacts {
			transform: translate(-100%, -50%);
		}

		.contacts:hover {
			transform: translate(0, -50%);
		}

		.chat {
			width: 100%;
		}

		.chat-scroll {
			background-color: #000000;
			/* padding-top: 3rem */
		}
	}

	body,
	html {
		font-family: Red hat Display, sans-serif;
		font-weight: 400;
		line-height: 1.25em;
		letter-spacing: 0.025em;
		color: #333;
		background: #F7F7F7;
	}

	body,
	html {
		font-family: Red hat Display, sans-serif;
		font-weight: 400;
		line-height: 1.25em;
		letter-spacing: 0.025em;
		color: #333;
		background: #F7F7F7;
	}

	.center {
		position: absolute;
		top: 50%;
		/* left: calc(50% + 12rem); */
		/* left: calc(10% + 12rem); */
		transform: translate(-50%, -50%);
		background-color: #000000;
	}

	.chat-scroll {
		background-color: #000000;
		/* padding-top: 3rem; */
	}

	.pic {
		width: 4rem;
		height: 4rem;
		background-size: cover;
		background-position: center;
		border-radius: 50%;
	}

	.contact {
		position: relative;
		margin-bottom: 1rem;
		padding-left: 5rem;
		height: 4.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.contact .pic {
		position: absolute;
		left: 0;
	}

	.contact .name {
		font-weight: 500;
		margin-bottom: 0.125rem;
	}

	.contact .message,
	.contact .seen {
		font-size: 0.9rem;
		color: #999;
	}

	.contact .badge {
		box-sizing: border-box;
		position: absolute;
		width: 1.5rem;
		height: 1.5rem;
		text-align: center;
		font-size: 0.9rem;
		padding-top: 0.125rem;
		border-radius: 1rem;
		top: 0;
		left: 2.5rem;
		background: #333;
		color: white;
	}

	.contacts {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-6rem, -50%);
		width: 24rem;
		height: 32rem;
		padding: 1rem 2rem 1rem 1rem;
		box-sizing: border-box;
		border-radius: 1rem 0 0 1rem;
		cursor: pointer;
		background: white;
		box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1), 2rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
		transition: transform 500ms;
	}

	.contacts h2 {
		margin: 0.5rem 0 1.5rem 5rem;
	}

	.contacts .fa-bars {
		position: absolute;
		left: 2.25rem;
		color: #999;
		transition: color 200ms;
	}

	.contacts .fa-bars:hover {
		color: #666;
	}

	.contacts .contact:last-child {
		margin: 0;
	}

	.contacts:hover {
		transform: translate(-23rem, -50%);
	}

	.chat {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
		width: 24rem;
		margin: 0;
		overflow: hidden;
		z-index: 2;
		background: #000000;
		border-radius: 0;
	}

	.center .contact.bar {
		position: absolute;
		top: 0.1rem;
		left: 0;
		width: 100%;
		z-index: 1000;
		/* 设置一个较大的 z-index，确保在其他元素上方 */
		background-color: #333;
		/* 你可以根据需要设置背景颜色 */
		color: white;
		/* 你可以根据需要设置文本颜色 */
	}

	.chat .messages {
		padding-top: 6rem;
		background: #000000;
		flex-shrink: 2;
		overflow-y: auto;
		box-shadow: inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05), inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05);
		flex-grow: 1;
	}

	.chat .messages .time {
		font-size: 0.8rem;
		background: #EEE;
		padding: 0.25rem 1rem;
		border-radius: 2rem;
		color: #999;
		width: -webkit-fit-content;
		width: -moz-fit-content;
		width: fit-content;
		margin: 0 auto;
	}

	.chat .messages .message {
		box-sizing: border-box;
		padding: 0.5rem 1rem;
		margin: 1rem;
		background: #FFF;
		border-radius: 1.125rem 1.125rem 1.125rem 0;
		min-height: 2.25rem;
		width: -webkit-fit-content;
		width: -moz-fit-content;
		width: fit-content;
		max-width: 66%;
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
	}

	.chat .messages .message.parker {
		margin: 1rem 1rem 1rem auto;
		border-radius: 1.125rem 1.125rem 0 1.125rem;
		background: #333;
		color: white;
	}

	/* New styles for left-aligned message */
	.chat .messages .message.left {
		margin: 1rem 1rem 1rem 0;
		border-radius: 1.125rem 1.125rem 0 1.125rem;
		/* background: #4285f4; */
		background: #2a5cb0;
		/* Set your desired background color */
		color: white;
	}

	.chat .messages .message .typing {
		display: inline-block;
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0rem;
		box-sizing: border-box;
		background: #ccc;
		border-radius: 50%;
	}

	.chat .messages .message .typing.typing-1 {
		-webkit-animation: typing 3s infinite;
		animation: typing 3s infinite;
	}

	.chat .messages .message .typing.typing-2 {
		-webkit-animation: typing 3s 250ms infinite;
		animation: typing 3s 250ms infinite;
	}

	.chat .messages .message .typing.typing-3 {
		-webkit-animation: typing 3s 500ms infinite;
		animation: typing 3s 500ms infinite;
	}

	.chat .input {
		box-sizing: border-box;
		flex-basis: 4rem;
		flex-shrink: 0;
		height: 2.4em;
		display: flex;
		align-items: center;
		padding: 0 0.5rem 0 1.5rem;
		background-color: #333;
		color: white;
	}

	.chat .input i {
		font-size: 1.5rem;
		margin-right: 1rem;
		color: #666;
		cursor: pointer;
		transition: color 200ms;
	}

	.chat .input i:hover {
		color: #333;
	}

	.chat .input input {
		border: none;
		background-image: none;
		background-color: white;
		/* height: 0; */
		height: 3.5em;
		/* padding: 0.5rem 1rem; */
		/* margin-right: 1rem; */
		/* border-radius: 1.125rem; */
		border-radius: 0;
		/* flex-grow: 2; */
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.2);
		font-family: Red hat Display, sans-serif;
		font-weight: 400;
		letter-spacing: 0.025em;
		background-color: #282a2d;
	}

	.chat .input input:placeholder {
		color: #999;
	}

	.Microphone {
		/* transform: translateX(-50%); */
		/* font-size: 80rpx; */
	}

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		font-size: 50rpx;
		/* position: relative; */
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

	@-webkit-keyframes typing {

		0%,
		75%,
		100% {
			transform: translate(0, 0.25rem) scale(0.9);
			opacity: 0.5;
		}

		25% {
			transform: translate(0, -0.25rem) scale(1);
			opacity: 1;
		}
	}

	@keyframes typing {

		0%,
		75%,
		100% {
			transform: translate(0, 0.25rem) scale(0.9);
			opacity: 0.5;
		}

		25% {
			transform: translate(0, -0.25rem) scale(1);
			opacity: 1;
		}
	}

	.pic.stark {
		background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/73/SMH_Mentor_6.png");
	}

	.pic.banner {
		background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/4/4f/BruceHulk-Endgame-TravelingCapInPast.jpg");
	}

	.pic.thor {
		background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/9/98/ThorFliesThroughTheAnus.jpg");
	}

	.pic.danvers {
		background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/05/HeyPeterParker.png");
	}

	.pic.rogers {
		background-image: url("https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/7c/Cap.America_%28We_Don%27t_Trade_Lives_Vision%29.png");
	}
</style>