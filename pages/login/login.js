const app=getApp()
const fetch=require("../../utils/fetch")
Page({
  //获取用户信息，并进行登录
  async getUserInfo(e){
    try {
      let {avatarUrl,nickName}=e.detail.userInfo
      let {code}=await wx.login()
      let {data:res}=await fetch(app.baseUrl+"wxlogin","POST",{
        code,avatarUrl,nickName
      })
      if(res.code===200){
        wx.setStorageSync('userInfo', {
          uuid:res.data,
          avatarUrl,
          nickName
        })
        wx.navigateBack({
          delta:1
        })
        return 
      }
      wx.showToast({
        title: '登录失败',
        icon:"none"
      })
    } catch (error) {
      wx.showToast({
        title: '登录失败',
        icon:"none"
      })
    }
  }
})