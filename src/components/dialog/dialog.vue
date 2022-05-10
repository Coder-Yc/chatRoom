<template>
  <el-dialog v-model="roomDialogHidden" :title="title" width="30%">
    <el-input v-model="nameInput" placeholder="请输入你要创建房间的名称" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="roomDialogHidden = false">Cancel</el-button>
        <el-button type="primary" @click="changeRoomDialog">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, toRef} from "@vue/reactivity";
import axios from "axios";
import { watch } from '@vue/runtime-core';
import { ElMessage } from 'element-plus'
export default {
  props: {
    roomDialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  emits:['newRoomLists'],
  setup(props, { emit }) {
    const nameInput = ref("");
    const roomDialogHidden = ref(false)
    const changeRoomDialog = () => {
      axios.put(`/api/room/${nameInput.value}`).then((res) => {
        console.log(res.data);
        emit('newRoomLists', res.data);
        roomDialogHidden.value= false;
        ElMessage.success('创建成功');
      });
      
    };
    watch(()=>props.roomDialog, () => {
      console.log(props.roomDialog);
      roomDialogHidden.value = props.roomDialog;
    })
    return {
      nameInput,
      changeRoomDialog,
      roomDialogHidden
    };
  },
};
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>