import {describe,test,expect} from 'vitest';
import Button from './MyButton.vue';
import {mount} from '@vue/test-utils';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import  Icon  from '../Icon/MyIcon.vue';
describe('Button.vue', () => {
    test('basic button', () => {
        // 创建一个按钮组件实例
        const wrapper = mount(Button, {
            props: {
                type: 'primary',
            },
            slots: {
                default: '我是button'
            }
        });
        console.log(wrapper.html()); // 打印组件的HTML结构
        const buttonEl = wrapper.find('button').element;
        expect(buttonEl.classList.contains('lzy-button--primary')).toBe(true); // 检查按钮是否具有正确的类名
        // expect(wrapper.classes()).toContain('lzy-button--primary'); // 检查按钮是否具有正确的类名
        expect(wrapper.get('button').text()).toBe('我是button'); // 检查按钮文本是否正确
        wrapper.get('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('click'); // 检查按钮是否触发了点击事件
    });

    test('disabled', () => {
        const wrapper = mount(Button, {
            props: {
                disabled: true,
            },
            slots: {
                default: 'disabled button'
            }
        });
        expect(wrapper.attributes('disabled')); // 检查按钮是否具有正确的属性
        expect(wrapper.emitted()).not.toHaveProperty('click'); // 检查按钮是否没有触发点击事件
    });

    test('icon', () => {
        const wrapper = mount(Button, {
            props:{icon:'arrow-up'},
            slots:{default:'icon'},
            global:{stubs:['FontAwesomeIcon']} // 使用全局的 stubs 选项来模拟 FontAwesomeIcon 组件
        });
        console.log(wrapper.html());
        const iconEl = wrapper.findComponent(FontAwesomeIcon); // 查找 FontAwesomeIcon 组件
        expect(iconEl.exists()).toBe(true);
        expect(iconEl.attributes('icon')).toBe('arrow-up'); // 检查 FontAwesomeIcon 组件的 icon 属性是否正确
    });

    test('loading', () => {
        const wrapper = mount(Button, {
            props: {
                loading: true,
            },
            slots: {
                default: 'loading',
            },
            global: {
                stubs: ['Icon'],
            },
        });
        console.log(wrapper.html());
        const iconElement = wrapper.findComponent(Icon);
        expect(iconElement.exists()).toBe(true);
        console.log(iconElement.attributes('icon'));
        // expect(iconElement.attributes('icon')).toBe('spinner');
        expect(wrapper.attributes('disabled'));
    });
});