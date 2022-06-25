import { html } from 'lit';
import '@tjmonsi/small-router/small-router.js';
import './styles/above.scss';

const el = /** @type {*} */(document.querySelector('small-router'));

// el.addEventListener('route-change-error', /** @param {*} param1 */function ({ detail }) {
//   console.log('router error');
//   console.log(detail);
// });

el.routes = {
  '/': {
    render: () => html`<page-home></page-home>`,
    preRender: () => import('./pages/page-home/index.js')
  },
  '/test': {
    render: () => html`<page-test></page-test>`,
    preRender: () => import('./pages/page-test/index.js')
  }
};
