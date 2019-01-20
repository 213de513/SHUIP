<template>
  <div class="index">
      <lun-bo id='lb'></lun-bo>   
  </div>
</template>

<script>
import lunBo from '@/components/lunbo.vue'
export default {
  data(){
    return {
    }
  },
  methods:{},
  components:{
      lunBo
  }
}
</script>
<style lang="less" scoped>
    .index{
        position: absolute;
        left: 0;
        right: 0;
        top: 120px;
        background-color: #f1f4f7;
        bottom: 0;
        z-index: 999
    }
    @media screen and (max-width:1550px) {
        .index{
        position: absolute;
        left: 0;
        right: 0;
        top: 81px;
        background-color: #f1f4f7;
        bottom: 0;
    }
    }
</style>