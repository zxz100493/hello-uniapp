<template>
    <view class="login">
        <view class="top_item">
            <text style="color: #000000;font-size: 22px;font-weight: bold;">密码登录</text>
            <text style="color: #000000;font-size: 20px;margin-right: 10px" @click="handleClick">验证码></text>
        </view>
        <view class="input-item" style="margin-top: 80rpx;">
            <view class="title-content">
                <text class="title">账号</text>
            </view>
            <input class="input" placeholder="手机号/邮箱" style="margin-left: 40rpx;" />
        </view>
        <view class="input-item">
            <view class="title-content">
                <text class="title">密码</text>
            </view>
            <input class="input" placeholder="请输入密码" style="margin-left: 40rpx;" />

        </view>
        <view class="button" @click="login">试用</view>
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
            login() {
                console.log('登录........')
				uni.navigateTo({
					url: '/pages/record/record'
				});
            },
        }
    }
</script>

<style>
    .top_item {
        display: flex;
        margin-top: 40rpx;
        margin-left: 32rpx;
        margin-right: 32rpx;
        justify-content: space-between;
    }

    .input-item {
        display: flex;
        margin-left: 32rpx;
        margin-right: 32rpx;
        height: 50px;
        align-items: center;
        border-bottom: 1px solid #efeff4;
        margin-bottom: 20rpx;

        .title-content {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .title {
                font-size: 18px;
            }
        }

        .input {
            flex: 1;
        }
    }

    .button {
        height: 50px;
        line-height: 50px;
        margin-top: 60rpx;
        margin-left: 32rpx;
        margin-right: 32rpx;
        border-radius: 50rpx;
        font-size: 20px;
        background-color: #008AFE;
        color: #FFFFFF;
        text-align: center;
    }
</style>
