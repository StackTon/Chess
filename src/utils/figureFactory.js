import constants from './constants';
import Pawn from '../figures/Pawn';
import Knight from '../figures/Knight';
import Bishop from '../figures/Bishop';
import Rook from '../figures/Rook';
import Queen from '../figures/Queen';
import King from '../figures/King';

export default (name, color, col, row, finalPoint) => {
    const figureProps = [color, col, row]
    switch (name) {
        case constants.QUEEN:
            return new Queen(...figureProps);
        case constants.KING:
            return new King(...figureProps);
        case constants.BISHOP:
            return new Bishop(...figureProps);
        case constants.KNIGHT:
            return new Knight(...figureProps); 
        case constants.ROOK:
            return new Rook(...figureProps);
        case constants.PAWN:
            return new Pawn(...figureProps, finalPoint);
        default:
            return new Error("Wrong figure name");

    }
}