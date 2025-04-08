import { describe,expect,it } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './MyInput.vue';

describe('Input',()=>{
    it('基本展示',()=>{
        const wrapper = mount(Input,{
            props:{
                type:'text',
                size:'small',  
                modelValue:''
            },
            slots:{
                prepend:'prepend',
                prefix:'prefix'
            }
        });
        // console.log(wrapper.html());
        const inputEl = wrapper.find('input').element; // 获取input元素
        expect(inputEl.classList.contains('lzy-input__small'));
        expect(wrapper.get('input').attributes('type')).toBe('text');
        expect(wrapper.find('.lzy-input__prepend').text()).toBe('prepend');
    });

    it('支持v-model',async ()=>{
        const wrapper = mount(Input,{
            props:{
                modelValue:'test',
                'onUpdate:modelValue':(e: any) => wrapper.setProps({modelValue :e}),
                type:'text'
            },
        });
        // 测试初始值 (innerValue响应式变量)
        const input = wrapper.get('input');
        expect(input.element.value).toBe('test');
        // 更新值 (handleInput @input方法)
        // setValue方法会触发input事件和change事件
        await input.setValue('new value 1');
        expect(wrapper.props('modelValue')).toBe('new value 1');
        expect(input.element.value).toBe('new value 1');
        console.log(wrapper.emitted());
        // v-model的异步更新 (用watch监听，确保外部更新时，内部innerValue也同步更新)
        await wrapper.setProps({modelValue:'new value 2'});
        expect(input.element.value).toBe('new value 2');
    });

    it('支持点击清空text',async ()=>{
        const wrapper = mount(Input,{
            props:{
                modelValue:'test',
                'onUpdate:modelValue':(e: any) => wrapper.setProps({modelValue :e}),
                type:'text',
                clearable:true,
            },
            global:{
                stubs:['Icon']
            }
        });
        // 不出现Icon
        expect(wrapper.find('.lzy-input__clear').exists()).toBe(false);
        // 触发focus事件，出现Icon
        const input = wrapper.get('input');
        await input.trigger('focus'); 
        expect(wrapper.emitted('focus')); // 触发focus事件
        expect(wrapper.find('.lzy-input__clear').exists()).toBe(true);
        // 点击Icon，清空值
        await wrapper.find('.lzy-input__clear').trigger('click');
        expect(wrapper.props('modelValue')).toBe('');
    });

    it('支持切换密码显示',async ()=>{
        const wrapper = mount(Input,{
            props:{
                modelValue:'',
                'onUpdate:modelValue':(e: any) => wrapper.setProps({modelValue :e}),
                type:'text',
                showPassword:true,
            },
            global:{
                stubs:['Icon']
            }
        });
        // 不出现Icon
        expect(wrapper.find('.lzy-input__password').exists()).toBe(false);
        const input = wrapper.get('input');
        expect(input.element.type).toBe('password');
        // 出现Icon-eyeslash
        await input.setValue('123456');
        const eyeIcon = wrapper.find('.lzy-input__password');
        expect(eyeIcon.exists()).toBe(true);
        expect(eyeIcon.attributes('icon')).toBe('eye-slash');
        // 点击切换input类型和Icon类型
        await eyeIcon.trigger('click');
        expect(input.element.type).toBe('text');
        expect(wrapper.find('.lzy-input__password').attributes('icon')).toBe('eye');
    });
});