import mongoose, { Schema, Model } from "mongoose";
import { IScreeningDocument } from "../types/screening.type";

class Screening {
  private screening: Model<IScreeningDocument>;

  constructor() {
    this.screening = mongoose.model<IScreeningDocument>(
      "Screening",
      this.initialSchema()
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
        depressionScore: {
          type: Number,
          required: [true, "Skor depresi diperlukan"],
          min: [0, "Skor depresi tidak boleh negatif."],
        },
        depressionInterpretation: {
          type: String,
          required: [true, "Interpretasi skor depresi diperlukan"],
          trim: true,
          minlength: [10, "Interpretasi skor depresi minimal 10 karakter."],
        },
        anxietyScore: {
          type: Number,
          required: [true, "Skor kecemasan diperlukan."],
          min: [0, "Skor kecemasan tidak boleh negatif"],
        },
        anxietyInterpretation: {
          type: String,
          required: [true, "Interpretasi skor kecemasan diperlukan"],
          trim: true,
          minlength: [10, "Interpretasi skor kecemasan minimal 10 karakter."],
        },
        stressScore: {
          type: Number,
          required: [true, "Skor stres diperlukan"],
          min: [0, "Skor stress tidak boleh negatif."],
        },
        stressInterpretation: {
          type: String,
          required: [true, "Interpretasi skor stres diperlukan."],
          trim: true,
          minlength: [10, "Interpretasi skor stres minimal 10 karakter."],
        },
        totalScreeningScore: {
          type: Number,
          required: [true, "Skor total screening diperlukan."],
          min: [0, "Skor total screening tidak boleh negatif."],
        },
        totalScreeningInterpretation: {
          type: String,
          required: [true, "Kesimpulan keseluruhan screening diperlukan"],
          trim: true,
          minlength: [
            10,
            "Kesimpulan keseluruhan screening minimal 10 karakter.",
          ],
        },
      },
      { timestamps: true }
    );
  };

  public getModel = (): Model<IScreeningDocument> => {
    return this.screening;
  };
}

export default new Screening().getModel();
