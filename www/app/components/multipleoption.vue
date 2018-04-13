<template>
    <div>
        <div class="qtitle">
            <em v-show="item.required">*</em>
            {{no+1}}、{{item.title}}
        </div>
        <div class="qoption">
            <label v-for="option in item.option">
                <input type="checkbox" :name="'q'+(no+1)"/>
                {{option.v}}
            </label>
        </div>
    </div>
</template>
<script>
    export default{
        props:["item","no"]
    }
</script>
<style></style>