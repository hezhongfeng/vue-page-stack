<template>
  <div class="home">
    <div class="h-body">
      <van-tabs v-model:active="active">
        <van-tab name="0">
          <main-list />
        </van-tab>
        <van-tab name="1">
          <about />
        </van-tab>
      </van-tabs>
    </div>
    <div class="tabbars">
      <van-tabbar v-model="active">
        <van-tabbar-item name="0"
          >Home
          <template #icon>
            <i class="iconfont iconhome_fill_light" v-if="active === '0'"></i>
            <i class="iconfont iconhome_light" v-else></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="1"
          >关于
          <template #icon>
            <i class="iconfont iconmy_light" v-if="active === '0'"></i>
            <i class="iconfont iconmy_fill_light" v-else></i>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script lang="ts">
import MainList from '@/views/main/MainList.vue';
import About from '@/views/about/About.vue';
import { defineComponent, ref, onActivated, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: { About, MainList },
  beforeRouteUpdate() {
    console.log('beforeRouteUpdate');
  },
  setup: () => {
    const active = ref('0');

    onActivated(() => {
      console.log('Home activated');
    });

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
  .tabbars {
    height: 50px;
    .van-tabbar-item--active {
      color: $color-primary;
    }
  }
}
</style>
