<template>
    <div class= "address">
        <Popup
            v-model="isShow"
            :style="{height: '80%'}"
            closeable
            @closed= 'closed'
            position="bottom">
            <div class= 'title' ref= "title">
                请选择地址
            </div>

            <!-- 选中的地区选中 -->
            <div class= "selected"  ref= "selected" >
                <div class= "s-li" v-for= "(item, index) in selectData" @click.stop= "getDates(item, index)">
                    <div class= "sele">
                        <div class= "zreo"></div>
                        <div class= "seleName">{{item.addr}}</div>
                    </div>
                    <div class= "line" v-if= "selectData.length > 0 && index < selectData.length - 1"></div>
                </div>
            </div>

            <!-- 地址选择 -->
            <div class= "area" >
                <div class= "prompt" ref= "prompt">请选择</div>
                <div  class= "city" :style="{maxHeight: size}" ref= "city">
                    <div v-for= "item in columnsData" @click.stop= "getAdd(item)">
                        <div :class= "[optionsNode == item.node? 'active': '', 'cityLi']" >
                            <div class= "addressName">{{item.addr}}</div>
                            <div class="correct"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    </div>
</template>

<script>
	import Popup  from 'vant/lib/popup';
	import Picker  from 'vant/lib/picker';
	import 'vant/lib/popup/style';
	import 'vant/lib/picker/style';
    export default {
        name: '',
        data() {
            return {
	            size: '200px', // 盒子的最大尺寸
                selectData: this.selectAddress,
	            optionsNode: this.selectOptionsNode,// 用于确认已选的选项
	            columnsData: this.columns, //
                isShow: this.showPicker// 弹窗显示
            }
        },
	    props: {
		    columns: {
			    type: Array,
			    default(){
				    return []
			    }
            },
		    showPicker: {
			    type: Boolean,
			    default(){
				    return false
			    }
            },
		    selectAddress: {
			    type: Array,
			    default(){
				    return []
			    }
		    },
		    selectOptionsNode: {
			    type: String,
			    default(){
				    return ''
			    }
            }
        },
        created() {


        },
        mounted() {
	        // this.getOptionsNode()
            // this.size = window.innerHeight * 0.8 - 120 + 'px'

        },
        watch: {
            'selectOptionsNode'(newVal) {
                this.optionsNode= newVal
            },
        	'selectAddress'(newVal) {
		        if(newVal.length > 0){
			        this.selectData = newVal;

                }
            },
        	'selectData'(newVal) { 
        		if(newVal){ 
                    this.$nextTick(()=>{
                        
			            this.getCityHeight()
                    })
			        this.$emit('input', newVal);
                }
            },
            'columns'(newVal){
        		this.columnsData = newVal
            },
            'showPicker'(newVal) {
                this.isShow = newVal
            }
        },
	    components: {
		    Popup,
		    Picker
        },
        methods: {

            // 获取盒子高低
            getCityHeight() {
                if(this.$refs.city){
                    this.$refs.city.scrollTop = 0;
	                this.size = (window.innerHeight * 0.8)- this.$refs.title.clientHeight -this.$refs.selected.clientHeight -this.$refs.prompt.clientHeight - 40 + 'px'
                }
            },

            // 获取地址
	        getAdd(data) {
            	// 数组为空的时候添加
                if(this.selectData.length == 0) {
	                this.selectData.push(data);
                }else {
	                let addrLvl = this.selectData[this.selectData.length-1].addrLvl
                	// 最后的addrLvl 值相等的时候直接替换
                    // 大于的时候 直接添加
                    //小于的时候 找到相同项替换并删除后面的值
                	if( addrLvl == data.addrLvl) {
		                this.selectData.splice(-1, 1, data)
                    }else if((+data.addrLvl) > (+addrLvl) ){
                		//
		                this.selectData.push(data);
                    }else if((+data.addrLvl) < (+addrLvl)) {
                		let indexData = null
                        this.selectData.map((value,index) =>{
                        	if(data.addrLvl == value.addrLvl){
		                        indexData = index
                            }
                        })
                        if(this.selectData[indexData].node != data.node){
	                        this.selectData.splice(indexData, this.selectData.length- indexData, data)
                        }else {
	                        this.optionsNode = this.selectData[indexData + 1].node
                        }

                    }
                }
		        this.$emit('getAdd', data)
            },
            // 获取上一级的地址
	        getDates(data, index) {
                 let sqlData = {}
                   this.$refs.city.scrollTop = 0;
                if(index == 0){
                    sqlData = {}
                }else {
                    sqlData = this.selectData[index-1]
                }

		        this.$emit('getDates', sqlData)
                if(this.selectData[index]){
	                this.optionsNode = this.selectData[index].node
                }
            },
            // 关闭其他的弹窗
            closed() {
                 this.$emit('closed', false)
            }
        }
    }
</script>

<style lang="less" scoped>
    .address {
        width: 100%;
        .title{
            width: 100%;
            height: 60px;
            text-align: center;
            line-height: 60px;
            font-size: 30px;
        }



        .selected{
            width: 100%;
            box-sizing: border-box;
            padding: 30px 30px;
            .s-li {
                position: relative;
                height: 70px;
                .sele {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    .zreo {
                        width: 15px;
                        height: 15px;
                        background-color: orangered;
                        border-radius: 50%;
                    }
                    .seleName {
                        margin-left: 50px;
                    }
                }
                .line {
                    width: 1px;
                    height: 70px;
                    border-left: 1px solid orangered;
                    position: absolute;
                    top: 15px;
                    left: 7px;
                }
            }

        }



        .area {
            width: 100%;
            box-sizing: border-box;
            padding: 30px 30px 0;
            border-top: 1px solid #ccc;
            .prompt {
                color: #ccc;
            }
            .city {
                margin-top: 15px;
                padding-left: 30px;
                /*max-height: ;*/
                overflow-y:scroll;
                -webkit-overflow-scrolling: touch;
                .cityLi {
                    width: 100%;
                    padding: 15px 0;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .correct {
                        display: inline-block;
                        width: 15px;
                        height: 3px;
                        /*background: #008100;*/
                        line-height: 0;
                        font-size: 0;
                        vertical-align: middle;
                        -webkit-transform: rotate(45deg);
                        margin:5px 20px 0 0;
                    }

                    .correct:after {
                        content: '/';
                        display: block;
                        width: 30px;
                        height: 3px;
                        /*background: #008100;*/
                        -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
                    }
                }
                .active {
                    .addressName {
                        color: orangered;
                    }
                    .correct {
                        background: orangered;
                    }
                    .correct:after {
                        background: orangered;
                    }
                }
            }
        }

    }
</style>