import mongoose, { Schema, Model } from "mongoose";
import { IPosttestDocument } from "../types/posttest.type";

class Posttest {
  private posttest: Model<IPosttestDocument>;

  constructor() {
    this.posttest = mongoose.model<IPosttestDocument>(
      "Posttest",
      this.initialSchema()
    );
  }

  private initialSchema = () => {
    return new Schema<IPosttestDocument>(
      {
        therapyId: {
          type: Schema.Types.ObjectId,
          ref: "Therapy",
          required: [true, "ID terapi diperlukan."],
        },
        totalDifficultiesScore: {
          type: Number,
          required: [true, "Skor total kesulitan diperlukan"],
          min: [0, "Skor total kesulitan tidak boleh negatif"],
          max: [40, "Skor total kesulitan tidak boleh melebihi 40"],
        },
        totalDifficultiesInterpretation: {
          type: String,
          required: [true, "Interpretasi dari total kesulitan diperlukan."],
          trim: true,
          minlength: [
            10,
            "Interpretasi dari total kesulitan minimal 10 karakter.",
          ],
        },
        emotionalSymptomsScore: {
          type: Number,
          required: [true, "Skor gejala emosional diperlukan"],
          min: [0, "Skor gejala emosional tidak boleh negatif."],
          max: [10, "Skor gejala emosional tidak boleh melebihi 10."],
        },
        emotionalSymptomsInterpretation: {
          type: String,
          required: [true, "Interpretasi dari gejala emosional diperlukan."],
          trim: true,
          minlength: [
            10,
            "Interpretasi dari gejala emosional minimal 10 karakter.",
          ],
        },
        conductProblemScore: {
          type: Number,
          required: [true, "Skor masalah perilaku diperlukan"],
          min: [0, "Skor masalah perilaku tidak boleh negatif."],
          max: [10, "Skor masalah perilaku tidak boleh melebihi 10."],
        },
        conductProblemInterpretation: {
          type: String,
          required: [true, "Interpretasi dari masalah perilaku diperlukan."],
          trim: true,
          minlength: [
            10,
            "Interpretasi dari masalah perilaku minimal 10 karakter.",
          ],
        },
        hyperactivityScore: {
          type: Number,
          required: [true, "Skor hiperaktif diperlukan"],
          min: [0, "Skor hiperaktif tidak boleh negatif."],
          max: [10, "Skor hiperaktif tidak boleh melebihi 10."],
        },
        hyperactivityInterpretation: {
          type: String,
          required: [true, "Interpretasi dari hiperaktif diperlukan."],
          trim: true,
          minlength: [10, "Interpretasi dari hiperaktif minimal 10 karakter."],
        },
        peerProblemScore: {
          type: Number,
          required: [true, "Skor masalah teman sebaya diperlukan"],
          min: [0, "Skor masalah teman sebaya tidak boleh negatif."],
          max: [10, "Skor masalah teman sebaya tidak boleh melebihi 10."],
        },
        peerProblemInterpretation: {
          type: String,
          required: [
            true,
            "Interpretasi dari masalah teman sebaya diperlukan.",
          ],
          trim: true,
          minlength: [
            10,
            "Interpretasi dari masalah teman sebaya minimal 10 karakter.",
          ],
        },
        prosocialBehaviourScore: {
          type: Number,
          required: [true, "Skor perilaku prososial diperlukan"],
          min: [0, "Skor perilaku prososial tidak boleh negatif."],
          max: [10, "Skor perilaku prososial tidak boleh melebihi 10."],
        },
        prosocialBehaviourInterpretation: {
          type: String,
          required: [true, "Interpretasi dari perilaku prososial diperlukan."],
          trim: true,
          minlength: [
            10,
            "Interpretasi dari perilaku prososial minimal 10 karakter.",
          ],
        },
        totalPosttestScore: {
          type: Number,
          required: [true, "Skor total post test diperlukan"],
          min: [0, "Skor total post test tidak boleh negatif."],
        },
        totalPosttestInterpretation: {
          type: String,
          required: [
            true,
            "Interpretasi kesimpulan dari post test diperlukan.",
          ],
          trim: true,
          minlength: [
            10,
            "Interpretasi kesimpulan dari post test minimal 10 karakter.",
          ],
        },
      },
      { timestamps: true }
    );
  };

  public getModel = (): Model<IPosttestDocument> => {
    return this.posttest;
  };
}

export default new Posttest().getModel();
