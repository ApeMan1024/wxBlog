const app=getApp();
const fetch=require("../../utils/fetch")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 评论内容
    nei:"",
    // 文章内容
    md:"",
    //文章信息
    obj:{},
    // 上一篇文章的信息
    obj1: {},
    //下一篇文章的信息
    obj2: {},
    //判断是否存在上一篇文章
    bool1:true,
    //判断是否存在下一篇文章
    bool2:true,
    //评论的信息
    arr:[],
    //当前文章的id
    id:0,
    //评论字数限制
    total:100
  },
  async getUserInfo(e){
    let date=new Date();
    let time = date.getFullYear() + "-" + 
    ((date.getMonth() + 1) + "-").padStart(2,"0")+
      (date.getDate() + "").padStart(2, "0") + " " +
       date.getHours().toString().padStart(2, "0") + ":" + 
       date.getMinutes().toString().padStart(2,"0")+":"+date.getSeconds().toString().padStart(2,"0");
    let obj={
      id:this.data.id,
      nei:this.data.nei,
      name: e.detail.userInfo.nickName,
      src: e.detail.userInfo.avatarUrl,
      time
    }
    let arr=this.data.arr;
    arr.unshift(obj);
    this.setData({
      arr,
      nei:""
    });
    let {data:res}=await fetch(app.baseUrl+"ping","POST",{ping:obj})
    if(res.code===200){
      wx.showToast({
        title: '评论成功',
        icon:"success"
      })
      return 
    }
    wx.showToast({
      title: '评论失败',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let id = options.id;
    
    //设置文章的浏览次数
    await fetch(app.baseUrl+'browse_num',"POST",{id:id}).catch(err=>err)

    // 获取文章的信息
    let {data:res}=await fetch(app.baseUrl+"wen","POST",{id})
    if(res.code===200){
      let {wen}=res.data
      this.setData({
        obj:wen[0]
      })
      let {data:res1}=await fetch(app.baseUrl+"wenmd","POST",{id})
      if(res1.data.obj.before){
        res1.data.obj.before.url='/pages/browse/browse?id='+res1.data.obj.before.id
      }
      if(res1.data.obj.next){
        res1.data.obj.next.url='/pages/browse/browse?id='+res1.data.obj.next.id
      }
      if(res1.code===200){
        //设置文章数据
        this.setData({
          md:res1.data.md,
          obj1:res1.data.obj.before?res1.data.obj.before:{},
          obj2:res1.data.obj.next?res1.data.obj.next:{},
          bool1:res1.data.obj.before?true:false,
          bool2:res1.data.obj.next?true:false,
          arr:res1.data.pings,
          id
        })
      }
      return
    }
    wx.showToast({
      title: '数据获取失败',
      icon:"none"
    })
  },
})