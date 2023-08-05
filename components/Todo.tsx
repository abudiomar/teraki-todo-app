import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md'
import { getDocs, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';




const Todo = ({ todo, toggleComplete, deleteTodo, updateComplete }: any) => {
    const container = `max-w-md py-4 px-8 shadow-lg rounded-lg my-20 border-t-4
     ${todo.completed ? "bg-green-400" : "bg-slate-200"} ${todo.priority.trim() == 'high'.trim()
            ? "border-red-500" : todo.priority == 'medium' ? "border-orange-500" :
                todo.priority == 'low' ? "border-sky-500" : ''}`



    return (

        <div className={container}>
            <input onClick={() => updateComplete(todo)} type='checkbox' />

            <div>
                <h2 className={`text-gray-800 text-3xl ${todo.completed && 'line-through'} font-semibold`}>{todo.title}</h2>
                <p className={`mt-2 ${todo.completed && 'line-through'} text-gray-600`}>{todo.description}</p>
            </div>
            <div className='flex flex-col justify-start items-end'>
                <button className='mb-3 text-sm' onClick={() => deleteTodo(todo.id)} >{<FaRegTrashAlt />}</button>
                <div className="flex justify-between mt-4">
                    <p className='text-sm'>Due Date: {todo.dueDate}</p>
                    <a href="#" className="text-sm font-medium text-indigo-500"></a>
                </div>
            </div>
        </div>
    );
};

export default Todo;
