'use client'

import { useState } from 'react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    ssn: '',
    reason: '',
    venture: 'credit-repair',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('https://n8n.oreginald.info/webhook/credit-onboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    alert('Thank you! Your form was submitted.')
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Join Credit Repair Empire</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} value={formData.name} placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email" className="w-full border p-2 rounded" required />
        <input name="phone" type="tel" onChange={handleChange} value={formData.phone} placeholder="Phone" className="w-full border p-2 rounded" required />
        <input name="dob" onChange={handleChange} value={formData.dob} placeholder="Date of Birth" className="w-full border p-2 rounded" />
        <input name="address" onChange={handleChange} value={formData.address} placeholder="Address" className="w-full border p-2 rounded" />
        <input name="ssn" onChange={handleChange} value={formData.ssn} placeholder="SSN (Last 4)" className="w-full border p-2 rounded" />
        <textarea name="reason" onChange={handleChange} value={formData.reason} placeholder="Tell us your credit issue..." className="w-full border p-2 rounded" />
        <button type="submit" className="bg-black text-white w-full py-2 rounded hover:bg-gray-800">
          Submit
        </button>
      </form>
    </div>
  )
}
