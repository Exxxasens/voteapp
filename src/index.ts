import { config } from "dotenv";
config();

import Server from "./server";
import UserController from "./controllers/user.controller";
import PollController from "./controllers/poll.controller";

const server = new Server([new UserController(), new PollController()]);

server.start();
