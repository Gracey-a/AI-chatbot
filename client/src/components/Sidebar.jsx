function Sidebar({
    conversations,
    activeId,
    onSelect,
    onNewChat,
    onDelete,
    isOpen,
    onClose,
}) {
    
    return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-top">
        <button className="sidebar-close" onClick={onClose} title="Close sidebar">
            ⬅︎
        </button>
        <button className="sidebar-new-chat" onClick={onNewChat}>
            + New Chat
        </button>
        </div>
        
        <div className="sidebar-list">
            {conversations.length === 0 && (
                <p className="sidebar-empty">No conversations yet</p>
            )}
            {conversations.map((c) => (
                <div
                    key={c._id}
                    className={`sidebar-item ${c._id === activeId ? 'sidebar-item-active' : ''}`}
                >
                    <button className="sidebar-item-title" onClick={() => onSelect(c._id)}>
                        {c.title}
                    </button>
                    <button
                        className="sidebar-item-delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(c._id);
                        }}
                        title="Delete conversation"
                        >
                            🗑️
                        </button>
                </div>
            ))}
        </div>
    </aside>
    );
}

export default Sidebar;