<template>
  <div class="main-detail">
    <stack-header :title="$route.meta.title"></stack-header>
    <div class="p-scroll-wrap">
      <cube-scroll ref="scroll">
        <div class="form">
          <cube-input v-model="textValue" placeholder="输入必要信息"></cube-input>
          <cube-button @click="onPush">Push</cube-button>
          <cube-button @click="onReplace">Replace</cube-button>
          <cube-button @click="onLogin">登录</cube-button>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import StackHeader from '@/components/header/StackHeader.vue';

export default {
  name: 'MainDetail',
  components: { StackHeader },
  props: {},
  data() {
    return {
      textValue: ''
    };
  },
  created() {
    console.log('detail created');
  },
  mounted() {
    console.log('detail mounted');
  },
  activated() {
    console.log('detail activated');
  },
  methods: {
    back() {
      this.$router.back();
    },
    onLogin() {
      this.$router.push('/login');
    },
    onReplace() {
      this.$router.replace(this.$route.path);
    },
    onPush() {
      this.$router.push(this.$route.path);
    }
  }
};
</script>

<style lang="scss">
.cube-btn {
  margin-bottom: 10px;
  border-radius: 5px;
  background: $color-primary;
}
.main-detail {
  .p-scroll-wrap {
    height: calc(100% - 45px);
  }
  .form {
    padding: 10px;
    .cube-input {
      margin-bottom: 10px;
    }
    .cube-btn {
      margin-bottom: 10px;
    }
  }
}
</style>
