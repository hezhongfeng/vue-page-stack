<template>
  <div class="product-list">
    <!-- <product-item @click.native="onClick(item)" v-for="item of productList" :key="item.id" :productName="item.productName"></product-item> -->
  </div>
</template>

<script>
// import ProductItem from './PruductItem';

export default {
  name: 'ProductList',
  // components: { ProductItem },
  props: {},
  data() {
    return {
      productList: []
      // productList: [
      //   {
      //     id: '0',
      //     productName: '电脑'
      //   },
      //   {
      //     id: '1',
      //     productName: '篮球'
      //   },
      //   {
      //     id: '2',
      //     productName: '衣服'
      //   },
      //   {
      //     id: '3',
      //     productName: '裤子'
      //   },
      //   {
      //     id: '4',
      //     productName: '鼠标'
      //   },
      //   {
      //     id: '5',
      //     productName: 'SSD'
      //   },
      //   {
      //     id: '6',
      //     productName: '手机'
      //   },
      //   {
      //     id: '7',
      //     productName: '玻璃杯'
      //   },
      //   {
      //     id: '8',
      //     productName: '文学'
      //   },
      //   {
      //     id: '9',
      //     productName: '手办'
      //   }
      // ]
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log('ProductList created');
    this.getList();
  },
  methods: {
    onClick(item) {
      this.$router.push('/item/' + item.id);
    },
    getList() {
      setTimeout(() => {
        this.productList = [
          {
            id: '0',
            name: '苹果（Apple） MacBook Pro13.3英寸 2018新款/2017款苹果笔记本电脑 17款银色/128G/无Bar/MPXR2CH/A',
            price: '8888.88',
            img:
              'https://img10.360buyimg.com/n2/s240x240_jfs/t1/27576/27/10895/182437/5c8a7cddE228f270d/393920514d20b8b5.jpg!q70.jpg'
          },
          {
            id: '1',
            name: 'Apple MacBook Air 13.3英寸笔记本电脑 银色(2017款Core i5 处理器/8GB内存/128GB闪存 MQD32CH/A)',
            price: '5988',
            img:
              'https://img11.360buyimg.com/n2/s240x240_jfs/t1/19909/19/2981/167543/5c231ea8Ed0bfe0c0/f3fb909386a790a4.jpg!q70.jpg'
          },
          {
            id: '2',
            price: '14188',
            name: 'Apple MacBook Pro 13.3英寸笔记本电脑 深空灰色 2018新款（四核八代i5 8G 256G固态硬盘 MR9Q2CH/A）',
            img:
              'https://img13.360buyimg.com/n2/s240x240_jfs/t1/15445/5/2946/178160/5c2325f9Ee9236ae9/6c2a5e9f2d14489a.jpg!q70.jpg'
          },
          {
            id: '3',
            name: 'Apple MacBook Pro 13.3英寸笔记本电脑 银色 2018新款（四核八代i5 8G 256G固态硬盘 MR9U2CH/A）',
            price: '13452',
            img: 'https://img13.360buyimg.com/n2/s240x240_jfs/t21631/84/2298558907/306845/1e75dd0c/5b4ee806N5fdcb463.jpg!q70.jpg'
          },
          {
            id: '4',
            name: 'Apple MacBook Pro 15.4英寸笔记本电脑 深空灰色 配备2018新款（六核八代i7 16G 256G固态硬盘 MR932CH/A）',
            price: '18688',
            img:
              'https://img14.360buyimg.com/mobilecms/s270x270_jfs/t19960/20/1662777286/277967/615ccafb/5b4f0dd7Nf3eb96b8.jpg!q70.dpg.webp'
          },
          {
            id: '6',
            name: 'Apple MacBook Air 13.3英寸笔记本电脑 银色(定制升级Core i7/8GB内存/128GB SSD闪存 Z0UU00022）',
            price: '6988',
            img:
              'https://img11.360buyimg.com/mobilecms/s270x270_jfs/t1/21878/9/2966/167543/5c231e4fE1817c631/0fb5eb90a6cb7066.jpg!q70.dpg.webp'
          }
        ];
      }, 200);
    }
  }
};
</script>

<style lang="scss">
.product-list {
}
</style>
