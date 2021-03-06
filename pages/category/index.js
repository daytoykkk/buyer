// pages/category/index.js
Page({
  data: {
    currentIndex: 0,
    tag: "",
    tags: ["本周热门", "猜你喜欢", "肉蛋家禽", "熟食冻品", "水产海鲜", "方便食品", "罐头食品", "进口食品", "地方特产", "厨房调料", "火锅专区", "速冻包点"],
    list: [],
    imgUrl: "https://fzulyt.fun:7001/consumer/showEInvoice/?FileName=",
    windowHeight: 0
  },
  getGoods(item) {
    let { index } = item.currentTarget.dataset
    let currentTag = this.data.tags[index]
    this.setData({
      currentIndex: index,
      tag: currentTag
    })

    this.getMsg()
  },
  getMsg() {
    let that = this

    that.data.list = []
    wx.request({
      url: 'https://fzulyt.fun:7008/thread/getTag/',
      method: 'get',
      data: {
        ProductTag: that.data.tag
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data.这个标签的货物
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  toGoodMsg(item) {
    let name = item.currentTarget.dataset.item.productName;
    wx.navigateTo({
      url: '/pages/goodmsg/index?productname=' + name
    });
  },
  //加入购物车
  sendCart(item) {
    let that = this;
    let id = wx.getStorageSync("openid");
    if (!id) {
      wx.navigateTo({
        url: '/pages/login/index'
      })
      return
    }
    let product = JSON.stringify(item.currentTarget.dataset.item)

    wx.request({
      url: 'https://fzulyt.fun:7008/thread/sendCart/',
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
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    let that = this;
    
    let topHeight = 0;
    let height = wx.getSystemInfoSync().windowHeight;
    let width = wx.getSystemInfoSync().windowWidth;

    setTimeout(() => {
      wx.createSelectorQuery().select('#top_box').boundingClientRect(function (rect) {
        topHeight = rect.height
        that.setData({
          topHeight,
          windowHeight: height-topHeight-10
        })
      }).exec()
    }, 300)

    this.setData({
      width,
      height
    })
    this.setData({
      tag: wx.getStorageSync("tag") ? wx.getStorageSync("tag") : "本周热门"
    })
    let cindex = that.data.tags.findIndex((value) => value == that.data.tag)
    this.setData({
      currentIndex: cindex
    })
    this.getMsg()
  }
})