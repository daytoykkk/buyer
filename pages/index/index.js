//Page Object
Page({
  data: {
    cates: [
      {
        name: "肉蛋家禽",
        imgUrl: "../../icons/1.png"
      },
      {
        name: "熟食冻品",
        imgUrl: "../../icons/2.png"
      }, {
        name: "水产海鲜",
        imgUrl: "../../icons/3.png"
      },
      {
        name: "方便食品",
        imgUrl: "../../icons/4.png"
      },
      {
        name: "速冻包点",
        imgUrl: "../../icons/5.png"
      },
      {
        name: "厨房调料",
        imgUrl: "../../icons/6.png"
      },
      {
        name: "火锅专区",
        imgUrl: "../../icons/7.png"
      },
      {
        name: "本周热门",
        imgUrl: "../../icons/8.png"
      }
    ],
    quanList: [
      {
        name: "烘焙食品满38减8元",
        discount: 8,
        condition: "满38元可使用"
      },
      {
        name: "冷冻食品满58减10元",
        discount: 10,
        condition: "满58元可使用"
      },
      {
        name: "进口商品满200减20元",
        discount: 20,
        condition: "满200元可使用"
      },
      {
        name: "火锅专区满150减10元",
        discount: 10,
        condition: "满150元可使用"
      }
    ],
    tags: [
      {
        name: "进口食品",
        isActive: true
      },
      {
        name: "罐头食品",
        isActive: false
      },
      {
        name: "地方特产",
        isActive: false
      },
      {
        name: "猜你喜欢",
        isActive: false
      }
    ],
    popList: [],
    goodList: [],
    imgUrl: "https://fzulyt.fun:7001/consumer/showEInvoice/?FileName=",
    currentIndex: 0,
    currentTag: "进口食品"
  },
  //获取小标签对应的商品
  getTagGood(item) {
    let { index } = item.currentTarget.dataset
    let currentTag = this.data.tags[index].name
    this.setData({
      currentIndex: index,
      currentTag
    })

    this.getMsg()
  },
  //商品
  getMsg() {
    let that = this
    that.data.goodList = []
    wx.request({
      url: 'https://fzulyt.fun:7008/thread/getTag/',
      method: 'get',
      data: {
        ProductTag: that.data.currentTag
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          goodList: res.data.这个标签的货物
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //获取热门对应的商品
  getPopGood() {
    let that = this
    wx.request({
      url: 'https://fzulyt.fun:7008/thread/getTag/',
      method: 'get',
      data: {
        ProductTag: "本周热门"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let list = []
        if (res.data.这个标签的货物.length > 6) {
          list = res.data.这个标签的货物.slice(0, 6)
        } else {
          list = res.data.这个标签的货物
        }
        that.setData({
          popList: list
        })
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
  //去分类
  toCategory(tag) {
   wx.setStorageSync("tag",tag.currentTarget.dataset.item);
   wx.switchTab({
     url: '/pages/category/index'
   });
     
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    //this.login()
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
    this.getPopGood()
    this.getMsg()
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
});