<template>
  <div class="T_wrapper">
    <headers
      title="课程详情"
      @back="goBack"
      :isRight="true"
      @save="share"
    ></headers>
    <div class="T_content">
      <div class="banner">
        <van-image
          width="100%"
          class="banner_img"
          lazy-load
          :src="dataList.headimg"
        />
      </div>
      <div class="T_article">
        <van-skeleton :row="3" title :loading="waiting">
          <h1>{{ dataList.title }}</h1>
          <p>
            {{ dataList.summary }}
          </p>
        </van-skeleton>
      </div>
      <van-skeleton :row="3" :loading="waiting">
        <div class="T_html" v-html="dataList.richText"></div>
      </van-skeleton>
      <div class="doctor">
        <van-skeleton :row="3" avatar :loading="waiting">
          <ul>
            <li v-for="(item, index) in dataList.teacher" :key="index">
              <img :src="item.avatarUrl" alt="" />
              <div>
                <h3>{{ item.name }}</h3>
                <p class="p1">{{ item.company }}</p>
                <p class="p2">
                  {{ item.summary }}
                </p>
              </div>
            </li>
          </ul>
        </van-skeleton>
      </div>
      <van-skeleton :row="3" :loading="waiting">
        <div class="rejister">
          <div class="tab">
            <van-tabs type="card" color="#31CE9D" title-active-color="#fff">
              <van-tab title="现场课报名"></van-tab>
              <van-tab title="同步直播报名"></van-tab>
            </van-tabs>
          </div>
          <div class="content">
            <div>
              <p><span>课程题目</span> {{ dataList.title }}</p>
            </div>
            <div>
              <p>
                <span>主讲嘉宾</span>
                <b
                  style="font-weight: nomal; padding-right: 10px"
                  v-for="(item, index) in dataList.teacher"
                  :key="index"
                  >{{ item.name }}</b
                >
              </p>
            </div>
            <div>
              <p><span>招生人数</span> {{ dataList.maxQuota }}</p>
            </div>
            <div>
              <p><span>开课城市</span> {{ dataList.startCity }}</p>
            </div>
            <div>
              <p><span>详细地址</span> {{ startAddress.addr }}</p>
            </div>
            <div>
              <p><span>开课日期</span> {{ dataList.startTime }}</p>
            </div>
            <div>
              <p><span>注册费</span> &yen;{{ dataList.currencyPrice }}</p>
            </div>
            <span class="zhuce">立即注册</span>
          </div>
          <div style="background: #fff; width: 100%; height: 30px"></div>
        </div>
      </van-skeleton>
    </div>
    <div class="bottom">
      <van-skeleton :row="2" title :loading="waiting">
        <div>
          <van-icon name="like-o" class="icons" />
          <span>想学</span>
        </div>
        <p>电话咨询</p>
      </van-skeleton>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header/Header";
import { nativeGoBack } from "@/utils/NativeMethod";
import { courseDetail } from "@/api/port.js";
export default {
  data() {
    return {
      deviceType: "",
      active: 1,
      waiting: true,
      value: 5,
      id: this.$route.query.id,
      token: this.$route.query.token,
      dataList: {
        teacher: [],
        startAddress: {
          addr: "",
        },
      },
      startAddress: {},
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
    getList() {
      courseDetail({
        id: this.id,
        token: this.token,
      })
        .then((res) => {
          console.log(res);
          this.dataList = res.data;
          this.startAddress = this.dataList.startAddress || {};
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
    top: 90px;
    bottom: 90px;
    left: 0;
    right: 0;
    overflow-y: scroll;
    .banner {
      position: relative;
      .banner_img {
        height: 420px;
      }
    }
    .T_html {
      background: #fff;
      padding: 40px 30px;
      margin-top: 30px;
    }
    .T_article {
      background: #fff;
      padding: 40px 30px;
      h1 {
        font-size: 30px;
        color: #000000;
        font-weight: bold;
        margin-bottom: 30px;
      }
    }
    .rejister {
      background: #fff;
      padding-top: 30px;
      .tab {
        width: 70%;
        margin: 30px auto;
      }
      .content {
        margin: 30px 30px 0 30px;
        background: #f9f9f9;
        padding: 30px;
        border-radius: 5px;
        .zhuce {
          background: #ED6D34;
          color: #fff;
          font-size: 30px;
          display: inline-block;
          padding: 0px 30px;
          height: 66px;
          line-height: 70px;
          border-radius: 10px;
          margin-left: 70%;
        }
        p {
          font-size: 24px;
          padding-bottom: 30px;
          color: #666666;
          span {
            font-size: 24px;
            width: 100px;
            color: #000000;
            display: inline-block;
            font-weight: bold;
            margin-right: 30px;
          }
        }
      }
    }
    .doctor {
      ul {
        li {
          display: flex;
          height: 240px;
          padding: 30px;
          img {
            width: 240px;
            height: 240px;
            margin-right: 30px;
          }
          div {
            h3 {
              font-size: 30px;
              color: #000000;
              font-weight: bold;
            }
            .p1 {
              font-size: 26px;
              color: #333333;
              margin-top: 20px;
            }
            .p2 {
              margin-top: 30px;
              font-size: 26px;
              color: #666666;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 90px;
    line-height: 90px;
    border-top: 1px solid #ebebeb;
    right: 0;
    display: flex;
    overflow: hidden;
    div {
      flex: 2;
      text-align: center;
      position: relative;
      .icons {
        display: block;
        font-size: 40px;
        padding-top: 2px;
      }
      span {
        font-size: 20px;
        color: #666;
        transform: scale(0.9);
        display: inline-block;
        position: absolute;
        bottom: 50px;
        left: 50%;
        top: 65%;
        transform: translate(-50%, -50%);
        line-height: 1;
        left: ;
      }
    }
    p {
      background: #31ce9d;
      font-size: 30px;
      color: #fff;
      text-align: center;
      flex: 9;
    }
  }
}
</style>