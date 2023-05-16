<template>
  <div class="main-list">
    <div style="height: 45px"></div>
    <div class="scroll" ref="wrapper">
      <div class="scroll-content">
        <main-item
          v-for="(item, index) of list"
          :key="index"
          :item="item"
          :index="index"
          @click="onClick(item)"
        ></main-item>
      </div>
    </div>
    <stack-header title="home"></stack-header>
  </div>
</template>

<script setup>
import BScroll from '@better-scroll/core';
import { ref, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import MainItem from './MainItem.vue';
import StackHeader from './StackHeader.vue';

const router = useRouter();

const list = ref([
  {
    id: '0',
    background: '#7effdb',
    message: '在vue-router上扩展，原有导航逻辑不需改变'
  },
  {
    id: '1',
    background: '#a393eb',
    message: 'push或者forward的时候重新渲染页面，Stack中会添加新渲染的页面'
  },
  {
    id: '2',
    background: '#fc5c9c',
    message: 'back或者go(负数)的时候从Stack中获取先前的页面，会保留好先前的内容状态，例如表单内容等'
  },
  {
    id: '3',
    background: '#90f2ff',
    message: 'back或者go(负数)的时候会把不用的页面从Stack中移除'
  },
  {
    id: '4',
    background: '#a393eb',
    message: 'replace会更新Stack中页面信息'
  },
  {
    id: '5',
    background: '#fc5c9c',
    message: '重新渲染的时候有activited钩子函数触发'
  },
  {
    id: '6',
    background: '#3d84a8',
    message: '支持浏览器的后退，前进事件'
  },
  {
    id: '7',
    background: '#46cdcf',
    message: '支持响应路由参数的变化'
  },
  {
    id: '8',
    background: '#00b8a9'
  },
  {
    id: '9',
    background: '#8ef6e4'
  },
  {
    id: '10',
    background: '#9896f1'
  },
  {
    id: '11',
    background: '#fc5c9c'
  },
  {
    id: '12',
    background: '#a393eb'
  },
  {
    id: '13',
    background: '#90f2ff'
  }
]);

const wrapper = ref(null);

const bs = ref(null);

const onClick = item => {
  router.push('/main-detail/' + item.id);
};

onMounted(() => {
  bs.value = new BScroll(wrapper.value, {
    click: true,
    wheel: true
  });
});

onActivated(() => {
  console.log('activated');
});

// 滚动区域动态填满后，需要刷新bs的滚动区域
setTimeout(() => {
  bs.value.refresh();
}, 100);
</script>

<style lang="scss">
.main-list {
  height: 100%;
  position: relative;
  .scroll {
    height: calc(100% - 70px);
  }
}
</style>
