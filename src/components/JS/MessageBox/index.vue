<template>
  <div class="messageBox">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <div>
      <div @touchstart="handleCancel">{{ cancel }}</div>
      <div @touchstart="handleOk">{{ ok }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
};
</script>

<style scoped>
.messageBox {
  width: 200px;
  height: 140px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  /*模糊值 范围 */
  box-shadow: 0 0 5px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.messageBox h2 {
  text-align: center;
  line-height: 40px;
  font-size: 18px;
}

.messageBox p {
  text-align: center;
  line-height: 40px;
}

.messageBox > div {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
}

.messageBox > div div {
  flex: 1;
  text-align: center;
  line-height: 30px;
  border-right: 1px #ccc solid;
}

.messageBox > div div:last-child {
  border-right: none;
}
</style>