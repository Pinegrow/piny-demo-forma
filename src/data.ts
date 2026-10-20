export type Project = {
  id: string; title: string; category: string; image: string; imageAlt: string;
  href: string; status: 'In progress' | 'In review' | 'Completed'; progress: number;
  client: string; location: string; description: string; due: string;
};

// Stable IDs identify records. All editorial fields retain their own source values.
export const projects: Project[] = [
  {id: 'casa-luma', title: 'Casa Luma', category: 'Residential · Interior design', image: '/images/casa-luma.jpg', imageAlt: 'Sunlight across a sculptural sofa and warm travertine in a Mediterranean home', href: '/projects/casa-luma', status: 'In progress', progress: 68, client: 'Luma Living', location: 'Mallorca, Spain', description: 'A slower way of living. Natural materials, sculptural forms, and Mediterranean light shape a home that feels as good as it looks.', due: 'Oct 28'},
  {id: 'form-objects', title: 'Form / Objects', category: 'Collection · Product design', image: '/images/form-objects.jpg', imageAlt: 'A cobalt blue sculptural chair beside a polished chrome side table', href: '/projects/form-objects', status: 'In review', progress: 90, client: 'Form Editions', location: 'Copenhagen, Denmark', description: 'Everyday objects with an unexpected point of view. Our first furniture collection explores the conversation between bold color and honest materials.', due: 'Oct 21'},
  {id: 'atelier-no-4', title: 'Atelier No. 4', category: 'Workspace · Architecture', image: '/images/atelier-no-4.jpg', imageAlt: 'A warm walnut design studio with an architectural model and afternoon light', href: '/projects/atelier-no-4', status: 'Completed', progress: 100, client: 'Atelier Collective', location: 'Antwerp, Belgium', description: 'Room to think, space to make. A former industrial workshop becomes a welcoming home for a new generation of independent designers.', due: 'Oct 08'},
];

export const activity = [
  {id: 'a1', initials: 'EL', name: 'Emma Laurent', action: 'uploaded new material studies', project: 'Casa Luma', href: '/projects/casa-luma', time: '12 min ago', color: 'peach'},
  {id: 'a2', initials: 'JK', name: 'Jonas Klein', action: 'requested a design review', project: 'Form / Objects', href: '/projects/form-objects', time: '48 min ago', color: 'lavender'},
  {id: 'a3', initials: 'AN', name: 'Anna Novak', action: 'completed the final handover', project: 'Atelier No. 4', href: '/projects/atelier-no-4', time: '2 hours ago', color: 'sage'},
];

export const agenda = [
  {id: 'one', day: '14', month: 'OCT', title: 'Material palette review', project: 'Casa Luma', time: '10:30 – 11:15', href: '/projects/casa-luma', color: 'peach'},
  {id: 'two', day: '15', month: 'OCT', title: 'Collection presentation', project: 'Form / Objects', time: '14:00 – 15:00', href: '/projects/form-objects', color: 'lavender'},
];
