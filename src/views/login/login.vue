<template>
  <div class="login-container top-page">
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input
            type="text"
            v-model="username"
            placeholder="输入手机号/邮箱/用户名"
            required
          />
        </div>
        <div class="input-group">
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password"
            placeholder="输入密码"
            required
          />
          <span class="toggle-password" @click="togglePasswordVisibility">
            <i :class="passwordVisible ? 'eye-open' : 'eye-closed'"></i>
          </span>
        </div>
        <button type="submit" class="login-button">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordVisible: false,
      // 预定义的模拟账号密码
      predefinedUser: {
        username: 'testuser',
        password: 'password'
      },
      initialHeight: 0
    };
  },
  mounted() {
    this.initialHeight = window.innerHeight;
  },
  methods: {
    handleLogin() {
      const { username, password, predefinedUser } = this;
      //手动触发失焦事件以关闭软键盘
        // this.$refs.usernameInput.blur()
        // this.$refs.passwordInput.blur()
      if (username === predefinedUser.username && password === predefinedUser.password) {
        // 模拟登录成功，将登录状态存储到 localStorage 中
        localStorage.setItem('isLoggedIn', 'true');

        // 延迟一小会儿 重定向到首页或用户之前访问的页面
        setTimeout(() => {
          this.$router.push("/home");
        }, 500);
      } else {
        alert('用户名或密码错误');
      }
    },
    // resetHeight() {
    //   // 立即恢复页面高度
    //   const x = document.getElementById('app')
    //   const y = document.querySelector('.app')
    //   console.log('x', x.style.height);
    //   console.log('y', y.style.height);
    //   if (x && y) {
    //     x.style.height = `${this.initialHeight}px`;
    //     y.style.height = `${this.initialHeight}px`;
    //   }
    //   window.scrollTo(0, 0);
    //   document.documentElement.style.height = `${this.initialHeight}px`;
    //   document.body.style.height = `${this.initialHeight}px`;
    // },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.input-group {
  position: relative;
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #ff8800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.options {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.terms {
  margin-top: 20px;
  text-align: left;
  display: flex;
  align-items: center;
}

.terms input {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.terms a {
  color: #ff8800;
  text-decoration: none;
}

.eye-open::before {
  content: '👁️';
}

.eye-closed::before {
  content: '🙈';
}
</style>
