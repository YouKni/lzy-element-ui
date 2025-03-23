import { onMounted, ref, onUnmounted } from 'vue';
function useMousePosition() {
    const x = ref(0);
    const y = ref(0);

    // MouseEvent是TS内置的类型
    const updateMouse = (event: MouseEvent) => {
        x.value = event.clientX;
        y.value = event.clientY;
    };
    onMounted(() => {
        document.addEventListener('click', updateMouse);
    });
    onUnmounted(() => {
        document.removeEventListener('click', updateMouse);
    });
    return { x, y };
}
export default useMousePosition;
