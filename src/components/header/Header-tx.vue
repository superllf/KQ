<template>
    <div class= "header">
        <div class="h-box">
            <div
                    class= "h-left"
                    @click= "back()">
                <div v-if= "isLeft" class= "h-back"></div>
            </div>
            <div class= "h-title">
                <span>{{ title }}</span>
            </div>
            <div

                    class= "h-right"
                    @click= "save()">
                <span  v-if= "isRight">{{rightText}}</span>
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
					return '标题'
				}
            },
            rightText: {
				type: String,
				default() {
					return ''
				}
            },
			isRight: {
				type: Boolean,
				default() {
					return false
				}
			},
			isLeft: {
				type: Boolean,
				default(){
					return true
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			// 返回上一页
			back() {
				if( this.isLeft ){
					this.$emit('back');
				}
			},
			// 保存
			save() {
				if( this.isRight ){
					this.$emit('save')
				}
			}
		}
	}
</script>

<style scoped lang="less">
    .header {
        width: 100%;
        .h-box {
            width: 100%;
            height: 90px;
            background-color: #F069A9;
            display: flex;
            flex-direction: row;
            .h-left {
                width: 120px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                .h-back {
                    width: 25px;
                    height: 25px;
                    border: 1px solid#fff;
                    border-width: 0 0 2px 2px;
                    transform: rotate(45deg);
                }
            }
            .h-title {
                flex: 1;
                font-size: 36px;
                color: #fff;
                font-weight: 700;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
            .h-right {
                width: 120px;
                font-size: 32px;
                font-weight: 400;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }

        }
    }
</style>