import LocalCatch from "../utils/catch";
import DatabaseService from "../dbservices/index.js";
export default class webSocket {
  constructor(url) {
    this._url = url
    this._ws = null
    this._connected = false
    this.message = []
    this.connect()
    this.id = 0
  }
  send(type, name, time, room, msg) {
    const obj = {
      type: type,
      name: name || LocalCatch.getCatch("userName"),
      time: time || new Date().getTime(),
      room: room || '',
      msg: msg || '',
    }
    // console.log(obj);
    const data = JSON.stringify(obj)
    if (this._connected) {
      this._ws.send(data)
      console.log("信息发送成功");
    } else {
      return "服务器出错"
    }
  }
  async receive(message) {
    try {
      let data = JSON.parse(JSON.parse(message.data.replace(/\"(.*?)\*/g,'')))
      if (data.err) return
      // console.log(data);
      // let chat = LocalCatch.getCatch("chat") || []
      // chat.push(data)
      // LocalCatch.setCatch("chat", chat)
      //加入数据库
      data.id = (this.id+1).toString()
      this.id++
      await this.insertMessage(data)
    } catch (e) {
    }
  }
  async insertMessage(message) {
    // console.log(message);
    // console.log(DatabaseService);
    const db =await DatabaseService.get();
    await db.chatinfo.insert(message);
    console.log("插入成");
  }
  connect() {
    const ws = new WebSocket(this._url)
    this._ws = ws
    ws.onopen = () => {
      console.log('Connected to the server')
      this._connected = true
      this.send('sub', null, null, null, "连接成功")
    }
    // listen a message from the server
    ws.onmessage = (message) => {
      this.receive(message)
    }
    ws.onerror = (err) => {
      console.log('unable connect to the server', err)
    }
    ws.onclose = () => {
      console.log('Connection is closed')
    }
  }
}