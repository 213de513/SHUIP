import  Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
export default new vuex.Store({
    state:{
        form:{
            college:'all',//学院
            grade:'all',//年级
            discipline:'all',//专业
            year:[],
            start:'all',//起始时间
            end:'all'//结束时间
            
        },
        showLoading:false
    },
    mutations:{
        changeForm(state,form){
            state.form = form;
        },
        pPost(state){
            console.log(state.form);
        }
    },
    actions:{
        ajax({commit,state}){
            state.showLoading = true;
            setTimeout(() => {
                state.showLoading = false;
                commit('pPost');
            }, 1500);
        }
    }
})
