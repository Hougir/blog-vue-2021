<template>
<div>
</div>
</template>
<script>
export default {
  name: "empty",
  created() {
    this.$router.push('/admin/blogs')
  },
  activated() {
    location.reload()
  }

}
</script>
