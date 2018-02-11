<template>
<div class="card">
    <div class="tips-name">说明</div>
    <div class="link-tips">
        <ul>
        <li>本页面为静态页面，如果访问白屏尝试ctrl+f5强制刷新页面</li>
        <li>鼠标移动至卡片圆圈后点击链接可以复制链接到剪贴板（桌面端）</li>
        <li>触摸卡片圆圈可以复制相应链接到剪贴板（移动端）</li>
        <li>搜索栏留空后回车即可返回首页</li>
        </ul>
    </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.tips-name {
    width: 100px;
    text-align: center;
    letter-spacing: 2px;
    background-color: white;
    margin: 5px 0 15px 10px;
    padding: 5px;
    font-size: 25px;
    box-shadow: 2px 5px 10px rgba(204, 202, 202, 0.527);
    text-shadow: 1px 1px 1px #999999b6;
}

li {
    margin-left: 40px;
    padding-top: 18px;
    padding-right: 15px;
    letter-spacing: 2pt;
}

.link-tips {
    background-color: white;
    margin: 0 10px 10px 10px;
    box-shadow: 2px 4px 10px rgba(204, 202, 202, 0.527);
    min-width: 130px;
    z-index: -1;
    padding: 0 0 5px 0;
}
</style>
