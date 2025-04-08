import postcss from 'postcss';
import postcssNested from 'postcss-nested';

export default {
    plugins: [
        postcssNested(),
        postcss(),
    ],
};
