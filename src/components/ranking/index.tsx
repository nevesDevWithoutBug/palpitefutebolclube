import { useEffect, useState } from "react";
import CardSkeleton from "../skeleton";
import style from "./style.module.css"

function Ranking() {

    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);


    const users = [
        { name: 'Alex', points: 9 },
        { name: 'Max', points: 12 },
        { name: 'Alexandre', points: 6 },
        { name: 'Guilherme', points: 3 },
        { name: 'Messias', points: 15 },
        { name: 'Dennis DJ', points: 18 },
        { name: 'Ronaldo', points: 6 },
    ]

    return (<>
        <ul className={style.containerRanking}>
            {isLoading && <li> <CardSkeleton ranking={true} video={false} blog={false} cards={null} enquete={false} /> </li>}
            <div className={style.cabecalhoRanking}><span>Posição</span><span>Nome</span><span>Pontos</span></div>
            {!isLoading &&
                users.sort((a, b) => b.points - a.points).map((user, key) => (
                    <li className={style.rankingContent} key={key}>
                        <span className={style.classification}>{key + 1}</span>
                        <span className={style.nameUser}>{user.name}</span>
                        <span className={style.points}>{user.points}</span>
                    </li>
                ))
            }
        </ul>
    </>
    )
}

export default Ranking