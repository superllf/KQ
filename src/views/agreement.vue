<template>
  <div class="NST_list">
    <header-c :title="title" @back="goBack"></header-c>
    <div class="content">
      <div class="zd-article">
          <div v-html="dataList"></div>
      </div>
    </div>
  </div>
</template>
<script>
import headerC from "@/components/header/Header";
import { nativeGoBack } from "@/utils/NativeMethod";
import {commonDetail} from '@/api/port'
export default {
  data() {
    return {
        deviceType:this.$route.query.deviceTyp,
        code:this.$route.query.code,
        dataList:""
    };
  },
  components: {
    headerC,
  },
  computed:{
    title(){
      console.log(this.filer(this.code))
      return this.filer(this.code).title ||"协议"
    }
  },
  methods: {
    filer(val){
      switch(val){
        case '1':   //用户协议
          return {code:'USER_AGREEMENT_DATA',title:"用户协议"}
        case '2':   //社区规范
          return {code:'COMMUNITY_NORMS_DATA',title:"社区规范"}
        case '3':   //隐私条款
          return {code:'PRIVACY_CLAUSE_DATA',title:"隐私条款"}
        case '4':  //相关资质
          return  {code:'RELEVANT_QUALIFICATIONS_DATA',title:"相关资质"}
        case '5':  //版权信息
          return {code:'COPYRIGHT_INFORMATION_DATA',title:"版权信息"}        
      }
    },
    goBack() {
      nativeGoBack(this.deviceType);
    },
    getList(){
      commonDetail({
        code:this.filer(this.code).code
      }).then(res =>{
        console.log(res)
        this.dataList = res.data
      })
    }
  },
  mounted() {
    this.getList()
  },
};
</script>
<style lang="less" scoped>
.header-content {
  text-align: center;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #d6d6d6;
}

.icon-back {
  position: absolute;
  left: 25px;
  top: 50%;
  width: 13px;
  height: 13px;
  border: 6px solid #333333;
  border-width: 2px 0 0 2px;
  transform: rotate(-45deg) translateY(-50%);
  -moz-transform: rotate(-45deg) translateY(-50%);
  -webkit-transform: rotate(-45deg) translateY(-50%);
  -o-transform: rotate(-45deg) translateY(-50%);
  -ms-transform: rotate(-45deg) translateY(-50%);
}
.icon-close {
  line-height: 100%;
  position: absolute;
  left: 35px;
  display: inline-block;
  width: 40px;
  height: 100%;
}
.icon-close::before,
.icon-close::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 24px;
  height: 2px;
  margin-top: 3px;
  left: 10px;
  background: #333333;
}
.icon-close::before {
  transform: rotate(-45deg) translateY(-50%);
}
.icon-close::after {
  transform: rotate(45deg) translateY(-50%);
}
.icon-close__back {
  height: 100%;
  width: 30px;
  position: relative;
  left: 35px;
  line-height: 100%;
}
.icon-back__back {
  height: 100%;
  width: 35px;
  position: absolute;
  left: 0;
  line-height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
.zd-article {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  padding: 15px 30px;
}
.text-right {
  text-align: right;
}
.color3 {
  color: #333;
}
.color6 {
  color: #666;
}
.color9 {
  color: #999;
}
.font18 {
  font-size: 36px;
}
.font14 {
  font-size: 28px;
}
.margin15 {
  margin-top: 15px;
  margin-bottom: 15px;
}
p {
  line-height: 1.8;
  text-indent: 2em;
}
h1 {
  color: #333;
  font-size: 36px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.NST_list {
  .content {
    
    .top {
      margin-top: 20px;
      background: #fff;
      height: 100px;
      line-height: 100px;
      color: #888888;
      padding: 0px 40px;
      .span1 {
        color: #666666;
        font-size: 32px;
        padding-right: 20px;
      }
      .span2,
      .span3 {
        padding-right: 20px;
      }
    }
    .center {
      margin-top: 60px;
      text-align: center;
      p {
        color: #888888;
      }
    }
    .article {
      margin-top: 30px;
      ul {
        background: #fff;
        border-top: 1px solid #e5e5e5;
        li {
          height: 90px;
          padding: 0px 40px;
          line-height: 90px;
          border-bottom: 1px solid #e5e5e5;
          p {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #888888;
          }
        }
      }
    }
  }
}
</style>