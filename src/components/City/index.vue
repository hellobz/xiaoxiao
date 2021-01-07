<template>
  <div class="city_body">
    <!-- <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li>上海</li>
        </ul>
      </div>
      <div class="city_sort">
        <div>
          <h2>A</h2>
          <ul>
            <li>阿拉善盟</li>
          </ul>
        </div>
        <div>
          <h2>B</h2>
          <ul>
            <li>北京</li>
            <li>保定</li>
            <li>蚌埠</li>
            <li>包头</li>
          </ul>
        </div>
        <div>
          <h2>A</h2>
          <ul>
            <li>阿拉善盟</li>
            <li>鞍山</li>
            <li>安庆</li>
            <li>安阳</li>
          </ul>
        </div>
       
        
        
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li>A</li>
      </ul>
    </div> -->

    <div class="city_list" ref="city_list">
      <Loading v-if="isLoading" />
      <!-- Scroller是针对一个整体的 有两个div是没效的 需在最外面包一个div -->
      <Scroller v-else ref="city_List">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotList"
                :key="item.id"
                @tap="handleToCity(item.nm, item.id)"
              >
                {{ item.nm }}
              </li>
            </ul>
          </div>
          <!--end city_hot-->

          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2 class="tag_list">{{ item.index }}</h2>
              <ul>
                <li
                  v-for="subItem in item.list"
                  :key="subItem.id"
                  @tap="handleToCity(subItem.nm, subItem.id)"
                >
                  {{ subItem.nm }}
                </li>
              </ul>
            </div>
          </div>
          <!--end city_sort-->
        </div>
      </Scroller>
    </div>

    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="item.id"
          @touchstart="handleToIndex(index)"
        >
          {{ item.index }}
        </li>
      </ul>
    </div>
    <!--end city_index-->
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      //是否加载动画
      isLoading: true,
    };
  },

  mounted() {
    this.getCityList();
  },

  methods: {
    getCityList() {
      var cityList = window.localStorage.getItem("cityList");
      var hotList = window.localStorage.getItem("hotList");
      if (cityList && hotList) {
        this.cityList = JSON.parse(cityList);
        this.hotList = JSON.parse(hotList);
        this.isLoading = false;
      } else {
        this.$http.get("/api/dianying/cities.json").then((res) => {
          if (res.status === 200) {
            var cities = res.data.cts;

            //改造成这个样子 [{index: 'A,list: [{nm:'阿城',id:123}]}]
            var { cityList, hotList } = this.formatCityList(cities);
            this.cityList = cityList;
            this.hotList = hotList;
            this.isLoading = false;
            //因为cityList是数组 而localStorage存储的字符串 为了不破坏原有数组将其用stringify转换 将变成字符串格式数组
            window.localStorage.setItem("cityList", JSON.stringify(cityList));
            window.localStorage.setItem("hotList", JSON.stringify(hotList));
          }
        });
      }
    },

    formatCityList(cities) {
      var cityList = [];
      var hotList = [];

      for (var i = 0; i < cities.length; i++) {
        if (cities[i].id <= 70) {
          hotList.push(cities[i]);
        }
      }

      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          //新添加索引index
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }],
          });
        } else {
          //累加到已有索引 index
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }

      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      function toCom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      return {
        cityList,
        hotList,
      };
    },

    handleToIndex(index) {
      // console.log(222);
      var h = this.$refs.city_sort.getElementsByClassName("tag_list");
      // console.log(h[index].offsetTop);
      // //parentNode.scrollTop 父节点的滚动高
      // console.log(111);
      // console.log(this.$refs.city_sort.parentNode.scrollTop);
      // console.log(this.$refs.city_list);
      //原生跳转
      // document.documentElement.scrollTop = h[index].offsetTop;
      //往上滚动为负值
      this.$refs.city_List.toScrollTop(-h[index].offsetTop);
    },

    // 点击修改城市
    handleToCity(nm, id) {
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.localStorage.setItem("nowNm", nm);
      window.localStorage.setItem("nowId", id);
      this.$router.push("/movie/nowplaying");
    },
  },
};
</script>

<style scoped>
#content .city_body {
  /* margin-top: 45px; */
  display: flex;
  overflow: auto;
  width: 100%;
  /* position: absolute; */
  /* top: 0; */
  /* bottom: 0; */
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort {
  margin-top: 365px;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
}
.city_body .city_index {
  position: fixed;
  top: 120px;
  right: 0;
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}

.city_body .city_index ul li {
  height: 21px;
}
</style>
