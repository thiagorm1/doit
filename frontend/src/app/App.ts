import { MainLayout } from '../shared/layouts/MainLayout';
import { StudiesView } from '../modules/studies/StudiesView';

export const App = () => {
  return MainLayout(StudiesView());
};
