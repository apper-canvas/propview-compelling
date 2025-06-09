import Home from '../pages/Home';
import PropertyDetail from '../pages/PropertyDetail';
import SavedProperties from '../pages/SavedProperties';

export const routes = {
  home: {
    id: 'home',
    label: 'Browse Properties',
    path: '/',
    icon: 'Home',
    component: Home
  },
  saved: {
    id: 'saved',
    label: 'Saved Properties',
    path: '/saved',
    icon: 'Heart',
    component: SavedProperties
  }
};

export const routeArray = Object.values(routes);