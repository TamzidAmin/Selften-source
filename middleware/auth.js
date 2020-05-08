export default function ({ store, redirect }) {
   if (!store.state.token) {
    redirect({ name: 'login' })
  } else {
    redirect()
  }
}
