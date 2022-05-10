<template>
  <div class="wholePage">
    <div class="user">
      <p class="title">聊天室</p>
      <el-input v-model="inputUserName" placeholder="输入用户名" class="userName">
        <template #prefix>
          <el-icon><avatar /></el-icon>
        </template>
      </el-input>
      <!-- <el-input
        v-model="inputUserPassword"
        type="password"
        placeholder="输入登录密码"
        show-password
        class="userPassword"
      >
        <template #prefix>
          <el-icon><unlock /></el-icon>
        </template>
      </el-input> -->
      <p class="warning">注意：首次登录即直接创建</p>
        <el-button type="primary" size="large" @click="checkLogin">登陆</el-button>
      
  </div>
  </div>
</template>

<script>
import  { ref }  from 'vue'
import  LocalCatch  from "utils/catch";
import { useRouter } from 'vue-router';
export default {
  setup () {
    const router = useRouter();
    const inputUserName = ref('')
    // const inputUserPassword = ref('')
    const checkLogin = () => {
      LocalCatch.setCatch("userName", inputUserName.value)
      // LocalCatch.setCatch("userPassword", inputUserPassword.value)
      // this.$router.push('/list')
      router.push("/main");
    }
    return { inputUserName, checkLogin}
  }
}
</script>

<style  scoped>
  .wholePage {
    height: 100%;
    background-image: linear-gradient(to right , #7A88FF, #7AFFAF);
  }
  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .user .title {
    font-size: 30px;
    color: #fff;
    font-weight: bold;
    position: fixed;
    top: 10%;
  }
  .user .warning {
    margin-top: 10px;
    font-size: 10px;
    color: red;
    font-weight: 400;
  }
  .user .userName {
    width: 300px;
    height: 50px;
    margin-bottom: 20px;
  }
  .user .userPassword {
    width: 300px;
    height: 50px;
  }
  .el-button {
    margin-top: 50px;
    width: 300px;
  }
</style>