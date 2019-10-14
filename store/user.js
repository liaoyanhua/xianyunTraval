export function state() {
  return {
    userinfo: {}
  }
}

export let mutations = {
  SetUserInfo(state, data) {
    state.userinfo = data;
  }
}

export let actions = {
  login(store, formData) {
    return  this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data: formData
    }).then(res => {
      store.commit('SetUserInfo', res.data)
      return res.data
    })
  },
    async register(store, captchas) {
      let res = await this.$axios({
        url: '/captchas',
        method: 'POST',
        data: {
          tel: captchas
        }
      })
      return res;
    }
  // register(store, captchas) {
  //   return  this.$axios({
  //     url: '/captchas',
  //     method: 'POST',
  //     data: {
  //       tel: captchas
  //     }
  //   })
  // }
}
