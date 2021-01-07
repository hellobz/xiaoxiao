<template>
  <div class="cinema_body">
    <Loading v-if="isLoading" />
    <Scroller v-else>
      <ul>
        <li v-for="item in cinemas" :key="item.id">
          <div>
            <span>{{ item.nm }}</span>
            <span class="q"
              ><span class="price">{{ item.sellPrice }}</span> 元起</span
            >
          </div>
          <div class="address">
            <span>{{ item.addr }}</span>
            <span>{{ item.distance }}</span>
          </div>
          <div class="card">
            <div
              v-for="(num, key) in item.tag"
              v-show="num === 1"
              :key="key"
              :class="key === 'allowRefund' || key === 'endorse' ? 'bl' : 'or'"
            >
              {{ key | formatCard(key) }}
            </div>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "CiList",
  data() {
    return {
      //数据
      cinemas: [],
      //是否加载动画
      isLoading: true,
      prevCityId: -1,
    };
  },

  activated() {
    this.getCiList();
  },

  //过滤器
  filters: {
    formatCard(key) {
      var card = [
        {
          key: "allowRefund",
          value: "改签",
        },
        {
          key: "endorse",
          value: "退",
        },
        {
          key: "sell",
          value: "折扣卡",
        },
        {
          key: "snack",
          value: "小吃",
        },
      ];

      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      //如果都没有匹配给个默认值空
      return "";
    },
  },

  methods: {
    async getCiList() {
      var cityId = this.$store.state.city.id;
      if (this.prevCityId === cityId) return;
      this.isLoading = true;
      const res = await this.$http.get("/api/ajax/cinemaList?ci=" + cityId);
      if (res.status === 200) {
        this.cinemas = res.data.cinemas;
        this.isLoading = false;
        this.prevCityId = cityId;
      }
    },
  },
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-child(1) {
  display: inline-block;
  text-overflow: ellipsis;
  width: 220px;
  overflow: hidden;
  white-space: nowrap;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
