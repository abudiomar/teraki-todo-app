import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/app/firebase';
import { useAppDispatch } from '@/store/hooks';
import { signIntoAccount } from '@/store/reducers/userReducer';
import Image from 'next/image';

const LoginForm = ({ setIsAuth, visible, close }: any) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useAppDispatch()

    const signInWithGoogle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        signInWithPopup(auth, provider).then((userCredential) => {
            console.log(userCredential.user)
            dispatch(signIntoAccount(userCredential.user))
            close()
        }).catch((error) => {
            const errorMessage = error.message;
            alert(`${errorMessage}`);
        })
    };


    const loginUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password).then(userCredential => {
            console.log(userCredential.user)
            dispatch(signIntoAccount(userCredential.user))
            close()
        }).catch((error) => {
            const errorMessage = error.message;
            alert(`User not found`);
        });
    }
    const registerUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
            console.log(userCredential.user)
            dispatch(signIntoAccount(userCredential.user))
            close()
        }).catch((error) => {
            const errorMessage = error.message;
            alert(`${errorMessage}`);
        });
    }

    if (!visible) return null
    return (
        <div className=" fixed inset-0 backdrop-blur-md flex min-h-full items-center  justify-center px-6 py-12 lg:px-8 ">
            <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                <p className='cursor-pointer' onClick={close}>
                    <MdOutlineCancel className='text-black text-[40px]' />
                </p>

            </div>
            <div className='bg-gray-800 flex flex-col items-center justify-center w-[500px] h-[650px] opacity-95 rounded-md'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://open.terakiapp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.4df3ea7a.png&w=256&q=75"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-100">
                        Sign in to your account
                    </h2>
                </div>

                <div className=" flex flex-col justify-between mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className='mb-2'>
                        <button
                            type="submit"
                            onClick={(e) => signInWithGoogle(e)}
                            className="flex w-full items-center justify-center rounded-lg bg-sky-100 px-3 py-1.5 text-sm font-semibold leading-6
                             text-white shadow-sm hover:bg-indigo-300 focus-visible:outline
                              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <span>
                                <Image
                                    alt='google'
                                    width={36}
                                    height={36}
                                    src='/../public/google.png'
                                />
                            </span>
                            <p className='text-indigo-700 text-lg' >Google</p>
                        </button>
                    </div>
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">OR</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-sky-100">
                                Email address
                            </label>
                            <div className="">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
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
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-sky-100">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-2 md:text-md font-medium border-2
                                    border-gray-100 focus:outline-none focus:border-2
                                     focus:border-gray-300 w-[300px] md:w-full
                                      rounded-md md:top-0"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <div>
                                <button
                                    type="submit"
                                    onClick={(e) => loginUser(e)}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                            <div className="relative flex py-5 items-center">
                                <div className="flex-grow border-t border-gray-400"></div>
                                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={(e) => registerUser(e)}
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    register
                                </button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default LoginForm