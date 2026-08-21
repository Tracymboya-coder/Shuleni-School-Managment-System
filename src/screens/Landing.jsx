import { School, ClipboardCheck, FileText, FolderOpen, MessageSquare, BarChart2, ShieldCheck, BookOpen, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';


import landingImg from '../../Public/Assets/schoolimage.png';
import childrenImg from '../../Public/Assets/children.jpg';
import { Children } from 'react';
const features = [{
  Icon: School,
  title: 'Multi-school platform',
  desc: 'Each school operates in its own isolated space. Students, educators, and data never cross school boundaries.'
}, {
  Icon: ClipboardCheck,
  title: 'Attendance tracking',
  desc: 'Educators take digital roll call, sign off records, and build a reliable history for every class.'
}, {
  Icon: FileText,
  title: 'Online assessments',
  desc: 'Build timed MCQ, short-answer, and essay exams. Anti-cheat measures and auto-grading built in.'
}, {
  Icon: FolderOpen,
  title: 'Resource library',
  desc: 'A school-specific digital library. Notes, books, and materials shared per class with access controls.'
}, {
  Icon: MessageSquare,
  title: 'Class chat',
  desc: 'Private class-based messaging. Educators and students communicate within a safe, school-managed space.'
}, {
  Icon: BarChart2,
  title: 'Role-aware dashboards',
  desc: 'School owners, educators, and students each see only what their role allows — nothing more.'
}];
const roles = [{
  role: 'School Owner',
  Icon: ShieldCheck,
  desc: 'Full visibility: manage educators, students, classes, resources, attendance, and exams across the whole school.',
  color: '#C1440E',
  bg: '#F4E4DC'
}, {
  role: 'Educator',
  Icon: BookOpen,
  desc: 'Manage your classes: take attendance, create exams, upload resources, and chat with students.',
  color: '#2D6A4F',
  bg: '#D4EDE2'
}, {
  role: 'Student',
  Icon: GraduationCap,
  desc: 'Access your classes: view resources, take exams, check attendance, see results, and chat with educators.',
  color: '#D4922A',
  bg: '#FBF0D8'
}];
const checkItems = ['Digital roll call in under 2 minutes', 'Auto-grade MCQ exams instantly', 'Share resources with specific classes', "Track every student's progress over time"];
export default function Landing({
  navigate
}) {
  return <div style={{
    background: '#FAF7F0',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif"
  }}>
      {/* Nav */}
      <nav style={{
      background: '#fff',
      borderBottom: '1px solid #E4DDD4',
      padding: '0 40px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }}>
          <div style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: '#C1440E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <span style={{
            color: '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 17
          }}>S</span>
          </div>
          <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 20,
          color: '#1E1A16'
        }}>Shuleni</span>
        </div>
        <div style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center'
      }}>
          <button className="btn-ghost" onClick={() => navigate('login')}>Sign in</button>
          <button className="btn-primary" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }} onClick={() => navigate('create-school')}>
            Create your school <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
      maxWidth: 1080,
      margin: '0 auto',
      padding: '80px 40px 64px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }}>
        <div>
          <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#D4EDE2',
          border: '1px solid #A8D4BE',
          borderRadius: 20,
          padding: '4px 14px',
          marginBottom: 22
        }}>
            
          
          </div>
          <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(34px, 4.5vw, 52px)',
          fontWeight: 800,
          color: '#1E1A16',
          lineHeight: 1.1,
          marginBottom: 18
        }}>
            The complete school<br />
            <span style={{
            color: '#C1440E'
          }}>management platform.</span>
          </h1>
          <p style={{
          fontSize: 17,
          lineHeight: 1.75,
          color: '#6B6259',
          marginBottom: 32,
          maxWidth: 460
        }}>
            Shuleni gives schools a single platform for attendance, online exams, learning resources, and class communication — with every school in its own private space.
          </p>
          <div style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap'
        }}>
            <button className="btn-primary" style={{
            fontSize: 15,
            padding: '12px 26px'
          }} onClick={() => navigate('create-school')}>
              Create your school — free
            </button>
            <button className="btn-secondary" style={{
            fontSize: 15,
            padding: '12px 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }} onClick={() => navigate('login')}>
              Sign in <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div style={{
        position: 'relative'
      }}>
          <div style={{
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(30,26,22,0.16)',
          border: '1px solid #E4DDD4'
        }}>
            <img src={childrenImg} style={{
            width: '100%',
            display: 'block'
          }} />
          </div>
          <div style={{
          position: 'absolute',
          bottom: -18,
          left: -20,
          background: '#fff',
          borderRadius: 12,
          padding: '14px 18px',
          boxShadow: '0 8px 28px rgba(30,26,22,0.13)',
          border: '1px solid #E4DDD4'
        }}>
            <div style={{
            fontSize: 11,
            color: '#B5A99C',
            marginBottom: 2
          }}>Today's attendance · Form 3 East</div>
            <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: '#2D6A4F'
          }}>94%</div>
            <div style={{
            fontSize: 11,
            color: '#6B6259'
          }}>47 of 50 students present</div>
          </div>
        </div>
      </section>

      {/* Role cards */}
      <section style={{
      background: '#fff',
      borderTop: '1px solid #E4DDD4',
      borderBottom: '1px solid #E4DDD4',
      padding: '60px 40px'
    }}>
        <div style={{
        maxWidth: 1080,
        margin: '0 auto'
      }}>
          <div style={{
          textAlign: 'center',
          marginBottom: 40
        }}>
            <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 30,
            fontWeight: 800,
            color: '#1E1A16',
            marginBottom: 8
          }}>Three roles. One platform.</h2>
            <p style={{
            fontSize: 15,
            color: '#6B6259'
          }}>.</p>
          </div>
          <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20
        }}>
            {roles.map(r => <div key={r.role} className="card" style={{
            padding: '24px'
          }}>
                <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: r.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14
            }}>
                  <r.Icon size={20} color={r.color} strokeWidth={1.8} />
                </div>
                <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              color: '#1E1A16',
              marginBottom: 8
            }}>{r.role}</div>
                <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: '#6B6259'
            }}>{r.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
      maxWidth: 1080,
      margin: '0 auto',
      padding: '70px 40px'
    }}>
        <div style={{
        textAlign: 'center',
        marginBottom: 48
      }}>
          <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 30,
          fontWeight: 800,
          color: '#1E1A16',
          marginBottom: 8
        }}>Everything in the MVP</h2>
          <p style={{
          fontSize: 15,
          color: '#6B6259'
        }}>No payment modules, no video conferencing — just the core features schools need.</p>
        </div>
        <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20
      }}>
          {features.map(f => <div key={f.title} className="card" style={{
          padding: '24px 22px'
        }}>
              <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: '#F0EAE0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 14
          }}>
                <f.Icon size={18} color="#C1440E" strokeWidth={1.8} />
              </div>
              <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: '#1E1A16',
            marginBottom: 7
          }}>{f.title}</h3>
              <p style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: '#6B6259'
          }}>{f.desc}</p>
            </div>)}
        </div>
      </section>

      {/* Photo + copy */}
      <section style={{
      background: '#fff',
      borderTop: '1px solid #E4DDD4',
      borderBottom: '1px solid #E4DDD4',
      padding: '70px 40px'
    }}>
        <div style={{
        maxWidth: 1080,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'center'
      }}>
          <div style={{
          borderRadius: 14,
          overflow: 'hidden',
          aspectRatio: '4/3'
        }}>
            <img src={landingImg} alt="Teacher with students" style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }} />
          </div>
          <div>
            <div style={{
            display: 'inline-block',
            background: '#D4EDE2',
            borderRadius: 6,
            padding: '3px 12px',
            fontSize: 12,
            fontWeight: 700,
            color: '#1A4A35',
            marginBottom: 16
          }}>Built for educators</div>
            <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: '#1E1A16',
            marginBottom: 14,
            lineHeight: 1.25
          }}>
              Less admin.<br />More teaching.
            </h2>
            <p style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: '#6B6259',
            marginBottom: 22
          }}>
              Shuleni removes the paperwork so educators can focus on what they do best.
            </p>
            {checkItems.map(item => <div key={item} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
            color: '#3D3730',
            marginBottom: 10
          }}>
                <CheckCircle2 size={16} color="#2D6A4F" strokeWidth={2} style={{
              flexShrink: 0
            }} />
                {item}
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
      maxWidth: 1080,
      margin: '0 auto',
      padding: '80px 40px',
      textAlign: 'center'
    }}>
        <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 36,
        fontWeight: 800,
        color: '#1E1A16',
        marginBottom: 14
      }}>Ready to get started?</h2>
        <p style={{
        fontSize: 16,
        color: '#6B6259',
        marginBottom: 32
      }}>Create your school and start managing classes today.</p>
        <button className="btn-primary" style={{
        fontSize: 17,
        padding: '14px 36px',
        borderRadius: 10,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }} onClick={() => navigate('create-school')}>
          Create your school <ArrowRight size={16} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{
      borderTop: '1px solid #E4DDD4',
      background: '#fff',
      padding: '24px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 10
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
          <div style={{
          width: 26,
          height: 26,
          borderRadius: 6,
          background: '#C1440E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <span style={{
            color: '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 13
          }}>S</span>
          </div>
          <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: '#1E1A16'
        }}>Shuleni</span>
        </div>
        <div style={{
        fontSize: 13,
        color: '#B5A99C'
      }}>© 2025 Shuleni · School Management Platform</div>
        <div style={{
        display: 'flex',
        gap: 18
      }}>
          {['Privacy', 'Terms', 'Support'].map(l => <span key={l} style={{
          fontSize: 13,
          color: '#6B6259',
          cursor: 'pointer'
        }}>{l}</span>)}
        </div>
      </footer>
    </div>;
}