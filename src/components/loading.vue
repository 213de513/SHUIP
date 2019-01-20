<template>
<div id='loading'>
    <img src="@/assets/images/loading-spinning-bubbles.svg" alt="">
</div>
</template>


<style lang='less'>
  #loading{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.6);
      z-index: 12345678;
      img{
          display: block;
          height: 100px;
          width: 100px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -50px;
          margin-top: -50px;
      }
  }
</style>
