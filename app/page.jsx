import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='flex-center flex-col w-full'>
      <h1 className='text-center head_text'>Discover & Share</h1>
      <br className='max-md:hidden'/>
      <span className='orange_gradient text-center'>Ai Power Prompted</span>
      <p className='desc text-center'>Microsoft Windows [Version 10.0.22631.4460]
      (c) Microsoft Corporation. All rights reserved.</p>
      <Feed/>
    </section>
  )
}

export default Home