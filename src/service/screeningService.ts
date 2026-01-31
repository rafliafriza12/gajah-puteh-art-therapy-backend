import { Types } from "mongoose";
import Screening from "../models/Screening";
import {
  IScreeningDocument,
  TCreateScreeningInput,
  TUpdateScreeningInput,
} from "../types/screening.type";
import { NotFoundError } from "../helper/response";

interface Interpretation {
  counselorInterpretation: string;
  parentInterpretation: string;
}

class ScreeningService {
  private getInterpretation = (score: number): Interpretation => {
    if (score <= 4) {
      return {
        counselorInterpretation:
          "Tidak terindikasi risiko PTSD berdasarkan hasil skrining awal. Anak berada dalam rentang respons stres yang masih adaptif pasca kejadian traumatis.",
        parentInterpretation:
          "Berdasarkan hasil skrining, saat ini anak Anda tidak menunjukkan tanda-tanda risiko tinggi terkait stres pascatrauma. Reaksi yang muncul masih termasuk wajar setelah mengalami peristiwa yang menegangkan. Tetap berikan dukungan emosional dan perhatikan kondisi anak dalam beberapa waktu ke depan.",
      };
    } else {
      return {
        counselorInterpretation:
          "Hasil skrining menunjukkan bahwa anak menunjukkan tanda-tanda risiko reaksi stres pasca kejadian traumatis. Hasil ini bukan diagnosis, namun menjadi gambaran bahwa anak membutuhkan perhatian dan pendampingan emosional lebih lanjut. Melalui terapi, anak akan mengikuti pendampingan psikososial sebagai bagian dari proses pemulihan. Jika selama pendampingan terdapat kebutuhan tambahan, anak dapat dirujuk untuk mendapatkan asesmen lanjutan dari psikolog atau psikiater anak.Anak teridentifikasi berisiko mengalami gejala PTSD.",
        parentInterpretation:
          "Hasil skrining menunjukkan bahwa anak Anda menunjukkan beberapa tanda reaksi stres setelah peristiwa yang dialami. Hal ini bukan merupakan diagnosis gangguan mental, namun menunjukkan bahwa anak mungkin membutuhkan dukungan tambahan. Dukungan tersebut dapat berupa pendampingan emosional, aktivitas bermain yang membantu anak menyalurkan perasaan, komunikasi yang hangat dan tidak menghakimi, serta lingkungan yang aman dan stabil. Pendampingan ini bertujuan untuk membantu anak merasa lebih tenang dan mampu menghadapi pengalaman yang dialaminya.",
      };
    }
  };

  public create = async (
    input: TCreateScreeningInput,
  ): Promise<IScreeningDocument> => {
    try {
      const { counselorInterpretation, parentInterpretation }: Interpretation =
        this.getInterpretation(input.screeningScore);
      const newData = {
        therapyId: input.therapyId,
        screeningScore: input.screeningScore,
        counselorInterpretation,
        parentInterpretation,
      };
      const screening = new Screening(newData);
      await screening.save();
      return screening;
    } catch (error) {
      throw error;
    }
  };

  public getById = async (id: string): Promise<IScreeningDocument> => {
    try {
      const screening = await Screening.findById(id);
      if (!screening)
        throw new NotFoundError("Data screening tidak ditemukan.");
      return screening;
    } catch (error) {
      throw error;
    }
  };

  public getByTherapyId = async (
    therapyId: string,
  ): Promise<IScreeningDocument | null> => {
    try {
      const id = new Types.ObjectId(therapyId);
      const screening = await Screening.findOne({ therapyId: id });
      if (!screening) return null;
      return screening;
    } catch (error) {
      throw error;
    }
  };

  public update = async (
    id: string,
    input: TUpdateScreeningInput,
  ): Promise<IScreeningDocument> => {
    try {
      const { counselorInterpretation, parentInterpretation }: Interpretation =
        this.getInterpretation(input.screeningScore ?? 0);

      const updateData = {
        counselorInterpretation,
        parentInterpretation,
        ...input,
      };
      const screening = await Screening.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!screening) throw new NotFoundError("Data screening tidak ditemukan");
      return screening;
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: string): Promise<boolean> => {
    try {
      const screening = await Screening.findByIdAndDelete(id);
      if (!screening) throw new NotFoundError("Data screening tidak ditemukan");
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export default new ScreeningService();
