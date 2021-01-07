const state = {
    nm: window.localStorage.getItem('nowNm') || '北京',
    id: window.localStorage.getItem('nowId') || 1,
}

const actions = {

}

const mutations = {
    //修改状态的方法 最好方法名字大写 表示是状态管理方法
    CITY_INFO(state, payload) {
        state.nm = payload.nm;
        state.id = payload.id;
    }
}

export default {
    //namespaced命名空间
    namespaced: true,
    state,
    actions,
    mutations
}