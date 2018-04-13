<template>
    <div class="typetestbox">
        <ul>
            <li data-tixing="singleoption">单选题</li>
            <li data-tixing="multipleoption">多选题</li>
            <li data-tixing="menuoption">下拉菜单</li>
        </ul>
    </div>
</template>
<script>
    export default{
    }
</script>
<style scoped lang='stylus'>
    .typetestbox{
        padding:20px;
        ul{
            list-style:none;
            li{
                width: 200px;
                height:50px;
                line-height:50px;
                background-color:#fff;
                border: 1px solid #eee;
                margin-bottom: 10px;
                text-align: center;
                cursor: move;
            }
        }
    }
</style>