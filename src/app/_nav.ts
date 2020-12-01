import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Employees',
    url: '/employees',
    icon: 'icon-user'
  },
  {
    name: 'Settings',
    url: '/settings',
    icon: 'icon-settings'
  },
  {
    name: 'Registers',
    url: '/registers',
    icon: 'icon-registers'
  },
  {
    name: 'Test',
    url: '/test',
    icon: 'icon-registers'
  },
 
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Google Play',
    url: 'http://coreui.io/angular/',
    icon: 'fa fa-android',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Apple Store',
    url: 'http://coreui.io/pro/angular/',
    icon: 'fa fa-apple',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];
