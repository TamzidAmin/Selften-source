

export default function ({ store, redirect }) {
   if (store.getters['auth/check']) {
    redirect({ name: 'home' })
  } else {
    redirect()
  }
}