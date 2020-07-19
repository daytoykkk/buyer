// pages/goodmsg/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      productname:"",
      msg:{},
      goodImgs:[]
  },
  //获取商品信息
  getMsg(){
      let that=this;
      wx.request({ 
        url: 'http://111.230.173.74:7001/consumer/showOneProduct/',
        method: 'get',    
        data:{
          ProductName:that.data.productname
        },
        header: { 
          'content-type': 'application/json'
        },
        success: function (res) {
         that.setData({
           msg:res.data.这个货物
         })
         that. getImgs();
        },
        fail:function(err){
          console.log(err)
        }
      })
  },
   //获取商品图片
   getImgs(){
    let that = this
    that.data.goodImgs=[]
    wx.request({ 
      url: 'http://111.230.173.74:7001/consumer/showProductImage/',
      method: 'get',    
      data:{
        ProductId:that.data.msg.productId
      },
      header: { 
        'content-type': 'application/json'
      },
      success: function (res) {
       let len=res.data.对应货物的图片.length
       for(let i=0;i<len;i++){
         if(res.data.对应货物的图片[i].imageState=="main"){
           let imgs=[];
           imgs.push("http://111.230.173.74:7001/consumer/showEInvoice/?FileName=" +
           res.data.对应货物的图片[i].imageName)
           that.setData({
             goodImgs:imgs.concat(that.data.goodImgs)
           })
         }else{
          let imgs=that.data.goodImgs;
           imgs.push( "http://111.230.173.74:7001/consumer/showEInvoice/?FileName=" +
           res.data.对应货物的图片[i].imageName)
           that.setData({
             goodImgs:imgs
           })
         }
       }
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  //去购物车页
  toCart(){
    wx.switchTab({
      url: "/pages/cart/index"
    });
  },
  //加入购物车
  addCart(){
     if( wx.getStorageSynv("userInfo")== null){
       wx.navigateTo({
          url: "/pages/login/index"
     })
     return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this;
      that.setData({
        productname:options.productname
      })
      that.getMsg()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})