<template>
  <div class="c-home">
    <div class="h-body">
      <cube-tab-panels v-model="selectedIndex">
        <cube-tab-panel label="主页" value="0">
          <main-list></main-list>
        </cube-tab-panel>
        <cube-tab-panel label="购物车" value="1"></cube-tab-panel>
        <cube-tab-panel label="订单" value="2">
          <order-list></order-list>
        </cube-tab-panel>
        <cube-tab-panel label="我的" value="3">
          <my></my>
        </cube-tab-panel>
      </cube-tab-panels>
    </div>
    <div class="h-tabbars">
      <cube-tab-bar v-model="selectedIndex" @change="changeHandler">
        <cube-tab v-for="(item) in tabs" :icon="item.icon" :label="item.label" :value="item.value" :key="item.value"></cube-tab>
      </cube-tab-bar>
    </div>
  </div>
</template>

<script>
import MainList from '@/view/main/MainList';
import OrderList from '@/view/order/OrderList';
import My from '@/view/my/My';

export default {
  name: 'Home',
  components: { MainList, My, OrderList },
  props: {},
  data() {
    return {
      selectedIndex: '0'
    };
  },
  computed: {
    tabs() {
      return [
        {
          value: '0',
          label: '主页',
          icon: 'iconfont ' + (this.selectedIndex === '0' ? 'iconhome_fill_light' : 'iconhome_light')
        },
        {
          value: '1',
          label: '功能',
          icon: 'iconfont ' + (this.selectedIndex === '1' ? 'icongongneng' : 'icongongneng1')
        },
        {
          value: '2',
          label: '订单列表',
          icon: 'iconfont ' + (this.selectedIndex === '2' ? 'iconorder' : 'iconorderlisto')
        },
        {
          value: '3',
          label: '我的',
          icon: 'iconfont ' + (this.selectedIndex === '3' ? 'iconmy_fill_light' : 'iconmy_light')
        }
      ];
    }
  },
  watch: {
    $route(to, from) {
      console.log('$route change');
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate');
    next();
  },
  created() {
    console.log('Home created');
    this.selectedIndex = this.$route.params.tab || '0';
  },
  activated() {
    console.log('Home activated');
  },
  mounted() {},
  methods: {
    changeHandler(index) {
      this.$router.push('/home/' + index);
    }
  }
};
</script>

<style lang="scss">
.c-home {
  height: 100%;
  .h-body {
    height: calc(100% - 50px);
    .cube-tab-panels,
    .cube-tab-panels-group {
      height: 100%;
    }
    .cube-tab-panels-group {
      transition: none;
    }
  }
  .h-tabbars {
    height: 50px;
    .cube-tab-bar {
      border-top: 1px #9999994f solid;
      height: 100%;
      .cube-tab {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        i {
          font-size: 20px;
          margin-bottom: 3px;
        }
        &.cube-tab_active {
          color: $color-primary;
        }
      }
    }
  }
}
</style>
