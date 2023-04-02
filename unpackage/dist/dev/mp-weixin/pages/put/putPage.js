"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    const nowTime = common_vendor.dayjs().format("YYYY-MM-DD HH:mm:ss");
    const pill = common_vendor.reactive({ uid: "", name: "", email: "", time: nowTime, content: "", info: "" });
    const pillErr = common_vendor.reactive({ name: "", email: "", time: "", content: "", error: "no" });
    console.log(store_index.store.state.uid);
    function errCheck() {
      const emailCk = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      const timeCk = /^(\d{4})(-)(\d{1,2})(-)(\d{1,2}) (\d{1,2})(:)(\d{1,2})(:)(\d{1,2})$/;
      pillErr.name = "";
      pillErr.email = "";
      pillErr.time = "";
      pillErr.content = "";
      pillErr.error = "no";
      if (pill.name === "") {
        pillErr.name = "blank";
        pillErr.error = "yes";
      }
      if (pill.email === "") {
        pillErr.email = "blank";
        pillErr.error = "yes";
      } else if (!emailCk.test(pill.email)) {
        pillErr.email = "style";
        pillErr.error = "yes";
      }
      if (pill.time === "") {
        pillErr.time = "blank";
        pillErr.error = "yes";
      } else if (!timeCk.test(pill.time)) {
        pillErr.time = "style";
        pillErr.error = "yes";
      } else if (timeCk.test(pill.time)) {
        timeCheck(pill.time);
      }
      if (pill.content === "") {
        pillErr.content = "blank";
        pillErr.error = "yes";
      }
    }
    function timeCheck(value) {
      let days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let otime = value.split(" ");
      let date = otime[0].split("-");
      let time = otime[1].split(":");
      let year = parseInt(date[0], 10);
      let month = parseInt(date[1], 10);
      let day = parseInt(date[2], 10);
      let hour = parseInt(time[0], 10);
      let minute = parseInt(time[1], 10);
      let second = parseInt(time[2], 10);
      console.log(year, month, day, hour, minute, second);
      if (month > 12 || month < 1 || year > 9999 || year <= 0) {
        pillErr.time = "style";
        pillErr.error = "yes";
      }
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
        days[2] = 29;
      if (day > days[month]) {
        pillErr.time = "style";
        pillErr.error = "yes";
      }
      if (hour >= 24 || hour < 0 || minute >= 60 || minute < 0 || second >= 60 || second < 0) {
        pillErr.time = "style";
        pillErr.error = "yes";
      }
    }
    function uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    }
    function putPill() {
      errCheck();
      if (pillErr.error === "yes") {
        console.log(pillErr);
        return;
      }
      let uid = uuid();
      pill.uid = uid;
      console.log(pill);
      common_vendor.index.setStorage({
        key: pill.uid,
        data: JSON.stringify(pill),
        success: function() {
          console.log(common_vendor.index.getStorageInfoSync().keys);
          store_index.store.commit("setUid", pill.uid);
          common_vendor.index.redirectTo({
            url: "/pages/putdone/putdonePage"
          });
        }
      });
    }
    function clear() {
      common_vendor.index.clearStorageSync();
    }
    return {
      pill,
      pillErr,
      putPill,
      clear
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.pillErr.name === "blank"
  }, _ctx.pillErr.name === "blank" ? {} : {}, {
    b: _ctx.pill.name,
    c: common_vendor.o(($event) => _ctx.pill.name = $event.detail.value),
    d: _ctx.pillErr.email === "blank"
  }, _ctx.pillErr.email === "blank" ? {} : {}, {
    e: _ctx.pillErr.email === "style"
  }, _ctx.pillErr.email === "style" ? {} : {}, {
    f: _ctx.pill.email,
    g: common_vendor.o(($event) => _ctx.pill.email = $event.detail.value),
    h: _ctx.pillErr.time === "blank"
  }, _ctx.pillErr.time === "blank" ? {} : {}, {
    i: _ctx.pillErr.time === "style"
  }, _ctx.pillErr.time === "style" ? {} : {}, {
    j: _ctx.pill.time,
    k: common_vendor.o(($event) => _ctx.pill.time = $event.detail.value),
    l: _ctx.pillErr.content === "blank"
  }, _ctx.pillErr.content === "blank" ? {} : {}, {
    m: _ctx.pill.content,
    n: common_vendor.o(($event) => _ctx.pill.content = $event.detail.value),
    o: _ctx.pill.info,
    p: common_vendor.o(($event) => _ctx.pill.info = $event.detail.value),
    q: common_vendor.o((...args) => _ctx.putPill && _ctx.putPill(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eb874f52"], ["__file", "C:/Users/86187/Desktop/Web/uni-app/time-pill/pages/put/putPage.vue"]]);
wx.createPage(MiniProgramPage);
