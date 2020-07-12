//Page Object
Page({
  data: {
    cates:[
      {
        name:"肉蛋家禽",
        imgUrl:"../../icons/1.png"
      },
      {
        name:"熟食冻品",
        imgUrl:"../../icons/2.png"
      }, {
        name:"水产海鲜",
        imgUrl:"../../icons/3.png"
      },
      {
        name:"方便食品",
        imgUrl:"../../icons/4.png"
      },
      {
        name:"速冻包点",
        imgUrl:"../../icons/5.png"
      },
      {
        name:"厨房调料",
        imgUrl:"../../icons/6.png"
      },
      {
        name:"火锅专区",
        imgUrl:"../../icons/7.png"
      },
      {
        name:"本周热门",
        imgUrl:"../../icons/8.png"
      }
    ],
    quanList:[
      {
        name:"烘焙食品满38减8元",
        discount:8,
        condition:"满38元可使用"
      },
      {
        name:"冷冻食品满58减10元",
        discount:10,
        condition:"满58元可使用"
      },
      {
        name:"进口商品满200减20元",
        discount:20,
        condition:"满200元可使用"
      },
      {
        name:"火锅专区满150减10元",
        discount:10,
        condition:"满150元可使用"
      }
    ]
  },
  getMsg(){
    var that = this
    console.log("hhhh")
    wx.request({   //请求地址
      url: 'http://111.230.173.74:7008/thread/getTag/',
      method: 'get',    
      data:{
        ProductTag:"猜你喜欢"
      },
      header: {  //请求头
        'content-type': 'application/json'
        // "Content-Type": "application/x-www-form-urlencoded"
      },
      //如果在sucess直接写this就变成了wx.request()的this了
      success: function (res) {
        // res.data相当于ajax里面的data,为后台返回的数据
        //打印后台返回的数据
        console.log(res.data)
        //直接把后台返回的数据 赋值给names 就可以直接调用names了
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  //options(Object)
  onLoad: function(options){
    
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});