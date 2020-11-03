const app=getApp();
const fetch=require("../../utils/fetch")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:["vue","java","git","css","javascript","html",],
    colorArr:["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
    "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
    "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
    "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
    "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"],
    arr:[],
    arr1:[],
    nei:""
  },
  async bindtap(){
    let {nei}=this.data
    if(!nei){
      wx.showToast({
        title: '请输入内容',
        icon:"none"
      })
      return
    }
    let {data:res}=await fetch(app.baseUrl+"swen","POST",{select:nei})
    if(res.code===200){
      let {data}=res
      data=data.map(item=>{
        item.src1=app.baseUrl+item.src1
        item.url='/pages/browse/browse?id='+item.id
        return item
      })
      this.setData({
        arr1:data,
        nei:""
      })
      return
    }
    wx.showToast({
      title: '查询失败',
      icon:"none"
    })

  },
  async onShow(){
    //获取博客分类
    let {data:res}=await fetch(app.baseUrl+"fen","POST")
    let fen=res.data.map(item=>{
      item.url=`/pages/mark/mark?name=${item.name}`
      return item
    })
    if(res.code===200){
      this.setData({
        list:fen
      })
    }
    //获取标签云
    let { length } = this.data.colorArr;
    let arr = [];
    for (var i = 0; i < this.data.list.length; i++) {
      var j = Math.floor((Math.random() * 1000) % length);
      while (arr.indexOf(this.data.colorArr[j]) != -1) {
        j = Math.floor((Math.random() * 1000) % length);
      }
      arr.push(this.data.colorArr[j]);
    }
    this.setData({
      arr
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      arr1:[]
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      arr1: []
    })
  },
})