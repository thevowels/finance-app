import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from "@hono/zod-validator"
import { handle } from 'hono/vercel'
import { clerkMiddleware, getAuth} from "@hono/clerk-auth";
export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.use('*', clerkMiddleware())
app.
    get('/hello',
        (c) => {
        const auth = getAuth(c);
        if(!auth?.userId){
            return c.json({
                error: "Unauthorized",
            })
        }
        console.log('***8Auth****', auth)
        return c.json({
            message: 'Hello Next.js!',
            userId: auth.userId
        })
    })
    .post("/",
        zValidator( 'json', z.object({
            name:z.string(),
            userId: z.number(),
        })),
        (c)=>{
        const {name, userId} = c.req.valid('json')

        return c.json({})
        })
export const GET = handle(app)
export const POST = handle(app)
