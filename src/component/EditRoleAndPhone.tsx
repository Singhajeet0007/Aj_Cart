'use client'
import axios from 'axios'
import { motion, AnimatePresence, scale } from 'motion/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineShop, AiOutlineTool, AiOutlineUser } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'

function EditRoleAndPhone() {
    const [role, setRole] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const roles = [
        { label: "Admin", value: "admin", icon: <AiOutlineTool size={40} /> },
        { label: "Vendor", value: "vendor", icon: <AiOutlineShop size={40} /> },
        { label: "User", value: "user", icon: <AiOutlineUser size={40} /> }
    ];
    const [adminExist, setAdminExist] = useState(false)

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await axios.get("/api/admin/check-admin")
                setAdminExist(res.data.exists)
            } catch (error) {
                setAdminExist(false)
                console.log(error);
            }
        }
        checkAdmin()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!role || !phone) {
            alert("Please select the role and enter the phone number")
            return;
        }
        setLoading(true)
        try {
            const result = await axios.post("/api/user/edit-role-phone", { role, phone })
            console.log(result.data);
            router.push("/")
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white p-6'>
            <AnimatePresence>
                <motion.div
                    className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20'
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}>
                    <h1 className='text-4xl font-semibold text-center mb-4'>Choose Your Role</h1>
                    <p className='text-center text-gray-300 mb-8 text-base'>Select your role and enter your phone number to be continue.</p>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                        <input type="text" required placeholder='Enter Your Mobile Number' maxLength={10} className='bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500' value={phone}
                            onChange={(e) => setPhone(e.target.value)} />

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
                            {
                                roles.map((rol) => {
                                    const isAdminBlocked = rol.value == "admin" && adminExist
                                    return (
                                        <motion.div key={rol.value}
                                            whileHover={!isAdminBlocked ? { scale: 1.07 } : {}}
                                            onClick={() => {
                                                if (isAdminBlocked) {
                                                    alert("⚠️ Admin already exists. You cannot select Admin role.")
                                                    return;
                                                }
                                                setRole(rol.value)
                                            }}
                                            className={`cursor-pointer p-6 text-center rounded-2xl border transition text-lg font-medium
                                        ${role === rol.value
                                                    ? "border-blue-500 bg-blue-500/40"
                                                    : "border-white/20 bg-white/10 hover:bg-white/20"
                                                }
                                                ${isAdminBlocked && "opacity-40 cursor-not-allowed"}
                                        `}>
                                            <div className='flex justify-center mb-3'>{rol.icon}</div>
                                            <p className=''>{rol.value}</p>
                                            {isAdminBlocked && <p className='text-xs text-red-400 mt-2'>Admin already exists</p>}
                                        </motion.div>
                                    )
                                })
                            }
                        </div>
                        <motion.button
                            disabled={loading}
                            type='submit'
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className='mt-4 px-8 py-3 flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl font-medium w-full gap-2 cursor-pointer'
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : "Submit Now "}
                        </motion.button>
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default EditRoleAndPhone
