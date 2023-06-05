"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';


const Nav = () => {
    // const isUserLoggedIn = true;

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggelDropdown, settoggelDropdown] = useState(false);


    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);


        }
        setUpProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className='flex gap-2 flex-center '>
                <Image src="/assets/images/logo.svg" alt="app-logo" width={30} height={30} className='object-contain' />
                <p className='logo_text'>Propmtopia</p>
            </Link>


            {/* Desktop navigation */}
            <div className='sm:flex hidden'>
                {session?.user ?
                    (
                        <>
                            <div className='flex gap-3 md:gap-5'>
                                <Link href='/create-prompt' className='black_btn'>
                                    Create Post
                                </Link>
                                <button onClick={signOut} className='outline_btn'>
                                    SignOut
                                </button>
                                <Link href='/profile'>
                                    <Image src={session?.user.image} alt="profile" width={37} height={37} className='rounded-full' />
                                </Link>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            {providers && Object.values(providers).map((provider) => (
                                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                    Sign In
                                </button>
                            ))}
                        </>
                    )}
            </div>

            {/* Mobile navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <>
                        <div className='flex'>
                            <Image src={session?.user.image} alt="app-logo" width={30} height={30} className='object-contain rounded-full' onClick={() => { settoggelDropdown((prev => (!prev))) }} />
                            {toggelDropdown && (
                                <div className='dropdown'>
                                    <Link href='/profile' className='dropdown_link' onClick={() => { settoggelDropdown(false) }}>
                                        My Profile
                                    </Link>
                                    <Link href='/create-prompt' className='dropdown_link' onClick={() => { settoggelDropdown(false) }}>
                                        Create Prompts
                                    </Link>
                                    <button type="button" className='mt-5 w-full black_btn' onClick={() => {
                                        settoggelDropdown(false)
                                        signOut();
                                    }}>
                                        SignOut
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) :

                    (
                        <>

                            {providers && Object.values(providers).map((provider) => (
                                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                    Sign In
                                </button>
                            ))}
                        </>
                    )}

            </div>
        </nav>
    )
}

export default Nav