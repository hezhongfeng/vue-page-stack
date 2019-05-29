import jpg0 from '@/assets/images/animals/0.jpg';
import jpg1 from '@/assets/images/animals/1.jpg';
import jpg2 from '@/assets/images/animals/2.jpg';
import jpg3 from '@/assets/images/animals/3.jpg';
import jpg4 from '@/assets/images/animals/4.jpg';
import jpg5 from '@/assets/images/animals/5.jpg';
import jpg6 from '@/assets/images/animals/6.jpg';
import jpg7 from '@/assets/images/animals/7.jpg';
import jpg8 from '@/assets/images/animals/8.jpg';

export default {
  orderList: [
    {
      src: jpg0
    },
    {
      src: jpg1
    },
    {
      src: jpg2
    },
    {
      src: jpg3
    },
    {
      src: jpg4
    },
    {
      src: jpg5
    },
    {
      src: jpg6
    },
    {
      src: jpg7
    },
    {
      src: jpg8
    }
  ],
  mainList: [
    {
      id: '0',
      background: 'linear-gradient( 135deg, #69FF97 10%, #00E4FF 100%)',
      icon: 'icongroup',
      message: '在vue-router上扩展，原有导航逻辑不需改变'
    },
    {
      id: '1',
      background: 'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
      icon: 'icononline-conference',
      message: 'push或者forward的时候重新渲染页面，Stack中会添加新渲染的页面'
    },
    {
      id: '2',
      background: 'linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)',
      icon: 'icontalk',
      message: 'back或者go(负数)的时候从Stack中获取先前的页面，会保留好先前的内容状态，例如表单内容等'
    },
    {
      id: '3',
      background: 'linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)',
      icon: 'iconpaper-plane',
      message: 'back或者go(负数)的时候会把不用的页面从Stack中移除'
    },
    {
      id: '4',
      background: 'linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%)',
      icon: 'iconapp',
      message: 'replace会更新Stack中页面信息'
    },
    {
      id: '5',
      background: 'linear-gradient( 135deg, #FFF6B7 10%, #F6416C 100%)',
      icon: 'iconfiles-and-folders1',
      message: '重新渲染的时候有activited钩子函数触发'
    },
    {
      id: '6',
      background: 'linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)',
      icon: 'iconfile',
      message: '支持浏览器的后退，前进事件'
    },
    {
      id: '7',
      background: 'linear-gradient( 135deg, #FFE985 10%, #FA742B 100%)',
      icon: 'iconfolder',
      message: '支持响应路由参数的变化'
    },
    {
      id: '8',
      background: 'linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)',
      icon: 'iconnotebook2'
    },
    {
      id: '9',
      background: 'linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%)',
      icon: 'iconmonitor'
    },
    {
      id: '10',
      background: 'linear-gradient( 135deg, #C2FFD8 10%, #465EFB 100%)',
      icon: 'iconcalendar2'
    },
    {
      id: '11',
      background: 'linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%)',
      icon: 'iconedit-tools'
    },
    {
      id: '12',
      background: 'linear-gradient( 135deg, #FAD7A1 10%, #E96D71 100%)',
      icon: 'iconchecklist'
    },
    {
      id: '13',
      background: 'linear-gradient( 135deg, #F6CEEC 10%, #D939CD 100%)',
      icon: 'icondraw'
    }
  ]
};
