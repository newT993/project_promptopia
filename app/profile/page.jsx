'use client'
import Profile from '@components/Profile'
import { useSession } from '@node_modules/next-auth/react'
import {  useRouter } from '@node_modules/next/navigation'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const { data : session } = useSession()
    const [ post, setPost ] = useState([])
    const router = useRouter()

    useEffect(()=>{
        const fetchPosts = async ()=>{
          const res = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await res.json()
          setPost(data)
        }
        if (session?.user.id) fetchPosts()
      }, [])
    const handleEdit = (po) =>{
      router.push(`/update-prompt?id=${po._id}`)
    }

    const handleDelete = async ( po ) =>{
      const hasConfirm = confirm(`Are you sure you want to delete this`)
      if(hasConfirm){
        try {
          await fetch(`/api/prompt/${po._id.toString()}`,{
            method:'DELETE'
          })
          const filterPost = post.filter(p=>p._id !== po._id)
          setPost(filterPost)
        } catch (error) {
         console.error(error) 
        }
      }
    }
  return (
    <div>
        <Profile name='My' desc="Welcome to your personalized proile page" data={post} handleEdit={handleEdit} handleDelete={handleDelete}/>
    </div>
  )
}

export default MyProfile