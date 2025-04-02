import { onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
const useClickOutside = (element: Ref<HTMLElement | null>,callback:(e:MouseEvent)=>void) => {
    const handle = (e: MouseEvent) => {
        // 如果点击的元素不包含element.value，则执行回调函数
        if(element.value && e.target && !element.value.contains(e.target as HTMLElement)){
            callback(e);
        }    
    };
    onMounted(() => {
        document.addEventListener('click',handle); 
    });
    onUnmounted(() => {
        document.removeEventListener('click',handle);
    });
};

export default useClickOutside;