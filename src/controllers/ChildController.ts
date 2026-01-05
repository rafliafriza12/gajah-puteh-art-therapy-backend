import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";

import { verifyToken } from "../middleware/auth";
import { verifyParent } from "../middleware/parent";
import { TCreateChildInput, TUpdateChildInput } from "../types/child.type";
import childService from "../service/childService";
import { IJWTPayload } from "../types/auth.type";

class ChildController {
  public create = [
    verifyToken,
    verifyParent,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { id }: { id?: string } = req.payload as { id: string };
        const input: TCreateChildInput = req.body as TCreateChildInput;
        const result = await childService.create(id, input);
        res
          .status(201)
          .json(
            responseSuccessWithData(
              201,
              result,
              "Data anak berhasil ditambahkan."
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public getByParentId = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const payload = req.payload as IJWTPayload;

        let parentId: string;

        if (payload.role === "counselor") {
          const { id } = req.params;

          if (!id) {
            throw new Error("ID parent tidak ditemukan di parameter.");
          }

          parentId = id;
        } else {
          parentId = payload.id;
        }

        const result = await childService.getByParentId(parentId);

        res
          .status(200)
          .json(
            responseSuccessWithData(200, result, "Data anak berhasil diambil")
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public getByChildId = [
    verifyToken,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const { id }: { id?: string } = req.params as { id: string };
        if (!id) throw new Error("ID anak diperlukan");
        const result = await childService.getByChildId(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(200, result, "Data anak berhasil diambil")
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
        const { id }: { id?: string } = req.params as { id: string };
        const input: TUpdateChildInput = req.body as TUpdateChildInput;
        const result = await childService.update(id, input);
        res
          .status(200)
          .json(
            responseSuccessWithData(200, result, "Data anak berhasil diubah.")
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
        if (!id) throw new Error("ID anak diperlukan");
        const result = await childService.delete(id);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(
              200,
              result,
              "Data anak berhasil dihapus."
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

export default new ChildController();
