'use client';

export default function Sidebar({ search, setSearch, note, setIsCreating, activeNoteId, setActiveNoteId }) {
    return (
        <aside className="absolute top-0 left-0 bottom-0 w-1/3 overflow-y-scroll p-2 border-r border-gray-300">
            <button className="p-2 text-lg font-bold border border-gray-600 rounded-lg w-full"
                onClick={() => setIsCreating(true)}
            >
                + 새로운 노트
            </button>

            <input type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="노트를 검색해 주세요"
                className="w-full p-2 border rounded-gray-600 mt-2" 
            />

            <ul className="mt-2 flex flex-col gap-2">
                {note.map(
                    (note, i) => (
                        <li key={i}>
                            <button 
                                onClick={() => {setActiveNoteId(note.id); setIsCreating(false);}}
                                className={`${activeNoteId === note.id ? 'font-bold' : "" }` }
                            >
                                {note.title}
                            </button>
                        </li>
                    ))}
            </ul>

            
        </aside>
    )
}