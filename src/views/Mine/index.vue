<template>
  <div class="mine">
    <Header title="我的小小"></Header>
    <div id="content">
      <Login></Login>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import Login from "@/components/Login";
export default {
  name: "mine",
  components: {
    Header,
    TabBar,
    Login,
  },
  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
