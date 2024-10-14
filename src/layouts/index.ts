import GuestLayout from './guest.vue'
import ProtectedLayout from './protected.vue'

const AvailableLayouts = {
  GuestLayout,
  ProtectedLayout,
}

export enum LayoutType {
  GuestLayout = 'GuestLayout',
  ProtectedLayout = 'ProtectedLayout',
}
export default AvailableLayouts
