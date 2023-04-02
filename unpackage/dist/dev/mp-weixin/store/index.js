"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    //存放状态
    uid: ""
  },
  mutations: {
    setUid(state, uid) {
      state.uid = uid;
    }
  }
});
exports.store = store;
