if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$2 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {
      login() {
        formatAppLog("log", "at pages/index/index.vue:36", "登录........");
        uni.navigateTo({
          url: "/pages/record/record"
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "login" }, [
      vue.createElementVNode("view", { class: "top_item" }, [
        vue.createElementVNode("text", { style: { "color": "#000000", "font-size": "22px", "font-weight": "bold" } }, "密码登录"),
        vue.createElementVNode("text", {
          style: { "color": "#000000", "font-size": "20px", "margin-right": "10px" },
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
        }, "验证码>")
      ]),
      vue.createElementVNode("view", {
        class: "input-item",
        style: { "margin-top": "80rpx" }
      }, [
        vue.createElementVNode("view", { class: "title-content" }, [
          vue.createElementVNode("text", { class: "title" }, "账号")
        ]),
        vue.createElementVNode("input", {
          class: "input",
          placeholder: "手机号/邮箱",
          style: { "margin-left": "40rpx" }
        })
      ]),
      vue.createElementVNode("view", { class: "input-item" }, [
        vue.createElementVNode("view", { class: "title-content" }, [
          vue.createElementVNode("text", { class: "title" }, "密码")
        ]),
        vue.createElementVNode("input", {
          class: "input",
          placeholder: "请输入密码",
          style: { "margin-left": "40rpx" }
        })
      ]),
      vue.createElementVNode("view", {
        class: "button",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.login && $options.login(...args))
      }, "登录")
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/uniapp/hello-uniapp/pages/index/index.vue"]]);
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = true;
  const _sfc_main$1 = {
    data() {
      return {
        text: "uni-app",
        voicePath: ""
      };
    },
    onLoad() {
      let self = this;
      recorderManager.onStop(function(res) {
        formatAppLog("log", "at pages/record/record.vue:26", "recorder stop" + JSON.stringify(res));
        self.voicePath = res.tempFilePath;
      });
    },
    methods: {
      startRecord() {
        formatAppLog("log", "at pages/record/record.vue:32", "开始录音");
        recorderManager.start();
      },
      endRecord() {
        formatAppLog("log", "at pages/record/record.vue:37", "录音结束");
        recorderManager.stop();
      },
      playVoice() {
        formatAppLog("log", "at pages/record/record.vue:41", "播放录音" + this.voicePath);
        if (this.voicePath) {
          innerAudioContext.src = this.voicePath;
          innerAudioContext.play();
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.startRecord && $options.startRecord(...args))
      }, "开始录音"),
      vue.createElementVNode("button", {
        onClick: _cache[1] || (_cache[1] = (...args) => $options.endRecord && $options.endRecord(...args))
      }, "停止录音"),
      vue.createElementVNode("button", {
        onClick: _cache[2] || (_cache[2] = (...args) => $options.playVoice && $options.playVoice(...args))
      }, "播放录音")
    ]);
  }
  const PagesRecordRecord = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/uniapp/hello-uniapp/pages/record/record.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/record/record", PagesRecordRecord);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/uniapp/hello-uniapp/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);