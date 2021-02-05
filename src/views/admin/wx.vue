<template>
<div>

</div>
</template>
<script>
export default {
  name: "wx",
  created() {
    var token = this.$route.params.token
    if (token){
      localStorage.setItem('token',token)
    }
    this.$router.push('/admin/blogs')

  },
  activated() {
    location.reload()
  },
  methods:{
    go() {

      location.reload();
    }
  }

}
</script>
