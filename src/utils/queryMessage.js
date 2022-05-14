import DatabaseService from "../dbservices/index";
class infoFunction {
    async queryMessage() {
        try {
            const db = await DatabaseService.get();
            const query = db.chatinfo.find();
            return query.exec()

        } catch (e) {
            console.log(e);
        }
    }
}
export default new infoFunction();