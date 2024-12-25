import Prompt from "@models/prompt"
import { connectDb } from "@utils/database"

export const GET = async ( req,{ params} ) => {
    try {
        const { id } = await params
        await connectDb()
        const prompt = await Prompt.findById(id).populate('creator')
        if (!prompt) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Fail to fetch", { status: 500 })
    }
}

export const PATCH = async (req, { params}) =>{
    const { prompt, tag } = await req.json()
    try {
        await connectDb()
        const { id } = await params
        const exitPrompt = await Prompt.findById(id)
        if( !exitPrompt) return new Response("Prompt not found", { status: 404 })
        exitPrompt.prompt = prompt
        exitPrompt.tag = tag
        await exitPrompt.save()
        return new Response(JSON.stringify(exitPrompt), { status: 200 })
    } catch (error) {
        return new Response("Fail to fetch", { status: 500 })
    }
}

export const DELETE = async ( req, {params}) =>{
    try {
        await connectDb()
        const { id } = await params
        await Prompt.findByIdAndDelete(id)
        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Fail to fetch", { status: 500 })
    }
}