// 中介组件，解析传入的VNode节点
import { defineComponent } from 'vue';
const RenderVnode = defineComponent({
    props: {
        vnode: {
            type: [String, Object],
            required: true,
        },
    },
    setup(props) {
        return () => props.vnode;
    },
});

export default RenderVnode;
