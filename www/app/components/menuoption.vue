<template>
    <div>
        <div class="qtitle">
             <em v-show="item.required">*</em>
             {{no+1}}、{{item.title}}
        </div>
        <div class="qoption">
            <select>
               <option v-for="option in item.option" value="option.v">
                   {{option.v}}
               </option>
            </select>
        </div>
    </div>
</template>
<script>
    export default{
        props:["item","no"]
    }
</script>
<style></style>