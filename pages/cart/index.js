// pages/cart/index.js
Page({
  data: {
      list:[],
      allPrice:0,
      imgUrl:"http://111.230.173.74:7001/consumer/showEInvoice/?FileName="
  },
  getMsg(){
      let that=this;
      let id=wx.getStorageSync("openid");
      wx.request({  
        url: 'http://111.230.173.74:7008/thread/getCart/',
        method: 'get',    
        data:{
          Id:JSON.stringify(id)
        },
        header: {  
          'content-type': 'application/json'
        },
        success: function (res) {
          let lists=res.data.购物车的商品
          lists.forEach((i) => {
            i.number=1;
          })
         that.setData({
           list:lists
         })
        },
        fail:function(err){
          console.log(err)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMsg()
  }
})