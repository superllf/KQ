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
        <van-image width="100%" class="banner_img" lazy-load :src="dataList.headimg" />
        <img src="../assets/t2.png" class="but" alt="" />
      </div>
      <div class="pt">
        <van-skeleton :row="3" title :loading="waiting">
        <div class="top">
          <!--拼团-->
          <p v-if="type==1"><span>三人拼团</span>&yen;{{(promotionList[0] || {}).currencyPrice}}<i>&yen;{{dataList.currencyPrice}}</i></p>
          <!--限时优惠-->
          <p v-else-if="type == 2"><span>限时优惠</span>&yen;{{specialOffer.currency}}<i>&yen;{{dataList.currencyPrice}}</i></p>
          <!--免费-->
          <p v-else-if="type == 3">公益课程</p>
          <div>
            <img src="../assets/t7.png" alt="" />
            <span>{{ dataList.currentQuota }}</span>
          </div>
          <div>
            <img src="../assets/sc.png" alt="" />
            <span>{{dataList.collectCount}}</span>
          </div>
        </div>
        <!--限时优惠-->
        <div class="center" v-if="type ==2">
          <img src="../assets/t9.png" alt="" />
          <span class="s1">立减</span>
          <span class="s2">&yen;{{couponList[0].currency}}</span>
          <span class="s3">领取</span>
        </div>
        <!--限时优惠-->
        <h1>{{dataList.title}}</h1>
        <van-rate
          class="vans1"
          v-model="dataList.score"
          :size="16"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />
        </van-skeleton>
      </div>

      <div class="ptdetail" v-if="type==1">
        <van-skeleton :row="3" avatar title :loading="waiting">
        <p class="d1">
          <span>{{promotionList.tradePromotionMemberCount}}人在拼团，可直接参加</span
          ><van-icon class="d1_1" name="arrow" />
        </p>
        <ul>
          <li>
            <img src="../assets/doctor.png" alt="" />
            <span class="span-1">游戏人生</span>
            <div class="div-1">
              <p class="p-1">还差<span>1</span>人成团</p>
              <p class="p-2">剩余<span>sss</span></p>
            </div>
            <span class="span-2">去拼团</span>
          </li>
        </ul>
        </van-skeleton>
      </div>

      <div class="T_article">
         <van-skeleton :row="3" avatar title :loading="waiting">
        <van-tabs v-model="active" color="#31CE9D" title-active-color="#31CE9D">
          <van-tab title="课程介绍">
            <div class="tab1">
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
                  {{ tea.title }}<span style="padding-left:10px">{{ tea.name }}</span>
                </p>
                <p class="b_p1"><span></span>直播时间</p>
                <p class="c_p1">{{ dataList.nextLiveTime }}</p>
              </div>
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
                <li v-for="(item,index) in plList" :key="index">
                  <img :src="item.userAvatarUrl" alt="" />
                  <div class="divs">
                    <p class="p1">
                      <span>{{item.userNickName}}</span>
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
                      {{item.content}}
                    </p>
                    <p class="p3">{{item.sendTime}}</p>
                  </div>
                </li>
              </van-list>
            </ul>
          </van-tab>
        </van-tabs>
         </van-skeleton>
      </div>
    </div>
    <div class="bottom">
       <van-skeleton :row="2"  title :loading="waiting">
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
import { courseDetail ,appraiseList } from "@/api/port";
export default {
  data() {
    return {
      deviceType: "",
      active: 0,
      type:this.$route.query.type,  //1 == 拼团  2 ===限时优惠  3 ==免费公益
      value: 5,
      waiting:true,
      id: this.$route.query.id,
      token: this.$route.query.token,
      loading: true,
      finished: false,
      plList:[],
      limit:10,
      pageIndex:1,
      dataList:{
         teacher: [],
      },
      promotionList:[  //拼团

      ],
      specialOffer:{  //限时优惠

      },
      couponList:[],  //优惠券
    };
  },
  components: {
    headers,
  },
  methods: {
    onLoad(){
      setTimeout(() =>{
        ++this.pageIndex
        this.getappraiseList()
      },1000)
    },
    getappraiseList(){
      this.loading = true
      appraiseList({
        courseId:this.id,
        limit:this.limit,
        pageIndex:this.pageIndex,
        token:this.token,
      }).then(res =>{
        this.plList = this.plList.concat(res.data)
        if(res.data.length < this.limit){
          this.finished = true
        }
        else{
          this.finished = false
        }
        this.loading = false
        console.log(res)
      }).catch(e =>{
        this.loading = false
        console.log(e)
      })
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
          this.promotionList = this.dataList.promotionList || []
          this.specialOffer = this.dataList.specialOffer || {}
          this.couponList = this.dataList.couponList || []
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
    this.getList()
    this.getappraiseList()
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
          margin:0 30px 60px 30px;
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
    .ptdetail {
      background: #fff;
      margin: 25px 0px;
      padding: 0 30px;
      .d1 {
        height: 120px;
        border-bottom: 1px solid #ebebeb;
        line-height: 120px;
        display: flex;
        align-items: center;
        font-size: 28px;
        color: #000000;
        .d1_1 {
          margin-left: auto;
        }
      }
      ul {
        li {
          display: flex;
          align-items: center;
          height: 150px;
          border-bottom: 1px solid #ebebeb;
          img {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            margin-right: 20px;
          }
          .span-1 {
            color: #333;
            font-size: 28px;
          }
          .div-1 {
            display: flex;
            margin-left: auto;
            margin-right: 40px;
            flex-flow: column;
            justify-content: center;
            text-align: center;
            align-items: center;
            .p-1 {
              font-size: 24px;
              color: #000;
              span {
                color: #f39c09;
                padding: 0 5px;
              }
            }
            .p-2 {
              font-size: 22px;
              padding-top: 5px;
              color: #676868;
            }
          }
          .span-2 {
            font-size: 28px;
            color: #fff;
            padding: 3px 15px;
            background: #31ce9d;
            border-radius: 5px;
          }
        }
      }
    }
    .T_article {
      background: #fff;
      margin-top: 20px;
      .tab2 {
        padding: 30px;
        margin-top: 30px;
        li {
          display: flex;

          img {
            width: 60px;
            height: 60px;
            margin-right: 20px;
          }
          .divs {
            padding-bottom: 30px;
            border-bottom: 1px solid #ebebeb;
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
            line-height: 44px;
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