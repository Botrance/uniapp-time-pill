import { createStore } from 'vuex'
const store = createStore({
	state:{//存放状态
		uid:''
	},
	mutations: {
			setUid(state,uid) {
				// 变更状态
				state.uid = uid
			}
		}
})
export default store
