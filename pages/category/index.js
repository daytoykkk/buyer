// pages/category/index.js
Page({
  data: {
    currentIndex:0,
    tag:"本周热门",
    tags:["本周热门","猜你喜欢","肉蛋家禽","熟食冻品","水产海鲜","方便食品","罐头食品","进口食品","地方特产","厨房调料","火锅专区","速冻包点"],
    list:[],
    imgUrl:"http://111.230.173.74:7001/consumer/showEInvoice/?FileName="
  },
 getGoods(item){
  let {index}=item.currentTarget.dataset
  let currentTag=this.data.tags[index]
  this.setData({
    currentIndex:index,
    tag:currentTag
  })

  this.getMsg()
 },
 getMsg(){
   let that=this
   that.data.list=[]
    wx.request({ 
      url: 'http://111.230.173.74:7008/thread/getTag/',
      method: 'get',    
      data:{
        ProductTag:that.data.tag
      },
      header: { 
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list:res.data.这个标签的货物
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
 },
 toGoodMsg(item){
    let name=item.currentTarget.dataset.item.productName;
    wx.navigateTo({
      url: '/pages/goodmsg/index?productname='+name
    });
 },
 //加入购物车
sendCart(item){
  let that=this;
  let id=wx.getStorageSync("openid");
  let product=JSON.stringify(item.currentTarget.dataset.item)

  wx.request({  
    url: 'http://111.230.173.74:7008/thread/sendCart/',
    method: 'get',    
    data:{
      Id:JSON.stringify(id),
      Products:JSON.stringify(product)
    },
    header: {  
      'Content-Type': 'application/json'
    },
    success: function (res) {
      if(res.data=="OK"){
        wx.showToast({
          title:"成功加入购物车",
          icon:'success',
          duration:2000
        })
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
    this.getMsg()
  }
})