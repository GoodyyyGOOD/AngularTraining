import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'customers',
    title: 'Customers',
    type: 'item',
    icon: 'home',
    url: 'customers',
    translate: 'CUSTOMER.FIRST_NAME',
    role: ['Basic']
  },
  {
    id: 'meters',
    title: 'Meters',
    type: 'item',
    icon: 'home',
    url: 'meters',
    translate: 'MENU.METERS',
    role: ['Basic']
  },
  {
    id: 'accounts',
    title: 'Accounts',
    type: 'item',
    icon: 'home',
    url: 'accounts',
    role: ['Basic']
  }
]
