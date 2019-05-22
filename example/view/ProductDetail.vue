<template>
  <div class="product-detail">
    <StackHeader :title="$route.meta.title"></StackHeader>
    <div class="p-scroll-wrap">
      <cube-scroll ref="scroll">
        <cube-slide :data="items" :options="{freeScroll:true}"/>
        <div class="price_wrap">
          <div class="price">
            <span>￥17499.00</span>
          </div>
          <div class="group-action">
            <div class="action">
              <i class="iconfont iconjiage"></i>
              <span class="label">降价提醒</span>
            </div>
            <div class="action">
              <i class="iconfont iconguanzhu"></i>
              <span class="label">关注</span>
            </div>
          </div>
        </div>
        <div class="product-name">
          <i class="mod_tag">
            <img src="//img11.360buyimg.com/jdphoto/s48x28_jfs/t1/21003/5/383/1085/5c091660Ee610c7f9/1a67f8e9589bcee2.png">
          </i>
          Apple Macbook Pro 15.4【带触控栏】Core i7 16G 256G RP555X 深空灰 苹果笔记本电脑 轻薄本 MR932CH/A
        </div>
        <div class="promotion-wrap">
          <div class="p-label">
            <span>促销</span>
          </div>
          <div class="p-list">
            <div class="promotion">
              <div class="tag">
                <em class="hl_red_bg">会员特价</em>
              </div>
              <div class="p-desc">请登录 确认是否可享受该优惠</div>
            </div>
            <div class="promotion">
              <div class="tag">
                <em class="hl_red_bg">赠品</em>
              </div>
              <div class="p-desc">
                <span>AESIR AR1802BBHUI016 AESIR MacBook 经典休闲双肩包 灰色 X1</span>
              </div>
            </div>
            <div class="promotion">
              <div class="tag">
                <em class="hl_red_bg">优惠套装</em>
              </div>
              <div class="p-desc">该商品共有6款优惠套装</div>
            </div>
          </div>
        </div>
        <div class="gap-wrap"></div>
        <div class="promotion-wrap bottom-border">
          <div class="p-label">
            <span>已选</span>
          </div>
          <div class="p-content">
            <div class="major-info">六核八代i7 16G 256G 15.4英寸灰,普通版,1个</div>
            <div class="service">本商品支持保障服务、京东服务，点击可选服务</div>
          </div>
        </div>
        <div class="promotion-wrap">
          <div class="p-label">
            <span>送至</span>
          </div>
          <div class="p-content">
            <div class="major-info">北京朝阳区三环到四环之间</div>
            <div class="service">
              <span class="hot">现货</span>11:10前下单，预计今天(05月21日)送达
            </div>
          </div>
        </div>
        <div class="promotion-wrap bottom-border">
          <div class="p-label">
            <span>重量</span>
          </div>
          <div class="p-content">
            <div class="major-info">3.24kg</div>
          </div>
        </div>
        <div class="detail-serve">
          <div class="serve-item">99元免基础运费(20kg内)</div>
          <div class="serve-item">京东发货&售后</div>
          <div class="serve-item">京尊达</div>
          <div class="serve-item">京准达</div>
          <div class="serve-item">211限时达</div>
        </div>
        <div class="gap-wrap"></div>
        <div class="imang-wrap">
          <img src="../assets/images/bg.png">
        </div>
        <div class="imang-wrap">
          <a href="https://placeholder.com">
            <img src="https://via.placeholder.com/450">
          </a>
        </div>
        <cube-button @click="onLogin">登录</cube-button>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import StackHeader from '@/components/header/StackHeader.vue';

export default {
  name: 'ProductDetail',
  components: { StackHeader },
  props: {},
  data() {
    return {
      items: [
        {
          image:
            '//m.360buyimg.com/mobilecms/s750x750_jfs/t19960/20/1662777286/277967/615ccafb/5b4f0dd7Nf3eb96b8.jpg!q80.dpg.webp'
        },
        {
          image:
            '//m.360buyimg.com/mobilecms/s720x720_jfs/t23212/240/1049590393/117739/fe939687/5b4f0dcfNd58d6625.jpg!q70.dpg.webp'
        },
        {
          image:
            '//m.360buyimg.com/mobilecms/s720x720_jfs/t22795/240/1062706195/66979/c8ba712a/5b4f0de4N4e7ca8b2.jpg!q70.dpg.webp'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.$route);
    console.log('ProductDetail created');
  },
  mounted() {
    console.log('ProductDetail mounted');
  },
  methods: {
    back() {
      this.$router.back();
    },
    onLogin() {}
  }
};
</script>

<style lang="scss">
.product-detail {
  height: 100%;
  background: #e8e8ed;
  .p-scroll-wrap {
    height: calc(100% - 45px);
    .cube-slide {
      height: 100vw;
    }
    .price_wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 10px;
      background: #fff;
      .price {
        span {
          color: #e4393c;
          font-weight: 700;
          line-height: 1.3;
          font-size: 24px;
        }
      }
      .group-action {
        display: flex;
        .action {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #666;
          margin-right: 10px;
          .label {
            margin-top: 5px;
          }
        }
      }
    }
    .product-name {
      background: #fff;
      color: #333;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      position: relative;
      padding: 0 10px 10px 10px;
      .mod_tag {
        height: 15px;
        display: inline-block;
        img {
          display: block;
          height: 100%;
        }
      }
      &::after {
        content: '';
        height: 0;
        display: block;
        border-top: 1px solid #ddd;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 10px;
      }
    }
    .promotion-wrap {
      display: flex;
      justify-items: center;
      background: #fff;
      padding: 12px 0 12px 10px;
      position: relative;
      .p-label {
        width: 50px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .p-list {
        width: calc(100% - 50px);
        .promotion {
          display: flex;
          margin: 5px 0;
          line-height: 1.5;
          .tag {
            flex-shrink: 0;
            .hl_red_bg {
              margin-right: 5px;
              position: relative;
              padding: 0 3px;
              height: 15px;
              line-height: 15px;
              font-size: 10px;
              color: #e4393c;
              background: #fff;
              border-color: #e4393c;
              border-radius: 2px;
              &:after {
                content: '';
                display: block;
                border: 1px solid #e4393c;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                pointer-events: none;
              }
            }
          }
          .p-desc {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
          }
        }
      }
      .p-content {
        width: calc(100% - 50px);
        line-height: 1.5;
        .major-info {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #333;
          line-height: 22px;
        }
        .service {
          font-size: 12px;
          color: #999;
          .hot {
            font-size: 12px;
            color: #e4393c;
            margin-right: 3px;
          }
        }
      }
      &.bottom-border::after {
        content: '';
        height: 0;
        display: block;
        border-top: 1px solid #ddd;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 10px;
      }
    }
    .gap-wrap {
      padding-top: 10px;
      background: #e8e8ed;
    }
    .detail-serve {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 10px 0 10px;
      line-height: 1.5;
      .serve-item {
        padding: 5px 12px 5px 0;
        &:before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          margin-top: -2px;
          margin-right: 5px;
          width: 12px;
          height: 12px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTOU5O+Q5POU5POQ4O+U4PN80P+M4O+Q4O+Q4POQ5POQ4OuQ4O+Q4O+I4PuQ5PJxkAycAAAAPdFJOUwAf+VSoeAvzws7ka7miLboUzckAAADJSURBVBjTY2BgYGCMWVR5VIABDBid/gPBFwjP/JOzQKKtfjGIzf3fEUSJ/N8AJO21Iao3fQbqqA+AcLi/CzCwfGGAAn8HBnlFMIttBoP4R4b4C2BOzk8G3q8M5w3AnPsLGZj/MKwHW8b6/QED4y8G/QQQx14ZSHwCcWYkMOtvAHOAyvqnPf8KcuMvkAGZP9eDjAQaEO/AwDb/D0gj0GiQpRnTQIYIfUR1DopDGexVIZygz8ieC4B6WyzRBOJtBkZ/pAABBZUWOKgAispF5e7ibycAAAAASUVORK5CYII=)
            no-repeat;
          background-size: 12px auto;
        }
      }
    }
    .cube-btn {
      border-radius: 0;
    }
    .imang-wrap {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
