<template>
  <div>
    {{form}}
    <vue-form :model="form"
              :rules="rules"
              ref="form">
      <vue-form-item label="用户名"
                     prop="userName">
        <vue-input v-model="form.userName"></vue-input>
      </vue-form-item>
      <vue-form-item label="密码"
                     prop="password">
        <vue-input v-model="form.password"></vue-input>
      </vue-form-item>
      <button @click="submit">提交</button>
    </vue-form>
  </div>
</template>
<script>
  import vueForm from './vue-form'
  import vueFormItem from './vue-form-item'
  import vueInput from './vue-input'
  export default {
    components: {
      'vue-form': vueForm,
      'vue-form-item': vueFormItem,
      'vue-input': vueInput
    },
    data () {
      return {
        form: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度必须在3-5位' }
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        }
      }
    },
    methods: {
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log('校验通过')
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    },
  }
</script>
