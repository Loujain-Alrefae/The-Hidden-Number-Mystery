import React from 'react'

const GameContainer = ({children}) => {
    return (
        <div className=' max-w-245 my-0 mx-auto mt-12 sm:p-5.5 sm:bg-[#ffffffe6] sm:border sm:border-solid sm:border-[#e9d2ff] sm:rounded-[20px] sm:shadow-[0_20px_50px_-24px_#8b5cf640]'>
            {children}
        </div>
    )
}

export default GameContainer
