'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from "next/navigation";
import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter()
    const [ submitting, setSubmitting ] = useState(false)
    const searchParams = useSearchParams()
    const { data: session} = useSession()
    const promptId = searchParams.get('id')
    const [ post, setPost ] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(()=>{
        const getPromptDetai = async() =>{
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if( promptId ) getPromptDetai()
    }, [promptId])

    const updatePropmt = async( e ) =>{
        e.preventDefault()
        setSubmitting( true )
        if( !promptId) return alert('prompt id not provided')
        try {
            const res = await fetch(`/api/prompt/${promptId}`,{
                method:'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })
            if( res.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting( false )
        }
    }
  return (
    <Form
        type = ' Edit'
        post = { post }
        setPost = { setPost }
        submitting = { submitting }
        handleSubmit = { updatePropmt }
    />
  )
}

export default EditPrompt