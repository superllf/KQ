<template>
  <div class="T_wrapper">
    <div class="T_content">
       
      <div class="T_article">
        <img src="../assets/t2.png" alt="" class="img4">
        <p class="p1">乔沃维奇 邀请您一起看直播</p>
        <p class="p2">浅谈正畸中稳定的踝骨位置与 垂直向控制</p>
        <img class="img2" src="../assets/live.png" alt="">
        <p class="p1">扫码查看此课程</p>
        <img class="img3" src="../assets/ew.png" alt="">
        <p class="p1">来自「TDEC泰克莱恩口腔教育中心」</p>
        <p class="p5">小鹅通提供技术支持</p>
      </div>
      
      
    </div>
    <p class="p6"><img src="../assets/zw.png" alt="">长按上方图片保存到相册</p>
    
  </div>
</template>
<script>
import headerC from "@/components/header/Header";
import { nativeGoBack } from "@/utils/NativeMethod";
export default {
  data() {
    return {
        deviceType:""
    };
  },
  components: {
    headerC,
  },

  methods: {
    goBack() {
      nativeGoBack(this.deviceType);
    },
  },
  mounted() {
    this.deviceType = this.$route.query.deviceType;
  },
};
</script>
<style lang="less" scoped>
.T_wrapper {
  height: 100vh;
  background: #f9f9f9;
  position: relative;
  .p6{
    position: absolute;
    bottom:30px;
    left: 0;
    right: 0;
    img{
      width: 40px;
      height: 40px;
      padding-right: 10px;
      display: inline;
    }
    text-align: center;
    color: #000000;
    font-size: 28px;
  }
  .T_content {
    position: absolute;
    top: 50px;
    bottom: 150px;
    left: 60px;
    right: 60px;
    overflow-y: scroll;
    background: url(../assets/bg.png) no-repeat center;
    background-size: 100% 100%;
    .img1{
      width: 100%;
      position: absolute;
      height: 100%;
    }
    .T_article{
      margin: 119px 30px 0 30px;
      border-radius: 10px;
      background: #fff;
      padding:0 60px 50px 60px;
      text-align: center;
      .img4{
        margin-top: -40px;
        width: 80px;
        height: 80px;
        text-align: center;
        display: inline-block;
      }
      .p1{
        color: #666;
        font-size: 26px;
        margin:20px;
      }
      .p2{
        font-size: 30px;
        color: #000000;
        margin:30px;
      }
      .img2{
        margin-top: 30px;
        width: 300px;
        height: 180px;
        text-align: center;
        display: inline-block;
      }
      .img3{
        width: 180px;
        height: 180px;
        text-align: center;
        display: inline-block;
      }
    }
    .p5{
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 26px;
      color:#FFFFFF;
    }
  }
}
</style>