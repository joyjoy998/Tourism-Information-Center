# Tourism-Information-Center

## 思路

在页面加载时,异步请求服务器,获取 attraction 跟 event 数据,然后保存到当前 session 中,在页面渲染时,从 session 中取出数据,进行渲染. (tourbooking 可以考虑点击对应 attraction 时再 request 数据,但感觉数据量小的话直接在页面加载时获取数据可能会更快)

首页:可能预估做成静态(就是直接把文字描述及图片放在本地),不从服务器上获取文字图片等数据,可以为了数据获取缓冲的时间.

Attraction 页面: 预计会有搜索框,搜索框会根据输入的关键字,在 attraction 数据中进行匹配,然后渲染到页面中.然后用户点击某个 attraction 的"了解更多"按钮时,就会弹出一个框,里面是对应 attraction 的详细信息.用户可以通过输入个人信息,预定门票.

Events 页面: 比 Attraction 页简单,列出所有 event 后,用户点击某个 event 的"了解更多"按钮时,(页面会跳到最下边)出现要求填写邮箱的输入框,然后点击提交按钮,会弹出"预定成功"的对话框.

About 页面: 不知道会不会有用,先留着但不改.

## 图片命名规范

如果要把图片地放在本地的 images 文件夹上,请把要用到的图片名字格式以 TIC 作为前缀,哪个 html 作为中间名,短描述放在最后.举例:TIC-HOME-MountKosciuszko.webp,这里 HOME 作为主页就是中间名,MountKosciuszko 就是短描述.
