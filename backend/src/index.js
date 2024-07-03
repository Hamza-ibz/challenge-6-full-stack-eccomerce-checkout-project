import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import UserRoutes from "./routes/User.routes.js";
import ProductRoutes from "./routes/Product.routes.js";
import CartRoutes from "./routes/Cart.routes.js";

// Load configuration
Config.load();
const { PORT, HOST, DB_URI } = process.env;

// Initialize routes
const userRoutes = new UserRoutes();
const productRoutes = new ProductRoutes();
const cartRoutes = new CartRoutes();

// Initialize server with all routes
const server = new Server(PORT, HOST, [
    userRoutes,
    productRoutes,
    cartRoutes
]);

// Initialize database
const database = new Database(DB_URI);

const startApplication = async () => {
    try {
        await database.connect();
        server.start();
    } catch (error) {
        console.error("Failed to start the application", error);
    }
};

startApplication();
