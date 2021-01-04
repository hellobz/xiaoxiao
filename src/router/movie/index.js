export default {
  path: "/movie",
  /**按需载入 */
  // children里面path不用加斜杠，斜杠还是绝对路径 相对的movie跟city拼接到一起
  component: () => import("@/views/Movie"),
  children: [
    {
      path: "city",
      component: () => import("@/components/City"),
    },
    {
      path: "nowplaying",
      component: () => import("@/components/NowPlaying"),
    },
    {
      path: "comingsoon",
      component: () => import("@/components/ComingSoon"),
    },
    {
      path: "search",
      component: () => import("@/components/Search"),
    },
    {
      path: "/movie",
      redirect: "/movie/nowplaying",
    },
  ],
};
