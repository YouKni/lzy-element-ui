import type { App } from 'vue';
import Tooltip from './MyTooltip.vue';

Tooltip.install = (app: App) => {
    app.component(Tooltip.name!, Tooltip);
};

export default Tooltip;

export * from './types';