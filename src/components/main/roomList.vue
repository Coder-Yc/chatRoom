<template>
  <div>
    <el-scrollbar>
      <div class="listHead">
        <p>房间列表</p>
        <el-button type="primary" size="small" plain @click="newRoom"
          >创建房间
        </el-button>
        <yc-dialog
          :roomDialog="roomDialog"
          title="创建房间"
          @newRoomLists="newRoomLists"
        ></yc-dialog>
      </div>
      <el-skeleton :rows="15" animated v-if="isHidden" />
      <div
        v-for="item in roomList.rooms"
        :key="item"
        class="scrollbar-demo-item"
        @click="changeRoom(item)"
      >
        >房间名称: {{ item.name }}
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "@vue/reactivity";
import ycDialog from "../dialog/dialog.vue";
import LocalCatch from "../../utils/catch";

export default {
  emits: ["changeRoom"],
  components: {
    ycDialog,
  },
  props: {
    deleteRoomLists: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    let roomList = ref([]);
    let isHidden = ref(true);
    let roomDialog = ref(false);


    axios.get("/api/room").then((res) => {
      console.log(res.data);
      roomList.value = res.data;
      isHidden.value = false;
    });
    const changeRoom = (item) => {
      emit("changeRoom", item);
    };
    const newRoom = () => {
      roomDialog.value = !roomDialog.value;
    };
    const newRoomLists = (data) => {
      roomList.value = data;
      console.log(data);
    };
    return {
      changeRoom,
      roomList,
      isHidden,
      newRoom,
      roomDialog,
      newRoomLists,
    };
  },
};
</script>

<style scoped>
.listHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 5px;
  height: 50px;
}
p {
  font-family: "Times New Roman", Times, serif;
}

.el-scrollbar {
  height: 100%;
}

.scrollbar-demo-item {
  height: 70px;
  box-shadow: 1px 1px 1px 1px #ccc;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  font-family: "Times New Roman", Times, serif;
  color: rgba(47, 42, 42, 0.807);
  display: flex;
  align-items: center;
}
</style>