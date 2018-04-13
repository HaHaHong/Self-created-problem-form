<style lang='stylus'>
    .warp{
        width: 1300px;
        margin:50px auto;
        background-color:#fff;
        min-height:500px;
        overflow:hidden;
        .leftPart{
            float: left;
            width: 350px;
            min-height:500px;
            background-color:#ccc;
        }
        .centerPart{
            float: left;
            width: 600px;
            min-height:500px;
            overflow:hidden;
            background-color:#fff;
            padding:20px;
            box-sizing:border-box;
            .outerbox{
                 width: 500px;
                  position: relative;
                  .bianji{
                      position: absolute;
                      right:20px;
                      top:16px;
                      width: 20px;
                      height:20px;
                      background:url(/images/bianji.svg);
                      background-size:cover;
                      display:none;
                  }
                  .down{
                      position: absolute;
                      right:50px;
                      top:18px;
                      width: 16px;
                      height:16px;
                      background:url(/images/down.svg);
                      background-size:cover;
                      display:none;
                  }
                  .up{
                      position: absolute;
                      right:80px;
                      top:18px;
                      width: 16px;
                      height:16px;
                      background:url(/images/up.svg);
                      background-size:cover;
                      display:none;
                  }
                .cbox{
                    width: 500px;
                    padding:10px 0px;
                    border-bottom: 1px solid #eee;
                    .qtitle{
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    label{
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    select{
                        width: 300px;
                        border: 1px solid #bdbdbd;
                        border-radius:6px;
                        height:30px;
                    }
                    input[type=checkbox],input[type=radio]{
                        margin-right: 5px;
                    }
                }
                &:hover .bianji,&:hover .up,&:hover .down{
                    display:block;
                };
                &.onedit{
                    animation:donghua .5s linear infinite alternate;
                }
                @-webkit-keyframes donghua{
                    from{
                        box-shadow:0px 0px 0px red;
                    }
                    to{
                        box-shadow:0px 0px 20px red;
                    }
                }
            }
        }
        .rightPart{
            float: left;
            width: 350px;
            min-height:500px;
            background-color:#ccc;
        }

    }
</style>
<template>
    <div>
        <div class="warp">
            <div class="leftPart">
                <typetestarea></typetestarea>
            </div>
            <div class="centerPart">
                <div :class="{'outerbox':true,'onedit':$store.state.nowedit == no+1}" v-for="(item,no) in q">
                    <div :is="item.type" :item="item" :no="no" class="cbox"></div>
                    <span class="bianji" :data-no="no" @click="$store.commit('changeNowEdit',{
                        'nowedit':no+1
                    })"></span>
                    <span class="up" :data-no="no" @click="$store.commit('changeNowEdit',{
                        'nowedit':no+1
                    })"></span>
                    <span class="down" :data-no="no" @click="$store.commit('changeNowEdit',{
                        'nowedit':no+1
                    })"></span>
                </div>
            </div>
            <div class="rightPart">
                <setarea v-if="$store.state.nowedit != 0" :item="q[$store.state.nowedit-1]"></setarea>
            </div>
        </div>
    </div>
</template>
<script>
    import singleoption from "./components/singleoption.vue";
    import multipleoption from "./components/multipleoption.vue";
    import menuoption from "./components/menuoption.vue";
    import setarea from "./components/setarea.vue";
    import typetestarea from "./components/typetestarea.vue";
    export default{
        data(){
            return {
                q:[
                    {
                        "title":"你最喜欢的王者荣耀的人物是谁？",
                        "type":"singleoption",
                        "option":[
                            {"v":"刘备"},
                            {"v":"关羽"},
                            {"v":"鲁班"},
                            {"v":"荆轲"}
                        ],
                        "required":false
                    },
                    {
                        "title":"你最喜欢的歌手是谁？",
                        "type":"multipleoption",
                        "option":[
                            {"v":"帅帅"},
                            {"v":"曾哥"},
                            {"v":"六哥"},
                            {"v":"书记"}
                        ],
                        "required":false
                    },
                    {
                        "title":"你最爱吃的食物是啥？",
                        "type":"menuoption",
                        "option":[
                            {"v":"鸡排"},
                            {"v":"牛肉"},
                            {"v":"豆浆"},
                            {"v":"鸡蛋"}
                        ],
                        "required":false
                    }
                ]
            }
        },
        components:{
            singleoption,
            multipleoption,
            menuoption,
            setarea,
            typetestarea
        },
        mounted:function(){
            var self =this;
            // 参考文档：http://api.jqueryui.com/draggable/
            // draggable和Sortable结合使用
            $(".typetestbox li").draggable({
                connectToSortable:".centerPart",
                helper:"clone",
                revert:"invalid"
            });
            $(".centerPart").sortable ({
                cancel:".cbox,span",
                stop:function(event,ui){
                    // 拖拽后的排序
                    var index = $(ui.item[0]).index();
                    var tixing = $(ui.item[0]).data("tixing");
                    // 拖拽后题目消失
                    $(ui.item[0]).remove();
                    self.q.splice(index,0,{
                        "title":"我是一个新的题目，请编辑",
                        "type":tixing,
                        "option":[
                            {"v":"新的选项A"},
                            {"v":"新的选项B"},
                            {"v":"新的选项C"},
                            {"v":"新的选项D"}
                        ],
                        "required":false
                    });
                    self.$store.commit('changeNowEdit',{'nowedit':index+1});
                }
            });
            // 事件委托，上箭头、下箭头
            $(".centerPart").delegate('.up', 'click', function(event) {
                var no = $(this).data("no");

               if(no > 0){
                    var temp = self.q.splice(no,1)[0];
                    self.q.splice(no-1,0,temp);
               };


            });
            $(".centerPart").delegate('.down', 'click', function(event) {

                var no = $(this).data("no");
                var temp = self.q.splice(no,1)[0];
                self.q.splice(no+1,0,temp)

            });
        }
    }
</script>
