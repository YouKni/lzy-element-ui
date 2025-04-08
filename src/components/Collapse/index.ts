import type { App } from 'vue';
import Collapse from './MyCollapse.vue';
import CollapseItem from './MyCollapseItem.vue';

Collapse.install = (app: App) => {
    app.component(Collapse.name!, Collapse);
};

CollapseItem.install = (app: App) => {
    app.component(CollapseItem.name!, CollapseItem);
};

export { Collapse, CollapseItem };

export * from './types';