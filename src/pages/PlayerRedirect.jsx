import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Download, Award, Shield, Activity, Trophy, Users, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { API_BASE_URL, getImageUrl } from '../utils/api'

const G    = '#FFD000'
const BG   = '#000000'
const CARD = '#0a0a0a'
const DIM  = 'rgba(255,255,255,0.35)'
const BORDER = 'rgba(255,208,0,0.12)'

function calcAge(dob) {
  if (!dob) return null
  return Math.floor((Date.now() - new Date(dob)) / (365.25 * 24 * 3600 * 1000))
}

/* ────────────────── HERO ────────────────── */
function Hero({ player, loading, error }) {
  const photo = player?.photo || player?.userId?.photo
  const age = calcAge(player?.dob)

  const stats = [
    { v: player?.career?.matches ?? 0,  l: 'Matches' },
    { v: player?.batting?.runs ?? 0,    l: 'Runs' },
    { v: player?.bowling?.wickets ?? 0, l: 'Wickets' },
    { v: player?.batting?.highestScore
        ? `${player.batting.highestScore}${player.batting.highestScoreNotOut ? '*' : ''}`
        : '—',                          l: 'Best' },
    { v: (() => {
        const d = (player?.batting?.innings ?? 0) - (player?.batting?.notOuts ?? 0)
        return d ? ((player?.batting?.runs ?? 0) / d).toFixed(1) : '—'
      })(),                             l: 'Avg' },
  ]

  return (
    <div style={{ background: '#000', position: 'relative', overflow: 'hidden', minHeight: '82vh', display: 'flex', flexDirection: 'column' }}>

      {/* subtle gold glow at bottom center */}
      <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:'60%', height:'50%', pointerEvents:'none',
        background:'radial-gradient(ellipse at bottom, rgba(255,208,0,0.05) 0%, transparent 70%)',
        zIndex:1 }} />

      {/* ── 3-col hero layout ── */}
      <div style={{
        display:'grid',
        gridTemplateColumns:'1fr auto 1fr',
        alignItems:'center',
        flex:1,
        padding:'110px 56px 40px',
        maxWidth:1400, margin:'0 auto', width:'100%',
        position:'relative', zIndex:2, gap:40,
        boxSizing:'border-box',
      }} className="sv-hg">

        {/* ── LEFT: Player Identity ── */}
        <motion.div
          initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.7, delay:0.15 }}
          style={{ display:'flex', flexDirection:'column', justifyContent:'center' }}
        >
          {loading && <p style={{ color:'rgba(255,255,255,0.3)', fontSize:13 }}>Loading…</p>}
          {error   && <p style={{ color:'rgba(255,255,255,0.3)', fontSize:13 }}>Player not found.</p>}
          {!loading && !error && player && (
            <>
              {/* Jersey number (if exists) */}
              {player.jerseyNumber && (
                <div style={{ fontSize:'clamp(60px,9vw,110px)', fontWeight:900, color:G,
                  lineHeight:1, letterSpacing:'-4px', fontFamily:'Georgia,serif', marginBottom:2,
                  opacity:0.9 }}>
                  {player.jerseyNumber}
                </div>
              )}

              {/* Name */}
              <h1 style={{ fontSize:'clamp(26px,4vw,52px)', fontWeight:900, color:'#ffffff',
                lineHeight:1.05, letterSpacing:'1px', textTransform:'uppercase',
                margin:'0 0 12px', wordBreak:'break-word' }}>
                {player.name}
              </h1>

              {/* Role */}
              <div style={{ fontSize:12, fontWeight:700, color:G,
                letterSpacing:'3px', textTransform:'uppercase', marginBottom:10 }}>
                {player.playingRole || 'Cricketer'}
              </div>

              {/* City */}
              {(player.city || player.location) && (
                <div style={{ display:'flex', alignItems:'center', gap:5,
                  color:'rgba(255,255,255,0.38)', fontSize:11, fontWeight:600,
                  textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:32 }}>
                  <MapPin size={10} style={{ color:G }} />
                  {player.city || player.location}
                </div>
              )}

              {/* CTA */}
              <a href="https://play.google.com/store/apps/details?id=com.scoreverse.sports"
                target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:7,
                  background:G, color:'#000', fontWeight:800, fontSize:10,
                  textTransform:'uppercase', letterSpacing:'2px',
                  padding:'11px 22px', borderRadius:2, textDecoration:'none',
                  width:'fit-content' }}>
                <Download size={12} /> Get App
              </a>
            </>
          )}
        </motion.div>

        {/* ── CENTER: Big Circular Photo ── */}
        <motion.div
          initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.8, delay:0.05 }}
          style={{ display:'flex', justifyContent:'center', alignItems:'center',
            position:'relative', flexShrink:0 }}
        >
          {/* outer gold ring glow */}
          <div style={{ position:'absolute', inset:-4,
            borderRadius:'50%',
            background:`conic-gradient(${G}, rgba(255,208,0,0.2), ${G})`,
            filter:'blur(8px)', opacity:0.35, pointerEvents:'none' }} />

          {/* Avatar circle */}
          <div className="sv-avatar" style={{
            width:'clamp(180px, 24vw, 320px)',
            height:'clamp(180px, 24vw, 320px)',
            borderRadius:'50%',
            overflow:'hidden',
            border:`3px solid ${G}`,
            position:'relative', zIndex:2,
            background:'#111',
            boxShadow:`0 0 60px rgba(255,208,0,0.18), 0 0 120px rgba(255,208,0,0.06)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            flexShrink:0,
          }}>
            {photo ? (
              <img src={getImageUrl(photo)} alt={player?.name || 'Player'}
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
            ) : (
              <User size={80} style={{ color:'rgba(255,208,0,0.35)' }} />
            )}
          </div>
        </motion.div>

        {/* ── RIGHT: Player Details ── */}
        <motion.div
          initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.7, delay:0.2 }}
          style={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:0 }}
        >
          {!loading && !error && player && (
            <div style={{ display:'flex', flexDirection:'column' }}>
              {[
                age && { k:'Age',     v:`${age} Years` },
                player.battingStyle  && { k:'Batting', v:player.battingStyle },
                player.bowlingStyle  && { k:'Bowling', v:player.bowlingStyle },
                player.battingOrder  && { k:'Order',   v:player.battingOrder },
                { k:'Role', v:player.playingRole || 'Batsman' },
              ].filter(Boolean).map((item, i) => (
                <motion.div key={item.k}
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.35 + i * 0.07 }}
                  style={{ padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' }}
                >
                  <div style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.3)',
                    letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:4 }}>
                    {item.k}
                  </div>
                  <div style={{ fontSize:15, fontWeight:700, color:'#fff' }}>{item.v}</div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ── STATS STRIP ── */}
      {!loading && !error && player && (
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.7, duration:0.5 }}
          style={{
            borderTop:`1px solid ${BORDER}`,
            display:'grid', gridTemplateColumns:'repeat(5,1fr)',
            maxWidth:1400, margin:'0 auto', width:'100%',
            position:'relative', zIndex:3,
            background:'#000',
          }}
          className="sv-strip"
        >
          {stats.map((s, i) => (
            <div key={s.l} style={{ padding:'24px 0', textAlign:'center',
              borderRight: i < 4 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ fontSize:'clamp(24px,3.5vw,40px)', fontWeight:900, color:G,
                fontFamily:'Georgia,serif', lineHeight:1, marginBottom:6 }}>
                {s.v}
              </div>
              <div style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.3)',
                letterSpacing:'2px', textTransform:'uppercase' }}>
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

/* ────────────────── TAB CONTENT ────────────────── */
function StatsTab({ player }) {
  if (!player) return null
  const sections = [
    { title:'Batting', rows:[
      ['Innings',    player.batting?.innings ?? 0],
      ['Runs',       player.batting?.runs ?? 0],
      ['Not Outs',   player.batting?.notOuts ?? 0],
      ['Average',    (() => { const d = (player.batting?.innings??0)-(player.batting?.notOuts??0); return d ? ((player.batting?.runs??0)/d).toFixed(2) : '—' })()],
      ['High Score', player.batting?.highestScore ? `${player.batting.highestScore}${player.batting.highestScoreNotOut?'*':''}` : '—'],
      ['50s',        player.batting?.fifties ?? 0],
      ['100s',       player.batting?.hundreds ?? 0],
      ['4s',         player.batting?.fours ?? 0],
      ['6s',         player.batting?.sixes ?? 0],
    ]},
    { title:'Bowling', rows:[
      ['Innings',  player.bowling?.innings ?? 0],
      ['Overs',    player.bowling?.overs ?? 0],
      ['Wickets',  player.bowling?.wickets ?? 0],
      ['Economy',  (() => { const o = player.bowling?.overs??0; return o?((player.bowling?.runs??0)/o).toFixed(2):'—' })()],
      ['Average',  player.bowling?.wickets ? ((player.bowling?.runs??0)/player.bowling.wickets).toFixed(2):'—'],
      ['Best',     player.bowling?.bestWickets!=null ? `${player.bowling.bestWickets}/${player.bowling.bestRuns??0}`:'—'],
      ['Maidens',  player.bowling?.maidens ?? 0],
    ]},
    { title:'Fielding', rows:[
      ['Catches',   player.fielding?.catches ?? 0],
      ['Run Outs',  player.fielding?.runOuts ?? 0],
      ['Stumpings', player.fielding?.stumpings ?? 0],
    ]},
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:2 }}>
      {sections.map(sec => (
        <div key={sec.title} style={{ background:CARD }}>
          <div style={{ padding:'16px 20px 12px', borderBottom:`1px solid ${BORDER}` }}>
            <div style={{ width:28, height:2, background:G, borderRadius:2, marginBottom:8 }} />
            <div style={{ fontSize:10, fontWeight:800, color:G, letterSpacing:'3px', textTransform:'uppercase' }}>{sec.title}</div>
          </div>
          {sec.rows.map(([label, value]) => (
            <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'11px 20px', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.4)', fontWeight:500 }}>{label}</span>
              <span style={{ fontSize:13, color:'#fff', fontWeight:700 }}>{value}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function BadgesTab({ player }) {
  const badges = [
    { id:'pom',     label:'Player of Match', count:player?.career?.playerOfMatchAwards??0, icon:<Award size={20}/> },
    { id:'tb',      label:'Top Batter',      count:player?.career?.topBatterAwards??0,     icon:<Activity size={20}/> },
    { id:'tbwl',    label:'Top Bowler',      count:player?.career?.topBowlerAwards??0,     icon:<Trophy size={20}/> },
    { id:'mvp',     label:'MVP',             count:player?.career?.mvpAwards??0,           icon:<Shield size={20}/> },
    { id:'fighter', label:'Fighter',         count:player?.career?.fighterOfMatchAwards??0,icon:<Shield size={20}/> },
  ].filter(b=>b.count>0)
  if (!badges.length) return <Empty msg="No badges earned yet." />
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:2 }}>
      {badges.map(b=>(
        <div key={b.id} style={{ background:CARD, padding:'28px 16px', textAlign:'center',
          display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <div style={{ color:G }}>{b.icon}</div>
          <div style={{ fontSize:'clamp(24px,3vw,36px)', fontWeight:900, color:'#fff', fontFamily:'Georgia,serif' }}>{b.count}</div>
          <div style={{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.3)', letterSpacing:'2px', textTransform:'uppercase' }}>{b.label}</div>
        </div>
      ))}
    </div>
  )
}

function TeamCard({ teamSummary }) {
  const [team, setTeam] = useState(teamSummary)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (expanded && !team.players) {
      setLoading(true)
      fetch(`${API_BASE_URL}/teams/${teamSummary._id || teamSummary.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.data) setTeam(data.data)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [expanded, teamSummary])

  return (
    <div style={{ background:CARD, display:'flex', flexDirection:'column' }}>
      <div 
        onClick={() => setExpanded(!expanded)} 
        style={{ padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', transition:'background 0.2s' }}
        onMouseOver={e => e.currentTarget.style.background = '#131317'}
        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:44, height:44, borderRadius:'50%', background:'#1a1a22', overflow:'hidden',
            display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${BORDER}`, flexShrink:0 }}>
            {team.logo ? <img src={getImageUrl(team.logo)} alt={team.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : <Users size={18} style={{ color:'rgba(255,208,0,0.4)' }}/>}
          </div>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:'#fff' }}>{team.name}</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'1px', marginTop:2 }}>
              {team.winPercentage ? `Win Rate: ${isNaN(team.winPercentage) ? '0' : team.winPercentage}%` : 'Tap to view players'}
            </div>
          </div>
        </div>
        <div style={{ color:'rgba(255,255,255,0.3)' }}>
          {expanded ? <ChevronLeft size={18} style={{ transform:'rotate(90deg)' }}/> : <ChevronRight size={18}/>}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            style={{ overflow:'hidden' }}
          >
            <div style={{ borderTop:`1px solid rgba(255,255,255,0.05)`, padding:'12px 20px 20px' }}>
              <div style={{ fontSize:10, fontWeight:700, color:G, letterSpacing:'2px', textTransform:'uppercase', marginBottom:12 }}>
                Team Roster
              </div>
              {loading ? (
                <div style={{ fontSize:12, color:DIM }}>Loading players...</div>
              ) : team.players?.length ? (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:8 }}>
                  {team.players.map((p, idx) => {
                    const ply = p.player
                    if (!ply) return null
                    return (
                      <a key={idx} href={`/player/${ply._id}`} style={{
                        display:'flex', alignItems:'center', gap:10, padding:'8px 12px',
                        background:'rgba(255,255,255,0.03)', borderRadius:4, textDecoration:'none',
                        transition:'background 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                      onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                        <div style={{ width:32, height:32, borderRadius:'50%', background:'#222', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          {(ply.photo || ply.userId?.photo) ? (
                            <img src={getImageUrl(ply.photo || ply.userId?.photo)} alt={ply.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
                          ) : (
                            <User size={14} style={{ color:'rgba(255,255,255,0.3)' }} />
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>{ply.name}</div>
                          <div style={{ fontSize:9, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'1px' }}>
                            {ply.playingRole || 'Player'}
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              ) : (
                <div style={{ fontSize:12, color:DIM }}>No players found.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TeamsTab({ player }) {
  if (!player?.teams?.length) return <Empty msg="Not part of any teams yet." />
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
      {player.teams.map((t,i) => <TeamCard key={i} teamSummary={t} />)}
    </div>
  )
}

function MatchRow({ m }) {
  const [innings, setInnings] = useState(m.innings || null);

  useEffect(() => {
    if (!innings && m.matchId) {
      fetch(`${API_BASE_URL}/matches/${m.matchId}`)
        .then(res => res.json())
        .then(data => {
          if (data?.data?.innings) {
            setInnings(data.data.innings);
          }
        })
        .catch(console.error);
    }
  }, [m.matchId, innings]);

  return (
    <motion.a href={`/match/${m.matchId}`}
      whileHover={{ y:-2, background:'#131317' }}
      style={{ display:'block', textDecoration:'none', background:CARD, padding:'16px 20px', transition:'all 0.2s' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <span style={{ fontSize:9, color:'rgba(255,255,255,0.28)', fontWeight:700, textTransform:'uppercase', letterSpacing:'1.5px' }}>
          {new Date(m.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}{m.ballType?` · ${m.ballType}`:''}
        </span>
        <span style={{ fontSize:8, fontWeight:800, color:'rgba(255,255,255,0.3)',
          letterSpacing:'1.5px', textTransform:'uppercase',
          border:'1px solid rgba(255,255,255,0.08)', padding:'2px 6px' }}>
          {m.status==='completed'?'PAST':m.status?.toUpperCase()}
        </span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, overflow:'hidden', paddingRight:12 }}>
            <div style={{ width:24, height:24, borderRadius:'50%', background:'#222', flexShrink:0, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {m.teamA?.logo ? <img src={getImageUrl(m.teamA.logo)} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="" /> : <Users size={12} style={{ color:'rgba(255,255,255,0.2)' }}/>}
            </div>
            <span style={{ fontSize:14, fontWeight:700, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.teamA?.name||'Team A'}</span>
          </div>
          <span style={{ fontSize:13, fontWeight:800, color:'#fff', flexShrink:0, textAlign:'right' }}>
            {(() => {
              if (!innings) return '...';
              const inn = innings.find(i => String(i.battingTeam) === String(m.teamA?._id || m.teamA?.id));
              if (!inn) return '-';
              return (
                <>{inn.totalRuns}/{inn.totalWickets} <span style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontWeight:600 }}>({inn.totalOvers}.{inn.totalBalls})</span></>
              );
            })()}
          </span>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, overflow:'hidden', paddingRight:12 }}>
            <div style={{ width:24, height:24, borderRadius:'50%', background:'#222', flexShrink:0, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {m.teamB?.logo ? <img src={getImageUrl(m.teamB.logo)} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="" /> : <Users size={12} style={{ color:'rgba(255,255,255,0.2)' }}/>}
            </div>
            <span style={{ fontSize:14, fontWeight:700, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.teamB?.name||'Team B'}</span>
          </div>
          <span style={{ fontSize:13, fontWeight:800, color:'#fff', flexShrink:0, textAlign:'right' }}>
            {(() => {
              if (!innings) return '...';
              const inn = innings.find(i => String(i.battingTeam) === String(m.teamB?._id || m.teamB?.id));
              if (!inn) return '-';
              return (
                <>{inn.totalRuns}/{inn.totalWickets} <span style={{ fontSize:10, color:'rgba(255,255,255,0.4)', fontWeight:600 }}>({inn.totalOvers}.{inn.totalBalls})</span></>
              );
            })()}
          </span>
        </div>
      </div>

      {m.resultSummary && <div style={{ fontSize:11, color:G, fontWeight:600, marginBottom:10 }}>{m.resultSummary}</div>}

      <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:8, display:'flex', gap:12 }}>
        {m.runs!==null && (
          <div><span style={{ fontSize:15, fontWeight:900, color:'#fff', fontFamily:'Georgia,serif' }}>{m.runs}</span><span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', marginLeft:3 }}>runs ({m.balls}b)</span></div>
        )}
        {m.bowling?.overs>0 && (
          <div style={{ marginLeft:'auto' }}><span style={{ fontSize:15, fontWeight:900, color:'#fff', fontFamily:'Georgia,serif' }}>{m.bowling.wickets}/{m.bowling.runs}</span><span style={{ fontSize:10, color:'rgba(255,255,255,0.3)', marginLeft:3 }}>({m.bowling.overs}ov)</span></div>
        )}
      </div>
    </motion.a>
  )
}

function MatchesTab({ matchHistory }) {
  const [page, setPage] = useState(1)
  const PER = 12
  if (!matchHistory?.length) return <Empty msg="No matches played yet." />
  
  // Sort match history newest first locally, in case backend is still sending oldest first
  const sortedHistory = [...matchHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const total = Math.ceil(sortedHistory.length / PER)
  const cur   = sortedHistory.slice((page-1)*PER, page*PER)
  return (<>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:2 }}>
      {cur.map((m,i)=>(
        <MatchRow key={i} m={m} />
      ))}
    </div>

    {total>1 && (
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:12,
        padding:'24px 0 0', borderTop:`1px solid ${BORDER}`, marginTop:2 }}>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
          style={{ background:'transparent', border:`1px solid ${BORDER}`,
            color:page===1?'rgba(255,255,255,0.15)':'#fff',
            padding:'7px 14px', cursor:page===1?'not-allowed':'pointer',
            fontSize:11, fontWeight:700, letterSpacing:'1px',
            display:'flex', alignItems:'center', gap:4 }}>
          <ChevronLeft size={12}/> Prev
        </button>
        <span style={{ fontSize:11, color:DIM, fontWeight:600, letterSpacing:'1px' }}>{page} / {total}</span>
        <button onClick={()=>setPage(p=>Math.min(total,p+1))} disabled={page===total}
          style={{ background:'transparent', border:`1px solid ${BORDER}`,
            color:page===total?'rgba(255,255,255,0.15)':'#fff',
            padding:'7px 14px', cursor:page===total?'not-allowed':'pointer',
            fontSize:11, fontWeight:700, letterSpacing:'1px',
            display:'flex', alignItems:'center', gap:4 }}>
          Next <ChevronRight size={12}/>
        </button>
      </div>
    )}
  </>)
}

function Empty({ msg }) {
  return <div style={{ textAlign:'center', padding:'60px 24px', color:'rgba(255,255,255,0.2)', fontSize:13 }}>{msg}</div>
}

/* ────────────────── MAIN ────────────────── */
const TABS = ['matches','stats','badges','teams']

export default function PlayerRedirect() {
  const playerId = window.location.pathname.split('/').filter(Boolean)[1]
  const [player,     setPlayer]     = useState(null)
  const [matches,    setMatches]    = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(false)
  const [activeTab,  setActiveTab]  = useState('matches')

  useEffect(()=>{
    if (!playerId) { setLoading(false); setError(true); return }
    ;(async()=>{
      try {
        const [pR, mR] = await Promise.all([
          fetch(`${API_BASE_URL}/players/${playerId}`),
          fetch(`${API_BASE_URL}/players/${playerId}/match-history`),
        ])
        if (!pR.ok) throw new Error()
        const pd = await pR.json(); setPlayer(pd.data||pd)
        if (mR.ok) { const md = await mR.json(); setMatches(md.data?.history||[]) }
      } catch { setError(true) }
      finally  { setLoading(false) }
    })()
  },[playerId])

  return (
    <>
      <style>{`
        body,#root{ background:#000; }
        @media(max-width:900px){
          .sv-hg{ grid-template-columns:1fr !important; padding:40px 24px !important; gap:24px !important; }
          .sv-hg>*:nth-child(1){ order:2; text-align:center; align-items:center !important; display:flex; flex-direction:column; padding-bottom:0 !important; }
          .sv-hg>*:nth-child(1) a{ align-self:center; }
          .sv-hg>*:nth-child(2){ order:1; }
          .sv-avatar{ width:clamp(160px,50vw,240px) !important; height:clamp(160px,50vw,240px) !important; }
          .sv-hg>*:nth-child(3){ order:3; padding-left:0 !important; }
          .sv-strip{ grid-template-columns:repeat(3,1fr) !important; }
          .sv-pad{ padding:0 16px !important; }
          .sv-hdr{ padding:24px 16px 14px !important; }
          .sv-dl{ margin:32px 16px 0 !important; flex-direction:column !important; padding:20px !important; }
          .sv-tabbar{ padding:0 16px !important; overflow-x:auto !important; scrollbar-width: none; -ms-overflow-style: none; }
          .sv-tabbar::-webkit-scrollbar { display: none; }
        }
        @media(max-width:480px){
          .sv-strip{ grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      {/* HERO */}
      <Hero player={player} loading={loading} error={error}/>

      {/* TABS BAR */}
      <div className="sv-tabbar" style={{
        background:'#000',
        borderBottom:'1px solid rgba(255,255,255,0.08)',
        display:'flex',
        position:'sticky', top:62, zIndex:50,
        gap:0,
        width: '100%',
      }}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setActiveTab(t)} style={{
            background: activeTab===t ? 'rgba(255,208,0,0.05)' : 'transparent',
            border:'none', outline:'none',
            borderBottom: activeTab===t ? `3px solid ${G}` : '3px solid transparent',
            color: activeTab===t ? '#ffffff' : 'rgba(255,255,255,0.35)',
            fontSize:11, fontWeight:700, letterSpacing:'2px',
            textTransform:'uppercase', padding:'18px 0',
            cursor:'pointer', transition:'color 0.18s, border-color 0.18s, background 0.18s',
            whiteSpace:'nowrap', fontFamily:'inherit',
            flex: 1,
            textAlign: 'center'
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* TAB BODY */}
      <div style={{ background:BG, minHeight:'50vh', paddingBottom:80 }}>

        {/* Section header */}
        <div className="sv-hdr" style={{ padding:'32px 48px 20px', display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:3, height:28, background:G, borderRadius:2, flexShrink:0 }}/>
          <div>
            {player?.name && <div style={{ fontSize:9, color:'rgba(255,255,255,0.28)', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', marginBottom:2 }}>{player.name}</div>}
            <div style={{ fontSize:18, color:'#fff', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.5px' }}>{activeTab}</div>
          </div>
        </div>

        <div className="sv-pad" style={{ padding:'0 48px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-10 }} transition={{ duration:0.18 }}>
              {activeTab==='matches' && <MatchesTab matchHistory={matches}/>}
              {activeTab==='stats'   && <StatsTab   player={player}/>}
              {activeTab==='badges'  && <BadgesTab  player={player}/>}
              {activeTab==='teams'   && <TeamsTab   player={player}/>}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Download bar */}
        <div className="sv-dl" style={{
          margin:'48px 48px 0', background:CARD,
          borderTop:`1px solid rgba(255,208,0,0.12)`,
          padding:'24px 32px', display:'flex',
          alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16,
        }}>
          <div>
            <div style={{ fontSize:11, fontWeight:800, color:'#fff', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:4 }}>Track Full Career Stats</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.38)' }}>Book turfs, manage tournaments & score live on ScoreVerse.</div>
          </div>
          <a href="https://play.google.com/store/apps/details?id=com.scoreverse.sports"
            target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:7,
              background:G, color:'#000', fontWeight:800, fontSize:10,
              textTransform:'uppercase', letterSpacing:'2px',
              padding:'11px 24px', textDecoration:'none', borderRadius:2, flexShrink:0 }}>
            <Download size={12}/> Download App
          </a>
        </div>
      </div>
    </>
  )
}
