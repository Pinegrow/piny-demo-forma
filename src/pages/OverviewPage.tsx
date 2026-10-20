import {useState} from 'react';
import {Card} from '../components/ui/card';
import {Button} from '../components/ui/button';
import {MetricCard, ProjectCard, StudioHeading, StudioNotice} from '../components/demo';
import {Icon} from '../Icon';
import {projects as featuredProjects, activity, agenda} from '../data';
import {useWorkspace} from '../workspace';

const chartSeries = {week: [11.5, 16.5, 13, 22.5, 16.5, 27.5, 21], month: [40, 56, 48, 77, 61, 116, 88]};
export function OverviewPage() {
  const {projects, openCreate, notify} = useWorkspace();
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const hours = chartSeries[period];
  const totalHours = hours.reduce((total, value) => total + value, 0);
  function exportReport() {
    const rows = [['Project', 'Discipline', 'Status', 'Progress'], ...projects.map(project => [project.title, project.category, project.status, String(project.progress) + '%'])];
    const csv = rows.map(row => row.map(value => '"' + value.replaceAll('"', '""') + '"').join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], {type: 'text/csv;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'forma-studio-projects.csv'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify('Your studio project report is ready.');
  }
  return <>
    <div className="page-heading-row"><StudioHeading eyebrow="WEDNESDAY, OCTOBER 14" title="A good day to make things." description="Welcome back, Emma. Here’s what’s taking shape in your studio."/><Button onClick={openCreate} className="new-project-button"><Icon name="plus" size={16}/>New project</Button></div>
    <section className="hero-banner" aria-label="Featured project"><div className="hero-copy"><span className="hero-kicker"><span/>IN THE MAKING</span><h2>Thoughtful spaces.<br/>Extraordinary everyday.</h2><p>Casa Luma is finding its form.<br/>Take a look at what’s coming together.</p><Button asChild variant="secondary" className="hero-button"><a href="/projects/casa-luma">Explore the project <Icon name="diagonal" size={16}/></a></Button><div className="hero-bottom"><span className="hero-counter">01 <span>/ 03</span></span><div className="hero-lines"><b/><i/><i/></div><span>SELECTED WORK</span></div></div><div className="hero-image"><img src="/images/casa-luma.jpg" alt="A sunlit Mediterranean living room with a curved ivory sofa and sculptural furniture" fetchPriority="high"/><span className="image-caption">CASA LUMA — MALLORCA, 2026</span><span className="hero-image-mark" aria-hidden="true">f.</span></div></section>
    <section className="metrics-grid" aria-label="Studio metrics"><MetricCard label="Active projects" value={String(projects.filter(project => project.status !== 'Completed').length).padStart(2, '0')} change="Ideas taking shape" trend="neutral" accent/><MetricCard label="Studio hours" value={String(totalHours)} change="12.8% from last period" trend="up"/><MetricCard label="Tasks completed" value={period === 'week' ? '24' : '92'} change="8 ahead of last period" trend="up"/><MetricCard label="Team capacity" value="84%" change="A healthy creative rhythm" trend="neutral"/></section>
    <section className="projects-section"><div className="section-heading"><div><span className="eyebrow">THE WORK</span><h2>Projects in focus<span className="section-count">{featuredProjects.length.toString().padStart(2, '0')}</span></h2></div><a className="text-link" href="/projects">All projects <Icon name="arrow" size={16}/></a></div><div className="project-grid">{featuredProjects.map(project => <ProjectCard key={project.id} title={project.title} category={project.category} image={project.image} imageAlt={project.imageAlt} href={project.href} status={project.status} progress={project.progress}/>)}</div></section>
    <div className="dashboard-bottom"><Card className="activity-card"><div className="section-heading compact"><div><h2>Studio rhythm</h2><p>Small steps. Meaningful progress.</p></div><select aria-label="Activity period" value={period} onChange={event => setPeriod(event.target.value as 'week' | 'month')}><option value="week">This week</option><option value="month">This month</option></select></div><div className="chart-summary"><strong>{totalHours}<small>hrs</small></strong><span>↗ 12.8% <small>vs. previous period</small></span></div><div className="bar-chart" role="img" aria-label={`${totalHours} illustrative studio hours this ${period}, grouped by weekday. Saturday has the most hours.`}>{hours.map((value, index) => <div className="chart-column" key={index}><div className="bar-track"><div className={'chart-bar' + (index === 5 ? ' highlighted' : '')} style={{height: (value / Math.max(...hours)) * 100 + '%'}}><span>{value}h</span></div></div><small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</small></div>)}</div><div className="chart-footer"><span><i/>Illustrative studio hours</span><Button variant="ghost" size="sm" onClick={exportReport}><Icon name="download" size={15}/>Report</Button></div></Card>
      <Card className="agenda-card"><div className="section-heading compact"><div><h2>On the horizon</h2><p>A little planning goes a long way.</p></div><Icon name="calendar"/></div><div className="agenda-list">{agenda.map(item => <a className="agenda-item" key={item.id} href={item.href}><span className={'date-block ' + item.color}><small>{item.month}</small><strong>{item.day}</strong></span><div><strong>{item.title}</strong><span>{item.project}</span><small><Icon name="clock" size={12}/>{item.time}</small></div><Icon name="diagonal" size={16}/></a>)}</div><div className="team-availability"><div className="avatar-stack"><span className="avatar peach">EL</span><span className="avatar lavender">JK</span><span className="avatar sage">AN</span></div><div><strong>Good things happen together.</strong><small>Your studio, in sync.</small></div></div></Card>
    </div>
    <section className="recent-activity"><div className="section-heading"><h2>Around the studio</h2><span className="muted-label">THE LATEST</span></div>{activity.map(item => <a href={item.href} key={item.id} className="activity-row"><span className={'avatar ' + item.color}>{item.initials}</span><p><strong>{item.name}</strong> {item.action}<small>{item.project}</small></p><time>{item.time}</time><Icon name="diagonal" size={15}/></a>)}</section>
    <StudioNotice title="Your next idea belongs here." description="A flexible collection of studio components, ready to make your own." href="/guide" linkLabel="Meet the components" tone="warm" showLink/>
  </>;
}
