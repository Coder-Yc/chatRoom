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
      <div class="chat-body">
        <!-- <div class="chat-item" v-for="item in chatList" :key="item">
                <span>{{item.name}}</span>
            </div>  -->
      </div>
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
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import axios from "axios";
import { ElMessage } from "element-plus";
import webSocket from "../../utils/client";
import LocalCatch from "../../utils/catch";
export default {
  props: {
    roomId: {
      type: Object,
      default: {},
    },
  },
  emits: ["changeDeleteRoomList"],
  setup(props, { emit }) {
    const textarea = ref("");
    let ws = null;
    let currentRoomId = ref("");
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
      ws = new webSocket("wss://lab.lapsap.moe/ws");
    });
    return { textarea, deleteRoom, sendMessage };
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
}
.sendMessage {
  width: 100%;
  /* padding: 10px; */
  margin-top: 2px;
  height: 200px;
  background: hsla(0, 0%, 100%, 0.3);
}
</style>
