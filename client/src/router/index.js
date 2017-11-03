import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Answer from '@/components/Answer'
import Maincontent from '@/components/Maincontent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
      children: [
        {
          path: '',
          component: Maincontent
        },
        {
          path: ':id',
          component: Answer,
          props: true
        }
      ]
    }
  ]
})
