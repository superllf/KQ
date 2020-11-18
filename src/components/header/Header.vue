<template>
  <div class="header">
    <div class="h-box">
      <div class="h-left" @click="back()">
        <div v-if="isLeft" class="h-back"></div>
      </div>
      <div class="h-title">
        <span>{{ title }}</span>
      </div>
      <div class="h-right" @click="save()" v-if="isRight">
        <img src="../../assets/t3.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header.vue",
  props: {
    title: {
      type: String,
      default() {
        return "标题";
      },
    },
    rightText: {
      type: String,
      default() {
        return "";
      },
    },
    isRight: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isLeft: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 返回上一页
    back() {
      if (this.isLeft) {
        this.$emit("back");
      }
    },
    // 保存
    save() {
      if (this.isRight) {
        this.$emit("save");
      }
    },
  },
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  .h-box {
    width: 100%;
    height: 88px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    .h-left {
      width: 100px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .h-back {
        width: 20px;
        height: 20px;
        border: 1px solid #666;
        border-width: 0 0 1px 1px;
        transform: rotate(45deg);
      }
    }
    .h-title {
      flex: 1;
      font-size: 34px;
      color: #000000;
      font-weight: 700;
      margin-left: -20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .h-right {
      width: 100px;
      font-size: 32px;
      font-weight: 400;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img{
          width: 36px;
          height: 36px;
      }
    }
  }
}
</style>