import React from 'react'

const GameContainer = ({children}) => {
    return (
        <div className=' max-w-245 my-0 mx-auto mt-12 p-5.5 bg-[#ffffffe6] border border-solid border-[#e9d2ff] rounded-[20px] shadow-[0_20px_50px_-24px_#8b5cf640]'>
            {children}
        </div>
    )
}

export default GameContainer
