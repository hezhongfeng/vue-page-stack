<template>
  <div class="product-list">
    <product-item @click.native="onClick(item)" v-for="item of productList" :key="item.id" :product="item"></product-item>
  </div>
</template>

<script>
import ProductItem from './PruductItem';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: {},
  data() {
    return {
      productList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log('ProductList created');
    console.log(this.$route);
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
            comment: '13万+条评价',
            shopName: 'Apple产品京东自营旗舰店',
            commentTags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png',
              'http://img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png'
            ],
            tags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t7867/19/1452018090/1756/1c57bcf8/599cf3f5N7dbe95e5.png',
              'https://img11.360buyimg.com/jdphoto/s28x28_jfs/t13501/220/748441324/1050/f2add5a2/5a128a72N857b1c57.png'
            ],
            img:
              'https://img10.360buyimg.com/n2/s240x240_jfs/t1/27576/27/10895/182437/5c8a7cddE228f270d/393920514d20b8b5.jpg!q70.jpg'
          },
          {
            id: '1',
            name: 'Apple MacBook Air 13.3英寸笔记本电脑 银色(2017款Core i5 处理器/8GB内存/128GB闪存 MQD32CH/A)',
            price: '5988',
            comment: '1500+条评价',
            shopName: 'Apple产品京东自营旗舰店',
            commentTags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png',
              'http://img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png'
            ],
            tags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t7867/19/1452018090/1756/1c57bcf8/599cf3f5N7dbe95e5.png',
              'https://img11.360buyimg.com/jdphoto/s28x28_jfs/t13501/220/748441324/1050/f2add5a2/5a128a72N857b1c57.png'
            ],
            img:
              'https://img11.360buyimg.com/n2/s240x240_jfs/t1/19909/19/2981/167543/5c231ea8Ed0bfe0c0/f3fb909386a790a4.jpg!q70.jpg'
          },
          {
            id: '2',
            price: '14188',
            comment: '4800+条评价',
            shopName: 'Apple产品京东自营旗舰店',
            commentTags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png',
              'http://img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png'
            ],
            name: 'Apple MacBook Pro 13.3英寸笔记本电脑 深空灰色 2018新款（四核八代i5 8G 256G固态硬盘 MR9Q2CH/A）',
            tags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t7867/19/1452018090/1756/1c57bcf8/599cf3f5N7dbe95e5.png',
              'https://img11.360buyimg.com/jdphoto/s28x28_jfs/t13501/220/748441324/1050/f2add5a2/5a128a72N857b1c57.png'
            ],
            img:
              'https://img13.360buyimg.com/n2/s240x240_jfs/t1/15445/5/2946/178160/5c2325f9Ee9236ae9/6c2a5e9f2d14489a.jpg!q70.jpg'
          },
          {
            id: '3',
            name: 'Apple MacBook Pro 13.3英寸笔记本电脑 银色 2018新款（四核八代i5 8G 256G固态硬盘 MR9U2CH/A）',
            price: '13452',
            comment: '8万+条评价',
            shopName: 'Apple产品京东自营旗舰店',
            commentTags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png',
              'http://img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png'
            ],
            tags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t7867/19/1452018090/1756/1c57bcf8/599cf3f5N7dbe95e5.png',
              'https://img11.360buyimg.com/jdphoto/s28x28_jfs/t13501/220/748441324/1050/f2add5a2/5a128a72N857b1c57.png'
            ],
            img: 'https://img13.360buyimg.com/n2/s240x240_jfs/t21631/84/2298558907/306845/1e75dd0c/5b4ee806N5fdcb463.jpg!q70.jpg'
          },
          {
            id: '4',
            name: 'Apple MacBook Pro 15.4英寸笔记本电脑 深空灰色 配备2018新款（六核八代i7 16G 256G固态硬盘 MR932CH/A）',
            price: '18688',
            comment: '4800+条评价',
            shopName: 'Apple产品京东自营旗舰店',
            commentTags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png',
              'http://img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png'
            ],
            tags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t7867/19/1452018090/1756/1c57bcf8/599cf3f5N7dbe95e5.png',
              'https://img11.360buyimg.com/jdphoto/s28x28_jfs/t13501/220/748441324/1050/f2add5a2/5a128a72N857b1c57.png'
            ],
            img:
              'https://img14.360buyimg.com/mobilecms/s270x270_jfs/t19960/20/1662777286/277967/615ccafb/5b4f0dd7Nf3eb96b8.jpg!q70.dpg.webp'
          },
          {
            id: '6',
            name: 'Apple MacBook Air 13.3英寸笔记本电脑 银色(定制升级Core i7/8GB内存/128GB SSD闪存 Z0UU00022）',
            price: '6988',
            comment: '800+条评价',
            shopName: 'Apple产品京东自营旗舰店',
            commentTags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png',
              'http://img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png'
            ],
            tags: ['https://img11.360buyimg.com/jdphoto/s28x28_jfs/t13501/220/748441324/1050/f2add5a2/5a128a72N857b1c57.png'],
            img:
              'https://img11.360buyimg.com/mobilecms/s270x270_jfs/t1/21878/9/2966/167543/5c231e4fE1817c631/0fb5eb90a6cb7066.jpg!q70.dpg.webp'
          },
          {
            id: '7',
            name: 'Apple MacBook Air 13.3英寸笔记本电脑 深空灰色(2018款Retina屏/八代Core i5 /8GB内存/128GB闪存 MRE82CH/A)',
            price: '8999',
            comment: '16万条评价',
            shopName: 'Apple产品京东自营旗舰店',
            commentTags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png',
              'http://img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png'
            ],
            tags: ['https://img11.360buyimg.com/jdphoto/s48x28_jfs/t7867/19/1452018090/1756/1c57bcf8/599cf3f5N7dbe95e5.png'],
            img:
              'https://img11.360buyimg.com/mobilecms/s270x270_jfs/t1/1220/37/13788/157410/5bd8a51bEe66a9536/b3cc2f3bf386bcbb.jpg!q70.dpg.webp'
          },
          {
            id: '8',
            name:
              'APPLE苹果 MacBook air13.3英寸2017年款苹果电脑笔记本商务轻薄本 标配+防水手提包+无线充电鼠标垫（下单送超值礼包） i5+8GB内存+128GB闪存 【D32】',
            price: '6058',
            comment: '480+条评价',
            shopName: 'Apple产品京东自营旗舰店',
            commentTags: [
              'https://img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png',
              'http://img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png'
            ],
            tags: ['https://img11.360buyimg.com/jdphoto/s28x28_jfs/t13501/220/748441324/1050/f2add5a2/5a128a72N857b1c57.png'],
            img:
              'https://img13.360buyimg.com/mobilecms/s270x270_jfs/t1/20924/13/11008/110310/5c8cb556Ec17fe165/b47f313d75f1aaa0.jpg!q70.dpg.webp'
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
