import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "Gajah Puteh Art Therapy Backend API",
        timestamp: new Date().toISOString(),
      });
    });

    // API routes
    this.app.use("/api", router);
  }
}

export default new App().app;
