import style from "./style.module.css"
import Api from "src/providers/http/api"
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react"


function Enquete() {
    const [prox, setProx] = useState<boolean>(true)

    function toggle() {
        setProx(!prox)
    }

    useEffect(() => {
        (async () => {
            const res = await Api.get('/api/auth/vote')
            console.log("saddasas", res);


            // setLoading(false);
        })()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setProx(!prox);
        }, 10000);
        return () => clearInterval(interval);
    });

    return (
        <div className={style.containerEnquete}>
            {prox && <>
                <motion.div animate={{ x: 0, opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }} className={style.content}>
                    <div className={style.title}>
                        <span>Opine  </span>
                        <button onClick={() => toggle()}> &gt;&gt;</button>
                    </div>
                    <textarea disabled name="" id="" cols={10} rows={2}></textarea>
                </motion.div>
                <button type="button" className={style.btnEnquete}>SIM</button>
                <button type="button" className={style.btnEnquete}>NÃO</button>
            </>}
            {!prox && <>
                <motion.div animate={{ x: 0, opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.3 }} className={style.content}>
                    <div className={style.title}>
                        <span>Interaja </span>
                        <button onClick={() => toggle()}> &gt;&gt;</button>
                    </div>
                    <textarea disabled name="" id="" cols={10} rows={2}></textarea>
                </motion.div>
                <button type="button" className={style.btnEnquete}>SIM</button>
                <button type="button" className={style.btnEnquete}>NÃO</button>
            </>}
        </div>
    )
}

export default Enquete