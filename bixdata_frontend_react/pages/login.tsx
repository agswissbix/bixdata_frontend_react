// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axios';
import Image from 'next/image';
import '../app/globals.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post('backend_app/login/', { username, password });
            console.info('Login corretto');
            router.push('home'); // Reindirizza alla home dopo un login corretto
        } catch (error) {
            alert('Credenziali sbagliate');
            console.error('Errore durante il Login', error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className=" block sm:mx-auto sm:w-full sm:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-white-800 dark:border-gray-200 mx-auto ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            src="/bixdata/logos/swissbix.png"
                            alt="BixData"
                            width={1000}
                            height={1000}
                            className="mx-auto h-10 w-auto"
                            priority
                        />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Accedi a BixData
                        </h2>
                    </div>

                    <div className="mt- 10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoComplete="on"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-bixcolor-light sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-bixcolor-default hover:text-bixcolor-light">
                                            Password dimenticata?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="on"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-bixcolor-light sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-bixcolor-default px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-bixcolor-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bixcolor-default"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>



    );
};

export default Login;
