import { useState, useEffect } from 'react'
import axios from 'axios';
import { DeleteModal } from './components/DeleteModal';
import Transactions from './components/Transactions';

export const Home = () => {

    return (
        <>
            <Transactions />
        </>
    )
}
