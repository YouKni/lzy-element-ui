import axios from 'axios';
import { reactive } from 'vue';
import type { IResult } from '@/components/types'; // import type 表示只导入类型，不导入实现
const useURLLoader = <T = any>(url: string) => {
    const data :IResult<T>= reactive({
        result: null,
        loading: true,
        error: null,
    });
    axios.get(url).then((res) => {
        data.result = res.data; // 拿到返回的数据
    }).catch((err) => {
        data.error = err;
    }).finally(() => {
        data.loading = false;
    });
    return data;
};

export default useURLLoader;