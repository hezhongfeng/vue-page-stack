<template>
  <div class="main-detail">
    <stack-header></stack-header>
    <div class="p-scroll-wrap">
      <div class="desc-wrap">
        <div class="desc">detail.desc</div>
      </div>
      <div class="form">
        <van-field v-model="textValue" placeholder="顶部对齐" />
        <van-button @click="onPushSame" type="primary" block>detail.push.same</van-button>
        <van-button @click="onLogin" type="primary" block>detail.push.login</van-button>
        <van-button @click="onPush" type="primary" block>detail.push.list</van-button>
        <van-button @click="onReplace" type="primary" block>detail.replace</van-button>
        <van-button type="primary" block>detail.currentPageNumber</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import StackHeader from './StackHeader.vue';

const router = useRouter();
const route = useRoute();

const userName = ref('');
const textValue = ref('');
const pageIndex = ref(0);

onMounted(() => {
  console.log('detail mounted');
});

onActivated(() => {
  console.log('detail activated');
  if (window.sessionStorage.username) {
    userName.value = window.sessionStorage.username;
  }
  if (textValue.value) {
    textValue.value = textValue.value + ' + activated';
  }
});

onBeforeRouteUpdate(() => {});

// eslint-disable-next-line no-unused-vars
const animatedNumber = computed(() => {
  return pageIndex.value.toFixed(1);
});

const onLogin = () => {
  router.push('/login');
};
const onReplace = () => {
  router.replace('/main-detail/' + (Number(route.params.id) + 1));
};
const onPushSame = () => {
  router.push('/main-detail/' + (Number(route.params.id) + 1));
};
const onPush = () => {
  router.push('/home');
};
</script>

<style lang="scss">
.main-detail {
  min-height: 100%;
  padding-top: 45px;
  .p-scroll-wrap {
    height: calc(100% - 90px);
  }
  .desc-wrap {
    padding: 10px;
    line-height: 1.5;
    font-size: 14px;
    color: #333;
  }
  .form {
    padding: 0 10px 10px 10px;
    > * {
      margin-top: 10px;
    }
  }
  .index {
    margin-top: 20vw;
  }
}
</style>
