<template>
  <div id="app">
    <!-- 加keep-alive是因为每次切换时会重新渲染一遍，这样会影响性能
      第一次请求之后再次渲染可以利用keep-alive进行缓存的操作
     -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss"></style>
