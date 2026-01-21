import { auth } from '@/auth'
import EditRoleAndPhone from '@/component/EditRoleAndPhone'
import NavBar from '@/component/NavBar'
import connectDb from '@/lib/db'
import User from '@/model/user.model'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Home() {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect("/login")
  }
  const inComplete = !user.role || !user.phone || (!user.phone && user.role == "user")
  if (inComplete) {
    return <EditRoleAndPhone />
  }
  const plainUser =JSON.parse(JSON.stringify(user))
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white p-6'>
      <NavBar user={plainUser} />
    </div>
  )
}
