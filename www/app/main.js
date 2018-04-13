import  Vue from "vue";
// 引入vuex
import Vuex from "vuex";
import app from "./app.vue";
import createLogger from "../logger/logger.js";
Vue.use(Vuex);
// 创建一个仓库
const store = new Vuex.Store({
    state:{
        nowedit:0
    },
    mutations:{
        changeNowEdit(state,{nowedit}){
            state.nowedit = nowedit;
        }
    },
    plugins: [createLogger()]
});

new Vue({
    el:"#app",
    // 将store注入到全局
    store,
    components:{
        app
    }
});

