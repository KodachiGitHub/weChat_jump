# weChat_jump
微信跳一跳手动辅助

需要的软件：nodejs，adb和手机驱动

1.手机连接电脑，打开调试模式
2.执行 adb devices 确认设备已经正确连接。打开微信跳一跳游戏进入开始界面
3.执行 node jump.js
4.在浏览器中打开jump.html
5.看到截图后手动点击起点和终点，程序会自动计算按压时间并自动按压
6.截图更新后重复第五步
