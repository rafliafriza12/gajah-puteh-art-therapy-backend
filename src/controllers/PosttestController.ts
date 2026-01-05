import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";
import { verifyToken } from "../middleware/auth";
import { verifyCounselor } from "../middleware/counselor";
import posttestService from "../service/posttestService";
import {
  TCreatePosttestInput,
  TUpdatePosttestInput,
} from "../types/posttest.type";

class PosttestController {
  public create = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const input: TCreatePosttestInput = req.body as TCreatePosttestInput;
        const result = await posttestService.create(input);
        res
          .status(201)
          .json(
            responseSuccessWithData(
              201,
              result,
              "Data posttest berhasil ditambahkan."
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
        if (!id) throw new Error("ID posttest diperlukan");
        const result = await posttestService.getById(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data posttest berhasil diambil"
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
        const result = await posttestService.getByTherapyId(therapyId);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data posttest berhasil diambil"
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
        if (!id) throw new Error("ID posttest diperlukan");
        const input: TUpdatePosttestInput = req.body as TUpdatePosttestInput;
        const result = await posttestService.update(id, input);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data posttest berhasil diupdate."
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
        if (!id) throw new Error("ID posttest diperlukan");
        const result = await posttestService.delete(id);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(
              200,
              result,
              "Posttest berhasil dihapus."
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

export default new PosttestController();
