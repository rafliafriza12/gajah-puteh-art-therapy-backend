import mongoose, { Schema, Model } from "mongoose";
import { ITherapyDocument } from "../types/therapy.type";

class Therapy {
  private therapy: Model<ITherapyDocument>;

  constructor() {
    this.therapy = mongoose.model<ITherapyDocument>(
      "Therapy",
      this.initialSchema()
    );
  }

  private initialSchema = (): Schema<ITherapyDocument> => {
    return new Schema<ITherapyDocument>(
      {
        counselorId: {
          type: Schema.Types.ObjectId,
          ref: "Counselor",
          required: [true, "ID konselor diperlukan."],
        },
        childId: {
          type: Schema.Types.ObjectId,
          ref: "Child",
          required: [true, "ID anak diperlukan."],
        },
      },
      { timestamps: true }
    );
  };

  public getModel = (): Model<ITherapyDocument> => {
    return this.therapy;
  };
}

export default new Therapy().getModel();
