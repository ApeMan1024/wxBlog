const app=getApp();
const fetch=require("../../utils/fetch")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[2020,1,31,0,0,0],
    str1:"100 天 10  时 10  分  10  秒",
    id:"",
    md: "",
    reward:app.baseUrl+"images/shang/reward.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      id:options.id
    })
    if (options.id == "4") {
      let arr = this.data.arr;
      let tim = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      let newtim = new Date();
      let obj = this.timer(tim, newtim);
      this.setData({
        str1: `${obj.day}  天  ${obj.h}  时  ${obj.d}  分  ${obj.s}  秒`
      })
      setInterval(()=>{
        newtim = new Date();
         obj=this.timer(tim, newtim);
        this.setData({
          str1:`${obj.day}  天  ${obj.h}  时  ${obj.d}  分  ${obj.s}  秒`
        })
      },1000);
    }
    if(options.id=='2'){
      let {data:res}=await fetch(app.baseUrl+"about","POST")
      if(res.code===200){
        this.setData({
          md:res.data
        })
        return
      }
      wx.showToast({
        title: '获取数据失败',
        icon:"none"
      })
    }
    if(options.id==1){
      let {data:res}=await fetch(app.baseUrl+"userinfo","POST")
      if(res.code===200){
        this.setData({
          md:res.data
        })
        return
      }
      wx.showToast({
        title: '获取数据失败',
        icon:"none"
      })
    }
  },
  timer(tim,newtim){
    let day= Math.floor((newtim-tim)/(1000*60*60*24));
    let h = Math.floor((((newtim - tim) / (1000 * 60 * 60 * 24)) - day) * 24).toString().padStart(2,"0");
    let d = Math.floor((((((newtim - tim) / (1000 * 60 * 60 * 24)) - day) * 24) - h) * 60).toString().padStart(2, "0");
    let s = Math.floor((((((((newtim - tim) / (1000 * 60 * 60 * 24)) - day) * 24) - h) * 60) - d) * 60).toString().padStart(2, "0");
    let obj={
      day,h,d,s
    }
    return obj;
  },

})