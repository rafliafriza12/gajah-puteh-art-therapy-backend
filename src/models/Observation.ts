import mongoose, { Schema, Model } from "mongoose";
import { IObservationDocument } from "../types/observation.type";

class Observation {
  private observation: Model<IObservationDocument>;

  constructor() {
    this.observation = mongoose.model<IObservationDocument>(
      "Observation",
      this.initialSchema()
    );
  }

  private initialSchema = (): Schema<IObservationDocument> => {
    return new Schema<IObservationDocument>(
      {
        therapyId: {
          type: Schema.Types.ObjectId,
          ref: "Therapy",
          required: [true, "ID terapi diperlukan."],
        },
        sessionOne: {
          type: String,
          required: [true, "Laporan observasi sesi satu diperlukan."],
          trim: true,
          minlength: [10, "Laporan observasi sesi satu minimal 10 karakter."],
        },
        sessionTwo: {
          type: String,
          required: [true, "Laporan observasi sesi dua diperlukan."],
          trim: true,
          minlength: [10, "Laporan observasi sesi dua minimal 10 karakter."],
        },
        sessionThree: {
          type: String,
          required: [true, "Laporan observasi sesi tiga diperlukan."],
          trim: true,
          minlength: [10, "Laporan observasi sesi tiga minimal 10 karakter."],
        },
        sessionFour: {
          type: String,
          required: [true, "Laporan observasi sesi empat diperlukan."],
          trim: true,
          minlength: [10, "Laporan observasi sesi empat minimal 10 karakter."],
        },
        sessionFive: {
          type: String,
          required: [true, "Laporan observasi sesi lima diperlukan."],
          trim: true,
          minlength: [10, "Laporan observasi sesi lima minimal 10 karakter."],
        },
        sessionSix: {
          type: String,
          required: [true, "Laporan observasi sesi enam diperlukan."],
          trim: true,
          minlength: [10, "Laporan observasi sesi enam minimal 10 karakter."],
        },
        summary: {
          type: String,
          required: [true, "Kesimpulan observasi seluruh sesi diperlukan."],
          trim: true,
          minlength: [
            10,
            "Kesimpulan observasi seluruh sesi minimal 10 karakter.",
          ],
        },
      },
      { timestamps: true }
    );
  };

  public getModel = (): Model<IObservationDocument> => {
    return this.observation;
  };
}

export default new Observation().getModel();
