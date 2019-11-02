import constants from './constants';
import Pawn from '../figures/Pawn';
import Knight from '../figures/Knight';
import Bishop from '../figures/Bishop';
import Rook from '../figures/Rook';
import Queen from '../figures/Queen';
import King from '../figures/King';

export default (name, color, col, row, finalPoint) => {
    const figureProps = [color, col, row];
    if (name === constants.QUEEN) {
        return new Queen(...figureProps);
    }
    if (name === constants.KING) {
        return new King(...figureProps);
    }
    if (name === constants.BISHOP) {
        return new Bishop(...figureProps);
    }
    if (name === constants.KNIGHT) {
        return new Knight(...figureProps);
    }
    if (name === constants.ROOK) {
        return new Rook(...figureProps);
    }
    if (name === constants.PAWN) {
        return new Pawn(...figureProps, finalPoint);
    }
    return new Error('Wrong figure name');
};
