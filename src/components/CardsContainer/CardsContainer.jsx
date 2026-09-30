import React from 'react'

const CardsContainer = ({children , dir}) => {
    return (
        <div dir={dir} className='flex  gap-4.5 mb-4.5 '>
        {children}
        </div>
    )
}

export default CardsContainer
