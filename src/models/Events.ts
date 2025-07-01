import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  date:Date,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
})


export default mongoose.models.Event || mongoose.model("Event", EventSchema)
