import { Hono } from "hono";
import {clerkMiddleware} from "@hono/clerk-auth";

const app = new Hono()
    .use(clerkMiddleware())
    .get(
        "/",
        async (c) =>{
            c.json({summary: true})
        }
    )

export default app;