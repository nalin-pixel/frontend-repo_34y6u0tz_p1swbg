import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function AddNote() {
  const [form, setForm] = useState({ title: '', content: '', subject: '', grade: '', author: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Saving...')
    try {
      const res = await fetch(`${API}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          subject: form.subject || undefined,
          grade: form.grade || undefined,
          author: form.author || undefined,
        })
      })
      if (!res.ok) throw new Error('Failed to save')
      setStatus('✅ Note shared!')
      setForm({ title: '', content: '', subject: '', grade: '', author: '' })
    } catch (e) {
      setStatus('❌ Error: ' + e.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Share a Note</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-blue-200 mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
          </div>
          <div>
            <label className="block text-sm text-blue-200 mb-1">Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} required rows={5} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-blue-200 mb-1">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Class/Grade</label>
              <input name="grade" value={form.grade} onChange={handleChange} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm text-blue-200 mb-1">Your name (optional)</label>
              <input name="author" value={form.author} onChange={handleChange} className="w-full bg-slate-900/60 text-white rounded-lg p-2 border border-white/10" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Share Note</button>
            {status && <span className="text-blue-200">{status}</span>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNote
