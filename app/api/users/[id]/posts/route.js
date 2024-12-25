import Prompt from "@models/prompt"
import { connectDb } from "@utils/database"

export const GET  = async ( req, {params}) =>{
    try {
        const { id } = await params
        await connectDb()
        const prompts = await Prompt.find({creator: id}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200})
    } catch (error) {
        return new Response('Fail to fetch in params.id ' , { status: 500})
    }
}