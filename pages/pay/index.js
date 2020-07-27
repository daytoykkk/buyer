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
  //生成时间
  newTime(){
    let y = date.getFullYear();  
    let m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    let d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    let h = date.getHours();  
    h=h < 10 ? ('0' + h) : h;  
    let minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    let second=date.getSeconds();  
    second=second < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
  },
  //提交订单
  subOrder(){
      let that=this;
      let date=that.newTime()
      let id=wx.getStorageSync("openid")
      let userInfo=JSON.parse(wx.getStorageSync("userInfo").rawData)
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
          OrderTime:date,   //自提时间
          Id:JSON.stringify(id),
          aq:hhh,
          totalPrice:that.data.totalPrice,
          totalNumber:that.data.totalNumber,
          face:userInfo.avatarUrl,
          name:userInfo.nickName,
          time:date   //订单时间
        },
        header: {  
          'content-type': 'application/json'
        },
        success: function (res) {
         if(res.data.这个订单的订单号){
           wx.setStorageSync("orderId", res.data.这个订单的订单号);
           let data={
            OrderProduct:JSON.stringify(that.data.cart),
            OrderTime:date,   //自提时间
            Id:JSON.stringify(id),
            aq:hhh,
            totalPrice:that.data.totalPrice,
            totalNumber:that.data.totalNumber,
            face:userInfo.avatarUrl,
            name:userInfo.nickName,
            time:date   //订单时间
           }
           that.data.ws.send({
             data:JSON.stringify(data),
             success:(e)=>{
               console.log(e)
             },
             fail:(e)=>{
               console.log(e)
             }
           })
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
  initWebSocket: function() {
    let _this = this;id
    let id=wx.getStorageSync("openid")
    let ws = wx.connectSocket({
      url: 'wss://fzulyt.fun:7007/websocket/1/'+id,
      header:{
        'content-type': 'application/json',
      },
      timeout:5000,//超时时间，单位为毫秒
      success:(e)=>{//接口调用成功的回调函数
        console.log(e)
      },
      fail:(e)=>{//接口调用失败的回调函数
        console.log(e)
      },
      complete:(e)=>{//接口调用结束的回调函数（调用成功、失败都会执行）
        console.log(e)
      }
      })
      _this.setData({
        ws
      })
    ws.onError((e) =>{
      console.log(e)
    })
    
    ws.onMessage = function(e) {
     console.log("on:"+"e")
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow:function(){
    //this.getMsg()
    //this.initWebSocket()
  }
})