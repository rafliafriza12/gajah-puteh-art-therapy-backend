import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";
import { verifyToken } from "../middleware/auth";
import { verifyCounselor } from "../middleware/counselor";
import pretestService from "../service/pretestService";
import {
  TCreatePretestInput,
  TUpdatePretestInput,
} from "../types/pretest.type";

class PretestController {
  public create = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const input: TCreatePretestInput = req.body as TCreatePretestInput;
        const result = await pretestService.create(input);
        res
          .status(201)
          .json(
            responseSuccessWithData(
              201,
              result,
              "Data pretest berhasil ditambahkan."
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
        if (!id) throw new Error("ID pretest diperlukan");
        const result = await pretestService.getById(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data pretest berhasil diambil"
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
        const result = await pretestService.getByTherapyId(therapyId);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data pretest berhasil diambil"
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
        if (!id) throw new Error("ID pretest diperlukan");
        const input: TUpdatePretestInput = req.body as TUpdatePretestInput;
        const result = await pretestService.update(id, input);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data pretest berhasil diupdate."
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
        if (!id) throw new Error("ID pretest diperlukan");
        const result = await pretestService.delete(id);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(200, result, "Pretest berhasil dihapus.")
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];
}

export default new PretestController();
