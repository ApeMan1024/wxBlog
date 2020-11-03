// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bool:true,
    src:"/images/zuo.png",
    name:"",
    url:[
      {
        id:1,
        name:"关于博主",
        cla:"icon-xiaoxiongwanju"
      },
      {
        id:2,
        name:"博客简介",
        cla: "icon-baobaohaoqi"
      },
      {
        id:3,
        name:"打赏博主",
        cla: "icon-qiangbao"
      },
      {
        id:4,
        name:"博客在线时间",
        cla: "icon-baobaoshufu"
      }
    ]
  },
  //用户登录
  onLoginHandle(){
    wx.navigateTo({
      url:"/pages/login/login"
    })
  },
  onShow(){
    let userInfo=wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        bool:false,
        src:userInfo.avatarUrl,
        name:userInfo.nickName
      })
    }
  }
})