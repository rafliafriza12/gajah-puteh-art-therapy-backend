import mongoose, { Schema, Model } from "mongoose";
import { IParentDocument } from "../types/parent.type";
import bcrypt from "bcryptjs";

class Parent {
  private parent: Model<IParentDocument>;

  constructor() {
    this.parent = mongoose.model<IParentDocument>(
      "Parent",
      this.initialSchema()
    );
  }

  private initialSchema = (): Schema<IParentDocument> => {
    const schema = new Schema<IParentDocument>(
      {
        email: {
          type: String,
          required: [true, "Enail diperlukan."],
          unique: [true, "Email ini sudah digunakan."],
          match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Masukkan email yang valid.",
          ],
          trim: true,
          minlength: [10, "Email minimal 10 karakter."],
        },
        fullname: {
          type: String,
          required: [true, "Nama lengkap diperlukan."],
          trim: true,
          minlength: [2, "Nama lengkap minimal 2 karakter."],
          match: [
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            "Nama lengkap tidak boleh mengandung angka atau simbol.",
          ],
        },
        address: {
          type: String,
          required: [true, "Alamat diperlukan."],
          trim: true,
          minlength: [15, "Alamat minimal 15 karakter."],
        },
        phone: {
          type: String,
          required: [true, "Nomor telepon diperlukan."],
          unique: [true, "Nomor telepon ini sudah digunakan."],
          match: [
            /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/,
            "Format nomor telepon tidak valid.",
          ],
          trim: true,
        },
        password: {
          type: String,
          required: [true, "Password dibutuhkan"],
        },
        work: {
          type: String,
          required: [true, "Data pekerjaan dibutuhkan."],
          trim: true,
          minlength: [3, "Nama pekerjaan minimal 3 karakter."],
          match: [
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            "Nama pekerjaan tidak boleh mengandung angka atau simbol.",
          ],
        },
        age: {
          type: Number,
          required: [true, "Umur diperlukan"],
          min: [1, "Umur tidak boleh nol atau negatif"],
        },
        accessToken: {
          type: String,
          default: null,
        },
      },
      { timestamps: true }
    );

    schema.pre<IParentDocument>("save", async function (this: IParentDocument) {
      if (!this.isModified("password")) return;

      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

      if (!regex.test(this.password)) {
        throw new Error(
          "Password setidaknya terdiri dari 8 karakter, termasuk huruf besar, nomor, dan karakter spesial."
        );
      }

      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    });

    return schema;
  };

  public getModel = (): Model<IParentDocument> => {
    return this.parent;
  };
}

export default new Parent().getModel();
