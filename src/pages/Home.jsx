import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Home() {
  const [notes, setNotes] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [nRes, mRes] = await Promise.all([
        fetch(`${API}/api/notes`),
        fetch(`${API}/api/messages?limit=10`)
      ])
      const [nData, mData] = await Promise.all([nRes.json(), mRes.json()])
      setNotes(Array.isArray(nData)?nData:[])
      setMessages(Array.isArray(mData)?mData:[])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Latest Shared Notes</h2>
            <Link to="/add-note" className="text-sm text-blue-300 hover:text-white">Share a note</Link>
          </div>
          {loading ? (
            <p className="text-blue-200">Loading...</p>
          ) : notes.length === 0 ? (
            <p className="text-blue-200">No notes yet. Be the first to share!</p>
          ) : (
            <ul className="space-y-3">
              {notes.map(n => (
                <li key={n.id} className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white font-semibold">{n.title}</h3>
                      <p className="text-blue-200/80 text-sm mt-1 whitespace-pre-wrap">{n.content}</p>
                      <div className="text-xs text-blue-300/70 mt-2">
                        {(n.subject || n.grade) && (
                          <span>{n.subject ? `Subject: ${n.subject}` : ''} {n.grade ? `• Class: ${n.grade}` : ''}</span>
                        )}
                        {n.author && <span> • By {n.author}</span>}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Messages to Teachers</h2>
            <Link to="/message-teacher" className="text-sm text-blue-300 hover:text-white">Send message</Link>
          </div>
          {loading ? (
            <p className="text-blue-200">Loading...</p>
          ) : messages.length === 0 ? (
            <p className="text-blue-200">No messages yet.</p>
          ) : (
            <ul className="space-y-3">
              {messages.map(m => (
                <li key={m.id} className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                  <h3 className="text-white font-semibold">{m.subject || 'Message'}</h3>
                  <p className="text-blue-200/80 text-sm mt-1 whitespace-pre-wrap">{m.body}</p>
                  <div className="text-xs text-blue-300/70 mt-2">
                    {(m.name || m.grade) && (
                      <span>{m.name ? `From: ${m.name}` : ''} {m.grade ? `• Class: ${m.grade}` : ''}</span>
                    )}
                    {m.school && <span> • {m.school}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
