import { SquareButton } from "./styled";

export default function Square({ value, onSquareClick }) {
    return <SquareButton onClick={onSquareClick}>{value}</SquareButton>;
};