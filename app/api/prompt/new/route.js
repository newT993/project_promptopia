import Prompt from '@models/prompt'
import { connectDb } from '@utils/database'
import React from 'react'

export const POST = async ( req) => {
    const { userId, prompt, tag} = await req.json()
    try {
        await connectDb()
        const newPrompt = new Prompt({
            creator : userId,
            prompt,
            tag
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to create a prompt ", { status: 500})
    }
}
