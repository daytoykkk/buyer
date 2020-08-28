// pages/user/index.js
Page({
  data: {
    name: "",
    city: "",
    txUrl: "",
    imgUrl: "https://fzulyt.fun:7001/consumer/showEInvoice/?FileName=",
    isAll: false,//true时显示全部订单
    list: [],
    zhuangtai:"当前订单",
    select:false
  },
  getMsg() {
    let id=wx.getStorageSync("openid")
    if(!id){
      wx.navigateTo({
        url: '/pages/login/index'
      })
      return
    }
    let msg = JSON.parse(wx.getStorageSync('userInfo').rawData);
    this.setData({
      name: msg.nickName,
      city: msg.city,
      txUrl: msg.avatarUrl
    })
  },
  getOrders() {
    let that = this;
    let id = wx.getStorageSync("openid")
    wx.request({
      url: 'https://fzulyt.fun:7008/thread/getOrderById/',
      method: 'get',
      data: {
        Id: JSON.stringify(id)
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let list = res.data.这个用户的所有订单
        if (!list) {
          return
        }
        
       that.getOrderProduct(list)
     
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //切换全部订单和现在当前订单
  invertisAll(e) {
    let that = this;
    let name=e.currentTarget.dataset.name
    this.setData({
      isAll: !that.data.isAll,
      select:false,
      zhuangtai:name
    })
  },
  //获取每个订单的信息
  getOrderProduct(list) {
    let that = this;
    let id = wx.getStorageSync("openid")
    list.forEach(i=>{
      wx.request({  
        url: 'https://fzulyt.fun:7008/thread/getOrderProduct/',
        method: 'get',    
        data:{
          OrderId:i.orderId,
          Id:JSON.stringify(id)
        },
        header: {  
          'content-type': 'application/json'
        },
        success: function (res) {  
          let cart=JSON.parse(res.data.这个订单的货物)
          let len=cart.length
          let num=0
          let cartImg=[]
          let totalPrice=0
          for(let j=0;j<len;j++){
            num+=cart[j].number
            totalPrice+=cart[j].number*JSON.parse(cart[j].product).productPrice
            let temp= JSON.parse(cart[j].product).productState
            cartImg.push({
              temp
            })
          }
          i.num=num;
          i.Img=cartImg
          i.totalPrice=totalPrice
          that.setData({
            list
          })
        },
        fail:function(err){
          console.log(err)
        }
      })
    })
  
    return list
  },
  toOrder(e){
      wx.setStorageSync("orderId",e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '/pages/order/index'
      });
  },
  bindShowMsg(){
    this.setData({
      select:!this.data.select
    })
  },
  onShow: function () {
    this.getMsg()
    this.getOrders()
  }
})