<template>
  <div class="banner" v-show="showBanner">
    <a href="https://koishi.chat/manual/usage/platform.html#控制台登录" target="_blank">你的服务器已泄露，请更新密钥并安装 auth 插件</a>
    <span class="close-btn" @click="closeBanner">X</span>
  </div>
</template>

<style scoped>
.banner {
  background-color: red;
  color: white;
  padding: 10px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0 8px;
  font-weight: bold;
}
</style>

<script lang="ts" setup>
import { useConfig } from '@koishijs/client';
import { ref } from 'vue'

const showBanner = ref(true)

const closeBanner = () => {
  showBanner.value = false
}

const config = useConfig() as any

function addLeakAlert() {
  // 创建div元素
  const leakDiv = document.createElement("div");

  // 设置div的样式
  leakDiv.style.position = "fixed";
  leakDiv.style.width = Math.floor(Math.random() * 301) + 100 + "px";
  leakDiv.style.height = Math.floor(Math.random() * 101) + 100 + "px";
  leakDiv.style.background = `linear-gradient(45deg, #${Math.floor(Math.random()*16777215).toString(16)} 0%, #${Math.floor(Math.random()*16777215).toString(16)} 100%)`;
  leakDiv.style.top = Math.floor(Math.random() * (window.innerHeight - parseInt(leakDiv.style.height))) + "px";
  leakDiv.style.left = Math.floor(Math.random() * (window.innerWidth - parseInt(leakDiv.style.width))) + "px";
  leakDiv.style.transition = "top 1s, left 1s, width 1s, height 1s, background 1s";
  leakDiv.style["z-index"] = 999999
  // 创建闪烁文字
  const text = document.createElement("p");
  text.innerText = "您的 koishi 已被入侵";
  text.style.position = "absolute";
  text.style.top = "50%";
  text.style.left = "50%";
  text.style.transform = "translate(-50%, -50%)";
  text.style.fontSize = "16px";
  text.style.color = "#fff";
  text.style.textAlign = "center";
  text.style.animation = "blink 200ms infinite alternate";

  // 将文字添加到div中
  leakDiv.appendChild(text);

  // 将div添加到body中
  document.body.appendChild(leakDiv);

  // 弹球运动效果
  setInterval(() => {
    leakDiv.style.top = Math.floor(Math.random() * (window.innerHeight - parseInt(leakDiv.style.height))) + "px";
    leakDiv.style.left = Math.floor(Math.random() * (window.innerWidth - parseInt(leakDiv.style.width))) + "px";
  }, 1000);
}
if (config.useYellowWebsiteLiked) {
  setInterval(addLeakAlert, 5000)
}
</script>
