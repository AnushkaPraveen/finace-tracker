import React from 'react'

interface CardProps {
    title: string,
    amount: number,
    bgColor: string
}

export const DisplayCard: React.FC<CardProps> = ({ title, amount, bgColor }) => {
    return (

        <div className={`flex flex-col items-center p-9 rounded shadow-2xl mb-4 ${bgColor}`}>
            <h3 className='text-3xl font-semibold'>{title}</h3>

            <h3 className='text-5xl'>${amount}</h3>
        </div>


    )
}
