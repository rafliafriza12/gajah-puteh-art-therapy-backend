import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";
import { verifyToken } from "../middleware/auth";
import { verifyCounselor } from "../middleware/counselor";
import observationService from "../service/observationService";
import {
  TCreateObservationInput,
  TUpdateObservationInput,
} from "../types/observation.type";

class ObservationController {
  public create = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const input: TCreateObservationInput =
          req.body as TCreateObservationInput;
        const result = await observationService.create(input);
        res
          .status(201)
          .json(
            responseSuccessWithData(
              201,
              result,
              "Data observasi berhasil ditambahkan."
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
        if (!id) throw new Error("ID observasi diperlukan");
        const result = await observationService.getById(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data observasi berhasil diambil"
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
        const result = await observationService.getByTherapyId(therapyId);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data observasi berhasil diambil"
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
        if (!id) throw new Error("ID observasi diperlukan");
        const input: TUpdateObservationInput =
          req.body as TUpdateObservationInput;
        const result = await observationService.update(id, input);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data observasi berhasil diupdate."
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
        if (!id) throw new Error("ID observasi diperlukan");
        const result = await observationService.delete(id);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(
              200,
              result,
              "Observasi berhasil dihapus."
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

export default new ObservationController();
