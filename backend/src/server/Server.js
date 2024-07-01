import express from "express";
import cors from "cors"; // Import the CORS middleware

// In general, the server is there to listen to a port for request/response
export default class Server {
    #app;
    #host;
    #port;
    #routes;
    #server;

    constructor(port, host, routes) {
        this.#app = express();
        this.#port = port;
        this.#host = host;
        this.#server = null;
        this.#routes = routes; // Array of routes
    }

    getApp = () => {
        return this.#app;
    };

    start = () => {
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server is listening on http://${this.#host}:${this.#port}`);
        });

        this.#app.use(express.json()); // MEGA IMPORTANT FOR PROCESSING req.body. this is used for the middleware

        // Enable CORS for all routes
        this.#app.use(cors());

        // Setup all routes
        this.#routes.forEach(route => {
            this.#app.use(route.getRouteStartPoint(), route.getRouter());
        });
    };

    close = () => {
        // Check if server has a value (not null), if it does, then close it.
        this.#server?.close();
    };
}
