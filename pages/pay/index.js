// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrl:"http://111.230.173.74:7001/consumer/showEInvoice/?FileName=",
      msg:"",
      totalPrice:"",
      totalNumber:"",
      cart:[],
      old_cart:[]
  },
  //买家留言
  orderMsg(e){
    this.setData({
      msg:e.detail.value
    })
  },
  //获取信息
  getMsg(){
    let that=this;
    let carts=[];
    let cart=wx.getStorageSync("cart")
    let totalPrice=wx.getStorageSync("totalPrice")
    let totalNumber=wx.getStorageSync("totalNumber")
    let len=cart.length
   
    that.setData({
     old_cart:cart
    })

    for(let i=0;i<len;i++){
      if(cart[i].checked){
        let number=cart[i].productNumber
        delete cart[i].productNumber
        delete cart[i].checked
        delete cart[i].x
        carts.push({
          "product":JSON.stringify(cart[i]),
          "number":number
        })
      }else{
        continue
      }
    }
  
    that.setData({
      cart:carts,
      totalPrice,
      totalNumber
    })
    console.log(that.data.cart)
    console.log(that.data.totalPrice)
  },
  //提交订单
  subOrder(){
      let that=this;
      let date=new Date()
      let id=wx.getStorageSync("openid")
      wx.request({  
        url: 'http://111.230.173.74:7008/thread/subOrder/',
        method: 'get',    
        data:{
          OrderProduct:JSON.stringify(that.data.cart),
          OrderTime:date,
          Id:JSON.stringify(id)
        },
        header: {  
          'content-type': 'application/json'
          // "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data.这个订单的订单号)
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

  },
  onShow:function(){
    this.getMsg()
  }
})