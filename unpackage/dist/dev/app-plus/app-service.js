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
      }, "试用")
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/uniapp/hello-uniapp/pages/index/index.vue"]]);
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = true;
  const _sfc_main$1 = {
    data() {
      return {
        text: "test",
        voicePath: "",
        showMicrophone1: false,
        microphoneClass: "icon t-icon t-icon-Microphone",
        microphoneStyle: "font-size: 100rpx",
        recordings: [],
        // 新增一个数组用于存储录音记录
        contacts: [
          { pic: "rogers", badge: 14, name: "Steve Rogers", message: "That is America's ass 🇺🇸🍑" }
          // ... other contacts
        ],
        currentContact: { pic: "stark", name: "Tony Stark", lastSeen: "Today at 12:56" },
        messages: [
          { time: "Today at 11:41", sender: "parker", content: "Hey, man! What's up, Mr Stark? 👋" }
          // ... other messages
        ],
        newMessage: ""
      };
    },
    mounted() {
      uni.$on("newMessage", this.scrollChatToBottom);
    },
    beforeDestroy() {
      uni.$off("newMessage", this.scrollChatToBottom);
    },
    onLoad() {
      let self = this;
      recorderManager.onStop(function(res) {
        formatAppLog("log", "at pages/record/record.vue:92", "recorder stop" + JSON.stringify(res));
        self.voicePath = res.tempFilePath;
        self.recordings.push({
          path: res.tempFilePath,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleString()
        });
      });
    },
    methods: {
      scrollChatToBottom() {
        const chat = this.$refs.chatRef;
        chat.scrollTop = chat.scrollHeight - chat.clientHeight;
      },
      touchStartMicrophone() {
        formatAppLog("log", "at pages/record/record.vue:109", "start");
        this.startRecord();
        this.microphoneClass = "icon t-icon t-icon-Microphone1 big";
      },
      touchEndMicrophone() {
        formatAppLog("log", "at pages/record/record.vue:114", "end");
        this.endRecord();
        this.microphoneClass = "icon t-icon t-icon-Microphone";
      },
      startRecord() {
        formatAppLog("log", "at pages/record/record.vue:119", "开始录音");
        recorderManager.start();
      },
      endRecord() {
        recorderManager.stop();
      },
      playVoice(path) {
        formatAppLog("log", "at pages/record/record.vue:126", "播放录音" + path + "path");
        formatAppLog("log", "at pages/record/record.vue:127", this.recordings);
        innerAudioContext.src = path;
        innerAudioContext.play();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createCommentVNode(" Contacts Section "),
      vue.createElementVNode("view", { class: "center" }, [
        vue.createElementVNode("view", { class: "contacts" }, [
          vue.createElementVNode("text", { class: "fas fa-bars fa-2x" }),
          vue.createElementVNode("text", { class: "contacts-title" }, "Contacts"),
          vue.createCommentVNode(" Contacts List "),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.contacts, (contact, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                class: "contact"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["pic", contact.pic])
                  },
                  null,
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "badge" },
                  vue.toDisplayString(contact.badge),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "name" },
                  vue.toDisplayString(contact.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "message" },
                  vue.toDisplayString(contact.message),
                  1
                  /* TEXT */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createCommentVNode(" Chat Section "),
        vue.createElementVNode("view", { class: "chat" }, [
          vue.createCommentVNode(" Chat Header "),
          vue.createElementVNode("view", { class: "contact bar" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["pic", $data.currentContact.pic])
              },
              null,
              2
              /* CLASS */
            ),
            vue.createElementVNode(
              "view",
              { class: "name" },
              vue.toDisplayString($data.currentContact.name),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "seen" },
              vue.toDisplayString($data.currentContact.lastSeen),
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" Messages Container "),
          vue.createElementVNode(
            "view",
            {
              class: "messages",
              id: "chat",
              ref: "chatRef"
            },
            [
              vue.createCommentVNode(" Messages "),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.messages, (message, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                    vue.createElementVNode(
                      "view",
                      { class: "time" },
                      vue.toDisplayString(message.time),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["message", message.sender])
                      },
                      vue.toDisplayString(message.content),
                      3
                      /* TEXT, CLASS */
                    )
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.createCommentVNode(" Typing Indicator "),
              vue.createElementVNode("view", { class: "message stark" }, [
                vue.createElementVNode("view", { class: "typing typing-1" }),
                vue.createElementVNode("view", { class: "typing typing-2" }),
                vue.createElementVNode("view", { class: "typing typing-3" })
              ])
            ],
            512
            /* NEED_PATCH */
          ),
          vue.createCommentVNode(" Input Area "),
          vue.createElementVNode("view", { class: "input" }, [
            vue.createElementVNode("text", { class: "fas fa-camera" }),
            vue.createElementVNode("text", { class: "far fa-laugh-beam" }),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                placeholder: "Type your message here!",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.newMessage = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.newMessage]
            ]),
            vue.createElementVNode("text", { class: "fas fa-microphone" })
          ])
        ])
      ])
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
