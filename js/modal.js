document.addEventListener("DOMContentLoaded", function () {
  // 获取模态框元素
  var modal = document.getElementById("activityModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalDescription = document.getElementById("modalDescription");
  var span = document.getElementsByClassName("close")[0];

  // 获取所有打开模态框的按钮
  var btns = document.getElementsByClassName("open-modal");

  // 为每个按钮添加点击事件
  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      var activity = this.getAttribute("data-activity");
      modalTitle.textContent = activity;
      modalDescription.textContent = getActivityDescription(activity);
      modal.style.display = "block";
    };
  }

  // 点击 (x) 关闭模态框
  span.onclick = function () {
    modal.style.display = "none";
  };

  // 点击模态框外部关闭模态框
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // 处理表单提交
  document.getElementById("bookingForm").onsubmit = function (e) {
    e.preventDefault();
    var date = document.getElementById("date").value;
    var people = document.getElementById("people").value;
    alert("预订成功! 日期: " + date + ", 人数: " + people);
    modal.style.display = "none";
  };
});

// 获取活动描述的函数 (你需要为每个活动添加描述)
function getActivityDescription(activity) {
  var descriptions = {
    "Sri Pada Pilgrimage Season":
      "斯里帕达朝圣季是一个重要的宗教活动,信徒们攀登亚当峰顶礼佛足印。",
    "Independence Day":
      "独立日是斯里兰卡庆祝从英国统治下获得政治独立的国庆日。",
    "Sinhala And Hindu New Year":
      "僧伽罗和印度新年是斯里兰卡最重要的文化节日之一,庆祝新的一年的开始。",
    "Vesak festival": "卫塞节是纪念佛陀诞生、成道和涅槃的重要佛教节日。",
    "Kandy Asala Perahera":
      "康提埃萨拉佩拉赫拉是斯里兰卡最盛大的佛教游行,展示传统舞蹈和文化。",
    Christmas:
      "圣诞节在斯里兰卡也受到庆祝,人们装饰圣诞树,交换礼物,享用特别的晚餐。",
  };
  return descriptions[activity] || "暂无描述";
}
