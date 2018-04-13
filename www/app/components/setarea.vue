<template>
    <div class="typetestbox">
        <h3>设置题目</h3>
        <div class="con">
            标题：
            <input type="text" v-model="item.title" />
        </div>
        <div class="con">
            是否必填：
            <input type="checkbox" v-model="item.required">
        </div>
        <div class="con">
            题型：
            <input type="radio" value="singleoption"  v-model="item.type" /> 单选
            <input type="radio" value="multipleoption"  v-model="item.type" /> 多选
            <input type="radio" value="menuoption"  v-model="item.type" /> 下拉
        </div>
        <div class="con">
            <!-- 选项们(更改之后，鼠标离开进行修改) -->
            <div class="options" ref="option">
                <p v-for="(option,index) in item.option" :key="option.v">
                    <input type="text" v-model.lazy="option.v">
                    <span class="del" @click="shanchu(index)"></span>
                    <span class="changeOrder"></span>
                </p>
            </div>
            <p class="addoption" @click="addoption">
                添加新的选项
            </p>
        </div>
    </div>
</template>
<script>
    export default{
        props:["item"],
        methods:{
            addoption(){
                this.item.option.push({"v":""});
            },
            shanchu(index){
                this.item.option.splice(index,1);
            }
        },
        mounted:function(){
            var startindex = null;
            var self =this;
            $(this.$refs.option).sortable({
                handle:".changeOrder",
                start:function(e,ui){
                    startindex = $(ui.item).index();
                },
                stop:function(e,ui){
                    var endIndex = $(ui.item).index();
                    var delOption = self.item.option.splice(startindex,1)[0];
                    self.item.option.splice(endIndex,0,delOption);
                }
            })
        }
    }
</script>
<style scoped lang='stylus'>
    .typetestbox{
        padding:10px;
        .con{
            line-height: 150%;
            padding:10px 0;
            font-size: 16px;
        }
        input[type="text"]{
            width: 230px;
            height: 20px;
            border-radius:4px;
            border: 1px solid #666;
            padding-left:5px;
        }
        .addoption{
            width: 230px;
            height: 25px;
            text-align: center;
            border: 1px dotted #666;
            line-height: 25px;
            cursor: pointer;
        }
        .addoption:hover{
            background-image:linear-gradient(to right,red,orange,yellow,green,cyan,blue,purple);
        }
        .options input{
            margin-bottom:10px;
        }
        .del{
            display:inline-block;
            width: 16px;
            height:16px;
            background:url(/images/del.svg);
            background-size:cover;
            border: 1px solid #666;
            padding:2px;
            position: relative;
            top:6px;
            left:5px;
            border-radius:5px;
        }
        .changeOrder{
            display:inline-block;
            width: 16px;
            height:16px;
            background:url(/images/order.svg);
            background-size:cover;
            border: 1px solid #666;
            padding:2px;
            position: relative;
            top:6px;
            left:5px;
            border-radius:5px;
            cursor:move;
        }
        .del:hover,.changeOrder:hover{
            animation:donghua 0.5s linear 0s  alternate;
            background-color:skyblue;
        }
        @-webkit-keyframes donghua{
            0%{

                transform:rotate(0deg) scale(1);
            }
            50%{
                transform:rotate(180deg) scale(0.5);
            }
            100%{
                transform:rotate(360deg) scale(1);

            }
        }
    }
</style>