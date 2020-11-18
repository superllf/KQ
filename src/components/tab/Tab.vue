<template>
    <div class= "tab">
        <div class= "tab-box">
            <div
                v-for= "(item, index) in tabData"
                :class= "[isSelected == item.id ? 'active' : '' ,'tab-title']"
                :key= "item.id"
                @click= "tabClick(item.id)"
            >
                <p>{{ item.name }}</p>
                <div
                     class= "tab-prompt"
                     v-if= "item.num && item.num != 0">
                    {{ item.num && item.num == 0 ? '' : item.num }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: '',
		props: {
			tabData: {
				type: Array,
				default() {
					return []
				}
			},
			selected: {
				type: String,
				default() {
					return ''
				}
			}
		},

		// watch:{
		// 	'Selected'(newVal){
		// 		if(newVal){
		// 			this.Selected = newVal;
        //
		// 		}
		// 	}
		// },
		data() {
			return {
				isSelected: '1'
			}
		},


        created() {
			this.isSelected = this.selected
        },
		methods: {
			tabClick(data) {

				this.isSelected = data;
				this.$emit('tabClick', data)
			}
		}
	}
</script>

<style lang="less" scoped>

    .tab {
        width: 100%;
        box-sizing: border-box;
        padding: 20px 30px;
        .tab-box {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            width:100%;
            flex-wrap: nowrap;
            border:1px solid rgba(0, 121, 254, 1);
            border-radius: 5px;
            .tab-prompt{
                margin-bottom: 5px;
                height: 24px;
                line-height: 24px;
                font-size: 20px;
                background-color: #fd942e;
                color: #fff;
                padding: 0 10px;
                margin-left: 4px;
                border-radius: 12px;
            }
            .tab-title{
                flex: 1;
                height:70px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                p {
                    font-size: 28px;
                    color: #666;
                }
            }
            .active {
                background-color: rgba(0, 121, 254, 1);
                overflow: hidden;
                p {
                    color: #fff;
                }
            }
        }
    }
</style>