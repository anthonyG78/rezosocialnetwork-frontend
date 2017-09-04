import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Toolbar from '@/components/Toolbar';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
// Layout
import indexLayout from '@/components/layout/index';
import presentationLayout from '@/components/layout/presentation';
// Pages
import signin from '@/components/pages/signin';
import about from '@/components/pages/about';
import communityPosts from '@/components/pages/communityPosts';
import posts from '@/components/pages/posts';
import friends from '@/components/pages/friends';
import discussions from '@/components/pages/discussions';
import profil from '@/components/pages/profil';
import post from '@/components/pages/post';
import discussion from '@/components/pages/discussion';
import searchUser from '@/components/pages/searchUser';

const authorizedRoutes = [
  'about',
];

Vue.use(Router);

const getSiteLayout = pageLayout => ({
  toolbar: Toolbar,
  navigation: Navigation,
  default: pageLayout,
  footer: Footer,
});

const router = new Router({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      components: getSiteLayout(indexLayout),
      children: [
        {
          path: '/',
          name: 'communityPosts',
          component: communityPosts,
        },
        {
          path: '/posts',
          name: 'posts',
          component: posts,
        },
        {
          path: '/friends',
          name: 'friends',
          component: friends,
        },
        {
          path: '/discussions',
          name: 'discussions',
          component: discussions,
        },
        {
          path: '/profil',
          name: 'profil',
          component: profil,
        },
        {
          path: '/profil/:userId',
          name: 'profil_profil',
          component: profil,
          props: true,
        },
        {
          path: '/profil/:userId/posts',
          name: 'profil_posts',
          component: posts,
          props: true,
        },
        {
          path: '/profil/:userId/discussions',
          name: 'profil_discussions',
          component: discussions,
          props: true,
        },
        {
          path: '/profil/:userId/friends',
          name: 'profil_friends',
          component: friends,
          props: true,
        },
      ],
    },
    {
      path: '/',
      // name: 'presentationLayout',
      components: getSiteLayout(presentationLayout),
      children: [
        {
          path: '/search/user/',
          name: 'searchUser',
          component: searchUser,
          props: true,
        },
        {
          path: '/post/:id',
          name: 'post',
          component: post,
          props: true,
        },
        {
          path: '/discussion/:discussionId',
          name: 'discussion',
          component: discussion,
          props: true,
        },
      ],
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin,
    },
    {
      path: '/about',
      name: 'about',
      components: {
        toolbar: Toolbar,
        navigation: Navigation,
        default: about,
        footer: Footer,
      },
    },
    {
      path: '*',
      name: '404',
      component: {
        template: '<div>404</div>',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (authorizedRoutes.indexOf(to.name) > -1) {
    next();
  } else if (to.name === 'signin') {
    store.dispatch('isAuthenticated').then((isAuth) => {
      if (isAuth) {
        next({ name: 'communityPosts' });
      } else {
        next();
      }
    });
  } else {
    store.dispatch('isAuthenticated').then((isAuth) => {
      if (!isAuth) {
        next({ name: 'signin' });
      } else {
        next();
      }
    });
  }

  // store.dispatch('isAuthenticated').then((isAuth) => {
  //   if (isAuth && to.name === 'signin') {
  //     next({ name: 'home' });
  //   } else if (isAuth) {
  //     next();
  //   } else {
  //     next({ name: 'signin' });
  //   }
  // });
});

export default router;
