import { computed, defineComponent,Fragment,ref } from 'vue';
import type { PropType } from 'vue';
import  type {Placement } from '@popperjs/core';
import type { MenuOption } from './types';
import Tooltip from '../Tooltip/MyTooltip.vue';
import type { TooltipInstance } from '../Tooltip/types';
export default defineComponent({
    name: 'lzyDropdown',
    props:{
        placements:{
            type: String as PropType<Placement>,
            default: 'bottom',
        },
        trigger:{
            type: String as PropType<'click' | 'hover'>,
            default: 'hover',
        },
        transition:{
            type: String,
            default: 'fade',
        },
        openDelay:{
            type: Number,
            default: 0,
        },
        closeDelay:{
            type: Number,
            default: 0,
        },
        menuOptions:{
            type: Array as PropType<MenuOption[]>,
            required: true,
        },
        manual:{
            type: Boolean,
            default: false,
        }
    },
    emits:['visible-change','select'],
    setup(props,{slots,emit,expose}) {
        const tooltipRef = ref<TooltipInstance>();
        const itemClick = (e: MenuOption) => {
            if (e.disabled) return;
            emit('select', e);
        };
        const visibleChange = (e: boolean) => {
            emit('visible-change', e);
        };

        // 用map模拟v-for
        const options = computed(()=>{
            return props.menuOptions.map((item)=>{
                // Fragment是一个空容器，不会产生实际DOM元素，类似模板中的template
                // {...} 单花括号用于在模板中嵌入jsx表达式 
                // 用三元表达式模拟v-if
                // jsx对vnode支持，可以用插值表达式
                // jsx建议把动态和静态class写在一起，静态class始终true即可
                // 这里onClick写成回调，是希望事件发生时才调用。如果直接调用，则组件渲染时就会被立刻调用
                return (
                    <Fragment key={item.key}>  
                        {item.divided ? <li role='separator' class="divided-placeholder"></li> : ''}
                        <li class={{'lzy-dropdown__item':true, 'is-disabled':item.disabled,'is-divided':item.divided}}
                            id={`dropdown-item-${item.key}`}
                            onClick={()=>itemClick(item)}>{item.label} </li>
                        
                    </Fragment>
                );
            });
        });
        expose({
            show: tooltipRef.value?.show,
            hide: tooltipRef.value?.hide
        }); 
        return ()=>( // 返回一个多行的JSX,用括号包裹
            <div class="lzy-dropdown">
                <Tooltip // jsx动态class用花括号表示
                    trigger={props.trigger}
                    placement={props.placements}
                    openDelay={props.openDelay}
                    closeDelay={props.closeDelay}
                    manual={props.manual}
                    ref = {tooltipRef}
                    onVisible-change={visibleChange} // jsx中动态事件用on-表示
                > 
                    {{
                        // 双花括号表示插槽内容
                        // 默认插槽，如果这个插槽存在，则渲染这个插槽
                        // 计算属性本身是个ref
                        default: ()=>slots.default && slots.default() ,
                        content:()=>(
                            <ul class="lzy-dropdown__menu">
                                {options.value}  
                            </ul>
                        )
                    }}
                </Tooltip>
            </div>
        );
    }
    
});
