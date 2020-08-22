<template>
  <div class="home">
    <div class="sologin">
      <h1>乐观</h1>
      <h1>执着</h1>
      <h1>勇敢</h1>
    </div>
    <audio src="/media/bg.mp3" controls loop ref="bgMp3" class="bg-mp3">
      您的浏览器不支持音乐播放
    </audio>
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: 'Home',
    mounted(){
      this.$nextTick(() => {
        this.$refs.bgMp3.play();
      })
    }
  }
</script>
<style lang="less">
.bg-mp3{
  position: fixed;
  z-index: -999;
}
.sologin{
  position: absolute;
  top: 10%;
  right: 30%;
  font-size: 32px;
  line-height: 60px;
  font-weight: 600;
}
</style>