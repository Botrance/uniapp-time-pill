"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    const pill = common_vendor.reactive({ uid: "", name: "", email: "", time: "", content: "", info: "" });
    const uid = common_vendor.ref("");
    const timeGap = common_vendor.ref(0);
    const timeOver = common_vendor.ref("no");
    const nowTime = common_vendor.dayjs().format("YYYY-MM-DD HH:mm:ss");
    function openPill() {
      console.log(uid.value);
      let pre_pill = common_vendor.index.getStorageSync(uid.value);
      if (pre_pill) {
        let data = JSON.parse(pre_pill);
        pill.uid = data.uid;
        pill.name = data.name;
        pill.email = data.email;
        pill.time = data.time;
        pill.content = data.content;
        pill.info = data.info;
        timeGap.value = common_vendor.dayjs(pill.time).unix() - common_vendor.dayjs(nowTime).unix();
        timeOver.value = timeGap.value >= 0 ? "no" : "yes";
      }
    }
    return {
      pill,
      uid,
      openPill,
      timeOver,
      timeGap
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.uid,
    b: common_vendor.o(($event) => _ctx.uid = $event.detail.value),
    c: common_vendor.o((...args) => _ctx.openPill && _ctx.openPill(...args)),
    d: _ctx.pill.uid !== ""
  }, _ctx.pill.uid !== "" ? common_vendor.e({
    e: _ctx.timeOver === "yes"
  }, _ctx.timeOver === "yes" ? {
    f: common_vendor.t(_ctx.pill.name),
    g: common_vendor.t(_ctx.pill.time)
  } : {}, {
    h: _ctx.timeOver === "no"
  }, _ctx.timeOver === "no" ? {} : {}, {
    i: _ctx.timeOver === "no"
  }, _ctx.timeOver === "no" ? {
    j: common_vendor.t(_ctx.pill.time),
    k: common_vendor.t(_ctx.timeGap)
  } : {}, {
    l: _ctx.timeOver === "yes"
  }, _ctx.timeOver === "yes" ? {
    m: common_vendor.t(_ctx.pill.content)
  } : {}, {
    n: _ctx.timeOver === "no"
  }, _ctx.timeOver === "no" ? {
    o: common_vendor.t(_ctx.pill.name),
    p: common_vendor.t(_ctx.pill.content)
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6c71446c"], ["__file", "C:/Users/86187/Desktop/Web/uni-app/time-pill/pages/open/openPage.vue"]]);
wx.createPage(MiniProgramPage);
