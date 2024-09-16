# Tourism-Information-Center

## 记得这只是个"5 points"的部分,请在贴合要求的前提下怎么简单怎么来,省下来的时间可以做其他事,别把时间浪费在这上边.

## 测试 API 的工具

可以用 POSTMAN 简单方便,也可以在 VS CODE 上安装 REST CLIENT 的 extension.

## 思路

在页面加载时, request 服务器,获取 hot attraction, events 的数据,等收到后再进行渲染, tourbooking 在点击对应 attraction 时再 request 数据.性能可能会因此有所下降,但更符合要求

首页: 如上所示.

Attraction 页面: 加载时 request 请求数据,然后进行渲染.预计会有搜索框,搜索框有下拉菜单 city， state 跟文本输入框,在 attraction 数据中进行匹配,根据 response 数据重新渲染页面.然后用户点击某个 attraction 的"了解更多"按钮时,异步请求对应 tour 的数据,然后弹出一个框,里面是对应 attraction 的的 tour 信息.用户可以通过输入个人信息,预定门票.

Events 页面: 比 Attraction 页简单,列出所有 event 后,用户点击某个 event 的"了解更多"按钮时,(页面会跳到最下边)出现要求填写邮箱的输入框,然后点击提交按钮,会弹出"预定成功"的对话框.

About 页面: 不知道会不会有用,先留着但不改.

## 图片命名规范

如果要把图片地放在本地的 images 文件夹上,请把要用到的图片名字格式以 TIC 作为前缀,哪个 html 作为中间名,短描述放在最后.举例:TIC-HOME-MountKosciuszko.webp,这里 HOME 作为主页就是中间名,MountKosciuszko 就是短描述.
