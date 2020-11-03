const fetch=require("./utils/fetch")
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  // www.apeman1024.xyz
  list:[],
  baseUrl:"http://49.235.208.156/wx/",
  async onLaunch() {
    wx.removeStorageSync('userInfo')
    await fetch(this.baseUrl+"blognum","POST")
  },
})
