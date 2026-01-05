import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";
import { verifyToken } from "../middleware/auth";
import { verifyParent } from "../middleware/parent";
import { verifyCounselor } from "../middleware/counselor";
import parentService from "../service/parentService";
import { TUpdateParentInput } from "../types/parent.type";

class ParentController {
  public getAll = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const result = await parentService.getAll();
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data orangtua berhasil diambil."
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
        const result = await parentService.getById(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data orangtua berhasil diambil."
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
    verifyParent,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { id }: { id?: string } = req.payload as { id: string };
        const input: TUpdateParentInput = req.body as TUpdateParentInput;
        const result = await parentService.update(id, input);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data orangtua berhasil diupdate."
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
    verifyParent,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { id }: { id?: string } = req.params as { id: string };
        const result = await parentService.delete(id);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(
              200,
              result,
              "Data orangtua berhasil dihapus."
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

export default new ParentController();
