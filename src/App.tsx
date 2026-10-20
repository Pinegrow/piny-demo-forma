import {useEffect, useState} from 'react';
import {Dialog} from 'radix-ui';
import {Button} from './components/ui/button';
import {OverviewPage} from './pages/OverviewPage';
import {ProjectsPage} from './pages/ProjectsPage';
import {ProjectPage} from './pages/ProjectPage';
import {GuidePage} from './pages/GuidePage';
import {projects as initialProjects, activity, type Project} from './data';
import {Icon} from './Icon';
import {navigate, WorkspaceContext} from './workspace';

export function App() {
  const [route, setRoute] = useState(() => window.location.pathname + window.location.search);
  const path = route.split('?')[0];
  // Only newly created demo records belong to React state. Imported content must
  // stay live when source edits arrive through Fast Refresh.
  const [sessionProjects, setSessionProjects] = useState<Project[]>([]);
  const projects = [...initialProjects, ...sessionProjects];
  const [createOpen, setCreateOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  useEffect(() => {const update = () => {setRoute(window.location.pathname + window.location.search); setMenuOpen(false);}; window.addEventListener('popstate', update); return () => window.removeEventListener('popstate', update);}, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      document.querySelector<HTMLButtonElement>('.mobile-menu')?.focus();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);
  useEffect(() => {if (!toast) return; const timer = window.setTimeout(() => setToast(''), 4500); return () => clearTimeout(timer);}, [toast]);
  const current = path === '/' ? 'Overview' : path === '/projects' ? 'Projects' : path === '/guide' ? 'Component guide' : 'Project details';
  function addProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get('title') || '').trim();
    if (!title) return;
    const id = 'project-' + crypto.randomUUID().slice(0, 8);
    const project: Project = {id, title, client: String(form.get('client') || '').trim() || 'New client', category: String(form.get('category')), image: '/images/casa-luma.jpg', imageAlt: 'An architectural moodboard for a new studio project', href: '/projects/' + id, status: 'In progress', progress: 0, location: 'To be confirmed', description: String(form.get('description') || '').trim() || 'A new idea, ready to take shape.', due: 'Upcoming'};
    setSessionProjects(previous => [...previous, project]); setCreateOpen(false); navigate('/projects'); setToast('Project created for this session. Let’s make something good.');
  }
  return <WorkspaceContext.Provider value={{projects, openCreate: () => setCreateOpen(true), notify: setToast}}>
    <div className="studio-app" onClick={event => {
      const anchor = (event.target as Element).closest('a');
      if (!anchor || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin === location.origin && !(import.meta.env.DEV && url.pathname.startsWith('/__piny'))) {event.preventDefault(); navigate(url.pathname + url.search + url.hash);}
    }}>
      <a href="#main" className="skip-link" onClick={event => {event.preventDefault(); document.getElementById('main')?.focus();}}>Skip to content</a>
      <aside className={'sidebar' + (menuOpen ? ' is-open' : '')} aria-label="Studio navigation">
        <a className="brand" href="/" aria-label="Forma home"><span className="brand-symbol" aria-hidden="true">f.</span><span>forma<span className="brand-dot">®</span></span></a>
        <div className="workspace-switch"><span className="workspace-avatar">F</span><div><strong>Forma Studio</strong><small>Design workspace</small></div><span className="workspace-plan">PRO</span></div>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          <a href="/" className={path === '/' ? 'nav-item active' : 'nav-item'} aria-current={path === '/' ? 'page' : undefined}><Icon name="grid"/>Overview</a>
          <a href="/projects" className={path.startsWith('/projects') ? 'nav-item active' : 'nav-item'} aria-current={path === '/projects' ? 'page' : undefined}><Icon name="folder"/>Projects<span className="nav-count">{projects.length.toString().padStart(2, '0')}</span></a>
          <a href="/guide" className={path === '/guide' ? 'nav-item active' : 'nav-item'} aria-current={path === '/guide' ? 'page' : undefined}><Icon name="layers"/>Component guide<span className="tiny-dot"/></a>
        </nav>
        <div className="nav-label recent-label">PINNED PROJECTS</div>
        <nav className="pinned-nav">{initialProjects.map((project, index) => <a href={project.href} key={project.id}><span className={'project-dot dot-' + index}/>{project.title}</a>)}</nav>
        <div className="sidebar-bottom"><div className="studio-note"><span className="note-star">✳</span><strong>A little space for<br/>your next big idea.</strong><a href="/guide">Explore your workspace <Icon name="arrow" size={14}/></a></div><a href="/guide" className="nav-item help-link"><Icon name="help"/>A quick look around</a><div className="profile"><span className="avatar peach">EL</span><div><strong>Emma Laurent</strong><small>Studio owner</small></div><span className="online-dot" title="Demo workspace"/></div></div>
      </aside>
      {menuOpen && <button className="sidebar-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation"/>}
      <div className="main-shell">
        <header className="topbar"><div className="breadcrumb"><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name="menu"/></Button><span>Workspace</span><span className="breadcrumb-divider">/</span><strong>{current}</strong></div><div className="topbar-actions"><form className="global-search" onSubmit={event => {event.preventDefault(); navigate('/projects?q=' + encodeURIComponent(search));}}><Icon name="search" size={16}/><input aria-label="Search projects" placeholder="Search projects…" value={search} onChange={event => setSearch(event.target.value)}/><span aria-hidden="true">↵</span></form><Button variant="ghost" size="icon" aria-label="Notifications" className="notification-button" onClick={() => setNotificationsOpen(true)}><Icon name="bell"/><i/></Button><span className="avatar peach top-avatar">EL</span></div></header>
        <main className="workspace-main" id="main" tabIndex={-1}>{path === '/' ? <OverviewPage/> : path === '/projects' ? <ProjectsPage key={route}/> : path === '/guide' ? <GuidePage/> : path.startsWith('/projects/') ? <ProjectPage key={path}/> : <section className="not-found"><p className="eyebrow">A SMALL DETOUR</p><h1>This page is still on the drawing board.</h1><Button asChild><a href="/">Back to the studio</a></Button></section>}</main>
        <footer className="workspace-footer"><span>Made for the work you love.</span><span>Forma Studio <span className="footer-dot">•</span> Interactive demo</span></footer>
      </div>
    </div>
    <Dialog.Root open={createOpen} onOpenChange={setCreateOpen}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="studio-dialog"><Dialog.Title className="dialog-title">Make room for a new idea.</Dialog.Title><Dialog.Description className="dialog-description">Start a project in this demo session. Reloading resets session projects.</Dialog.Description><Dialog.Close asChild><Button variant="ghost" size="icon" className="dialog-close" aria-label="Close new project"><Icon name="close"/></Button></Dialog.Close><form onSubmit={addProject} className="project-form"><label>Project name<input name="title" required maxLength={70} placeholder="Something worth making"/></label><label>Client<input name="client" maxLength={70} placeholder="Who are we creating for?"/></label><label>Discipline<select name="category"><option>Residential · Interior design</option><option>Collection · Product design</option><option>Workspace · Architecture</option><option>Identity · Brand design</option></select></label><label>The idea<textarea name="description" rows={3} maxLength={500} placeholder="A few words about what comes next…"/></label><div className="dialog-actions"><Dialog.Close asChild><Button type="button" variant="outline">Cancel</Button></Dialog.Close><Button type="submit">Create project <Icon name="arrow" size={16}/></Button></div></form></Dialog.Content></Dialog.Portal></Dialog.Root>
    <Dialog.Root open={notificationsOpen} onOpenChange={setNotificationsOpen}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="studio-dialog"><Dialog.Title className="dialog-title">Around the studio</Dialog.Title><Dialog.Description className="dialog-description">The latest from your team's demo projects.</Dialog.Description><Dialog.Close asChild><Button variant="ghost" size="icon" className="dialog-close" aria-label="Close notifications"><Icon name="close"/></Button></Dialog.Close><div className="notification-list">{activity.map(item => <a key={item.id} href={item.href} onClick={event => {event.preventDefault(); setNotificationsOpen(false); navigate(item.href);}}><span className={'avatar ' + item.color}>{item.initials}</span><div><strong>{item.name}</strong><p>{item.action}</p><small>{item.project} · {item.time}</small></div><Icon name="diagonal" size={16}/></a>)}</div></Dialog.Content></Dialog.Portal></Dialog.Root>
    <div className={'toast' + (toast ? ' visible' : '')} role="status" aria-live="polite">{toast && <><Icon name="check" size={17}/><span>{toast}</span></>}</div>
  </WorkspaceContext.Provider>;
}
