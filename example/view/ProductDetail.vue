<template>
  <div class="product-detail">
    <cube-slide :data="items"/>
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
    <div class="desc">【品牌秒杀】MacbookPro视网膜原彩显示,TouchBar+TouchID,钜惠秒杀,先到先得!Pro+Beats千元优惠,不容错过!</div>
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
          <div class="p-desc">AESIR AR1802BBHUI016 AESIR MacBook 经典休闲双肩包 灰色 X1</div>
        </div>
        <div class="promotion">
          <div class="tag">
            <em class="hl_red_bg">优惠套装</em>
          </div>
          <div class="p-desc">该商品共有6款优惠套装</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  components: {},
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
    console.log('ProductDetail created');
  },
  mounted() {
    console.log('ProductDetail mounted');
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss">
.product-detail {
  height: 100%;
  background: #e8e8ed;
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
    .mod_tag {
      height: 15px;
      display: inline-block;
      img {
        display: block;
        height: 100%;
      }
    }
  }
  .desc {
    background: #fff;
    overflow: hidden;
    text-overflow: clip;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 34px;
    padding: 3px 0;
    line-height: 1.3;
    color: #999;
    max-height: none;
  }
  .promotion-wrap {
    display: flex;
    justify-items: center;
    background: #fff;
    .p-label {
      width: 50px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .p-list {
      padding: 10px 0;
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
        }
      }
    }
  }
}
</style>
