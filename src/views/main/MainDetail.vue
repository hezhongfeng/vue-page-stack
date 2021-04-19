<template>
  <div class="main-detail">
    <stack-header></stack-header>
    <div class="p-scroll-wrap">
      <cube-scroll ref="scroll">
        <div class="desc-wrap">
          <div class="desc">{{$t('detail.desc')}}</div>
        </div>
        <div class="form">
          <cube-input v-model="textValue" :placeholder="$t('detail.placeholder')"></cube-input>
          <cube-button @click="onPushSame">{{$t('detail.push.same')}}</cube-button>
          <cube-button @click="onLogin">{{$t('detail.push.login')}}</cube-button>
          <cube-button @click="onPush">{{$t('detail.push.list')}}</cube-button>
          <cube-button @click="onReplace">{{$t('detail.replace')}}</cube-button>
          <cube-button>{{$t('detail.currentPageNumber')}}{{' '+animatedNumber}}</cube-button>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import StackHeader from '@/components/header/StackHeader.vue';
import { TweenLite } from 'gsap/TweenMax';

export default {
  name: 'MainDetail',
  components: { StackHeader },
  props: {},
  data() {
    return {
      userName: '',
      textValue: '',
      pageIndex: 0
    };
  },
  created() {
    console.log('detail created');
    TweenLite.to(this, 0.7, { pageIndex: Number(this.$route.params.id) });
  },
  mounted() {
    console.log('detail mounted');
  },
  activated() {
    console.log('detail activated');
    if (window.sessionStorage.username) {
      this.userName = window.sessionStorage.username;
    }
    if (this.textValue) {
      this.textValue = this.textValue + ' + activated';
    }
  },
  beforeRouteUpdate(to, from, next) {
    TweenLite.to(this, 0.7, { pageIndex: Number(to.params.id) });
    next();
  },
  computed: {
    animatedNumber() {
      return this.pageIndex.toFixed(1);
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    onLogin() {
      this.$router.push('/login');
    },
    onReplace() {
      this.$router.replace('/main-detail/' + (Number(this.$route.params.id) + 1));
    },
    onPushSame() {
      this.$router.push('/main-detail/' + (Number(this.$route.params.id) + 1));
    },
    onPush() {
      this.$router.push('/home/0');
    }
  }
};
</script>

<style lang="scss">
.main-detail {
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
