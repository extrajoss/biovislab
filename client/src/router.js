import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/tabs/Home'
import People from './components/tabs/People'
import Projects from './components/tabs/Projects'
import About from './components/tabs/About'
import Private from './components/tabs/Private'
import Login from './components/Login'
import Register from './components/Register'
import EditUser from './components/EditUser'
import AdminUsers from './components/AdminUsers'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/private',
    name: 'private',
    component: Private
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/people',
    name: 'people',
    component: People
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/edit-user',
    name: 'editUser',
    component: EditUser
  },
  {
    path: '/admin-users',
    name: 'adminUsers',
    component: AdminUsers
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: ForgotPassword
  },
  {
    path: '/resetPassword/:tokenId',
    name: 'resetPassword',
    component: ResetPassword
  }
  ]
})

export default router
