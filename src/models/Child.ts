import mongoose, { Schema, Model } from "mongoose";
import { IChildDocument } from "../types/child.type";

class Child {
  private child: Model<IChildDocument>;

  constructor() {
    this.child = mongoose.model<IChildDocument>("Child", this.initialSchema());
  }

  private initialSchema = (): Schema<IChildDocument> => {
    return new Schema<IChildDocument>(
      {
        parentId: {
          type: Schema.Types.ObjectId,
          ref: "Parent",
          required: [true, "ID orang tua dibutuhkan."],
        },
        fullname: {
          type: String,
          required: [true, "Nama lengkap anak diperlukan."],
          trim: true,
          minlength: [2, "Nama lengkap minimal 2 karakter."],
          match: [
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            "Nama lengkap tidak boleh mengandung angka atau simbol.",
          ],
        },
        nik: {
          trim: true,
          type: String,
          required: [true, "NIK anak diperlukan."],
          unique: [true, "NIK ini sudah digunakan."],
          match: [
            /^(?:\d{6})(?:0[1-9]|[12]\d|3[01]|4[1-9]|5\d|6\d|7[01])(?:0[1-9]|1[0-2])\d{2}\d{4}$/,
            "Format NIK tidak valid.",
          ],
        },
        age: {
          type: Number,
          required: [true, "Umur anak diperlukan."],
          min: [0, "Umur tidak boleh negatif"],
        },
        biologicalMotherName: {
          type: String,
          required: [true, "Nama ibu kandung diperlukan."],
          trim: true,
          minlength: [2, "Nama ibu kandung minimal 2 karakter."],
          match: [
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            "Nama ibu kandung tidak boleh mengandung angka atau simbol.",
          ],
        },
        birth: {
          type: Date,
          required: [true, "Tanggal lahir anak diperlukan."],
          validate: {
            validator: function (v: Date) {
              return (
                v instanceof Date && !isNaN(v.getTime()) && v <= new Date()
              );
            },
            message:
              "Tanggal lahir harus berupa tanggal valid dan tidak boleh di masa depan.",
          },
        },
        childOrder: {
          type: Number,
          required: [true, "Urutan anak ke berapa diperlukan"],
          min: [1, "Urutan anak ke berapa tidak boleh 0 atau negatif"],
        },
        education: {
          stage: {
            type: String,
            required: [true, "Jenjang pendidikan anak diperlukan."],
            enum: ["SD", "SMP", "SMA"],
          },
          class: {
            type: Number,
            required: [true, "Kelas diperlukan."],
            min: [1, "Kelas tidak boleh nol atau negatif"],
          },
        },
      },
      { timestamps: true }
    );
  };

  public getModel = (): Model<IChildDocument> => {
    return this.child;
  };
}

export default new Child().getModel();
