<template>
  <div class="detail">
    <stack-header></stack-header>
    detail
    <!-- <div class="p-scroll-wrap">
      <cube-scroll ref="scroll">
        <div class="desc-wrap">
          <div class="desc">可以在下面的input中输入内容，然后push到下一页面</div>
        </div>
        <div class="form">
          <cube-input v-model="textValue" placeholder="输入一些信息"></cube-input>
          <cube-button @click="onPushSame">Push到下一页</cube-button>
          <cube-button @click="onLogin">Push到登录</cube-button>
          <cube-button @click="onPush">Push到列表(可以缓存相同的页面)</cube-button>
          <cube-button @click="onReplace">Replace当前页</cube-button>
          <cube-button>当前页码{{ ' ' + animatedNumber }}</cube-button>
        </div>
      </cube-scroll>
    </div> -->
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import StackHeader from '@/components/header/StackHeader.vue';
import { TweenLite } from 'gsap/TweenMax';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'MainDetail',
  components: { StackHeader },
  setup: () => {
    const textValue = ref('');
    const router = useRouter();
    const onBack = () => {
      router.back();
    };
    const onLogin = () => {
      router.push('/login');
    };
    const onReplace = () => {
      router.replace('/main-detail/' + (Number(this.$route.params.id) + 1));
    };
    const onPushSame = () => {
      router.push('/main-detail/' + (Number(this.$route.params.id) + 1));
    };
    const onPush = () => {
      router.push('/home');
    };

    return {
      textValue,
      onBack,
      onLogin,
      onReplace,
      onPushSame,
      onPush,
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
    .cube-input {
      margin-bottom: 10px;
    }
    .cube-btn {
      margin-bottom: 10px;
    }
  }
  .index {
    margin-top: 20vw;
  }
}
</style>
