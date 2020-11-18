<template>
  <div class="T_wrapper">
    <headers
      title="详情"
      @back="goBack"
      :isRight="true"
      @save="share"
    ></headers>
    <div class="T_content">
      <video
        v-if="dataList.video"
        class="video"
        :src="dataList.video"
        controls
        :poster="dataList.cover"
      ></video>
      <div class="T_top">
        <van-skeleton :row="3" title :loading="waiting">
          <h5>{{ dataList.title }}</h5>
          <p class="p1">
            {{ dataList.summary }}
          </p>
          <p class="p2">
            <span class="s1">{{ dataList.readCount }}次阅读</span
            ><span class="s2">{{ dataList.publishTime }}</span
            >发布
          </p>
        </van-skeleton>
      </div>
      <div class="T_article">
        <van-skeleton :row="6" title :loading="waiting">
          <div v-html="dataList.richText"></div>
        </van-skeleton>
      </div>
      <div class="T_sc">
        <van-skeleton :row="3" :loading="waiting">
          <div class="sc_1" @click="loveTH">
            <van-icon class="img" name="star-o" />
            <p>
              收藏<span>({{ dataList.collectCount }})</span>
            </p>
          </div>
        </van-skeleton>
      </div>
      <div class="T_bottom">
        <van-skeleton :row="3" :loading="waiting">
          <ul>
            <li v-for="(item, index) in hotList" :key="index">
              <video
                controls
                v-if="item.video"
                :poster="item.cover"
                class="img"
                :src="item.video"
                alt=""
              />
              <img v-else class="img" :src="item.media" alt="" />
              <div class="T_b1">
                <h2>{{ item.title }}</h2>
                <p class="T_b1_p1">{{ item.summary }}</p>
                <div class="T_b1_d1">
                  <p class="T_b1_p2">
                    <img src="../assets/t5.png" alt="" />{{ item.readCount }}
                  </p>
                  <p class="T_b1_p3">
                    <van-icon class="s1" name="star-o" />{{ item.collectCount }}
                  </p>
                  <p class="T_b1_p4">
                    <van-icon class="s1" name="clock-o" />{{
                      item.publishTime.substring(0, 10)
                    }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </van-skeleton>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header/Header";
import { nativeGoBack } from "@/utils/NativeMethod";
import {
  informationDetail,
  informationHot,
  informationCheck,
  informationCollect,
} from "@/api/port.js";
export default {
  data() {
    return {
      deviceType: this.$route.query.deviceType,
      dataList: {},
      id: this.$route.query.id,
      token: this.$route.query.token,
      waiting: true,
      hotList: [],
    };
  },
  components: {
    headers,
  },
  methods: {
    goBack() {
      nativeGoBack(this.deviceType);
    },
    share() {
      console.log("share");
    },
    loveTH() {
      informationCollect({
        id: this.id,
        token: this.token,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    check() {
      informationCheck({
        id: this.id,
        token: this.token,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getList() {
      informationDetail({
        id: this.id,
        token: this.token,
      })
        .then((res) => {
          this.dataList = res.data;
          this.$nextTick(() => {
               this.waiting = false;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    informationHot() {
      informationHot({
        id: this.id,
        limit: 3,
        pageIndex: 1,
        token: this.token,
      })
        .then((res) => {
          console.log(res);
          this.hotList = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getList();
    this.informationHot();
    this.check();
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
    .video {
      width: 100%;
      height: 420px;
    }
    .T_top {
      background: #fff;
      padding: 30px;
      h5 {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 30px;
        color: #000000;
      }
      .p1 {
        font-size: 24px;
        color: #666666;
        line-height: 48px;
      }
      .p2 {
        font-size: 20px;
        color: #999999;
        text-align: right;
        margin-top: 20px;
        .s1 {
          margin-right: 40px;
        }
      }
    }
    .T_article {
      margin-top: 20px;
      background: #fff;
      padding: 30px;
    }
    .T_sc {
      padding-top: 80px;
      background: #fff;
      padding-bottom: 20px;
      .sc_1 {
        background: #31ce9d;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        text-align: center;
        margin: 0 auto;
        box-shadow: 0px 5px 3px rgba(49, 206, 157, 0.4);
        .img {
          width: 35px;
          color: #fff;
          height: 34px;
          font-size: 34px;
          margin: 20px auto 0px auto;
          display: inline-block;
        }
        p {
          font-size: 14px;
          color: #fff;
          transform: scale(0.9);
        }
      }
    }
    .T_bottom {
      background: #fff;
      margin-top: 20px;
      padding: 0 30px;
      ul {
        li {
          display: flex;
          height: 210px;
          overflow: hidden;
          padding: 30px 0;
          border-bottom: 1px solid #ebebeb;
          .img {
            width: 250px;
            height: 210px;
            margin-right: 40px;
          }
          .T_b1 {
            display: flex;
            width: 410px;
            flex-direction: column;
            h2 {
              font-size: 28px;
              color: #000;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .T_b1_p1 {
              background: #f9f9f9;
              margin-top: 30px;
              font-size: 22px;
              color: #999999;
              height: 46px;
              line-height: 46px;
              padding: 0 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .T_b1_d1 {
              display: flex;
              margin-top: auto;
              align-items: center;
              .T_b1_p2 {
                font-size: 20px;
                margin-right: 40px;
                color: #999999;
                img {
                  width: 22px;
                  height: 16px;
                  margin-right: 10px;
                }
              }
              .T_b1_p3 {
                font-size: 20px;
                margin-right: 40px;
                color: #999999;
                .s1 {
                  margin-right: 10px;
                  vertical-align: -2px;
                }
              }
              .T_b1_p4 {
                font-size: 20px;
                color: #999999;
                .s1 {
                  margin-right: 10px;
                  vertical-align: -2px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>