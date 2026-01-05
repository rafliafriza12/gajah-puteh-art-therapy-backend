import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";

import counselorService from "../service/counselorService";
import { verifyToken } from "../middleware/auth";
import { verifyCounselor } from "../middleware/counselor";
import { TUpdateCounselorInput } from "../types/counselor.type";

class CounselorController {
  public getAll = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const result = await counselorService.getAll();
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data konselor berhasil diambil."
            )
          );
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
        const { id }: { id?: string } = req.params as {
          id: string;
        };
        const result = await counselorService.getById(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data konselor berhasil diambil"
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
        const { id }: { id?: string } = req.payload as { id: string };
        const input: TUpdateCounselorInput = req.body as TUpdateCounselorInput;
        const result = await counselorService.update(id, input);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data konselor berhasil diupdate."
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
        const result = await counselorService.delete(id);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(
              200,
              result,
              "Konselor berhasil dihapus."
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

export default new CounselorController();
