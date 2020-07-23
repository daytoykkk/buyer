// pages/search/index.js
Page({
  data: {
      name:"",
      list:[],
      imgUrl:"https://111.230.173.74:7001/consumer/showEInvoice/?FileName="
  },
  //返回上一页
  back(){
    wx.navigateBack({
      delta: 1,
      success: function() {
          console.log('成功！')
      }
    })
  },
  handleInput(e){
    let that=this;
    this.setData({
      name:e.detail.value
    })

    wx.request({  
      url: 'https://111.230.173.74:7008/thread/getProduct/',
      method: 'get',    
      data:{
        ProductName:that.data.name
      },
      header: {  
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list:res.data.这个名字的货物
        })
      },
      fail:function(err){
        console.log(err)
      }
    })
  },
  bindconfirm(e){
    let that=this;
    let name=e.detail.value['search - input'] ?e.detail.value['search - input'] : e.detail.value 
    if(name){

    }else{
      wx.wx.showModal({
        title: '提示',
        content: '请输入要搜索的商品',
        showCancel:false,
        confirmText: '确定',
        confirmColor: '#3CC51F'
      });
    }
  },
  //去商品详情页
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
    url: 'https://111.230.173.74:7008/thread/sendCart/',
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
})