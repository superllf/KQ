<template>
  <div class="T_wrapper">
    <headers
      title="详情"
      @back="goBack"
      :isRight="true"
      @save="share"
    ></headers>
    <div class="T_content">
      <div class="banner" v-if="dataList.media.indexOf('mp4') == -1">
        <van-image
          width="100%"
          class="banner_img"
          lazy-load
          :src="dataList.media"
        />
      </div>
      <div v-else class="banner">
        <video controls :src="dataList.media" alt="" class="banner_img" />
        <!-- <img src="../assets/t2.png" class="but" alt="" /> -->
      </div>
      <div class="T_top">
        <van-skeleton :row="2" title :loading="waiting">
          <h5>{{ dataList.title }}</h5>
          <p class="p1">
            {{ dataList.summary }}
          </p>
          <p class="p2">
            <span class="s1">{{ dataList.readCount }}次阅读</span
            ><span class="s2">{{ dataList.publishTime.substring(0, 10) }}</span
            >发布
          </p>
        </van-skeleton>
      </div>
      <div class="T_article">
        <van-skeleton :row="2" title avatar :loading="waiting">
          <div v-html="dataList.richText"></div>
        </van-skeleton>
      </div>
      <div class="pl">
        <van-skeleton :row="6" title :loading="waiting">
          <ul>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <li v-for="(item, index) in plList" :key="index">
                <img :src="item.user.avatarUrl" alt="" />
                <div class="right">
                  <p class="p1">
                    <span class="s1">{{ item.user.nickName }}</span
                    ><van-icon
                      class="s2"
                      @click="like(item)"
                      name="like-o"
                      :style="{ color: item.hasLike == 1 ? '#f00' : '' }"
                      :name="item.hasLike == 0 ? 'like-o' : 'like'"
                    /><span class="s3">{{ item.likeCount }}</span>
                  </p>
                  <p class="p2">
                    {{ item.content }}
                  </p>
                  <p class="p3">{{ item.publishTime }}</p>
                </div>
              </li>
            </van-list>
          </ul>
        </van-skeleton>
      </div>
    </div>
    <div class="bottom">
      <van-skeleton :row="2" title :loading="waiting">
        <form action="">
          <van-field
            left-icon="edit"
            class="input"
            v-model="value"
            name="search"
            label=""
            placeholder="来说点什么吧"
          />
        </form>
        <div>
          <van-icon name="more-o" class="icons" />
          <span>{{ dataList.commentCount }}</span>
        </div>
        <div>
          <van-icon
            @click="likeFlower"
            class="icons"
            :style="{ color: dataList.hasLike == 1 ? '#f00' : '' }"
            :name="dataList.hasLike == 0 ? 'like-o' : 'like'"
          />
          <span>{{ dataList.likeCount }}</span>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header/Header";
import { nativeGoBack } from "@/utils/NativeMethod";
import {
  fragmentDetail,
  fragmentcommentDetail,
  fragmentcommentlike,
  fragmentcommentdislike,
  fragmentlike,
  fragmentdislike,
} from "@/api/port";
export default {
  data() {
    return {
      deviceType: "",
      waiting: true,
      value: "",
      banner: require("../assets/live.png"),
      id: this.$route.query.id,
      loading: true,
      finished: false,
      plList: [],
      limit: 10,
      pageIndex: 1,
      token: this.$route.query.token,
      dataList: {
        media: "",
        publishTime: "",
      },
    };
  },
  components: {
    headers,
  },
  methods: {
    submit(val) {
      console.log(val);
    },
    likeFlower() {
      if (this.dataList.hasLike == 0) {
        fragmentlike({
          id: this.id,
          token: this.token,
        }).then((res) => {
          this.dataList.likeCount += 1;
          this.dataList.hasLike = 1;
          console.log(res);
        });
      } else {
        fragmentdislike({
          id: this.id,
          token: this.token,
        }).then((res) => {
          this.dataList.likeCount -= 1;
          this.dataList.hasLike = 0;
          console.log(res);
        });
      }
    },
    like(item) {
      console.log(item);
      if (item.hasLike == 0) {
        fragmentcommentlike({
          id: item.id,
          token: this.token,
        }).then((res) => {
          item.likeCount += 1;
          item.hasLike = 1;
          console.log(res);
        });
      } else {
        fragmentcommentdislike({
          id: item.id,
          token: this.token,
        }).then((res) => {
          item.likeCount -= 1;
          item.hasLike = 0;
          console.log(res);
        });
      }
    },
    goBack() {
      nativeGoBack(this.deviceType);
    },
    share() {
      console.log("share");
    },
    getList() {
      fragmentDetail({
        id: this.id,
        token: this.token,
      })
        .then((res) => {
          console.log(res);
          this.dataList = res.data;
          this.$nextTick(() => {
            this.waiting = false;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onLoad() {
      setTimeout(() => {
        ++this.pageIndex;
        this.getPl();
      }, 1000);
    },
    getPl() {
      fragmentcommentDetail({
        fragmentId: this.id,
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
        });
    },
  },
  mounted() {
    this.getList();
    this.getPl();
    var oForm = document.getElementsByTagName("form")[0];
    oForm.onsubmit = function () {
      console.log(999);
    };
  },
};
</script>

<style lang="less" scoped>
.T_wrapper {
  height: 100vh;
  background: #f9f9f9;
  position: relative;
  .bottom {
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 90px;
    background: #fff;
    line-height: 90px;
    border-top: 1px solid #ebebeb;
    right: 0;
    display: flex;
    overflow: hidden;
    .input {
      margin: 5px 20px 5px 10px;
      background: #F9F9F9;
      flex: 5;
      line-height: 30px;
    }
    div {
      flex: 1;
      text-align: center;
      margin: 0 20px;
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
  .T_content {
    position: absolute;
    top: 100px;
    bottom: 100px;
    left: 0;
    right: 0;
    overflow-y: scroll;
    .banner {
      position: relative;
      .banner_img {
        height: 420px;
        width: 100%;
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

    .pl {
      margin-top: 20px;
      background: #fff;
      padding: 30px;
      ul {
        li {
          display: flex;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 20px;
          }
          .right {
            border-bottom: 1px solid #ebebeb;
            width: 100%;
            padding-bottom: 20px;
            .p1 {
              font-size: 26px;
              display: flex;
              margin-bottom: 25px;
              .s1 {
                font-size: 28px;
                color: #000000;
              }
              .s2 {
                margin-left: auto;
                font-size: 35px;
                margin-right: 10px;
              }
              .s3 {
                font-size: 26px;
                color: #666666;
              }
            }
            .p2 {
              font-size: 28px;
              color: #666666;
            }
            .p3 {
              font-size: 24px;
              color: #999;
              margin-top: 32px;
            }
          }
        }
      }
    }
  }
}
</style>