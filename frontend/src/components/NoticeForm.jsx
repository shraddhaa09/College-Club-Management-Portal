// src/components/NoticeForm.jsx
import { useState } from 'react'

export default function NoticeForm({ notice, onSubmit, onClose }) {
  const [title, setTitle] = useState(notice?.title || "")
  const [content, setContent] = useState(notice?.content || "")

  function handleSubmit(e) {
    e.preventDefault()
    if (!title || !content) {
      alert('Title and content required')
      return
    }
    onSubmit({ id: notice?.id, title, content })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-96">
        <h3 className="font-bold text-lg mb-4">{notice ? "Edit Notice" : "Add Notice"}</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Title</label>
          <input className="mb-4 w-full border px-2 py-1" value={title} onChange={e => setTitle(e.target.value)} />
          <label className="block mb-2">Content</label>
          <textarea className="mb-4 w-full border px-2 py-1" value={content} onChange={e => setContent(e.target.value)} />
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{notice ? "Save" : "Add"}</button>
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
