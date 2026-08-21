import { useState } from 'react';
import { FolderOpen, FileText, FileEdit, PlayCircle, Image, Paperclip, Upload, Plus, Lock, Download } from 'lucide-react';
const rootItems = [{
  name: 'Form 4 West',
  type: 'folder',
  modified: 'Jan 18, 2025',
  sharedWith: 'Form 4 West'
}, {
  name: 'Form 3 East',
  type: 'folder',
  modified: 'Jan 17, 2025',
  sharedWith: 'Form 3 East'
}, {
  name: 'Form 2 North',
  type: 'folder',
  modified: 'Jan 15, 2025',
  sharedWith: 'Form 2 North'
}, {
  name: 'Form 1 South',
  type: 'folder',
  modified: 'Jan 14, 2025',
  sharedWith: 'Form 1 South'
}, {
  name: 'General Resources',
  type: 'folder',
  modified: 'Jan 10, 2025',
  sharedWith: 'All classes'
}];
const form3Items = [{
  name: 'Biology Notes Chapter 7',
  type: 'pdf',
  size: '2.4 MB',
  modified: 'Jan 18, 2025'
}, {
  name: 'Chemistry Past Papers 2020-2024',
  type: 'pdf',
  size: '8.1 MB',
  modified: 'Jan 16, 2025'
}, {
  name: 'Mathematics Revision',
  type: 'folder',
  modified: 'Jan 15, 2025'
}, {
  name: 'Cell Division Explained',
  type: 'video',
  size: '142 MB',
  modified: 'Jan 14, 2025'
}, {
  name: 'Organic Chemistry Lab Report Template',
  type: 'doc',
  size: '480 KB',
  modified: 'Jan 12, 2025'
}, {
  name: 'Periodic Table Poster',
  type: 'image',
  size: '1.2 MB',
  modified: 'Jan 10, 2025'
}];
const iconFor = type => {
  if (type === 'folder') return {
    Icon: FolderOpen,
    color: '#D4922A',
    bg: '#FBF0D8'
  };
  if (type === 'pdf') return {
    Icon: FileText,
    color: '#C1440E',
    bg: '#F4E4DC'
  };
  if (type === 'doc') return {
    Icon: FileEdit,
    color: '#1A3A5C',
    bg: '#D4E4F0'
  };
  if (type === 'video') return {
    Icon: PlayCircle,
    color: '#6B2D8E',
    bg: '#EDD4F0'
  };
  if (type === 'image') return {
    Icon: Image,
    color: '#2D6A4F',
    bg: '#D4EDE2'
  };
  return {
    Icon: Paperclip,
    color: '#6B6259',
    bg: '#F0EAE0'
  };
};
export default function Resources() {
  const [path, setPath] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const items = path.length === 0 ? rootItems : path[0] === 'Form 3 East' ? form3Items : [];
  const handleNavigate = item => {
    if (item.type === 'folder') setPath([...path, item.name]);else setPreview(item);
  };
  return <div style={{
    padding: '28px 32px',
    maxWidth: 1100,
    margin: '0 auto'
  }}>
      <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20
    }}>
        <div>
          <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: '#1E1A16',
          marginBottom: 4
        }}>Resource Library</h1>
          <p style={{
          fontSize: 14,
          color: '#6B6259'
        }}>Drive-style file storage, per-class access control</p>
        </div>
        <div style={{
        display: 'flex',
        gap: 10
      }}>
          <button className="btn-ghost" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
            <Plus size={13} strokeWidth={2.5} /> New folder
          </button>
          <button className="btn-primary" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }} onClick={() => setShowUpload(true)}>
            <Upload size={13} strokeWidth={2} /> Upload files
          </button>
        </div>
      </div>

      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 16,
      fontSize: 14
    }}>
        <span style={{
        color: path.length > 0 ? '#C1440E' : '#6B6259',
        cursor: path.length > 0 ? 'pointer' : 'default',
        fontWeight: 500
      }} onClick={() => setPath([])}>Library</span>
        {path.map((p, i) => <span key={i} style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
            <span style={{
          color: '#B5A99C'
        }}>›</span>
            <span style={{
          color: i === path.length - 1 ? '#1E1A16' : '#C1440E',
          fontWeight: i === path.length - 1 ? 600 : 500,
          cursor: i < path.length - 1 ? 'pointer' : 'default'
        }} onClick={() => setPath(path.slice(0, i + 1))}>{p}</span>
          </span>)}
      </div>

      <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: 12
    }} onDragOver={e => {
      e.preventDefault();
      setDragging(true);
    }} onDragLeave={() => setDragging(false)} onDrop={e => {
      e.preventDefault();
      setDragging(false);
      setShowUpload(true);
    }}>
        {items.length === 0 ? <div style={{
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '80px 40px'
      }}>
            <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#F0EAE0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
              <FolderOpen size={28} color="#B5A99C" strokeWidth={1.4} />
            </div>
            <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: '#1E1A16',
          marginBottom: 8
        }}>This folder is empty</div>
            <p style={{
          fontSize: 14,
          color: '#6B6259',
          marginBottom: 24
        }}>Upload the first resource for this class.</p>
            <button className="btn-primary" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6
        }} onClick={() => setShowUpload(true)}>
              <Upload size={13} strokeWidth={2} /> Upload files
            </button>
          </div> : items.map((item, i) => {
        const {
          Icon,
          color,
          bg
        } = iconFor(item.type);
        return <div key={i} className="card" style={{
          padding: '16px',
          cursor: 'pointer',
          transition: 'transform 0.15s, box-shadow 0.15s'
        }} onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(30,26,22,0.1)';
        }} onMouseLeave={e => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '';
        }} onClick={() => handleNavigate(item)}>
              <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
          }}>
                <Icon size={20} color={color} strokeWidth={1.6} />
              </div>
              <div style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#1E1A16',
            lineHeight: 1.3,
            marginBottom: 4
          }}>{item.name}</div>
              {item.sharedWith && <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 11,
            color,
            fontWeight: 600,
            marginBottom: 2
          }}>
                  <Lock size={10} strokeWidth={2} /> {item.sharedWith}
                </div>}
              {item.size && <div style={{
            fontSize: 11,
            color: '#B5A99C'
          }}>{item.size}</div>}
              <div style={{
            fontSize: 11,
            color: '#B5A99C',
            marginTop: 4
          }}>{item.modified}</div>
            </div>;
      })}

        {items.length > 0 && <div style={{
        border: `2px dashed ${dragging ? '#C1440E' : '#E4DDD4'}`,
        borderRadius: 12,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        minHeight: 120,
        background: dragging ? '#FBF0D8' : 'transparent',
        transition: 'all 0.15s'
      }} onClick={() => setShowUpload(true)}>
            <Upload size={20} color="#B5A99C" strokeWidth={1.6} style={{
          marginBottom: 8
        }} />
            <div style={{
          fontSize: 12,
          color: '#B5A99C',
          textAlign: 'center'
        }}>Drop files here or click to upload</div>
          </div>}
      </div>

      {showUpload && <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(30,26,22,0.5)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)'
    }}>
          <div className="card" style={{
        width: 480,
        padding: '32px',
        animation: 'fadeIn 0.2s ease'
      }}>
            <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}>
              <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: '#1E1A16'
          }}>Upload files</h2>
              <button onClick={() => setShowUpload(false)} style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            color: '#6B6259',
            lineHeight: 1
          }}>×</button>
            </div>
            <div style={{
          border: '2px dashed #E4DDD4',
          borderRadius: 10,
          padding: '48px 24px',
          textAlign: 'center',
          marginBottom: 20,
          background: '#FAF7F0',
          cursor: 'pointer'
        }} onMouseEnter={e => e.currentTarget.style.borderColor = '#C1440E'} onMouseLeave={e => e.currentTarget.style.borderColor = '#E4DDD4'}>
              <Upload size={36} color="#B5A99C" strokeWidth={1.4} style={{
            marginBottom: 10
          }} />
              <div style={{
            fontSize: 15,
            fontWeight: 600,
            color: '#1E1A16',
            marginBottom: 4
          }}>Drag files here or click to browse</div>
              <div style={{
            fontSize: 13,
            color: '#B5A99C'
          }}>PDF, DOC, MP4, JPG, PNG · Max 500 MB</div>
            </div>
            <div>
              <label style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: '#3D3730',
            marginBottom: 6
          }}>Share with</label>
              <select className="input-field">
                <option>Form 3 East</option>
                <option>All classes</option>
                <option>Form 4 West</option>
                <option>Educators only</option>
              </select>
            </div>
            <div style={{
          display: 'flex',
          gap: 10,
          marginTop: 20
        }}>
              <button className="btn-ghost" style={{
            flex: 1
          }} onClick={() => setShowUpload(false)}>Cancel</button>
              <button className="btn-primary" style={{
            flex: 2
          }} onClick={() => setShowUpload(false)}>Upload</button>
            </div>
          </div>
        </div>}

      {preview && <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(30,26,22,0.7)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)'
    }}>
          <div className="card" style={{
        width: 560,
        padding: '32px',
        animation: 'fadeIn 0.2s ease'
      }}>
            <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}>
              <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: '#1E1A16'
          }}>{preview.name}</h2>
              <button onClick={() => setPreview(null)} style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            color: '#6B6259',
            lineHeight: 1
          }}>×</button>
            </div>
            <div style={{
          background: '#F0EAE0',
          borderRadius: 10,
          height: 240,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20
        }}>
              {(() => {
            const {
              Icon,
              color,
              bg
            } = iconFor(preview.type);
            return <div style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12
            }}><Icon size={28} color={color} strokeWidth={1.4} /></div>;
          })()}
              <div style={{
            fontSize: 14,
            color: '#6B6259'
          }}>Preview not available in demo</div>
            </div>
            <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 20
        }}>
              <div style={{
            background: '#FAF7F0',
            borderRadius: 8,
            padding: '10px 14px'
          }}>
                <div style={{
              fontSize: 11,
              color: '#B5A99C',
              fontWeight: 600,
              marginBottom: 2
            }}>SIZE</div>
                <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#1E1A16'
            }}>{preview.size || '—'}</div>
              </div>
              <div style={{
            background: '#FAF7F0',
            borderRadius: 8,
            padding: '10px 14px'
          }}>
                <div style={{
              fontSize: 11,
              color: '#B5A99C',
              fontWeight: 600,
              marginBottom: 2
            }}>MODIFIED</div>
                <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#1E1A16'
            }}>{preview.modified}</div>
              </div>
            </div>
            <div style={{
          display: 'flex',
          gap: 10
        }}>
              <button className="btn-ghost" style={{
            flex: 1
          }}>Share link</button>
              <button className="btn-primary" style={{
            flex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}>
                <Download size={14} strokeWidth={2} /> Download
              </button>
            </div>
          </div>
        </div>}
    </div>;
}