import * as React from 'react';
import {cn} from 'cn';
import {Button} from './ui/button';
import {Card, CardContent} from './ui/card';

/** Curated scalar wrappers keep shadcn's registry implementations unchanged. */
export function StudioHeading({eyebrow, title, description, align = 'left', className}: {
  eyebrow: string; title: string; description: string; align?: 'left' | 'center'; className?: string;
}) {
  return <header className={cn('studio-heading space-y-3', align === 'center' && 'mx-auto text-center', className)}>
    <p className="studio-eyebrow text-xs font-semibold uppercase tracking-[0.2em]">{eyebrow}</p>
    <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
    <p className={cn('max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base', align === 'center' && 'mx-auto')}>{description}</p>
  </header>;
}

export function MetricCard({label, value, change, trend = 'up', accent = false, showChange = true, className}: {
  label: string; value: string; change: string; trend?: 'up' | 'down' | 'neutral'; accent?: boolean; showChange?: boolean; className?: string;
}) {
  return <Card className={cn('metric-card gap-0 rounded-2xl shadow-none', accent && 'metric-card-accent', className)}>
    <CardContent className="space-y-5 px-5">
      <div className="flex items-center justify-between gap-3">
        <p className="metric-label text-xs font-medium text-muted-foreground">{label}</p>
        <span className="metric-indicator inline-flex size-7 items-center justify-center rounded-full border text-sm" aria-hidden="true">↗</span>
      </div>
      <p className="metric-value text-3xl font-medium tracking-tight">{value}</p>
      {showChange && <p className="metric-change flex items-center gap-2 text-xs text-muted-foreground" data-trend={trend}>
        <span className="trend-symbol" aria-hidden="true">{trend === 'up' ? '↗' : trend === 'down' ? '↘' : '—'}</span>
        <span>{change}</span>
      </p>}
    </CardContent>
  </Card>;
}

export function ProjectCard({title, category, image, imageAlt, href, status = 'In progress', progress, featured = false, className}: {
  title: string; category: string; image: string; imageAlt: string; href: string;
  status?: 'In progress' | 'In review' | 'Completed'; progress: number; featured?: boolean; className?: string;
}) {
  return <Card className={cn('project-card overflow-hidden rounded-2xl border-0 p-0 shadow-none', featured && 'project-card-featured', className)}>
    <a href={href} className="project-image-link relative block overflow-hidden rounded-2xl" aria-label={title}>
      <img src={image} alt={imageAlt} className="project-image aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.035]" loading="lazy"/>
      <span className="project-status absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-medium" data-status={status}>{status}</span>
      <span className="project-open absolute bottom-4 right-4 inline-flex size-8 items-center justify-center rounded-full bg-white text-sm" aria-hidden="true">↗</span>
    </a>
    <CardContent className="space-y-4 px-0 pb-1">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5"><a href={href} className="project-title text-base font-medium tracking-tight">{title}</a><p className="project-category text-xs text-muted-foreground">{category}</p></div>
        {featured && <span className="featured-label text-[10px] uppercase tracking-widest">Featured</span>}
      </div>
      <div className="space-y-2"><div className="flex justify-between text-[10px] text-muted-foreground"><span>Project progress</span><span>{progress}%</span></div><div className="project-progress h-1 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-label="Project progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="project-progress-fill h-full rounded-full bg-primary" style={{width: `${Math.max(0, Math.min(100, progress))}%`}}/></div></div>
    </CardContent>
  </Card>;
}

export function StudioNotice({title, description, href, linkLabel, tone = 'warm', showLink = true, accentColor = '#e76f43', className}: {
  title: string; description: string; href: string; linkLabel: string;
  tone?: 'warm' | 'neutral' | 'dark'; showLink?: boolean; accentColor?: string; className?: string;
}) {
  return <aside className={cn('studio-notice flex flex-col gap-5 rounded-2xl border-l-4 p-6 sm:flex-row sm:items-center sm:justify-between', className)} data-tone={tone} style={{borderLeftColor: accentColor}}>
    <div className="max-w-xl space-y-2"><h2 className="text-lg font-medium tracking-tight">{title}</h2><p className="text-sm leading-relaxed opacity-70">{description}</p></div>
    {showLink && <Button asChild variant="outline" size="sm" className="notice-link shrink-0 rounded-full"><a href={href}>{linkLabel}<span aria-hidden="true">↗</span></a></Button>}
  </aside>;
}

export function StudioLink({label, href, variant = 'default', size = 'default', disabled = false, className}: {
  label: string; href: string; variant?: 'default' | 'outline' | 'secondary'; size?: 'default' | 'sm' | 'lg'; disabled?: boolean; className?: string;
}) {
  return disabled
    ? <Button variant={variant} size={size} disabled className={cn('studio-link rounded-full', className)}>{label}<span aria-hidden="true">↗</span></Button>
    : <Button asChild variant={variant} size={size} className={cn('studio-link rounded-full', className)}><a href={href}>{label}<span aria-hidden="true">↗</span></a></Button>;
}
