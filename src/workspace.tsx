import {createContext, useContext} from 'react';
import {projects, type Project} from './data';

export function navigate(href: string) {
  window.history.pushState(null, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({top: 0});
}

export const WorkspaceContext = createContext<{
  projects: Project[]; openCreate: () => void; notify: (message: string) => void;
}>({projects, openCreate: () => {}, notify: () => {}});
export const useWorkspace = () => useContext(WorkspaceContext);
