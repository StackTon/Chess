import figures from '../figures';

export default (name, color, col, row, finalPoint) => {
    const figureProps = [color, col, row, finalPoint];

    if (figures[name]) {
        const obj = Object.create(figures[name]);
        obj.init(...figureProps);

        return obj;
    }

    return new Error('Wrong figure name');
};
