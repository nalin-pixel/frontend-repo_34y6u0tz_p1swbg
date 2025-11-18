import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function MessageTeacher() {
  const [form, setForm] = useState({ name: '', contact: '', subject: '', grade: '', school: '', body: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact || undefined,
          subject: form.subject || undefined,
          body: form.body,
          grade: form.grade || undefined,
          school: form.school || undefined,
        })
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('✅ Message sent! A teacher will reach out soon.')
      setForm({ name: '', contact: '', subject: '', grade: '', school: '', body: '' })
    } catch (e) {
      setStatus('❌ Error: ' + e.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Message a Teacher</h2>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-blue-200 mb-1">Your Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Contact (phone/email)</label>
              <input name="contact" value={form.contact} onChange={handleChange} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-blue-200 mb-1">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Class/Grade</label>
              <input name="grade" value={form.grade} onChange={handleChange} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-blue-200 mb-1">School (optional)</label>
              <input name="school" value={form.school} onChange={handleChange} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Message</label>
              <textarea name="body" value={form.body} onChange={handleChange} required rows={5} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Send Message</button>
            {status && <span className="text-blue-200">{status}</span>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessageTeacher
