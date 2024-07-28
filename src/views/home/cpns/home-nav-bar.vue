<template>
  <div class="nav-bar">
    <div class="title">星云旅途</div>
    <div class="menu" @click="menuClick">
    </div>
    <van-popup v-model:show="show" position="right" :style="{ height: '100%', width: '50%' }" closeable
      @click-close-icon="onClickCloseIcon">
      <div class="pop">
        <div class="home" @click="homeClick">
          <img src="@/assets/img/home/home-popup.png" alt="">
          首页
        </div>
        <div class="logout" @click="logoutClick">
          <img src="@/assets/img/home/home-popup-logout.png" alt="">
          退出登录
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import useAuthStore from '@/stores/modules/auth'
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const show = ref(false);
//点击nav-bar右上方菜单显示弹出层
function menuClick() {
  show.value = true
}
//点击关闭图标时触发关闭弹出层
function onClickCloseIcon() {
  show.value = false;
}
//点击首页跳转 
function homeClick() {
  show.value = false
}

const router = useRouter()

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)
//点击退出登录，清楚登录状态并提示
function logoutClick() {
  if(authStore.isLoggedIn) {
    localStorage.removeItem('isLoggedIn') // 清除登录状态
    authStore.setLoginStatus(false) // 更新 Pinia store 状态
    alert('您已退出登录，请重新登录~')
    router.push({ path: '/login' })  // 跳转到登录页面
  } else {
    alert('您还未登录，请先登录~')
    router.push({ path: '/login' })
  }
  
  show.value = false
}
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  /* 使标题居中，菜单按钮位于右侧 */
  align-items: center;
  height: 46px;
  border-bottom: 1px solid #f2f2f2;

  .title {
    color: var(--primary-color);
    font-size: 16px;
    font-weight: 600;
    flex-grow: 1;
    /* 使标题占据可用空间 */
    text-align: center;
    /* 使标题水平居中 */
    margin-left: 35px;
  }

  .menu {
    width: 20px;
    height: 2px;
    background: #ff9854;
    position: relative;
    margin-right: 15px;
    /* 调整与右侧边缘的距离 */
  }

  .menu::before {
    position: absolute;
    top: -6px;
    /* 调整距离 */
    content: '';
    width: 20px;
    height: 2px;
    background: #ff9854;
  }

  .menu::after {
    position: absolute;
    bottom: -6px;
    /* 调整距离 */
    content: '';
    width: 20px;
    height: 2px;
    background: #ff9854;
  }

  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid rgba(120, 120, 120, 0.2);
    margin-top: 40px;

    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
  }

  .logout {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid rgba(120, 120, 120, 0.2);
    margin-top: 15px;

    img {
      width: 20px;
      height: 20px;
      margin-left: 30px;
      margin-right: 20px;
    }
  }
}
</style>