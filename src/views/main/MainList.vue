<template>
  <div class="main-list">
    <stack-header title="home"></stack-header>
    <div>
      <main-item
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :index="index"
        @click="onClick(item)"
      ></main-item>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import data from '../../utils/data';
import MainItem from './MainItem.vue';
import StackHeader from './StackHeader.vue';

const router = useRouter();

const list = ref([]);

const onClick = item => {
  router.push('/main-detail/' + item.id);
};
const getList = () => {
  setTimeout(() => {
    list.value = data.mainList;
  }, 200);
};

onMounted(() => {
  // console.log(this.$pageStack.getStack());
});

onActivated(() => {
  console.log('activated');
});

getList();
</script>

<style lang="scss">
.main-list {
  height: calc(100% - 45px);
}
</style>
