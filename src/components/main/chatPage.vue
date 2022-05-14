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
        <div class="chat-item" v-for="item in chatList" :key="item">
          <div>{{ item?.msg || "???" }}</div>
          <!-- <template class="chatMessage" v-if="item.user !== '' ">
            <div class="user_info" v-bind:style="{flexDirection: (userName === item.name) ? 'row-reverse' : 'row' }">
              <span class="user_name">{{ item.name }}</span>
              <el-avatar
                size="small"
                src="https://avatars.githubusercontent.com/u/72589527?s=96&v=4"
              />
            </div >
            <div
              class="user_message"
              v-bind:style="{ width: item.length * 10 + 'px', flexDirection: (userName === item.name) ? 'row-reverse' : 'row' }"
            >
              <span>{{ item.msg }}</span>
            </div>
          </template> -->
          <!-- <template>
            <div class="welcome_message"></div>
          </template> -->
        </div>
      </el-scrollbar>
    </div>
    <div class="sendMessage">
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

<script >
import { reactive, ref } from "@vue/reactivity";
import { onBeforeMount, watch, onMounted } from "@vue/runtime-core";
import axios from "axios";
import { ElMessage } from "element-plus";
import webSocket from "../../utils/client";
import LocalCatch from "../../utils/catch";
import infoFunction from "../../utils/queryMessage";
export default {
  props: {
    roomId: {
      type: Object,
      default: {},
    },
  },
  emits: ["changeDeleteRoomList"],
  async setup(props, { emit }) {
    let ws = null;
    const textarea = ref("");
    const userName = LocalCatch.getCatch("userName");
    const currentRoomId = ref("");
    let chatList = reactive(['11111']);
    ws = new webSocket("wss://lab.lapsap.moe/ws");
    onBeforeMount(async () => {
      console.log(chatList.value);
      console.log("发生了挂在");
    });
    const a  = await infoFunction.queryMessage()
    chatList.value = a
    const deleteRoom = (id) => {
      axios.delete(`/api/room/${id}`).then((res) => {
        console.log(res.data);
        ElMessage.success("删除成功");
        emit("changeDeleteRoomList", res.data);
        location.reload();
      });
    };
    const sendMessage = () => {
      ws.send("pub", null, null, props.roomId.value.id, textarea.value);
      textarea.value = "";
    };
    watch(props.roomId, () => {
      if (currentRoomId.value != "") {
        ws.send("unsub", null, null, currentRoomId.value, "退出连接");
      }
      currentRoomId.value = props.roomId.value.id;
      ws.send("sub", null, null, props.roomId.value.id, "进入房间");
    });
    return { textarea, deleteRoom, sendMessage, chatList, userName };
  },
};
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
  font-family: "Times New Roman", Times, serif;
  color: rgba(47, 42, 42, 0.807);
}
.chat-body {
  background-color: white;
  height: 100%;
}
.chat-item {
  display: flex;
  align-items: flex-end;
  height: 50px;
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
  font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB",
    "Microsoft Yahei", tahoma, "WenQuanYi Micro Hei";
}
.user_message {
  margin: 3px 5px;
  height: 50%;
  background-color: greenyellow;
  border-radius: 4px;
  font-size: 15px;
  font-family: "Times New Roman", Times, serif;
  color: rgba(47, 42, 42, 0.807);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sendMessage {
  width: 100%;
  /* padding: 10px; */
  margin-top: 2px;
  height: 200px;
  background: hsla(0, 0%, 100%, 0.3);
}
.welcome_message {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB",
    "Microsoft Yahei", tahoma, "WenQuanYi Micro Hei";
  font-size: 5px;
}
</style>
