'use client'
import { IUser } from '@/model/user.model'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/assets/logo.jpg'
import React, { useState } from 'react'
import { AiOutlineSearch, AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose, AiOutlineHome, AiFillAppstore, AiOutlinePhone, AiOutlineShop, AiOutlineLogin, AiOutlineLogout, AiOutlineSolution } from 'react-icons/ai'
import { GoListUnordered } from "react-icons/go"
import { signOut } from 'next-auth/react'

function NavBar({ user }: { user: IUser }) {
  const [openMenu, setOpenMenu] = useState(false)
  const router = useRouter()
  return (
    <div className='fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg'>
      <div className='max-w-7xl mx-auto px-40 py-3 flex justify-between   items-center'>

        <div className='flex items-center gap-4 cursor-pointer ' onClick={() => router.push("/")}>
          <Image src={logo} width={40} height={40} alt='logo' className='rounded-full' />
          <span className='text-xl font-semibold hidden sm:inline'>AjCart</span>
        </div>
        {user.role == 'user' && <div className='hidden md:flex gap-8'>
          <NavItem label="Home" path="/" router={router} />
          <NavItem label="Catgories" path="/category" router={router} />
          <NavItem label="Shop" path="/shop" router={router} />
          <NavItem label="Orders" path="/orders" router={router} />
        </div>}

        <div className='hidden md:flex items-center gap-6'>
          {user.role == 'user' &&
            <IconBtn Icon={AiOutlineSearch} onClick={() => router.push("/category")} />}
          <IconBtn Icon={AiOutlinePhone} onClick={() => router.push("/support")} />

          <div className='relative'>
            {user?.image ? <Image src={user?.image} alt='user' width={40} height={40} className='w-10 h-10 rounded-full object-cover border border-gray-700 cursor-pointer' onClick={() => setOpenMenu(!openMenu)} /> :
              <IconBtn Icons={AiOutlineUser} onClick={() => setOpenMenu(!openMenu)} />}

            <AnimatePresence>
              {openMenu && <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className='absolute right-0 mt-3 w-48 backdrop-blur-lg rounded-xl shadow-lg border bg-[#6a69693c] '>
                <DropDownBtn Icon={AiOutlineUser} label="Profile" onClick={() => { router.push("/profile"); setOpenMenu(false) }} />
                <DropDownBtn Icon={AiOutlineLogin} label="SignIn" onClick={() => { router.push("/login"); setOpenMenu(false) }} />
                <DropDownBtn Icon={AiOutlineLogout} label="SignOut" onClick={() => { signOut(); setOpenMenu(false) }} />
              </motion.div>}
            </AnimatePresence>
          </div>
          {user?.role == 'user' && <CartBtn router={router} count="5" />}
        </div>
      </div>
    </div>
  )
}

export default NavBar

const NavItem = ({ label, path, router }: any) => (
  <motion.button whileHover={{ scale: 1.1 }} onClick={() => router.push(path)} className='hover:text-gray-300'>{label}</motion.button>
)

const IconBtn = ({ Icon, onClick }: any) => (
  <motion.button whileHover={{ scale: 1.1 }} onClick={onClick}>
    <Icon size={24} />
  </motion.button>
)

const DropDownBtn = ({ Icon, label, onClick, close }: any) => (
  <button className='flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 text-left' onClick={() => onClick()}>
    <Icon size={18} />{label}
  </button>
)

const CartBtn = ({ router, count }: any) => (
  <motion.button className='relative' whileHover={{ scale: 1.1 }} onClick={() => router.push("/cart")}>
    <AiOutlineShoppingCart />
    {count > 0 && <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1'>{count}</span>}
  </motion.button>
)
