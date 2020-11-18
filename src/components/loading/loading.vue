<template>
    <div class= "loading ">
        <div class= "overlay">
            <div class= "box">
                <Loading size="48px" vertical>加载中...</Loading>
            </div>
        </div>
    </div>
</template>

<script>
    import { Overlay, Loading } from 'vant';
    export default {
        name: '',
        data() {
            return {
                
            }
        },
        components: {
	        Overlay,
	        Loading
        }
    }
</script>

<style lang="less">
    .loading {
        width: 100%;
        .van-overlay {
            background-color: rgba(0,0,0,.1);
        }
        .van-loading {
            color: #666;
        }
        .van-loading__text{
            color: #666;
        }
    }
</style>
<style lang="less" scoped>
    .loading {
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0, 0.1);
        z-index: 1001;
        .overlay {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .box {
                background-color: #fff;
                padding: 20px 50px;
            }
        }
    }
</style>