<script setup>
import Button from '@/components/Button/MyButton.vue'
import Tooltip from '@/components/Tooltip/MyTooltip.vue'
import { ref } from 'vue';

const tooltipRef = ref();
const open = () => {
  tooltipRef.value?.show();
};
const close = () => {
  tooltipRef.value?.hide();
};
</script><template>
  <div class="basic block">
    <Tooltip content="hello tooltip" ref="tooltipRef" manual>
      <Button>手动容器</Button>
    </Tooltip>

    <br />
    <br />
    <Button type="primary" @click="open">点击手动触发显示</Button>
    <Button type="danger" @click="close">点击手动触发隐藏</Button>
  </div>
</template>