<template>
    <div class="about">
        <h1>
            {{id ? '编辑' : '新建'}}分类
        </h1>
        <el-form label-width='120px' @submit.native.prevent='save'>
            <el-form-item label='上级分类'>
                <el-select v-model="model.parent">
                    <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type=primary native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style>
    .el-button{
        border-radius: 10px;
    }
</style>

<script>
export default {
    props:{
        id:{}
    },
    data(){
        return {
            model: {},
            parents: [],
        }
    },
    methods:{
        async save(){
            let message
            if(this.id){
                await this.$http.put(`/rest/categories/${this.id}`, this.model)
                message = '修改成功'
            }else{
                await this.$http.post('/rest/categories', this.model) 
                message = '保存成功'
            }
            
            this.$router.push('/categories/list')
            this.$message({
                type:'success',
                message: message
            })
        },
        async fetch(){
            const res = await this.$http.get(`/rest/categories/${this.id}`)
            // console.log("categories")
            this.model = res.data
        },
        async fetchParents(){
            const res = await this.$http.get('/rest/categories')
            this.parents = res.data.filter(val => !Object.prototype.hasOwnProperty.call(val, 'parent'))
        },
    },
    created(){
        this.id && this.fetch()

        this.fetchParents() 
    
    },
}
</script>