import Vue, { triggerRef } from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import addNewApp from '../views/Menu/addNewApp.vue'
import addNewPos from '../views/Menu/addNewPos.vue'
import listCurrApp from '../views/Menu/listCurrApp.vue'
import moreAboutApp from '../views/Menu/moreAboutApp.vue'
import rejectedApplications from'../views/Menu/rejectedApplications.vue'
import employee from '../views/Menu/employee.vue'
import candidate from '../views/Menu/candidate.vue'
import archive from '../views/Menu/archive.vue'
import detailAboutCount from '../views/users/detailAboutCount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Объекты',
    component: HomeView
  },
  {
    path: '/menu/:id/',
    name: 'Meню',
   //component: () => import('../views/MenuView.vue'),
    component: MenuView,
    props: true,
  },
  {
    path:'/addNewApp/:id',
    name:'Заявки',
   // component: () => import('../views/Menu/addNewApp.vue'),
     component: addNewApp,
    props:true,
  },
  {
    path:'/addNewApp/:id/appid/:appid',
    name:'Заявкa изменить',
   // component: () => import('../views/Menu/addNewApp.vue'),
     component: addNewApp,
    props:true,
  },
  {
    path:'/addNewPos/:id',
    name:'Вакансия',
    //component: () => import('../views/Menu/addNewPos.vue'),
    component:addNewPos,
    props:true,
  },
  {
    path:'/addNewPos/:id/vac/:vacid',
    name:'Вакансия изменить',
    //component: () => import('../views/Menu/addNewPos.vue'),
    component:addNewPos,
    props:true,
  },
  {
    path:'/listCurrApp/:id',
    name:'Список заявок',
   // component: () => import('../views/Menu/listCurrApp.vue'),
    component:listCurrApp,
    props:true,
  },
  {
    path:'/moreAboutApp/:id',
    name:'Описание вакансии',
    //component: () => import('../views/Menu/moreAboutApp.vue'),
    component: moreAboutApp,
    props:true,
  },
  {
    path:'/rejectedApp/:id',
    name:'Отклоненные заявки',
    //component: () => import('../views/Menu/rejectedApplications.vue'),
    component: rejectedApplications,
    props:true,
  },

  {
    path:'/employee/:id',
    name:'Сотрудники',
    //component: () => import('../views/Menu/employee.vue'),
    component: employee,
    props:true,
  },

  {
    path:'/candidate/:id',
    name:'Кандидаты',
    //component: () => import('../views/Menu/candidate.vue'),
    component: candidate,
    props:true,
  },

  {
    path:'/archive/:id',
    name:'Архив',
    //component: () => import('../views/Menu/archive.vue'),
    component: archive,
    props:true,
  },
  {
    path:'/detailAboutCount/:id',
    name:'Контакт',
    //component: () => import('../views/Menu/archive.vue'),
    component: detailAboutCount,
    props:true,
  },


]

const router = new VueRouter({
  mode: 'history',
  base: '/recruit/',
  routes
})

export default router
