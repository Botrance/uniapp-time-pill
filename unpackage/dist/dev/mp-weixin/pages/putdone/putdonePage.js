"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    let uid = "";
    uid = store_index.store.state.uid;
    console.log(uid);
    return {
      uid
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.uid
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-569124d3"], ["__file", "C:/Users/86187/Desktop/Web/uni-app/time-pill/pages/putdone/putdonePage.vue"]]);
wx.createPage(MiniProgramPage);
