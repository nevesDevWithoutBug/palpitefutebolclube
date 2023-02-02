import { ReactElement } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PropsSkeleton } from "src/types/testeType";
import style from "./style.module.css"

const CardSkeleton = ({ cards, blog, enquete }: PropsSkeleton): ReactElement<any, any> => {
    return (
        <>
            {cards > 0 && Array(cards)
                .fill(0)
                .map((_, i) => (
                    <ul className={style.ulPalpite} key={i}>
                        <li className={style.liPalpite}>
                            <Skeleton height={120} />
                        </li>
                    </ul>
                ))}
            {blog && <div className={style.blogContainer}>
                <Skeleton height={200} width={300} />
            </div>}
            {enquete && <div className={style.blogContainer}>
                <Skeleton height={200} width={300} />
            </div>}
        </>
    );
};
export default CardSkeleton;