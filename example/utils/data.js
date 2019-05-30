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
      background: '#6ab6fc',
      icon: 'icongroup',
      message: '在vue-router上扩展，原有导航逻辑不需改变'
    },
    {
      id: '1',
      background: '#a393eb',
      icon: 'icononline-conference',
      message: 'push或者forward的时候重新渲染页面，Stack中会添加新渲染的页面'
    },
    {
      id: '2',
      background: '#fc5c9c',
      icon: 'icontalk',
      message: 'back或者go(负数)的时候从Stack中获取先前的页面，会保留好先前的内容状态，例如表单内容等'
    },
    {
      id: '3',
      background: '#90f2ff',
      icon: 'iconpaper-plane',
      message: 'back或者go(负数)的时候会把不用的页面从Stack中移除'
    },
    {
      id: '4',
      background: '#a393eb',
      icon: 'iconapp',
      message: 'replace会更新Stack中页面信息'
    },
    {
      id: '5',
      background: '#fc5c9c',
      icon: 'iconfiles-and-folders1',
      message: '重新渲染的时候有activited钩子函数触发'
    },
    {
      id: '6',
      background: '#3d84a8',
      icon: 'iconfile',
      message: '支持浏览器的后退，前进事件'
    },
    {
      id: '7',
      background: '#46cdcf',
      icon: 'iconfolder',
      message: '支持响应路由参数的变化'
    },
    {
      id: '8',
      background: '#00b8a9',
      icon: 'iconnotebook2'
    },
    {
      id: '9',
      background: '#8ef6e4',
      icon: 'iconmonitor'
    },
    {
      id: '10',
      background: '#9896f1',
      icon: 'iconcalendar2'
    },
    {
      id: '11',
      background: '#fc5c9c',
      icon: 'iconedit-tools'
    },
    {
      id: '12',
      background: '#a393eb',
      icon: 'iconchecklist'
    },
    {
      id: '13',
      background: '#90f2ff',
      icon: 'icondraw'
    }
  ]
};
