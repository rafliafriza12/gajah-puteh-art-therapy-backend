import mongoose, { Schema, Model } from "mongoose";
import { IScreeningDocument } from "../types/screening.type";

class Screening {
  private screening: Model<IScreeningDocument>;

  constructor() {
    this.screening = mongoose.model<IScreeningDocument>(
      "Screening",
      this.initialSchema(),
    );
  }

  private initialSchema = (): Schema<IScreeningDocument> => {
    return new Schema<IScreeningDocument>(
      {
        therapyId: {
          type: Schema.Types.ObjectId,
          ref: "Therapy",
          required: [true, "ID terapi diperlukan."],
        },
        screeningScore: {
          type: Number,
          required: [true, "Skor screening diperlukan"],
          min: [0, "Skor screening tidak boleh kurang dari 0."],
          max: [10, "Skor sceening tidak boleh lebih dari 10"],
        },
        counselorInterpretation: {
          type: String,
          required: [true, "Interpretasi screening untuk konselor diperlukan"],
        },
        parentInterpretation: {
          type: String,
          required: [true, "Interpretasi screening untuk orangtua diperlukan."],
        },
      },
      { timestamps: true },
    );
  };

  public getModel = (): Model<IScreeningDocument> => {
    return this.screening;
  };
}

export default new Screening().getModel();
