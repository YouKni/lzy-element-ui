  <template>
    <div class="basic block">
      <Dropdown placement="bottom" :menu-options="options" trigger="click">
        <Button type="primary">点击触发下拉菜单</Button>
      </Dropdown>
    </div>
  </template>
  
  <script setup>
  import { h } from 'vue';
  import Dropdown from '@/components/Dropdown/MyDropdown.vue'
  import Button from '@/components/Button/MyButton.vue'
  const options = [
    { key: 1, label: h('b', 'this is bold') },
    { key: 2, label: 'item2', disabled: true },
    { key: 3, label: 'item3', divided: true },
    { key: 4, label: 'item4' }
  ];
  </script>