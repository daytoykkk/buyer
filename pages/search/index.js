// pages/search/index.js
Page({
  data: {
      name:""
  },
  //返回上一页
  back(){
    wx.navigateBack({
      delta: 1,
      success: function() {
          console.log('成功！')
      }
    })
  }
})