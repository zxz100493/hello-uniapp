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
        voicePath: "",
        showMicrophone1: false
      };
    },
    onLoad() {
      let self = this;
      recorderManager.onStop(function(res) {
        formatAppLog("log", "at pages/record/record.vue:38", "recorder stop" + JSON.stringify(res));
        self.voicePath = res.tempFilePath;
      });
    },
    methods: {
      toggleMicrophone() {
        this.showMicrophone1 = !this.showMicrophone1;
      },
      startRecord() {
        formatAppLog("log", "at pages/record/record.vue:47", "开始录音");
        recorderManager.start();
      },
      endRecord() {
        formatAppLog("log", "at pages/record/record.vue:52", "录音结束");
        recorderManager.stop();
      },
      playVoice() {
        formatAppLog("log", "at pages/record/record.vue:56", "播放录音" + this.voicePath);
        if (this.voicePath) {
          innerAudioContext.src = this.voicePath;
          innerAudioContext.play();
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "main" }, [
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.startRecord && $options.startRecord(...args))
      }),
      vue.createElementVNode(
        "div",
        {
          class: "icon-container",
          onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.toggleMicrophone1 && _ctx.toggleMicrophone1(...args)),
          onTouchend: _cache[2] || (_cache[2] = (...args) => _ctx.toggleMicrophone1 && _ctx.toggleMicrophone1(...args))
        },
        [
          !$data.showMicrophone1 ? (vue.openBlock(), vue.createElementBlock("svg", {
            key: 0,
            class: "icon",
            "aria-hidden": "true"
          }, [
            vue.createElementVNode("use", { "xlink:href": "#icon-Microphone" })
          ])) : vue.createCommentVNode("v-if", true)
        ],
        32
        /* HYDRATE_EVENTS */
      ),
      $data.showMicrophone1 ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: "icon"
      }, [
        (vue.openBlock(), vue.createElementBlock("svg", {
          class: "icon-Microphone1",
          "aria-hidden": "true"
        }, [
          vue.createElementVNode("use", { "xlink:href": "#icon-Microphone1" })
        ])),
        vue.createElementVNode("div", { class: "circle-animation" })
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(' <button @tap="endRecord">停止录音</button>\r\n		<button @tap="playVoice">播放录音</button> ')
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
  window._iconfont_svg_string_4362048 = '<svg><symbol id="icon-Microphone" viewBox="0 0 1024 1024"><path d="M843 477.9v-99.45a31.69 31.69 0 0 0-63.39 0v99.45a266.82 266.82 0 0 1-19.92 102.31c-14.07 32.95-34.38 63-58.76 86.89A265.49 265.49 0 0 1 512 745.73a267.37 267.37 0 0 1-102.3-20.38c-31.91-13.27-61.21-32.87-87.11-58.25a273.26 273.26 0 0 1-58.25-86.88 266.43 266.43 0 0 1-19.96-102.32v-99.45a31.68 31.68 0 0 0-63.36 0v99.45c0 44.75 8.45 87.41 25.11 126.81a329.79 329.79 0 0 0 71.7 107.08 335.85 335.85 0 0 0 107.57 72 339.72 339.72 0 0 0 92.19 23.38l2.7 0.29v88.95H306c-17.32 0-31.41 14.32-31.41 31.91A31.59 31.59 0 0 0 306 960h411.75a31.8 31.8 0 0 0 0-63.61H543.43v-89l2.72-0.27c74.87-7.5 145.72-41.36 199.48-95.35 30.64-29.66 55-65.68 72.48-107.09A338 338 0 0 0 843 477.9z" fill="#E71F19" ></path><path d="M512 64c-57 0-111 22.41-152 63.09A212.79 212.79 0 0 0 296.7 279v198.9c0 55.94 21.9 109.21 61.66 150l0.12 0.13 1.63 1.88A214.77 214.77 0 0 0 658.84 635h-0.3l5.12-5.15C704.52 588.72 727 534.76 727 477.9V279a214.35 214.35 0 0 0-62.86-152C623 86.41 569 64 512 64z m151.41 296.81h-68a17.65 17.65 0 0 0-17.63 17.63c0 9.84 8.07 18.15 17.63 18.15h68v66.83h-68a18 18 0 0 0-17.63 17.89 17.58 17.58 0 0 0 17.63 17.91h66.83l-0.58 3.51c-5.09 30.83-19.75 59.39-42.39 82.6l-0.89 0.91h-0.3a151.84 151.84 0 0 1-213.29-0.88l-1.49-1.48a153.21 153.21 0 0 1-41.2-81.15l-0.59-3.52h66.79a17.7 17.7 0 0 0 17.88-17.91 18.13 18.13 0 0 0-17.88-17.89h-68V396.6h68a18 18 0 0 0 17.88-18.15 17.57 17.57 0 0 0-17.88-17.63h-68v-67.36h68a17.77 17.77 0 1 0 0-35.54h-66.83l0.61-3.53A156 156 0 0 1 404.75 172a151.92 151.92 0 0 1 256.9 82.34l0.61 3.53H595.4a17.77 17.77 0 0 0 0 35.54h68z" fill="#E71F19" ></path></symbol><symbol id="icon-microphone" viewBox="0 0 1024 1024"><path d="M873.84 364c-16.64 0-30.144 13.432-30.144 30V424h-60.312V274C783.384 124.928 662.224 0 512 0c-72.488 0-140.752 29.024-192.144 81.328-51.096 52.008-79.24 120.432-79.24 192.672V424H180.304v-30c0-16.568-13.496-30-30.152-30C133.504 364 120 377.432 120 394v120c0 204.96 159.728 373.488 361.84 388.856v61.144H391.392c-16.656 0-30.16 13.432-30.16 30 0 16.568 13.504 30 30.16 30h241.232c16.656 0 30.16-13.432 30.16-30 0-16.568-13.504-30-30.16-30H542.152v-61.144C744.272 887.488 904 718.96 904 514v-120c0-16.568-13.504-30-30.16-30zM300.928 424h90.464c16.656 0 30.16-13.432 30.16-30 0-16.568-13.504-30-30.16-30H300.92V304h90.464c16.656 0 30.16-13.432 30.16-30 0-16.568-13.504-30-30.16-30H303.008a214.656 214.656 0 0 1 58.224-119.6V152c0 16.568 13.496 30 30.16 30 16.64 0 30.144-13.432 30.144-30v-71.328a207.312 207.312 0 0 1 60.312-18.48V152c0 16.568 13.496 30 30.152 30s30.16-13.432 30.16-30V62.192a207.192 207.192 0 0 1 60.304 18.48V152c0 16.568 13.496 30 30.152 30s30.16-13.432 30.16-30v-27.6a214.656 214.656 0 0 1 58.216 119.6H632.616c-16.656 0-30.16 13.432-30.16 30 0 16.568 13.504 30 30.16 30h90.464v60H632.616c-16.656 0-30.16 13.432-30.16 30 0 16.568 13.504 30 30.16 30h90.464v60H632.616c-16.656 0-30.16 13.432-30.16 30 0 16.568 13.504 29.8 30.16 29.8h88.296a209.704 209.704 0 0 1-58.144 117.008V634c0-16.568-13.496-30-30.16-30-16.64 0-30.144 13.432-30.144 30v69.712a210.168 210.168 0 0 1-60.312 18.136V634c0-16.568-13.496-30-30.152-30s-30.16 13.432-30.16 30v87.848a210.112 210.112 0 0 1-60.304-18.136V634c0-16.568-13.496-30-30.152-30s-30.16 13.432-30.16 30v26.808C330.608 629.68 309.616 589.136 303.096 544h88.296c16.656 0 30.16-13.432 30.16-30 0-16.568-13.504-30-30.16-30H300.92V424z m542.776 90c0 181.96-148.8 330-331.696 330-182.896 0-331.696-148.04-331.696-330V484h60.312v30C240.616 662.856 362.4 784 512 784c149.552 0 271.384-121.096 271.384-270V484h60.312v30zM512 424c-16.656 0-30.16-13.432-30.16-30 0-16.568 13.504-30 30.16-30s30.16 13.432 30.16 30c0 16.568-13.504 30-30.16 30z" fill="#20A0FF" ></path></symbol><symbol id="icon-Microphone1" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FFC0C0" ></path><path d="M512 605.090909a116.363636 116.363636 0 0 0 116.363636-116.363636V256a116.363636 116.363636 0 0 0-232.727272 0v232.727273a116.363636 116.363636 0 0 0 116.363636 116.363636z" fill="#FF4848" ></path><path d="M674.909091 442.181818v40.96a166.632727 166.632727 0 0 1-141.498182 167.330909A162.909091 162.909091 0 0 1 349.090909 488.727273v-46.545455a23.272727 23.272727 0 0 0-23.272727-23.272727 23.272727 23.272727 0 0 0-23.272727 23.272727v46.545455a209.454545 209.454545 0 0 0 195.025454 209.454545v93.090909h-69.818182a23.272727 23.272727 0 0 0-23.272727 23.272728 23.272727 23.272727 0 0 0 23.272727 23.272727h186.181818a23.272727 23.272727 0 0 0 23.272728-23.272727 23.272727 23.272727 0 0 0-23.272728-23.272728h-69.818181v-95.883636A209.454545 209.454545 0 0 0 721.454545 488.727273v-46.545455a23.272727 23.272727 0 0 0-23.272727-23.272727 23.272727 23.272727 0 0 0-23.272727 23.272727z" fill="#FF4848" ></path></symbol></svg>', function(a) {
    var t = (t = document.getElementsByTagName("script"))[t.length - 1], e = t.getAttribute("data-injectcss"), t = t.getAttribute("data-disable-injectsvg");
    if (!t) {
      var n, c, o, i, l, h = function(t2, e2) {
        e2.parentNode.insertBefore(t2, e2);
      };
      if (e && !a.__iconfont__svg__cssinject__) {
        a.__iconfont__svg__cssinject__ = true;
        try {
          document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
        } catch (t2) {
          console && formatAppLog("log", "at common/iconfont.js:1", t2);
        }
      }
      n = function() {
        var t2, e2 = document.createElement("div");
        e2.innerHTML = a._iconfont_svg_string_4362048, (e2 = e2.getElementsByTagName("svg")[0]) && (e2.setAttribute("aria-hidden", "true"), e2.style.position = "absolute", e2.style.width = 0, e2.style.height = 0, e2.style.overflow = "hidden", e2 = e2, (t2 = document.body).firstChild ? h(e2, t2.firstChild) : t2.appendChild(e2));
      }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(n, 0) : (c = function() {
        document.removeEventListener("DOMContentLoaded", c, false), n();
      }, document.addEventListener("DOMContentLoaded", c, false)) : document.attachEvent && (o = n, i = a.document, l = false, s(), i.onreadystatechange = function() {
        "complete" == i.readyState && (i.onreadystatechange = null, d());
      });
    }
    function d() {
      l || (l = true, o());
    }
    function s() {
      try {
        i.documentElement.doScroll("left");
      } catch (t2) {
        return void setTimeout(s, 50);
      }
      d();
    }
  }(window);
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
