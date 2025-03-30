import 'react-i18next';
import { resources } from './locales';

type ResourcesType = typeof resources;

declare module 'react-i18next' {
  interface Resources extends ResourcesType {}
}
