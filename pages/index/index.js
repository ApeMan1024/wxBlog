const app = getApp();
const fetch=require("../../utils/fetch")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断是否已经把所有的文章显示完整
    bool: false,
    arr1: [],
    img:[],
    currentPage:1,
    pageSize:4,
    total:0,
  },
  bindtap(e){
    let { mold } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/mark/mark?name='+mold,
    })
    
  },
  //小程序显示时触发这个生命周期函数
  async onShow(){
    //获取轮播图数据
    let {data:res}=await fetch(app.baseUrl+'img').catch(err=>err)
    if(res.code===200){
      let img=res.data.map(item=>{
        return app.baseUrl+item
      })
      this.setData({
        img
      })
    }
    this.setData({
      currentPage:1,arr1:[],total:0
    })
    await this.getWenArr()
  },
  //获取文章数据
  async getWenArr(){
    let {data:res1}=await fetch(app.baseUrl+"wen","POST",{
      currentPage:this.data.currentPage,pageSize:this.data.pageSize
    }).catch(err=>err)
    if(res1.code==200){
      let arr1=[...this.data.arr1,...res1.data.wen.map(item=>{
        item.src1=app.baseUrl+item.src1
        item.url='/pages/browse/browse?id='+item.id
        return item
      })]
      this.setData({
        arr1,total:res1.data.total
      })
      return
    }
    wx.showToast({
      title: '数据获取失败',
      icon:"none"
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({
      currentPage:1,arr1:[],total:0
    })
    await this.getWenArr()
  },

  async onReachBottom() {
    let {arr1,total,currentPage}=this.data
    if(arr1.length===total){
      this.setData({
        bool:true
      })
      return
    }
    this.setData({
      currentPage:currentPage+1
    })
    await this.getWenArr()
  },

})