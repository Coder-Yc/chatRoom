<template>
  <div>
    <div class="chat">
      <div class="chat-header">
        <span>房间名称: {{ roomId.value?.name }}</span>
        <el-button
          type="danger"
          plain
          size="small"
          @click="deleteRoom(roomId.value?.id)"
          >删除房间</el-button
        >
      </div>
      <!-- <div>{{chatList}}</div> -->
      <el-scrollbar class="chat-body">
        <div
          class="chat-item"
          v-for="item in chatList"
          :key="item"
          v-bind:style="{
            flexDirection: userName == item.name ? 'row-reverse' : 'row',
            alignItems: item.user === 'server' ? 'center' : 'flex-end',
            height: item.user === 'server' ? '25px' : '50px',
            justifyContent: item.user === 'server' ? 'center' : ''
          }"
        >
          <template class="chatMessage" v-if="item.user === ''">
            <div class="user_info">
              <span class="user_name">{{ item.name }}</span>
              <el-avatar
                size="small"
                src="https://avatars.githubusercontent.com/u/72589527?s=96&v=4"
              />
            </div>
            <div
              class="user_message"
              v-bind:style="{ width: item.msg.length * 10 + 'px' }"
            >
              <span>{{ item.msg }}</span>
            </div>
          </template>
          <template v-else>
            <div class="welcome_message">{{ item.msg }}</div>
          </template>
        </div>
      </el-scrollbar>
    </div>
    <div class="sendMessage">
      <div class="util-box">
        <el-upload
          class="upload-file"
          action="https://lab.lapsap.moe"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
        >
          <i class="el-icon-upload"></i>
        </el-upload>
      </div>
      <el-input
        v-model="textarea"
        :rows="9"
        type="textarea"
        placeholder="Please input"
        @keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import webSocket from '../../utils/client'
import LocalCatch from '../../utils/catch'
import infoFunction from '../../utils/queryMessage'
export default {
  props: {
    roomId: {
      type: Object,
      default: {}
    }
  },
  emits: ['changeDeleteRoomList'],
  async setup(props, { emit }) {
    //初始化操作
    let ws = null
    const textarea = ref('')
    const userName = LocalCatch.getCatch('userName')
    const currentRoomId = ref('')
    let chatList = reactive([])
    ws = new webSocket('wss://lab.lapsap.moe/ws')
    //删除房间
    const deleteRoom = (id) => {
      axios.delete(`/api/room/${id}`).then((res) => {
        ElMessage.success('删除成功')
        emit('changeDeleteRoomList', res.data)
        location.reload()
      })
    }
    //发送信息
    const sendMessage = () => {
      ws.send('pub', null, null, props.roomId.value.id, textarea.value)
      textarea.value = ''
    }
    //监听房间ID
    watch(props.roomId, async () => {
      // console.log(props.roomId.value);
      if (currentRoomId.value != '') {
        // ws.send("unsub", null, null, currentRoomId.value, "退出连接");
      }
      currentRoomId.value = props.roomId.value.id
      ws.send('sub', null, null, props.roomId.value.id, '进入房间')
      //Rx数据库操作
      // console.log(props.roomId);
      const Rx = await infoFunction.queryMessage(props.roomId.value.id)
      //监听数据库个数
      Rx.$.subscribe((results) => {
        chatList.length = 0
        chatList.push(...results)
      })
    })
    return { textarea, deleteRoom, sendMessage, chatList, userName }
  }
}
</script>

<style scoped>
.chat {
  width: 100%;
  height: 400px;
  background: hsla(0, 0%, 100%, 0.8);
}
.chat-header {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin: 0px 10px;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ccc;
  font-family: 'Times New Roman', Times, serif;
  color: rgba(47, 42, 42, 0.807);
}
.chat-body {
  background-color: white;
  height: 87%;
}
.chat-item {
  display: flex;
  margin: 5px;
  border-radius: 4px;
}
.el-avatar {
  margin-right: 2px;
}
.user_info {
  width: 5%;
  display: flex;
  flex-direction: column;
}
.user_name {
  font-size: 3px;
  color: #ccc;
  font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB',
    'Microsoft Yahei', tahoma, 'WenQuanYi Micro Hei';
}
.user_message {
  margin: 3px 5px;
  height: 50%;
  background-color: greenyellow;
  border-radius: 4px;
  font-size: 15px;
  font-family: 'Times New Roman', Times, serif;
  color: rgba(47, 42, 42, 0.807);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sendMessage {
  width: 100%;
  /* padding: 10px; */
  /* margin-top: 2px; */
  height: 200px;
  background: hsla(0, 0%, 100%, 0.3);
}
.welcome_message {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB',
    'Microsoft Yahei', tahoma, 'WenQuanYi Micro Hei';
  font-size: 5px;
}
.util-box {
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0px 5px;
}
</style>
