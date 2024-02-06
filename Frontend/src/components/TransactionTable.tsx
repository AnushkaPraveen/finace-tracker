import React from 'react'

interface TransactionProps {
    transactionItems: any[];
    setOpen: (state: boolean) => void;
    setItemId: (itemId: number) => void;
    handleEdit: (description: string, amount: number, id: number,type:string) => void;
}

export const TransactionTable: React.FC<TransactionProps> = ({ transactionItems, setOpen, setItemId, handleEdit }) => {
    return (
        <table className='place-content-center w-full px-6 py-10'>
            <thead className='bg-gray-100 '> 
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className='place-content-center'>
                {transactionItems.map((item, index) => (
                    <tr key={index} className='bg-white border-b py-3'>
                        <td className='text-center'>{item.description}</td>
                        <td className='text-center'>{item.amount}</td>
                        <td>
                            <div className='flex justify-center items-center gap-x-4'>
                                <button className='bg-yellow-300 hover:bg-yellow-600 px-4 py-1 rounded-lg' onClick={() => { handleEdit(item.description, item.amount, item.id,item.type) }}>Edit</button>
                                <button className='bg-red-300 hover:bg-red-600 px-4 py-1 rounded-lg' onClick={() => { setOpen(true); setItemId(item.id); }}>Delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
