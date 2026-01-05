import mongoose, { Schema, Model } from "mongoose";
import { ICounselorDocument } from "../types/counselor.type";
import bcrypt from "bcryptjs";

class Counselor {
  private counselor: Model<ICounselorDocument>;

  constructor() {
    this.counselor = mongoose.model<ICounselorDocument>(
      "Counselor",
      this.initialSchema()
    );
  }

  private initialSchema = () => {
    const schema = new Schema(
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
        isStudent: {
          type: Boolean,
          required: [true, "Status mahasiswa diperlukan"],
        },
        education: {
          university: {
            type: String,
            required: [true, "Nama universitas diperlukan"],
            trim: true,
            minlength: [15, "Nama universitas minimal 15 karakter."],
            match: [
              /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
              "Nama tidak boleh mengandung angka atau simbol.",
            ],
          },
          stage: {
            type: String,
            required: [true, "Jenjang Pendidikan Dibutuhkan"],
            enum: ["D3", "D4", "S1", "S2", "S3"],
          },
          majority: {
            type: String,
            required: [true, "Nama Jurusan Diperlukan"],
            trim: true,
            minlength: [2, "Nama Jurusan minimal 2 karakter."],
            match: [
              /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
              "Nama Jurusan tidak boleh mengandung angka atau simbol.",
            ],
          },
          semester: {
            type: Number,
            default: null,
            required: function (this: ICounselorDocument) {
              return this.isStudent === true;
            },
            validate: {
              validator: function (this: ICounselorDocument, v: number | null) {
                if (this.isStudent) {
                  return v !== null && v !== undefined;
                }
                return v === null;
              },
              message:
                "Semester wajib diisi untuk mahasiswa dan harus kosong untuk non-mahasiswa.",
            },
          },
        },
        practiceLicenseNumber: {
          type: String,
          default: undefined,

          set: (v: string) => (v === "" ? undefined : v),
          required: function (this: ICounselorDocument) {
            return this.isStudent === false;
          },
          trim: true,
          minlength: [10, "Nomor izin praktik minimal 10 karakter."],
          validate: {
            validator: function (this: ICounselorDocument, v: string) {
              if (this.isStudent) {
                return !v;
              }
              return typeof v === "string" && v.length > 0;
            },
            message:
              "Nomor izin praktik wajib untuk non-mahasiswa dan tidak boleh diisi oleh mahasiswa.",
          },
          match: [/^\d+$/, "Nomor izin praktik hanya boleh berisi angka."],
        },
        work: {
          type: String,
          default: undefined,
          set: (v: string) => (v === "" ? undefined : v),
          required: function (this: ICounselorDocument) {
            return this.isStudent === false;
          },
          trim: true,
          minlength: [2, "Nama pekerjaan minimal 2 karakter."],
          validate: {
            validator: function (this: ICounselorDocument, v: string) {
              if (this.isStudent) {
                return !v;
              }
              return typeof v === "string" && v.length > 0;
            },
            message:
              "Pekerjaan wajib untuk non-mahasiswa dan tidak boleh diisi oleh mahasiswa.",
          },
          match: [
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            "Nama pekerjaan tidak boleh mengandung angka atau simbol.",
          ],
        },
        password: {
          type: String,
          required: [true, "Password dibutuhkan"],
        },
        accessToken: {
          type: String,
          default: null,
        },
      },
      { timestamps: true }
    );

    schema.pre<ICounselorDocument>(
      "save",
      async function (this: ICounselorDocument) {
        if (!this.isModified("password")) return;

        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!regex.test(this.password)) {
          throw new Error(
            "Password setidaknya terdiri dari 8 karakter, termasuk huruf besar, nomor, dan karakter spesial."
          );
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
    );

    return schema;
  };

  public getModel(): Model<ICounselorDocument> {
    return this.counselor;
  }
}

export default new Counselor().getModel();
