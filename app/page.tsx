"use client"
import Todo from '@/components/Todo';
import { SetStateAction, useEffect } from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';
import { getDocs, collection, deleteDoc, where, doc, query, setDoc } from 'firebase/firestore';
import { auth, db, provider } from '@/app/firebase'
import { signOut } from 'firebase/auth'
import { signInWithPopup } from "firebase/auth";
import CreateTask from '@/components/createTask';
import Navbar from '@/components/Navbar';
import LoginForm from '@/components/LoginForm';
import { useAppDispatch } from '@/store/hooks';
import { signOutFromAccount } from '@/store/reducers/userReducer';

const style = {
  bg: `p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
};

const p = [
  { value: '', text: '--Choose priority' },
  { value: 'all', text: 'All' },
  { value: 'low', text: 'Low' },
  { value: 'medium', text: 'Medium' },
  { value: 'high', text: 'High' },

]

interface Task {
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  category: string;
  id: string,
  completed: boolean

}

export default function Home() {
  const [priority, setPriority] = useState('')
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalLogin, setShowModalLogin] = useState(false)
  const [todos, setTodos] = useState([]);
  const [updated, setUpdated] = useState(false)
  const todosCollectionRef = collection(db, "todos");
  const [input, setInput] = useState('');

  const handleCloseCreate = () => setShowModalCreate(false);
  const handleCloseLogin = () => setShowModalLogin(false);
  const handleOpenLogin = () => setShowModalLogin(true)

  const dispatch = useAppDispatch()



  const signUserOut = async () => {
    await auth.signOut()
    dispatch(signOutFromAccount())
  }

  const handlePriority = async (e: { target: { value: SetStateAction<string>; }; }) => {
    setPriority(e.target.value)
    if (e.target.value == "all") {
      const data: any = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    } else {

      const todosRef = collection(db, 'todos');

      const q = query(todosRef, where('priority', '==', `${e.target.value}`));
      const data: any = await getDocs(q);
      setTodos(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    }



  }

  const deleteTodo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(id)
      await deleteDoc(doc(db, 'todos', id));
      setUpdated((prev) => !prev)
    } else {
      return null
    }
  };

  const updateComplete = async (todo: Task) => {
    await setDoc(doc(db, 'todos', todo.id), {
      ...todo,
      completed: !todo.completed
    });
    setUpdated((prev) => !prev)
  }


  useEffect(() => {
    const getTasks = async () => {
      const data: any = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    };

    getTasks();
  }, [updated]);







  return (
    <div className='h-screen w-screen  bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0] '>
      <Navbar signOut={signUserOut} setShowModalLogin={setShowModalLogin} />
      <div className={style.bg}>
        <div className={style.container}>
          <h1 className={style.heading}>To-Do List</h1>
          <div className='flex  justify-between pb-3'>
            <button onClick={() => setShowModalCreate(true)} className='rounded-full
             bg-[#1CB5E0] text-white
              text-md font-medium p-2 w-28 lg:w-40 outline-none'>
              Create Task
            </button >
            <select value={priority}
              onChange={handlePriority}
              name='priority' className='block w-50 rounded-lg border-0
                                   py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                     focus:ring-indigo-600 sm:text-sm sm:leading-6'
              placeholder='Select Priority' id="priority">
              {p.map((i) => (
                <option key={i.value} value={i.value} > {i.text} </option>
              ))}
            </select>
          </div>
          <div>
          </div>

          <CreateTask setTodos={setTodos} close={handleCloseCreate} visible={showModalCreate} style={style} setInput={setInput} input />
          <LoginForm close={handleCloseLogin} visible={showModalLogin} />

          <div>
            {todos.length ? (


              todos.map((todo, index) => (
                <Todo
                  key={index}
                  todo={todo}
                  updateComplete={updateComplete}
                  deleteTodo={deleteTodo}

                />
              ))

            ) : (
              <div className='flex flex-col justify-center items-center'>
                <p className='text-7xl'>


                  <BiCommentX />
                </p>
                <p className='text-2xl text-center'>
                  No Tasks yet!
                </p>
              </div>

            )}
          </div>


          {todos.length < 1 ? null : (
            <p className={style.count}>{`You have ${todos.length} todos`}</p>
          )}

        </div>
      </div>
    </div>
  )
} 
