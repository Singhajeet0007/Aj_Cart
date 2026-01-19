'use client'
import { motion, AnimatePresence } from 'motion/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { ClipLoader } from 'react-spinners'

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const session = useSession()
  console.log(session.data?.user);


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })
      alert("SignIn successfully")
      router.push("/")
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      alert(error)
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
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-2xl font-semibold text-center mb-6 text-gray-100-300'>Welcome back to <span className='text-blue-400'>AjCart</span></h1>

          <form onSubmit={handleSignIn} className='flex flex-col gap-4'>
            <input type="text" required placeholder='Email' className='bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500' value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <input type={showPassword ? "text" : "password"} required placeholder='Password' className='bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500' value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <motion.button
              disabled={loading}
              type='submit'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className='mt-4 px-8 py-3 flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl font-medium w-full gap-2 cursor-pointer'
            >
              {loading ? <ClipLoader size={20} color='white' /> : "Login "}
            </motion.button>

            <div className='flex items-center my-3'>
              <div className='flex-1 h-px bg-gray-600'></div>
              <span className='px-3 text-sm text-gray-400'>or</span>
              <div className='flex-1 h-px bg-gray-600'></div>
            </div>

            <motion.button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition cursor-pointer'
            > <FcGoogle className='w-5 h-5' />
              <span className='font-medium '> Login with Google</span>
            </motion.button>
            <p className='text-center text-sm mt-4 text-gray-400 '>
              Don't have an account{" "} ? <span onClick={() => router.push("/register")} className='text-blue-400 hover:underline hover:text-blue-300 transition cursor-pointer'>Sign Up</span>
            </p>

          </form>


        </motion.div>
      </AnimatePresence>

    </div>
  )
}

export default SignIn
