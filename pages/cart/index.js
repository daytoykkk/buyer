// pages/cart/index.js
Page({
  data: {
    list: [],
    popList: [],
    imgUrl: "http://111.230.173.74:7001/consumer/showEInvoice/?FileName=",
    totalNumber: 0,//选择数量
    totalPrice: 0,//总价格
    allChecked: false,
    list_chosen: []
  },
  getMsg() {
    let that = this;
    let id = wx.getStorageSync("openid");
    wx.request({
      url: 'http://111.230.173.74:7008/thread/getCart/',
      method: 'get',
      data: {
        Id: JSON.stringify(id)
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let lists = res.data.购物车的商品
        if (!lists) {
          return
        }
        lists.forEach((i) => {
          i.productNumber = 1;
          i.checked = false;
        })
        let allchk = lists.every(v => v.checked)
        that.setData({
          list: lists,
          number: lists.length,
          allChecked: allchk
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  getPop() {
    let that = this
    wx.request({
      url: 'http://111.230.173.74:7008/thread/getTag/',
      method: 'get',
      data: {
        ProductTag: "本周热门"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          popList: res.data.这个标签的货物
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //加入购物车
  sendCart(item) {
    let that = this;
    let id = wx.getStorageSync("openid");
    let product = JSON.stringify(item.currentTarget.dataset.item)

    wx.request({
      url: 'http://111.230.173.74:7008/thread/sendCart/',
      method: 'get',
      data: {
        Id: JSON.stringify(id),
        Products: JSON.stringify(product)
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data == "OK") {
          wx.showToast({
            title: "成功加入购物车",
            icon: 'success',
            duration: 2000
          })
          that.onLoad()
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //去商品详情页
  toGoodMsg(item) {
    let name = item.currentTarget.dataset.item.productName;
    wx.navigateTo({
      url: '/pages/goodmsg/index?productname=' + name
    });
  },
  //商品选中
  handleChk(e) {
    let good_id = e.currentTarget.dataset.id;
    let cart = this.data.list
    let index = cart.findIndex(v => v.productId === good_id)  //找下标
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  //设置购物车状态 同时设置底部工具栏的三个属性
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNumber = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.productPrice * v.productNumber;
        totalNumber += v.productNumber
      } else {
        allChecked = false
      }
    })

    allChecked = cart.length != 0 ? allChecked : false

    this.setData({
      list: cart,
      totalNumber,
      totalPrice,
      allChecked
    })
  },
  //商品全选功能
  handleAllchk(){
      let {list,allChecked}=this.data
      allChecked=!allChecked;
      list.forEach(v=>v.checked=allChecked)
      this.setCart(list)
  },
  //处理商品数量
  handleNum(e){
      let {operation,id}=e.currentTarget.dataset;
      let {list}=this.data;
      let index=list.findIndex(v=>v.productId===id)
      if(list[index].productNumber==1&&operation==-1){
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '宝贝数量不能再减少了',
          confirmText: '好呗',
          confirmColor: '#575757'
        });
        return
      }
      list[index].productNumber+=operation;
      this.setCart(list)
  },
  onLoad: function () {
  },
  onShow: function () {
    this.getMsg()
    this.getPop()
  }
})