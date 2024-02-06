import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
interface ModalProps {
    modalState: boolean;
    modalHandler: (state: boolean) => void;
    handleDelete: () => void;
}
export const DeleteModal: React.FC<ModalProps> = ({ modalState, modalHandler, handleDelete }) => {



    return (
        <>
            <Modal open={modalState} onClose={() => modalHandler(false)} center>
                <div className='p-5'>
                    <p className='text-xl'>Are you want to delete item?</p>
                    <div className='flex gap-5 mt-6 justify-around'>
                        <button className='bg-red-300 hover:bg-red-600 px-6 py-3 rounded-lg' onClick={handleDelete}>Yes</button>
                        <button className='bg-green-300 hover:bg-green-600 px-6 py-3 rounded-lg' onClick={() => modalHandler(false)}>No</button>
                    </div>
                </div>



            </Modal>
        </>
    )
}