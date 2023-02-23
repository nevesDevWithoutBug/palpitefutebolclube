import Image from "next/image"
import cruzeiro from "../../../public/assets/assets/cruzeiro.svg"
import atletico from "../../../public/assets/assets/atletico.svg"
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
                    Blog
                </div>
                <div className={style.contentBlogMobile}>
                    <section>
                        {isLoading && <CardSkeleton video={false} blog={true} cards={null} enquete={false} />}
                        {!isLoading && <>
                            <div className={style.contentNoticias}>
                                <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between', alignItems:'center' }}>
                                    <h1 style={{marginTop:'4px'}}>Cristiano Ronaldo</h1> <Image src={cruzeiro} width={50} height={50} alt="Cruzeiro" />
                                </div>
                                <article>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Minus nisi, voluptatibus
                                    quos atque porro blanditiis totam.
                                </article>
                            </div>
                            </>}
                    </section>
                    <section>
                        {isLoading && <CardSkeleton video={false} blog={false} cards={null} enquete={true} />}
                        {!isLoading &&
                            <> <div className={style.contentNoticias}>
                                <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between', alignItems:'center' }}>
                                    <h1 style={{marginTop:'5px'}}>Lionel Messi</h1> <Image src={atletico} width={40} height={30} alt="Atletico" />
                                </div>
                                <article>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Minus nisi, voluptatibus
                                    quos atque porro blanditiis totam.
                                </article>
                            </div>
                            </>}
                    </section>
                </div>
            </div>
            <div className={style.cardInfo}>
                <div className={style.headerBlog}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="red" style={{ width: '40px', height: '40px', marginRight: '5px' }}>
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                    Videos
                </div>
                <section className={style.video}>
                    {isLoading && <CardSkeleton video={true} blog={false} cards={null} enquete={false} />}
                    {!isLoading && <>
                        <iframe
                            className={style.iframeV}
                            src="https://www.youtube.com/embed/OAZCs1sn55E"
                            title="YouTube video player" frameBorder='0'
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </>}
                </section>
            </div>
        </aside >
    )
}

export default AsideBlog