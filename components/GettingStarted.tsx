import { Button } from '@mantine/core'
import React from 'react'

type gettingStartedProps = {
    handleNext : ()=> void
}

const GettingStarted = ({handleNext} :gettingStartedProps) => {
  return (
    <div className='flex flex-col gap-6 items-center justify-center mt-2  rounded-lg px-4 py-6'>
        <div className='px-10 py-6 flex flex-col gap-5 w-[500px] bg-black justify-center rounded-xl'>

        <h2 className='text-3xl font-bold text-center'>Welcome to MadWall!</h2>
        <p className='text-center'>Let{"'"}s Get Started</p>
        <Button onClick={handleNext} variant='filled' color='blue' radius={30}>Generate Phrase</Button>
        </div>
    </div>
  )
}

export default GettingStarted