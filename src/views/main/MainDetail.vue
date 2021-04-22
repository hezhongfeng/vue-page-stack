<template>
  <div class="detail">
    <stack-header></stack-header>
    <div class="p-scroll-wrap">
      <div class="desc-wrap">
        <div class="desc">可以在下面的input中输入内容，然后push到下一页面</div>
      </div>
      <div class="form">
        <van-field v-model="textValue" placeholder="输入一些信息"></van-field>
        <van-button type="primary" block @click="onPushSame">Push到下一页</van-button>
        <van-button type="primary" block @click="onPush">Push到列表(可以缓存相同的页面)</van-button>
        <van-button type="primary" block @click="onReplace">Replace当前页</van-button>
        <van-button type="primary" block disabled>当前页码{{ ' ' + id }}</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import StackHeader from '@/components/header/StackHeader.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainDetail',
  components: { StackHeader },
  setup: () => {
    console.log('setup');

    const textValue = ref('');
    const router = useRouter();
    const route = useRoute();
    const onBack = () => {
      router.back();
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
    const id = route.params.id;

    return {
      textValue,
      onBack,
      onReplace,
      onPushSame,
      onPush,
      id,
    };
  },
});
</script>

<style lang="scss">
.detail {
  min-height: 100%;
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
    .van-field {
      margin-bottom: 10px;
    }
    .van-button {
      margin-bottom: 10px;
    }
  }
  .index {
    margin-top: 20vw;
  }
}
</style>
