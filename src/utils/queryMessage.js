import DatabaseService from '../dbservices/index'
class infoFunction {
  async queryMessage(roomID) {
    try {
      const db = await DatabaseService.get()
      const query = db.chatinfo.find({
        selector: {
          room: roomID
        }
      })
      return query
    } catch (e) {
      console.log(e)
    }
  }
}
export default new infoFunction()
