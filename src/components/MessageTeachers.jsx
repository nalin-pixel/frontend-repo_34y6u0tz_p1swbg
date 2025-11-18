import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function MessageTeachers() {
  const [form, setForm] = useState({ name: '', contact: '', subject: '', grade: '', school: '', body: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      const res = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to send message')
      setStatus('Message sent to volunteer teachers. Thank you!')
      setForm({ name: '', contact: '', subject: '', grade: '', school: '', body: '' })
    } catch (err) {
      setStatus(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Message Volunteer Teachers</h2>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" required />
          <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact (phone or email)" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject you need help with" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" />
          <input name="grade" value={form.grade} onChange={handleChange} placeholder="Grade/Class" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" />
        </div>
        <input name="school" value={form.school} onChange={handleChange} placeholder="School (optional)" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" />
        <textarea name="body" value={form.body} onChange={handleChange} placeholder="Write your question or message here" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none min-h-[120px]" required />
        <button disabled={loading} className="justify-self-start bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white px-4 py-2 rounded">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {status && <p className="text-blue-200/80 text-sm">{status}</p>}
      </form>
    </section>
  )
}

export default MessageTeachers
