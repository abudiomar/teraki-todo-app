import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { auth } from '@/app/firebase'
import { BiSearch } from 'react-icons/bi'
import LoginForm from './LoginForm'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/reducers/userReducer'


const navigation = [
    { name: 'Work', href: '#', current: false },
    { name: 'School', href: '#', current: false },
    { name: 'Home', href: '#', current: false },
    { name: 'Social', href: '#', current: false },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ open, signOut, setShowModalLogin }: any) {
    const user = useAppSelector(selectUser)


    return (
        <Disclosure as="nav" className=" w-full bg-gray-800">
            {({ open }) => (
                <div className='w-full'>
                    <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex  items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://open.terakiapp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.4df3ea7a.png&w=256&q=75"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='relative hidden md:block'>
                                <form
                                    onSubmit={() => { }}
                                    className='absolute md:static top-50 -left-30'
                                >
                                    <input
                                        className='p-3 md:text-md font-medium border-2
                                         border-gray-100 focus:outline-none focus:border-2
                                          focus:border-gray-300 w-[300px] md:w-[350px]
                                           rounded-full md:top-0'
                                        type='text'
                                        value=''
                                        onChange={() => { }}
                                        placeholder='Search'
                                    />
                                    <button onClick={() => { }} className='absolute md:right-5 
                    right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
                                        <BiSearch />
                                    </button>

                                </form>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    {/* <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span> */}
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        {auth.currentUser && (

                                            <Menu.Button className="relative flex rounded-full bg-gray-800 justify-center items-center text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                {/* <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span> */}

                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={auth.currentUser?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                                                    alt=""
                                                />


                                                <p className='text-gray-300 hover:bg-gray-700 hover:text-white 
                                                rounded-md px-3 py-2 text-lg font-medium'>
                                                    {auth.currentUser?.displayName || auth.currentUser?.email}
                                                    {/* {auth.currentUser?.displayName ? auth.currentUser?.displayName : auth.currentUser?.email} */}
                                                </p>
                                            </Menu.Button>
                                        )}
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">


                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        onClick={signOut}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                {!auth.currentUser && (
                                    <button onClick={() => setShowModalLogin(true)} className='rounded-full bg-[#1CB5E0] text-white m-1 text-center text-md font-medium p-2 w-28 lg:w-35 outline-none'>
                                        Sign In
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>

                </div>

            )}
        </Disclosure>
    )
}
