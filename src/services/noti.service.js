import db from "../config/db.js"

export default{
    getNotification(receiverId){
        return db("notifications")
        .where("receiver_id", receiverId)
        .select(
            "not_id",
            "sender_id",
            "receiver_id",
            "note_content",
            db.raw("DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at")
            
            
        )
        .orderBy("created_at", "desc");
    },

    createNotification(senderId, receiverId, noteContent){
        return db("notifications").insert({
            sender_id: senderId,
            receiver_id: receiverId,
            note_content: noteContent,
            created_at: new Date(),
        });
    }

}