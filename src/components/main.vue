<template>
  <div class="common-layout">
    <el-scrollbar>
      <el-container>
        <el-aside width="200px">
          <room-list
            @changeRoom="changeRoom"
            :deleteRoomLists="deleteRoomLists"
          ></room-list>
        </el-aside>
        <el-main>
          <suspense>
            <chat-page
              :roomId="roomId"
              @changeDeleteRoomList="changeDeleteRoomList"
            ></chat-page>
          </suspense>
        </el-main>
      </el-container>
    </el-scrollbar>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import chatPage from "./main/chatPage.vue";
import roomList from "./main/roomList.vue";
export default {
  components: {
    chatPage,
    roomList,
  },
  setup() {
    const roomId = reactive({});
    const deleteRoomLists = reactive([]);
    const changeRoom = (room) => {
      // console.log(roomId);
      roomId.value = room;
      // console.log(roomId.value);
    };
    const changeDeleteRoomList = (room) => {
      console.log(room);
      deleteRoomLists.value = room;
    };
    return { changeRoom, roomId, changeDeleteRoomList, deleteRoomLists };
  },
};
</script>

<style >
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-layout {
  height: 65%;
  width: 70%;
  background-color: #f5f5f5;
  position: relative;
  background: hsla(0, 0%, 100%, 0.3);
  overflow: hidden;
  border-radius: 1%;
}
.roomButton {
  margin-bottom: 10px;
}
.el-scrollbar {
  height: 100%;
}
.el-aside {
  border: 1px solid #ccc;
}
.el-main {
  position: sticky;
  padding: 1px;
  top: 0;
  right: 0;
  height: 100%;
  border: 2px solid #ccc;
}
.el-footer {
  position: relative;
  bottom: 0;
}
</style>