import Image from "next/image"
import cruzeiro from "../../../public/assets/assets/cruzeiro.svg"
import atletico from "../../../public/assets/assets/atleticomg.svg"
import noticias from "../../../public/assets/assets/noticiasIcon.png"
import style from "./style.module.css"
import { useEffect, useState } from "react"
import CardSkeleton from "../skeleton"

function AsideBlog() {

    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <aside className={style.paiAsideBlog}>
            <div className={style.cardInfo}>
                <div className={style.headerBlog}>
                    <Image src={noticias} width={25} height={10} style={{ marginRight: '0.5rem' }} alt="noticias" />
                    Notícias
                </div>
                <section>
                    {isLoading && <CardSkeleton blog={true} cards={0} enquete={false} />}
                    {!isLoading && <>
                        <div className={style.contentNoticias}>
                            <h1>Cristiano Ronaldo</h1>
                            <article>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Minus nisi, voluptatibus
                                quos atque porro blanditiis totam.
                            </article>
                        </div>
                        <Image src={cruzeiro} width={100} height={100} alt="Cruzeiro" /></>}
                </section>
                <section>
                    {isLoading && <CardSkeleton blog={false} cards={0} enquete={true} />}
                    {!isLoading &&
                        <> <div className={style.contentNoticias}>
                            <h1>Lionel Messi</h1>
                            <article>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Minus nisi, voluptatibus
                                quos atque porro blanditiis totam.
                            </article>
                        </div>
                            <Image src={atletico} width={100} height={100} alt="Atletico" /></>}
                </section>
            </div>
            <div className={style.cardInfo}>
                <div className={style.headerBlog}>
                    <Image src={noticias} width={25} height={10} style={{ marginRight: '0.5rem' }} alt="noticias" />
                    Notícias
                </div>
                <section>
                    <div className={style.contentNoticias}>
                        <h1>Cristiano Ronaldo</h1>
                        <article>
                            Lorem, ipsum dolor sit amet consectetur
                            adipisicing elit. Minus nisi, voluptatibus
                            quos atque porro blanditiis totam.
                        </article>
                    </div>
                    <Image src={cruzeiro} width={100} height={100} alt="Cruzeiro" />
                </section>
            </div>
        </aside>
    )
}

export default AsideBlog