import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";
import { verifyToken } from "../middleware/auth";
import { verifyCounselor } from "../middleware/counselor";
import screeningService from "../service/screeningService";
import {
  TCreateScreeningInput,
  TUpdateScreeningInput,
} from "../types/screening.type";

class ScreeningController {
  public create = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const input: TCreateScreeningInput = req.body as TCreateScreeningInput;
        const result = await screeningService.create(input);
        res
          .status(201)
          .json(
            responseSuccessWithData(
              201,
              result,
              "Data screening berhasil ditambahkan."
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public getById = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { id }: { id?: string } = req.params as { id: string };
        if (!id) throw new Error("ID screening diperlukan");
        const result = await screeningService.getById(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data screening berhasil diambil"
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public getByTherapyId = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { therapyId }: { therapyId?: string } = req.params as {
          therapyId: string;
        };
        if (!therapyId) throw new Error("ID terapi diperlukan");
        const result = await screeningService.getByTherapyId(therapyId);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data screening berhasil diambil"
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public update = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { id }: { id?: string } = req.params as { id: string };
        if (!id) throw new Error("ID screening diperlukan");
        const input: TUpdateScreeningInput = req.body as TUpdateScreeningInput;
        const result = await screeningService.update(id, input);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data screening berhasil diupdate."
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public delete = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { id }: { id?: string } = req.params as { id: string };
        if (!id) throw new Error("ID screening diperlukan");
        const result = await screeningService.delete(id);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(
              200,
              result,
              "Screening berhasil dihapus."
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];
}

export default new ScreeningController();
