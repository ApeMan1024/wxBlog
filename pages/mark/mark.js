const app= getApp();
const fetch=require("../../utils/fetch")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    mode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let {name:mode}=options
    this.setData({
      mode
    })
  },
  async onShow(){
    let {data:res}=await fetch(app.baseUrl+"wen","POST",{mode:this.data.mode})
    if(res.code===200){
      let {data}=res
      let wen=data.wen.map(item=>{
        item.src1=app.baseUrl+item.src1
        item.url='/pages/browse/browse?id='+item.id
        return item
      })
      await this.setData({
        arr:wen
      })
      return 
    }
    wx.showToast({
      title: '获取数据失败',
      icon:"none"
    })
  },
  
})