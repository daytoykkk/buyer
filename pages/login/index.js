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
        wx.getUserInfo({
          success: user => {
            wx.setStorageSync("userInfo", user);
            console.log(user);

            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(user)
            }

            wx.request({
              url: "https://fzulyt.fun:7008/thread/getOpenid/",
              data: {
                code: res.code
              },
              header: {
                "content-type": "application/json"
              },
              method: "get",
              success: function (e) {
                wx.setStorageSync("openid", e.data.openid)
                wx.switchTab({
                  url: '/pages/index/index'
                });
              }
            })
          }
        })
      }
    })
  }
})