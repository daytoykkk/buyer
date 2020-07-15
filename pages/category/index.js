// pages/category/index.js
Page({
  data: {
    currentIndex:0,
    tag:"本周热门",
    tags:["本周热门","猜你喜欢","肉蛋家禽","熟食冻品","水产海鲜","方便食品","罐头食品","进口食品","地方特产","厨房调料","火锅专区","速冻包点"],
    list:[],
    imgs:[]
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
        let len=that.data.list.length;
        for(let i=0;i<len;i++){
          that.getImgs(that.data.list[i].productId)
        }
      },
      fail:function(err){
        console.log(err)
      }
    })
 },
 getImgs(id){
  let that = this
  that.data.imgs=[]
  wx.request({ 
    url: 'http://111.230.173.74:7001/consumer/showProductImage/',
    method: 'get',    
    data:{
      ProductId:id
    },
    header: { 
      'content-type': 'application/json'
    },
    success: function (res) {
     let len=res.data.对应货物的图片.length
     for(let i=0;i<len;i++){
       if(res.data.对应货物的图片[i].imageState=="main"){
         let imgs=that.data.imgs;
         imgs.push( "http://111.230.173.74:7001/consumer/showEInvoice/?FileName=" +
         res.data.对应货物的图片[i].imageName)
         that.setData({
           imgs:imgs
         })
         break;
       }else{
         continue
       }
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