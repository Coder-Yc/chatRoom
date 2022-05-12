import LocalCatch from "../utils/catch";
export default class webSocket {
  constructor (url) {
    this._url = url
    this._ws = null
    this._connected = false
    this.connect()
  }
  send (type, name, time, room, msg){
    const obj = {
      type: type,
      name: name || LocalCatch.getCatch("userName"),
      time: time || new Date().getTime(),
      room: room || '',
      msg: msg || '',
    }
    console.log(obj);
    const data = JSON.stringify(obj)
    if(!this._connected) {
      this._ws.send(data)
      console.log("信息发送成功");
    } else {
      return "服务器出错"
    }
  }
  stringToJson (message) {
    try {
      message = JSON.parse(message)
    }
    catch (e) {
      console.log(e)
    }
    return message
  }
  connect () {
    const ws = new WebSocket(this._url)
    this._ws = ws
    ws.onopen = () => {
      console.log('Connected to the server')
      this._connected = true
      this.send('sub', null, null, null,"连接成功")
    }
    // listen a message from the server
    ws.onmessage = (message) => {
      const jsonMessage = this.stringToJson(message.data)
      console.log(jsonMessage);
    }
    ws.onerror = (err) => {
      console.log('unable connect to the server', err)
    }
    ws.onclose = () => {
      console.log('Connection is closed')
    }
  }
}