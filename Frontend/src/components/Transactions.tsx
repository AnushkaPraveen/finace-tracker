import { useState, useEffect } from 'react'
import axios from 'axios';
import { DeleteModal } from './DeleteModal';
import { TransactionTable } from './TransactionTable';
import { PieChart } from 'react-minimal-pie-chart';
import { DisplayCard } from './DisplayCard';

const Transactions = () => {

    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [Allincome, setAllIncome] = useState<number>(0);
    const [Allexpense, setAllExpense] = useState<number>(0);
    const [type, setType] = useState<string>('');
    const [incomeTransactions, setIncomeTransactions] = useState<any[]>([])
    const [expenseTransactions, setExpenseTransactions] = useState<any[]>([])
    const [balance, setBalance] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [itemId, setItemId] = useState<number>(0);
    const [editState, setEditState] = useState<boolean>(false);
    const baseURL = "http://localhost:8081/transaction";


    useEffect(() => {
        getTransactions();
    }, [])

    useEffect(() => {
        getAllAmount();
    }, [incomeTransactions, expenseTransactions])

    const getTransactions = () => {
        axios.get(baseURL)
            .then((response) => {
                const allTransactions: any[] = response.data;
                const incomeTransactions: any[] = allTransactions.filter(transaction => transaction.type === 'income');
                const expenseTransactions: any[] = allTransactions.filter(transaction => transaction.type === 'expense');

                setIncomeTransactions(incomeTransactions)
                setExpenseTransactions(expenseTransactions);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleTransactions = () => {
        if (description && amount && type) {
            const newTransaction = {
                description: description,
                amount: amount,
                type: type
            };
            if (!editState) {
                axios.post(baseURL, newTransaction)
                    .then(() => {
                        console.log("work");
                        getTransactions();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                console.log(newTransaction);
                console.log(itemId);

                axios.put(baseURL + `/${itemId}`, newTransaction)
                    .then(() => {
                        console.log("work");
                        getTransactions();
                        setEditState(false)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            setDescription('');
            setAmount(0);
            setType('');
        } else {
            alert("Please fill inputs")
        }
    }

    const handleDelete = () => {
        console.log("work");
        console.log(itemId);

        axios.delete(baseURL + `/${itemId}`)
            .then(() => {
                console.log("delete success");
                getTransactions();
                setItemId(0);
                setOpen(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleEdit = (description: string, amount: number, id: number, type: string) => {
        setEditState(true);
        setAmount(amount);
        setDescription(description);
        setItemId(id);
        setType(type);
    }


    const getAllAmount = () => {
        let totalIncomeAmount = 0;
        let totalExpensesAmount = 0;
        for (let i = 0; i < incomeTransactions.length; i++) {
            totalIncomeAmount += incomeTransactions[i].amount;
        }
        for (let i = 0; i < expenseTransactions.length; i++) {
            totalExpensesAmount += expenseTransactions[i].amount;
        }
        setAllExpense(totalExpensesAmount);
        setAllIncome(totalIncomeAmount);
    }

    return (
        <div>
            <DeleteModal modalState={open} modalHandler={setOpen} handleDelete={handleDelete} />
            <h1 className='text-center text-6xl font-black py-9'>Finance Tracker</h1>
            <div className='flex flex-col md:flex-row md:justify-around py-9 mx-2 '>
                <DisplayCard title="Total Income" amount={Allincome} bgColor='bg-emerald-500' />
                <DisplayCard title="Balance" amount={Allincome - Allexpense} bgColor='bg-violet-400' />
                <DisplayCard title="Total Expenses" amount={Allexpense} bgColor='bg-rose-600' />
            </div>
            <div className='flex justify-center py-6'>
                <PieChart
                    animate
                    animationDuration={500}
                    animationEasing="ease-out"
                    center={[450, 50]}
                    data={[
                        { title: 'Total Income', value: Allincome, color: '#10b981' },
                        { title: 'Total Expenses', value: Allexpense, color: '#e11d48' },

                    ]}
                    labelPosition={50}
                    lengthAngle={360}
                    lineWidth={55}
                    paddingAngle={0}
                    radius={50}
                    startAngle={0}
                    viewBoxSize={[900, 100]}
                />
            </div>
            <div className=''>
                <h3 className='text-center text-5xl'>Transactions</h3>
                <div className='flex justify-center items-center py-6'>
                    <div className='flex flex-col justify-center items-center gap-y-2 p-4 border-2 border-sky-400 rounded-xl w-[400px]'>
                        <h4>Add your Transactions</h4>
                        <input type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='ex-:Rent'
                            className='border-2 border-gray-500 px-2 py-1 w-25'
                        />
                        <input type='text'
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            placeholder='10000'
                            className='border-2 border-gray-500 px-2 py-1 w-25'
                        />
                        <div>
                            <input id="default-radio-1" type="radio" value="income" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => setType(e.target.value)} checked={type === 'income'} />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mx-4">Income</label>
                            <input id="default-radio-1" type="radio" value="expense" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(e) => setType(e.target.value)} checked={type === 'expense'} />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expense</label>
                        </div>

                        <button className='bg-green-300 hover:bg-green-600 px-4 py-1 rounded-lg' onClick={handleTransactions}>{editState ? "Save" : "Add Item"}</button>
                    </div>
                </div>
                <div className='mx-4'>
                    <h1 className='text-5xl my-2'>Income</h1>
                    {incomeTransactions ?
                        <TransactionTable transactionItems={incomeTransactions} setOpen={setOpen} setItemId={setItemId} handleEdit={handleEdit} />
                        : <h1>No Any transactions</h1>}
                </div>
                <div className='py-4 mx-4'>
                    <h1 className='mx-3 text-5xl my-2'>Expenses</h1>
                    {expenseTransactions ?
                        <TransactionTable transactionItems={expenseTransactions} setOpen={setOpen} setItemId={setItemId} handleEdit={handleEdit} />
                        : <h1>No Any transactions</h1>}
                </div>

            </div>
        </div>
    )
}

export default Transactions;

