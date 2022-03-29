<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button class="btn btn-success" @click="goToDayBook">Success</button>
    <button class="btn btn-primary" @click="goToDayBook">Primary</button>
  </div>
</template>

<script>

export default {

  methods:{
    goToDayBook(){
      this.$router.push({ name: 'no-entry' })
    }
  }
}

</script>
