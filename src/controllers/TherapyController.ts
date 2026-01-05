import { Request, Response } from "express";
import {
  responseSuccessWithData,
  identifyError,
  responseSuccessWithoutData,
} from "../helper/response";
import { verifyToken } from "../middleware/auth";
import { verifyCounselor } from "../middleware/counselor";
import therapyService from "../service/therapyService";
import {
  TCreateTherapyInput,
  TUpdateTherapyInput,
} from "../types/therapy.type";
import { IJWTPayload } from "../types/auth.type";

class TherapyController {
  public create = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const input: TCreateTherapyInput = req.body as TCreateTherapyInput;
        const result = await therapyService.create(input);
        res
          .status(201)
          .json(
            responseSuccessWithData(
              201,
              result,
              "Data terapi berhasil ditambahkan."
            )
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public getAll = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const result = await therapyService.getAll();
        res
          .status(200)
          .json(
            responseSuccessWithData(200, result, "Data terapi berhasil diambil")
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
        if (!id) throw new Error("ID terapi diperlukan");
        const result = await therapyService.getById(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(200, result, "Data terapi berhasil diambil")
          );
        return;
      } catch (error) {
        await identifyError(res, error);
        return;
      }
    },
  ];

  public getByCounselorId = [
    verifyToken,
    verifyCounselor,
    async (req: Request, res: Response): Promise<void> => {
      try {
        const payload = req.payload as IJWTPayload;
        const counselorId = payload.id;
        const result = await therapyService.getByCounselorId(counselorId);
        res
          .status(200)
          .json(
            responseSuccessWithData(200, result, "Data terapi berhasil diambil")
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
        const result = await therapyService.getByChildId(id);
        res
          .status(200)
          .json(
            responseSuccessWithData(200, result, "Data terapi berhasil diambil")
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
        if (!id) throw new Error("ID terapi diperlukan");
        const input: TUpdateTherapyInput = req.body as TUpdateTherapyInput;
        const result = await therapyService.update(id, input);
        res
          .status(200)
          .json(
            responseSuccessWithData(
              200,
              result,
              "Data terapi berhasil diupdate."
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
        if (!id) throw new Error("ID terapi diperlukan");
        const result = await therapyService.delete(id);
        res
          .status(200)
          .json(
            responseSuccessWithoutData(200, result, "Terapi berhasil dihapus.")
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
        console.log("🌐 [TherapyController] GET /therapy/parent called");
        const payload = req.payload as IJWTPayload;
        console.log("👤 [TherapyController] Payload:", payload);
        const parentId = payload.id;
        console.log("🆔 [TherapyController] Parent ID:", parentId);

        const result = await therapyService.getByParentId(parentId);
        console.log("✅ [TherapyController] Result count:", result.length);

        res
          .status(200)
          .json(
            responseSuccessWithData(200, result, "Data terapi berhasil diambil")
          );
        return;
      } catch (error) {
        console.error("❌ [TherapyController] Error:", error);
        await identifyError(res, error);
        return;
      }
    },
  ];
}

export default new TherapyController();
