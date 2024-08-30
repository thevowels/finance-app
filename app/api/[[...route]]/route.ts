import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { clerkMiddleware } from "@hono/clerk-auth";
import { HTTPException } from "hono/http-exception";

import accounts from "./accounts"
import categories from "./categories"

export const runtime = 'edge'

const app = new Hono().basePath('/api')
app.onError((err,c ) =>{
    if(err instanceof HTTPException){
        return err.getResponse();
    }
    return c.json({error:"Internal error"}, 500)
})
app.use('*', clerkMiddleware())
const routes = app
    .route('/accounts', accounts)
    .route('/categories', categories);
export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;