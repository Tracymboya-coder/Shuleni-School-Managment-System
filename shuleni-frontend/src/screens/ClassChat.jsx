import { useState, useRef, useEffect } from 'react';
import { Pin, FolderOpen, Paperclip, SendHorizonal, FileText } from 'lucide-react';
const initial = [{
  id: 1,
  sender: 'Ms. Grace Njeri',
  role: 'educator',
  text: "ANNOUNCEMENT: Tomorrow's Biology CAT 2 will cover Chapters 5-8 (Cell Division & Photosynthesis). Bring your lab practical notes.",
  time: '8:00 AM',
  pinned: true
}, {
  id: 2,
  sender: 'Brian Otieno',
  role: 'student',
  text: 'Ms. Njeri, will we need to draw diagrams for the essay question?',
  time: '8:14 AM'
}, {
  id: 3,
  sender: 'Ms. Grace Njeri',
  role: 'educator',
  text: 'Yes Brian, diagrams are required for the photosynthesis essay. Label all parts clearly for full marks.',
  time: '8:17 AM'
}, {
  id: 4,
  sender: 'Ms. Grace Njeri',
  role: 'educator',
  text: "I've uploaded the revision notes to the Resource Library. Check the Form 3 East folder.",
  time: '8:20 AM',
  file: {
    name: 'Biology Revision Notes Ch.5-8.pdf',
    type: 'pdf'
  }
}, {
  id: 5,
  sender: 'Mercy Chebet',
  role: 'student',
  text: 'Thank you Ms! The notes are very helpful',
  time: '8:34 AM'
}, {
  id: 6,
  sender: 'Kevin Wafula',
  role: 'student',
  text: 'Are we allowed to use periodic tables during the exam?',
  time: '8:41 AM'
}, {
  id: 7,
  sender: 'Ms. Grace Njeri',
  role: 'educator',
  text: 'No Kevin — this is a Biology exam. You will be provided with any necessary reference data within the paper itself.',
  time: '8:44 AM'
}, {
  id: 8,
  sender: 'Fatuma Hassan',
  role: 'student',
  text: 'What time does the exam start tomorrow exactly?',
  time: '9:02 AM'
}, {
  id: 9,
  sender: 'Ms. Grace Njeri',
  role: 'educator',
  text: '9:00 AM sharp. Be in the lab by 8:45. No entry after 9:15.',
  time: '9:05 AM'
}];
export default function ClassChat() {
  const [messages, setMessages] = useState(initial);
  const [input, setInput] = useState('');
  const [showPinned, setShowPinned] = useState(true);
  const bottomRef = useRef(null);
  const me = 'Ms. Grace Njeri';
  const myRole = 'educator';
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      sender: me,
      role: myRole,
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-KE', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }]);
    setInput('');
  };
  const pinned = messages.find(m => m.pinned);
  return <div style={{
    display: 'flex',
    height: 'calc(100vh - 56px)',
    background: '#FAF7F0'
  }}>
      <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }}>
        <div style={{
        background: '#fff',
        borderBottom: '1px solid #E4DDD4',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
          <div>
            <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: '#1E1A16'
          }}>Form 3 East</div>
            <div style={{
            fontSize: 13,
            color: '#6B6259'
          }}>47 students · Ms. Grace Njeri</div>
          </div>
          <div style={{
          display: 'flex',
          gap: 8
        }}>
            <button className="btn-ghost" style={{
            fontSize: 12,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}>
              <Pin size={12} strokeWidth={2} /> Pinned ({messages.filter(m => m.pinned).length})
            </button>
            <button className="btn-ghost" style={{
            fontSize: 12,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}>
              <FolderOpen size={12} strokeWidth={1.8} /> Shared files
            </button>
          </div>
        </div>

        {showPinned && pinned && <div style={{
        background: '#FBF0D8',
        borderBottom: '1px solid #E8C980',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10
      }}>
            <Pin size={14} color="#9A6A18" strokeWidth={2} style={{
          flexShrink: 0,
          marginTop: 2
        }} />
            <div style={{
          flex: 1
        }}>
              <div style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#9A6A18',
            marginBottom: 2
          }}>Pinned announcement · {pinned.sender}</div>
              <div style={{
            fontSize: 13,
            color: '#3D3730'
          }}>{pinned.text.replace('ANNOUNCEMENT: ', '')}</div>
            </div>
            <button onClick={() => setShowPinned(false)} style={{
          background: 'none',
          border: 'none',
          fontSize: 16,
          cursor: 'pointer',
          color: '#B5A99C',
          lineHeight: 1,
          flexShrink: 0
        }}>×</button>
          </div>}

        <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
          {messages.map((msg, i) => {
          const isMe = msg.sender === me;
          const prevMsg = messages[i - 1];
          const showSender = !prevMsg || prevMsg.sender !== msg.sender;
          return <div key={msg.id} style={{
            display: 'flex',
            justifyContent: isMe ? 'flex-end' : 'flex-start',
            marginTop: showSender ? 14 : 2
          }}>
                {!isMe && showSender && <div style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: msg.role === 'educator' ? '#D4EDE2' : '#F0EAE0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: msg.role === 'educator' ? '#2D6A4F' : '#6B6259',
              flexShrink: 0,
              marginRight: 8,
              alignSelf: 'flex-end'
            }}>
                    {msg.sender.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>}
                {!isMe && !showSender && <div style={{
              width: 38
            }} />}

                <div style={{
              maxWidth: '68%'
            }}>
                  {showSender && !isMe && <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: msg.role === 'educator' ? '#2D6A4F' : '#6B6259',
                marginBottom: 4,
                paddingLeft: 2
              }}>
                      {msg.sender} {msg.role === 'educator' && <span style={{
                  background: '#D4EDE2',
                  color: '#1A4A35',
                  padding: '1px 6px',
                  borderRadius: 10,
                  fontSize: 10,
                  fontWeight: 700
                }}>Educator</span>}
                    </div>}
                  <div style={{
                padding: '10px 14px',
                borderRadius: isMe ? '14px 14px 4px 14px' : '4px 14px 14px 14px',
                background: isMe ? '#C1440E' : msg.pinned ? '#FBF0D8' : '#fff',
                color: isMe ? '#fff' : '#1E1A16',
                border: msg.pinned && !isMe ? '1px solid #E8C980' : '1px solid #E4DDD4',
                fontSize: 14,
                lineHeight: 1.6
              }}>
                    {msg.text}
                    {msg.file && <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 8,
                  background: isMe ? 'rgba(255,255,255,0.15)' : '#F0EAE0',
                  borderRadius: 8,
                  padding: '8px 10px',
                  cursor: 'pointer'
                }}>
                        <FileText size={16} color={isMe ? '#fff' : '#C1440E'} strokeWidth={1.6} />
                        <div>
                          <div style={{
                      fontSize: 12,
                      fontWeight: 600
                    }}>{msg.file.name}</div>
                          <div style={{
                      fontSize: 11,
                      opacity: 0.7
                    }}>PDF · Click to open</div>
                        </div>
                      </div>}
                  </div>
                  <div style={{
                fontSize: 11,
                color: '#B5A99C',
                marginTop: 2,
                textAlign: isMe ? 'right' : 'left',
                paddingLeft: isMe ? 0 : 2
              }}>{msg.time}</div>
                </div>
              </div>;
        })}
          <div ref={bottomRef} />
        </div>

        <div style={{
        background: '#fff',
        borderTop: '1px solid #E4DDD4',
        padding: '14px 24px'
      }}>
          <div style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end'
        }}>
            <div style={{
            flex: 1,
            background: '#FAF7F0',
            border: '1.5px solid #E4DDD4',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8
          }} onFocus={e => e.currentTarget.style.borderColor = '#C1440E'} onBlur={e => e.currentTarget.style.borderColor = '#E4DDD4'}>
              <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }} placeholder="Type a message…" rows={1} style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: '#1E1A16',
              lineHeight: 1.5,
              maxHeight: 100,
              overflowY: 'auto'
            }} />
              <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#B5A99C',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }} title="Attach file">
                <Paperclip size={17} strokeWidth={1.8} />
              </button>
            </div>
            <button onClick={send} style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            background: input.trim() ? '#C1440E' : '#F0EAE0',
            border: 'none',
            cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s',
            flexShrink: 0
          }}>
              <SendHorizonal size={17} color={input.trim() ? '#fff' : '#B5A99C'} strokeWidth={2} />
            </button>
          </div>
          <div style={{
          fontSize: 11,
          color: '#B5A99C',
          marginTop: 6
        }}>Press Enter to send · Shift+Enter for new line</div>
        </div>
      </div>

      <div style={{
      width: 220,
      background: '#fff',
      borderLeft: '1px solid #E4DDD4',
      padding: '16px 0',
      overflowY: 'auto'
    }}>
        <div style={{
        padding: '0 16px',
        marginBottom: 12
      }}>
          <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#B5A99C',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}>Educators (1)</div>
        </div>
        {[{
        name: 'Ms. Grace Njeri',
        online: true,
        color: '#2D6A4F',
        bg: '#D4EDE2'
      }].map(u => <div key={u.name} style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 16px'
      }}>
            <div style={{
          position: 'relative'
        }}>
              <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: u.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: u.color
          }}>GN</div>
              {u.online && <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#2D6A4F',
            border: '2px solid #fff'
          }} />}
            </div>
            <span style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#1E1A16'
        }}>{u.name}</span>
          </div>)}

        <div style={{
        padding: '12px 16px 8px',
        marginTop: 4
      }}>
          <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#B5A99C',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}>Students (47)</div>
        </div>
        {['Brian Otieno', 'Mercy Chebet', 'Kevin Wafula', 'Fatuma Hassan', 'James Njoroge', 'Aisha Muthoni', 'Caroline Wanjiku', 'Daniel Kiprop'].map((name, i) => <div key={name} style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 16px'
      }}>
            <div style={{
          position: 'relative'
        }}>
              <div style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: '#F0EAE0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: '#6B6259'
          }}>
                {name.split(' ').map(n => n[0]).join('')}
              </div>
              {i < 3 && <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#2D6A4F',
            border: '1.5px solid #fff'
          }} />}
            </div>
            <span style={{
          fontSize: 12,
          color: '#3D3730'
        }}>{name}</span>
          </div>)}
        <div style={{
        padding: '8px 16px',
        fontSize: 12,
        color: '#B5A99C'
      }}>+39 more</div>
      </div>
    </div>;
}