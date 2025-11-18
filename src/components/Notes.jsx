import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Notes() {
  const [notes, setNotes] = useState([])
  const [form, setForm] = useState({ title: '', content: '', subject: '', grade: '', author: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API}/api/notes`)
      const data = await res.json()
      setNotes(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchNotes() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to save note')
      setForm({ title: '', content: '', subject: '', grade: '', author: '' })
      await fetchNotes()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Shared Notes</h2>

      <form onSubmit={handleSubmit} className="grid gap-3 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" required />
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject (e.g., Math)" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="grade" value={form.grade} onChange={handleChange} placeholder="Grade (e.g., Class 6)" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" />
          <input name="author" value={form.author} onChange={handleChange} placeholder="Your name (optional)" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none" />
        </div>
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Write the note or summary here" className="px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700 outline-none min-h-[100px]" required />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button disabled={loading} className="justify-self-start bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-4 py-2 rounded">{loading ? 'Saving...' : 'Add Note'}</button>
      </form>

      <div className="space-y-3">
        {notes.length === 0 && (
          <p className="text-blue-200/70 text-sm">No notes yet. Be the first to share one!</p>
        )}
        {notes.map(n => (
          <div key={n.id} className="p-4 rounded bg-slate-900/50 border border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">{n.title}</h3>
              <span className="text-xs text-blue-200/70">{[n.subject, n.grade].filter(Boolean).join(' • ')}</span>
            </div>
            <p className="text-blue-100/90 mt-2 whitespace-pre-wrap">{n.content}</p>
            {n.author && <p className="text-xs text-blue-200/70 mt-2">Shared by {n.author}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Notes
