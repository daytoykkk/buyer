// pages/login/index.js
Page({
  getUser(e) {
    let { userInfo } = e.detail;
    /* wx.setStorageSync("userInfo", userInfo);*/
    /* wx.navigateBack({
       delta:1
     })*/
  },
  login() {
    wx.login({
      success: res => {
        
        if (res.code) {
          let code = res.code;
         
          // 获取用户信息
          wx.getSetting({
            success: ures => {
              if (ures.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: user => {
                    wx.setStorageSync("userInfo", user);
                    console.log(user);
                    
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(user)
                    }
                 
                    wx.request({
                      url: "http://111.230.173.74:7008/thread/getOpenid/",
                      data: {
                        code: JSON.stringify(code)
                      },
                      method: "get",
                      header: {
                        'Content-Type': 'application/json'
                      },
                      success: function (res) {
                        console.log("登录返回的数据：");
                        console.log(res.data);
                      },
                      fail: function (error) {
                        console.log(error);
                      }
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
  }
})