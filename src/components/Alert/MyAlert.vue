<template>
    <Transition name="alert-fade">
        <div class="lzy-alert" :class="{
            [`lzy-alert--${type}`]: type,
            [`lzy-alert--${effect}`]:effect,
            'is-closeable': closable
        }" v-if="alertShow">
            <div class="lzy-alert__content">
                <span><slot></slot></span>
            </div>
            <div class="lzy-alert__close" v-if="closable" @click="closeAlert">
                <MyIcon icon="xmark"></MyIcon>
            </div>
        </div>
    </Transition>

</template>
<script setup lang="ts">
import type { AlertProps, AlertEmits } from './types';
import { ref } from 'vue';
import MyIcon from '../Icon/MyIcon.vue';

withDefaults(defineProps<AlertProps>(), { type: 'info', effect: 'light', closable: false });
defineOptions({
    name: 'LzyAlert',
});
//  emit用于触发自定义事件，定义一个名叫`close`的事件，告知父组件
const emit = defineEmits<AlertEmits>();
const alertShow = ref<boolean>(true);
const closeAlert = () => {
    alertShow.value = false;
    emit('close');
};
</script>