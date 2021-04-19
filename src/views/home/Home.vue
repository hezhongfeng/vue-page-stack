<template>
  <div class="home">
    <div class="h-body">
      <van-tabs v-model:active="active">
        <van-tab>
          <main-list />
        </van-tab>
        <van-tab>
          <about />
        </van-tab>
      </van-tabs>
    </div>
    <div class="tabbars">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">Home</van-tabbar-item>
        <van-tabbar-item icon="search">关于</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import MainList from '@/views/main/MainList.vue';
import About from '@/views/about/About.vue';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: { About, MainList },
  props: {},
  // data() {
  //   return {
  //     selectedIndex: '0',
  //   };
  // },
  // computed: {
  //   tabs() {
  //     return [
  //       {
  //         value: '0',
  //         label: this.$t('home'),
  //         icon:
  //           'iconfont ' + (this.selectedIndex === '0' ? 'iconhome_fill_light' : 'iconhome_light'),
  //       },
  //       {
  //         value: '1',
  //         label: this.$t('about'),
  //         icon: 'iconfont ' + (this.selectedIndex === '1' ? 'iconmy_fill_light' : 'iconmy_light'),
  //       },
  //     ];
  //   },
  // },
  // watch: {
  //   $route(to, from) {
  //     console.log('$route change');
  //   },
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate');
  //   next();
  // },
  // created() {
  //   console.log('Home created');
  //   this.selectedIndex = this.$route.params.tab || '0';
  // },
  // activated() {
  //   console.log('Home activated');
  // },
  setup: () => {
    const active = ref(2);
    return {
      active,
    };
  },
});
</script>

<style lang="scss">
.home {
  height: 100%;
  .h-body {
    height: calc(100% - 50px);
    .van-tabs__wrap {
      display: none;
    }
  }
  .h-tabbars {
    height: 50px;
  }
}
</style>
