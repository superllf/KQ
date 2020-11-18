<template>
  <div class="T_wrapper">
    <headers
      title="直播详情"
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
        <div class="b_top">
          <p>
            <span class="s1"
              ><img src="../assets/l1.png" />{{
                dataList.status | status
              }}</span
            ><span class="s2">{{ dataList.title }}</span>
          </p>
        </div>
        <img src="../assets/t2.png" class="but" alt="" />
      </div>
      <div class="T_article">
        <van-tabs v-model="active" color="#31CE9D" title-active-color="#31CE9D">
          <van-tab title="课程介绍">
            <div class="tab1">
              <van-skeleton :row="3" title :loading="waiting">
                <div class="top">
                  <p>&yen;{{ dataList.currencyPrice }}</p>
                  <div>
                    <img src="../assets/t7.png" alt="" />
                    <span>{{ dataList.currentQuota }}</span>
                  </div>
                </div>
                <h1>{{ dataList.summary }}</h1>
                <div class="center">
                  <img src="../assets/t9.png" alt="" />
                  <span class="s1">立减</span>
                  <span class="s2"
                    >&yen;{{ (couponList[0] || {}).currency }}</span
                  >
                  <span class="s3">领取</span>
                </div>
              </van-skeleton>
              <van-skeleton :row="3" title :loading="waiting">
                <div class="content">
                  <p class="b_p1"><span></span>课程介绍</p>
                  <div v-html="dataList.richText"></div>
                  <p class="b_p1"><span></span>课程讲师</p>
                  <p
                    class="c_p1"
                    style="padding: 5px 0px"
                    v-for="(tea, index) in dataList.teacher"
                    :key="index"
                  >
                    {{ tea.title }}<span>{{ tea.name }}</span>
                  </p>
                  <p class="b_p1"><span></span>直播时间</p>
                  <p class="c_p1">{{ dataList.nextLiveTime }}</p>
                </div>
              </van-skeleton>
            </div>
          </van-tab>

          <van-tab :title="'评价（' + dataList.appraiseCount + '）'">
            <ul class="tab2">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <li v-for="(item, index) in plList" :key="index">
                  <img :src="item.userAvatarUrl" alt="" />
                  <div class="divs">
                    <p class="p1">
                      <span>{{ item.userNickName }}</span>
                      <van-rate
                        class="s1"
                        v-model="item.score"
                        :size="16"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                      />
                    </p>
                    <p class="p2">
                      {{ item.content }}
                    </p>
                    <p class="p3">{{ item.sendTime }}</p>
                  </div>
                </li>
              </van-list>
            </ul>
          </van-tab>
        </van-tabs>
      </div>
    </div>
   
      <div class="bottom">
         <van-skeleton :row="2" avatar  :loading="waiting">
        <div>
          <van-icon name="like-o" class="icons" />
          <span>想学</span>
        </div>
        <p>加入学习</p>
        </van-skeleton>
      </div>
    
  </div>
</template>
<script>
import headers from "@/components/header/Header";
import { nativeGoBack } from "@/utils/NativeMethod";
import { courseDetail, appraiseList } from "@/api/port";
export default {
  data() {
    return {
      deviceType: "",
      active: 0,
      value: 5,
      id: this.$route.query.id,
      token: this.$route.query.token,
      limit: 10,
      pageIndex: 1,
      loading: false,
      waiting: true,
      finished: false,
      plList: [],
      dataList: {
        teacher: [],
      },
      couponList: [], //优惠券
    };
  },
  filters: {
    status(val) {
      switch (val) {
        case 1:
          return "直播预告";
        case 2:
          return "正在直播";
        case 3:
          return "课程回放";
      }
    },
  },
  components: {
    headers,
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        ++this.pageIndex;
        this.getappraiseList();
      }, 1000);
    },
    getappraiseList() {
      this.loading = true;
      appraiseList({
        courseId: this.id,
        limit: this.limit,
        pageIndex: this.pageIndex,
        token: this.token,
      })
        .then((res) => {
          this.plList = this.plList.concat(res.data);
          if (res.data.length < this.limit) {
            this.finished = true;
          } else {
            this.finished = false;
          }
          this.loading = false;
          console.log(res);
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
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
          this.couponList = this.dataList.couponList || [];
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
    this.getappraiseList();
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
      .b_top {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        line-height: 60px;
        background: rgba(0, 0, 0, 0.1);
        p {
          color: #fff;
          font-size: 22px;
          padding-left: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .s1 {
            background: #f39800;
            padding: 3px 22px;
            border-radius: 2px;
            img {
              width: 16px;
              height: auto;
              padding-right: 10px;
            }
          }
          .s2 {
            margin-left: 15px;
          }
        }
      }
      .but {
        position: absolute;
        top: 50%;
        width: 80px;
        height: auto;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .T_article {
      background: #fff;
      .tab2 {
        padding: 30px;
        margin-top: 30px;
        li {
          display: flex;
          margin-top: 20px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 20px;
          }
          .divs {
            padding-bottom: 30px;
            width: 100%;
            border-bottom: 1px solid #EBEBEB;
            .p1 {
              display: flex;
              span {
                font-size: 26px;
                color: #000;
              }
              .s1 {
                margin-left: auto;
              }
            }
            .p2 {
              margin: 24px 0 32px 0px;
              font-size: 24px;
              color: #666;
            }
            .p3 {
              font-size: 22px;
              color: #cccccc;
            }
          }
        }
      }
      .tab1 {
        margin-top: 15px;
        padding: 30px;
        .top {
          display: flex;
          align-items: center;
          p {
            font-size: 36px;
            font-weight: bold;
            color: #ed6d34;
          }
          div {
            margin-left: auto;
            img {
              width: 21px;
              height: 21px;
              margin-right: 10px;
            }
            span {
              font-size: 22px;
              color: #666666;
            }
          }
        }
        h1 {
          font-size: 30px;
          color: #000000;
          margin: 20px 0 40px;
          font-weight: bold;
        }
        .center {
          background: #f9f9f9;
          margin-bottom: 60px;
          height: 100px;
          padding: 0 30px;
          display: flex;
          align-items: center;
          line-height: 100px;
          font-size: 26px;
          .s1 {
            color: #f39800;
            padding: 0 20px 0 30px;
          }
          .s2 {
            color: #f39800;
          }
          .s3 {
            margin-left: auto;
            color: #fff;
            background: #f39800;
            display: inline-block;
            height: 44px;
            line-height: 49px;
            padding: 3px 25px;
            border-radius: 5px;
            font-size: 24px;
            cursor: pointer;
          }
          img {
            width: 40px;
            height: 40px;
          }
        }
        .content {
          .b_p1 {
            height: 40px;
            line-height: 40px;
            font-weight: bold;
            font-size: 28px;
            margin: 30px 0;
            span {
              width: 4px;
              height: 30px;
              display: inline-block;
              background: #31ce9d;
              border-radius: 0px 100px 100px;
              margin-right: 15px;
              vertical-align: -2px;
            }
          }
          .c_p1 {
            color: #666;
            font-size: 30px;
          }
        }
      }
    }
    .T_top {
      background: #fff;
      padding: 30px;
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