<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    {{errorMsg}}
  </div>
</template>
<script>
  import Schema from 'async-validator'
  export default {
    name: 'vue-form-item',
    inject: ['vueForm'],
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: String
    },
    mounted () {
      this.$on('validate', function () {
        this.validate() // 校验是否符合规范
      })
    },
    data () {
      return {
        errorMsg: ''
      }
    },
    methods: {
      validate () {
        if (this.prop) { // 获取校验规则
          let rule = this.vueForm.rules[this.prop]
          // console.log(this.prop, rule) 
          let newVal = this.vueForm.model[this.prop]
          // 使用验证库 async-validator
          let descriptor = { // 当前属性的描述
            [this.prop]: rule
          }
          let schema = new Schema(descriptor) // 通过描述信息创建一个骨架
          return schema.validate({ [this.prop]: newVal }, (err, res) => {
            console.log(res)
            if (err) {
              this.errorMsg = err[0].message
            } else {
              this.errorMsg = ''
            }
          })
        }
      }
    },
  }
</script>
