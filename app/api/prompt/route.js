import Prompt from "@models/prompt"
import { connectDb } from "@utils/database"

export const GET = async ( req ) =>{
    try {
        await connectDb()
        const prompt = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompt), { status: 200})
    } catch (error) {
        return new Response("Fail to fetch", { status: 500})
    }
}