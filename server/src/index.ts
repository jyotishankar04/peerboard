import app from "./server";
import _env from "./config";
import logger from "./config/logger";


const startServer = () => {
    app.listen(_env.PORT, () => {
        logger.info(`Server running on port ${_env.PORT}`);
    });
}

startServer();
