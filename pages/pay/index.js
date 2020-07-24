// pages/pay/index.js
Page({
  data: {
      imgUrl:"https://fzulyt.fun:7001/consumer/showEInvoice/?FileName=",
      msg:"",
      totalPrice:"",
      totalNumber:"",
      cart:[],//给后台的
      old_cart:[]//展示的
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
   
   let old_cart=cart.filter(v=>v.checked);
    
    that.setData({
     old_cart
    })

    let len=cart.length
    for(let i=0;i<len;i++){
        let number=cart[i].productNumber
        delete cart[i].productNumber
        delete cart[i].checked
        delete cart[i].x
        carts.push({
          "product":JSON.stringify(cart[i]),
          "number":number
        })
    }
  
    that.setData({
      cart:carts,
      totalPrice,
      totalNumber
    })
  },
  //提交订单
  subOrder(){
      let that=this;
      let date=new Date()
      let id=wx.getStorageSync("openid")
      let cart=that.data.cart
      let hhh=""
      cart.forEach(i => {
        hhh+=JSON.parse(i.product).productId+"-"+i.number+"-"+JSON.parse(i.product).productPrice+"-"
      });
      hhh=hhh.substr(0,hhh.length-1)
      
      wx.request({  
        url: 'https://fzulyt.fun:7008/thread/subOrder/',
        method: 'get',    
        data:{
          OrderProduct:JSON.stringify(that.data.cart),
          OrderTime:date,
          Id:JSON.stringify(id),
          aq:hhh,
          totalPrice:that.data.totalPrice,
          totalNumber:that.data.totalNumber
        },
        header: {  
          'content-type': 'application/json'
        },
        success: function (res) {
         if(res.data.这个订单的订单号){
           wx.setStorageSync("orderId", res.data.这个订单的订单号);
          wx.showToast({
            title: '提交订单成功',
            icon: 'success',
            duration: 1500,
            success: (result)=>{
              wx.navigateTo({
                url: '/pages/order/index'
              });
            }
          });
             
         }
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