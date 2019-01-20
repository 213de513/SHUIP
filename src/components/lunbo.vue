<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="@/assets/images/ad1.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/ad2.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="@/assets/images/ad3.jpg" alt="">
      </div>
    </div>
    <div class="swiper-button-prev"></div><!--左箭头-->
    <div class="swiper-button-next"></div><!--右箭头-->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
export default {
  data(){
    return {
    }
  },
  methods:{},
  mounted(){
    var mySwiper = new Swiper('.swiper-container', {
          effect : 'fade',//fade效果
          speed:1000,
          simulateTouch : false,//pc端触摸失效
          autoplay:true,
          loop:true,
          pagination: {
            el: '.swiper-pagination', //dot小圆点
          },
          navigation: {
            nextEl: '.swiper-button-next',//左右按钮
            prevEl: '.swiper-button-prev',
          },
        })
  }
}
</script>
<style lang="less" scoped>
.swiper-container{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
  img{
    height: 100%;
    width: 100%;
  }
}
  .el-carousel__item:nth-child(2n) {
     background-color: #f60;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

</style>