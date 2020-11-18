<template>
  <div class="T_wrapper">
    <headers title="产品详情" @back="goBack"></headers>
    <div class="T_content">
      <van-swipe :autoplay="3000" class="my_swipe" indicator-color="#31CE9D">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" style="width: 100%; height: 100%" />
        </van-swipe-item>
      </van-swipe>
      <div class="T_title">
        <van-skeleton :row="1" title :loading="waiting">
          <p>{{ dataList.title }}</p>
        </van-skeleton>
      </div>
      <div class="T_article">
        <van-skeleton :row="6" title :loading="waiting">
          <div v-html="dataList.richText"></div>
        </van-skeleton>
      </div>
      <div class="T_bottom">
        <van-skeleton :row="3" row-width="50%" :loading="waiting">
          <p class="b_p1"><span></span>相关视频</p>
          <div class="b_div">
            <ul>
              <li v-for="(item, index) in videos" :key="index">
                <!-- <img class="img2" src="../assets/t2.png" alt="" /> -->
                <video
                  controls
                  :poster="item.cover"
                  class="img1"
                  :src="item.video"
                ></video>
                <p>{{ item.title }}</p>
              </li>
            </ul>
          </div>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header/Header";
import { nativeGoBack } from "@/utils/NativeMethod";
import { productDetail } from "@/api/port.js";
export default {
  data() {
    return {
      deviceType: "",
      waiting: true,
      images: [],
      videos: [],
      id: this.$route.query.id,
      dataList: {},
    };
  },
  components: {
    headers,
  },
  methods: {
    goBack() {
      nativeGoBack(this.deviceType);
    },
    getList() {
      productDetail({
        id: this.id,
      })
        .then((res) => {
          console.log(res);
          this.dataList = res.data;
          this.images = this.dataList.media;
          this.videos = this.dataList.videos;
          this.$nextTick(() => {
               this.waiting = false;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.T_wrapper {
  height: 100vh;
  background: #f9f9f9;
  position: relative;
  .T_content {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
    .my_swipe {
      height: 420px;
      img {
        height: 420px;
      }
    }
    .T_title {
      padding: 40px 30px;
      background: #fff;
      font-size: 32px;
      color: #333333;
      font-weight: bold;
    }
    .T_article {
      margin-top: 20px;
      background: #fff;
      padding: 30px;
    }
    .T_bottom {
      padding: 30px;
      background: #fff;
      .b_p1 {
        height: 40px;
        line-height: 40px;
        span {
          width: 5px;
          height: 26px;
          display: inline-block;
          background: #31ce9d;
          border-radius: 0px 100px 100px;
          margin-right: 15px;
        }
      }
      .b_div {
        margin-top: 30px;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 46%;
            margin: 0 2% 20px 2%;
            position: relative;
            .img1 {
              width: 100%;
              height: 190px;
            }
            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .img2 {
              position: absolute;
              top: 40%;
              left: 50%;
              width: 60px;
              height: 60px;
              margin-top: -30px;
              margin-left: -30px;
            }
          }
        }
      }
    }
  }
}
</style>