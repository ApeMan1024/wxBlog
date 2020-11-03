module.exports=function fetch(url,method='GET',data={},header={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url,method,data,header,
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}