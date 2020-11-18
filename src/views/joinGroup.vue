<template>
  <div class="T_wrapper">
    <headers
      title="拼团详情"
      @back="goBack"
      :isRight="true"
      @save="share"
    ></headers>
    <div class="T_content">
      <div class="banner">
        <van-image width="100%" class="banner_img" lazy-load :src="dataList.promotion.course.media" />
        <!-- <img src="../assets/t2.png" class="but" alt="" /> -->
      </div>
      <div class="pt">
        <van-skeleton :row="3" title :loading="waiting">
        <div class="top">
          <!--拼团-->
          <p>
            <span>三人拼团</span>&yen;{{ dataList.promotion.currencyPrice
            }}<i>&yen;{{ dataList.promotion.course.currencyPrice }}</i>
          </p>
          <div>
            <span
            @click="goCous"
              style="
                color: #F39800;
                font-size: 14px;
                text-decoration: underline;
              "
              >课程详情 ></span
            >
          </div>
        
        </div>
        <!--限时优惠-->
        <h1>{{ dataList.promotion.course.title }}</h1>
        </van-skeleton>
      </div>
      <div class="T_article">
        <div>
             <van-skeleton :row="3" title :loading="waiting">
          <ul>
            <li>
              <img :src="(dataList.leader ||{}).avatarUrl? dataList.leader.avatarUrl :'../assets/pt.png'" alt="" class="active" />
              <span class="s1">{{ (dataList.leader || {}).nickName }}</span>
              <span class="s2">团长</span>
            </li>
            <li v-for="(item,index) in dataList.members" :key="index">
              <img :src="item.avatarUrl" alt=""  class="active"/>
              <span class="s1">{{ item.nickName }}</span>
            </li>
            <li v-for="i in (2-dataList.members.length)" :key="i">
                 <img src="../assets/pt.png" alt="" class="active" />
                 <span class="s1">待邀请</span>
            </li>
          </ul>
             </van-skeleton>
        </div>
        <!--参与拼团-->
        <div v-if="dataList.status == 1">
           <van-skeleton :row="3" title :loading="waiting">
          <div class="cent">
            <p>
              再邀请<span>{{ number }}</span
              >个名额即可成团
            </p>
          </div>
          <div class="rest">
            <p>
              剩余 <span><i>{{hour}}</i>:<i>{{min}}</i>:<i>{{sec}}</i></span
              >结束
            </p>
          </div>
          <div class="over">
            <p>若拼团失败，拼团金额将按照原支付方式返回</p>
          </div>
          <div class="bottom">
            <p>邀请好友参团</p>
            <p>立即参团</p>
          </div>
           </van-skeleton>
        </div>
        <!--拼团成功-->
        <div v-else-if="dataList.status == 2 || dataList.status == 4">
           <van-skeleton :row="3" title :loading="waiting">
          <img class="ptsuccess" src="../assets/ptsuccess.png" alt="" />
          <div class="bottom">
            <p>立即学习</p>
          </div>
           </van-skeleton>
        </div>
        <!--拼团失败-->
        <div v-else-if="dataList.status == 3">
           <van-skeleton :row="3" title :loading="waiting">
          <div class="rest">
            <p>
              剩余 <span><i>{{hour}}</i>:<i>{{min}}</i>:<i>{{sec}}</i></span
              >结束
            </p>
          </div>
          <div class="over">
            <p>拼团金额已返还至原支付账户</p>
          </div>
          <img class="ptsuccess" src="../assets/ptfail.png" alt="" />
          <div class="bottom">
            <p style="background: #B7B7B7">邀请好友拼团</p>
          </div>
           </van-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headers from "@/components/header/Header";
import { nativeGoBack } from "@/utils/NativeMethod";
import { tradeDetail } from "@/api/port";
export default {
  data() {
    return {
      deviceType: "",
      active: 0,
      value: 5,
      waiting:true,
      banner: require("../assets/live.png"),
      id: this.$route.query.id,
      token: this.$route.query.token,
      dataList: {
        leader: {},
        promotion: {
          course: {},
        },
        members:[]
      },
      hour:"",
      min:"",
      sec:""
    };
  },
  computed: {
    number() {
      try {
        return this.dataList.promotion.minMember - this.dataList.members.length;
      } catch (e) {
        return e;
      }
    },
  },
  components: {
    headers,
  },
  methods: {
    countdowm: function () {
      let self = this;
      let timer = setInterval(function () {
          let timeOP = new Date(self.dataList.promotion.startTime).getTime()+self.dataList.promotion.duration*1000
          let t = timeOP- new Date().getTime().toFixed(0)
          t -= 1000;
          if (t > 0) {
            let day = Math.floor(t / 86400000);
            let hour = Math.floor((t / 3600000) % 24);
            let min = Math.floor((t / 60000) % 60);
            let sec = Math.floor((t / 1000) % 60);
            day = day < 10 ? "0" + day : day;
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            self.hour = day*24+hour
            self.min = min
            self.sec = sec
          } else {
            // 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
            self.hour = '00'
            self.min = '00'
            self.sec = '00'
            clearInterval(timer);
            console.log(9)
          }
      }, 1000);
    },
    goCous(){
      this.$router.push({
        path:'/groupDetail',
        query:{
          id:this.dataList.promotion.course.id,
          token:this.token,
          type:1
        }
      })
    },
    goBack() {
      nativeGoBack(this.deviceType);
    },
    share() {
      console.log("share");
    },
    getList() {
      tradeDetail({
        tradePromotionId: this.id,
        token: this.token,
      })
        .then((res) => {
          console.log(res);
          this.dataList = res.data;
           this.$nextTick(() => {
            this.waiting = false;
          });
          this.countdowm()
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
    bottom: 0px;
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
    h1 {
      font-size: 30px;
      color: #000000;
      margin: 0px 30px 20px 30px;
      font-weight: bold;
    }
    .vans1 {
      margin: 0 30px;
    }
    .pt {
      background: #fff;
      padding-bottom: 30px;
      .center {
        background: #f9f9f9;
        margin: 0 30px 60px 30px;
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
      .top {
        display: flex;
        align-items: center;
        padding: 50px 30px 30px 30px;
        p {
          span {
            font-size: 20px;
            color: #31ce9d;
            border: 1px solid #31ce9d;
            padding: 0px 10px;
            margin-right: 15px;
            height: 40px;
            line-height: 43px;
            border-radius: 3px;
            display: inline-block;
          }
          i {
            font-size: 26px;
            color: #cccccc;
            text-decoration: line-through;
            margin-left: 20px;
          }
          font-size: 36px;
          font-weight: bold;
          color: #ed6d34;
        }
        div {
          margin-left: auto;
          img {
            width: 26px;
            height: 26px;
            margin-right: 10px;
          }
          span {
            font-size: 24px;
            color: #666666;
          }
        }
      }
    }
    .T_article {
      background: #fff;
      padding-bottom: 30px;
      .ptsuccess {
        margin: 10px auto 60px auto;
        width: 160px;
        display: block;
      }
      .bottom {
        margin: 80px 0 0px 0;
        background: #fff;
        p {
          margin: 0 75px;
          background: #31ce9d;
          cursor: pointer;
          color: #fff;
          height: 90px;
          font-size: 34px;
          text-align: center;
          line-height: 90px;
          border-radius: 15px;
        }
      }
      .over {
        margin-top: 64px;
        p {
          text-align: center;
          font-size: 26px;
          color: #999999;
        }
      }
      .rest {
        p {
          text-align: center;
          font-size: 28px;
          color: #666;
          span {
            padding: 0 25px;
            i {
              color: #fff;
              background: #000000;
              opacity: 0.6;
              margin: 0 4px;
              padding: 2px 5px;
              font-style: normal;
            }
          }
        }
      }
      .cent {
        margin: 50px 0px;
        p {
          text-align: center;
          font-size: 28px;
          color: #333333;
          span {
            color: #f39800;
            padding: 0 10px;
          }
        }
      }
      ul {
        padding: 70px 100px;
        display: flex;
        li {
          display: flex;
          flex-flow: column;
          width: 130px;
          margin: 0 auto;
          position: relative;
          text-align: center;
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
          }
          .active {
            border: 1px solid #31ce9d;
          }
          .s1 {
            font-size: 26px;
            color: #666;
            margin-top: 25px;
          }
          .s2 {
            position: absolute;
            top: 100px;
            left: 15px;
            background: #31ce9d;
            border: 1px solid #fff;
            color: #fff;
            border-radius: 30px;
            font-size: 22px;
            width: 90px;
            height: 40px;
            text-align: center;
            line-height: 48px;
            transform: scale(0.9);
          }
        }
      }
    }
    .T_top {
      background: #fff;
      padding: 30px;
    }
  }
}
</style>