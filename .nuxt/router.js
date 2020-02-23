import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ec91347c = () => interopDefault(import('..\\resources\\pages\\addwallet.vue' /* webpackChunkName: "pages_addwallet" */))
const _3e577726 = () => interopDefault(import('..\\resources\\pages\\digitalcode.vue' /* webpackChunkName: "pages_digitalcode" */))
const _11791cc2 = () => interopDefault(import('..\\resources\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _31485fe5 = () => interopDefault(import('..\\resources\\pages\\leaderboard.vue' /* webpackChunkName: "pages_leaderboard" */))
const _e70465b0 = () => interopDefault(import('..\\resources\\pages\\playzone.vue' /* webpackChunkName: "pages_playzone" */))
const _ea7597de = () => interopDefault(import('..\\resources\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _9d531cd0 = () => interopDefault(import('..\\resources\\pages\\topup.vue' /* webpackChunkName: "pages_topup" */))
const _a024b87e = () => interopDefault(import('..\\resources\\pages\\wallet.vue' /* webpackChunkName: "pages_wallet" */))
const _6a731dcf = () => interopDefault(import('..\\resources\\pages\\gamematch\\_id.vue' /* webpackChunkName: "pages_gamematch__id" */))
const _f4a1a390 = () => interopDefault(import('..\\resources\\pages\\join\\_id.vue' /* webpackChunkName: "pages_join__id" */))
const _03a61528 = () => interopDefault(import('..\\resources\\pages\\singlegame\\_id.vue' /* webpackChunkName: "pages_singlegame__id" */))
const _54dceaba = () => interopDefault(import('..\\resources\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/addwallet",
    component: _ec91347c,
    name: "addwallet"
  }, {
    path: "/digitalcode",
    component: _3e577726,
    name: "digitalcode"
  }, {
    path: "/inspire",
    component: _11791cc2,
    name: "inspire"
  }, {
    path: "/leaderboard",
    component: _31485fe5,
    name: "leaderboard"
  }, {
    path: "/playzone",
    component: _e70465b0,
    name: "playzone"
  }, {
    path: "/profile",
    component: _ea7597de,
    name: "profile"
  }, {
    path: "/topup",
    component: _9d531cd0,
    name: "topup"
  }, {
    path: "/wallet",
    component: _a024b87e,
    name: "wallet"
  }, {
    path: "/gamematch/:id?",
    component: _6a731dcf,
    name: "gamematch-id"
  }, {
    path: "/join/:id?",
    component: _f4a1a390,
    name: "join-id"
  }, {
    path: "/singlegame/:id?",
    component: _03a61528,
    name: "singlegame-id"
  }, {
    path: "/",
    component: _54dceaba,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
