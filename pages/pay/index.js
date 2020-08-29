// pages/pay/index.js

Page({
  data: {
    imgUrl: "https://fzulyt.fun:7001/consumer/showEInvoice/?FileName=",
    msg: "",
    totalPrice: "",
    totalNumber: "",
    cart: [],//给后台的
    old_cart: [],//展示的

    multiIndex: [0, 0, 0],
    multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
    startDate: " > "
  },

  pickerTap() {
    let date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];
    let currentHours = date.getHours();
    let currentMinute = date.getMinutes();
    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md);
    }

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours+1; i < 24; i++) {
        hours.push(i);
      }

      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }

    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }

      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
 }


    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },
  bindMultiPickerColumnChange(e) {

    var that = this;

  
    var hours = [];
    var minute = [];

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;
    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);
        
      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if(data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },
  bindStartMultiPickerChange(e) {
    let ziti="";
    if(e.detail.value[0]==0){
      let date=new Date();
      ziti="2020-"+(date.getMonth()+1)+"-"+date.getDate()+" "+this.data.multiArray[1][e.detail.value[1]]+":"+this.data.multiArray[2][e.detail.value[2]]+":00"
    }else if(e.detail.value[0]==1){
      let date=new Date();
      let nextDate= new Date(date.getTime() + 24*60*60*1000)
      ziti="2020-"+(nextDate.getMonth()+1)+"-"+nextDate.getDate()+" "+this.data.multiArray[1][e.detail.value[1]]+":"+this.data.multiArray[2][e.detail.value[2]]+":00"
    }
    else{
     ziti="2020-"+this.data.multiArray[0][e.detail.value[0]]+" "+this.data.multiArray[1][e.detail.value[1]]+":"+this.data.multiArray[2][e.detail.value[2]]+":00"
    }
    this.setData({
      startDate:ziti
    })
  },
  loadData: function (hours, minute) {
    var minuteIndex;
    let date=new Date()
    let currentHours = date.getHours();
    let currentMinute = date.getMinutes();
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute){
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function (hours, minute) {
    var minuteIndex;
    let date=new Date()
    let currentHours = date.getHours();
    let currentMinute = date.getMinutes();
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },



  //买家留言
  orderMsg(e) {
    this.setData({
      msg: e.detail.value
    })
  },
  //获取信息
  getMsg() {
    let that = this;
    let carts = [];
    let cart = wx.getStorageSync("cart")
    let totalPrice = wx.getStorageSync("totalPrice")
    let totalNumber = wx.getStorageSync("totalNumber")

    let old_cart = cart.filter(v => v.checked);

    that.setData({
      old_cart
    })

    let len = cart.length
    for (let i = 0; i < len; i++) {
      let number = cart[i].productNumber
      delete cart[i].productNumber
      delete cart[i].checked
      delete cart[i].x
      carts.push({
        "product": JSON.stringify(cart[i]),
        "number": number
      })
    }

    that.setData({
      cart: carts,
      totalPrice,
      totalNumber
    })
  },
  //生成时间
  newTime() {
    let date = new Date()
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  //提交订单
  subOrder() {
    if(this.data.startDate==" > "){
      wx.showToast({
        title: '请选择自提时间！！',
        icon: 'none',
        duration: 1500
      });
      return
    }
    let that = this;
    let date = that.newTime()
    let id = wx.getStorageSync("openid")
    let userInfo = JSON.parse(wx.getStorageSync("userInfo").rawData)
    let cart = that.data.cart
    let hhh = ""

    cart.forEach(i => {
      hhh += JSON.parse(i.product).productId + "-" + i.number + "-" + JSON.parse(i.product).productPrice + "-"
    });
    hhh = hhh.substr(0, hhh.length - 1)

    wx.request({
      url: 'https://fzulyt.fun:7008/thread/subOrder/',
      method: 'get',
      data: {
        OrderProduct: JSON.stringify(that.data.cart),
        OrderTime:that.data.startDate,   //自提时间
        Id: JSON.stringify(id),
        aq: hhh,
        totalPrice: that.data.totalPrice,
        totalNumber: that.data.totalNumber,
        face: userInfo.avatarUrl,
        name: userInfo.nickName,
        time: date   //订单时间
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.这个订单的订单号) {
          wx.setStorageSync("orderId", res.data.这个订单的订单号);
          let data = {
            orderTime: that.data.startDate,   //自提时间
            Id: id,
            aq: hhh,
            totalPrice: JSON.stringify(that.data.totalPrice),
            totalNumber:JSON.stringify(that.data.totalNumber),
            face: userInfo.avatarUrl,
            name: userInfo.nickName,
            time: date ,  //订单时间
            orderState:"no",
            orderId:res.data.这个订单的订单号
          }
          that.data.ws.send({
            data: JSON.stringify(data),
            success: (e) => {
              console.log(e)
            },
            fail: (e) => {
              console.log(e)
            }
          })
          wx.showToast({
            title: '提交订单成功',
            icon: 'success',
            duration: 1500,
            success: (result) => {
              wx.navigateTo({
                url: '/pages/order/index'
              });
            }
          });

        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  initWebSocket: function () {
    let _this = this; 
    let id = wx.getStorageSync("openid")
    let ws = wx.connectSocket({
      url: 'wss://fzulyt.fun:7007/websocket/1/' + id,
      header: {
        'content-type': 'application/json',
      },
      timeout: 5000,//超时时间，单位为毫秒
      success: (e) => {//接口调用成功的回调函数
        console.log(e)
      },
      fail: (e) => {//接口调用失败的回调函数
        console.log(e)
      },
      complete: (e) => {//接口调用结束的回调函数（调用成功、失败都会执行）
        console.log(e)
      }
    })
    _this.setData({
      ws
    })
    ws.onError((e) => {
      console.log(e)
    })

    ws.onMessage = function (e) {
      console.log("on:" + "e")
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    this.getMsg()
    this.initWebSocket()
  }
})