function getPageScrollTop() {
  if (window.scrollY !== undefined) {
    // 大多数现代浏览器支持 window.scrollY
    return window.scrollY;
  } else if (document.compatMode === "CSS1Compat") {
    // 如果页面定义了DOCTYPE文档头，使用 document.documentElement.scrollTop
    return document.documentElement.scrollTop;
  } else {
    // 否则使用 document.body.scrollTop
    return document.body.scrollTop;
  }
}

// 使用示例
const scrollDistance = getPageScrollTop();
console.log("Scroll distance:", scrollDistance);
