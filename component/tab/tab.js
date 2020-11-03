// component/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arrtab:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bool:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  //计算属性
  observers:{
    "arrtab.length"(length){
      if(length){
        this.setData({
          bool: true
        })
        return
      }
      this.setData({
        bool: false
      })
    }
  }
})
