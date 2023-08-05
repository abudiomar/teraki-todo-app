import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import { auth, db } from '@/app/firebase'
import { addDoc, collection, getDocs } from '@firebase/firestore'
import { Timestamp } from 'firebase/firestore/lite';
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/reducers/userReducer'

interface Task {
    title: string;
    description: string;
    dueDate: Date;
    priority: string;
    category: string;

}


const CreateTask = ({ setTodos, visible, close }: any) => {

    const p = [
        { value: '', text: '--Choose priority' },
        { value: 'low', text: 'Low' },
        { value: 'medium', text: 'Medium' },
        { value: 'high', text: 'High' },

    ]
    const c = [
        { value: '', text: '--Choose category' },
        { value: 'home', text: 'Home' },
        { value: 'work', text: 'Work' },
        { value: 'school', text: 'School' },
        { value: 'social', text: 'Social' },

    ]


    const [priority, setPriority] = useState("")
    const [category, setCategory] = useState("")
    const [value, setValue] = useState("default");
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
    });


    const handlePriority = (e: any) => {
        setPriority(e.target.value)

    }
    const handleCategory = (e: any) => {
        setCategory(e.target.value)

    }

    const [dueDate, setDueDate] = useState<any>()
    const user = useAppSelector(selectUser)


    if (!visible) return null

    const todosRef = collection(db, 'todos')

    const onCreateTask = async (e: any) => {
        e.preventDefault()
        console.log(e.target.value)
        const duedate = Timestamp.fromDate(new Date(dueDate))
        await addDoc(todosRef, {
            ...task,
            category,
            priority,
            completed: false
        })
        const todosCollectionRef = collection(db, "todos");
        const data: any = await getDocs(todosCollectionRef);
        setTodos(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
        setCategory('')
        setPriority('')

        close()


    }

    return (

        <div className=" fixed inset-0 backdrop-blur-sm flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
            <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                <p className='cursor-pointer' onClick={close}>
                    <MdOutlineCancel className='text-black text-[35px]' />
                </p>

            </div>
            <div className='bg-gray-800 flex flex-col items-center justify-center w-[500px] h-auto opacity-95 rounded'>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-sky-100">
                        Create Your Task
                    </h2>
                </div>

                <div className="mt-5 mb-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onCreateTask} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="title" className="block text-lg font-medium leading-6 text-sky-100">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="title"
                                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                                    autoComplete="title"
                                    required
                                    className="p-2 md:text-md font-medium border-2
                                    border-gray-100 focus:outline-none focus:border-2
                                     focus:border-gray-300 w-[300px] md:w-full
                                      rounded-md md:top-0"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="description" className="block text-lg 
                                font-medium leading-6 text-sky-100">
                                    Description
                                </label>

                            </div>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    autoComplete="current-description"
                                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                                    required
                                    className="block md:text-lg w-full rounded-md border-0 py-1.5
                                     text-gray-900 md:top-0 font-medium ring-1 ring-inset ring-gray-300
                                      placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                       focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="priority" className="block text-lg font-medium leading-6
                             text-sky-100">
                                Priority
                            </label>
                            <div className="mt-2 ">
                                <select value={priority} defaultValue={value}
                                    onChange={handlePriority}
                                    name='priority' className='block w-full rounded-lg border-0
                                   py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                     focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Select Priority' id="priority">
                                    {p.map((i) => (
                                        <option key={i.value} value={i.value} > {i.text} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="due date" className="block text-lg font-medium leading-6 text-sky-100">
                                Due Date
                            </label>
                            <div className="mt-2 ">
                                <input onChange={(e) => setTask({ ...task, dueDate: e.target.value })} type="date" name="due date" id="due date" />
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center justify-between'>
                                <label htmlFor="Catergory" className="block text-lg font-medium leading-6 text-sky-100">
                                    Category
                                </label>

                            </div>
                            <div className="mt-2 ">
                                <select value={category} defaultValue={value}
                                    onChange={handleCategory}
                                    name='priority' className='block w-full rounded-lg border-0
                                   py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                     focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                    placeholder='Select Priority' id="priority">
                                    {c.map((i) => (
                                        <option key={i.value} value={i.value} > {i.text} </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={onCreateTask}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CreateTask