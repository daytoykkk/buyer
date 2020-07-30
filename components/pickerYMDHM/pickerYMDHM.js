// components/pickerYMDHM/pickerYMDHM.js
Component({
  data: {
multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
startDate:""
  },
  mounted(){
    let that=this;
    that.setData({
      startDate:that.newTime().substring(0,19)
    })
    this.pickerTap()
  },
  methods: {
    pickerTap() {
      var date = new Date();
  
      var monthDay = ['今天','明天'];
      var hours = [];
      var minute = [];
  
      // 月-日
      for (var i = 2; i <= 28; i++) {
        var date1 = new Date(date);
        date1.setDate(date.getDate() + i);
        var md = (date1.getMonth() + 1) + "-" + date1.getDate();
        monthDay.push(md);
      }
  
      // 时
      for (var i = 0; i < 24; i++) {
        hours.push(i);
      }
  
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
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
  bindMultiPickerColumnChange(){

  },
  bindStartMultiPickerChange(){

  },
   //生成时间
   newTime(){
    let date=new Date()
    let y = date.getFullYear();  
    let m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    let d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    let h = date.getHours();  
    h=h < 10 ? ('0' + h) : h;  
    let minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    let second=date.getSeconds();  
    second=second < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
  },
  }
})