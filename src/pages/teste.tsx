import { motion } from "framer-motion";
import { NextPage } from "next";
import AsideBlog from "src/components/asideBlog";
import AsideEnquete from "src/components/asideEnquete";
import CardPalpite from "src/components/cardPalpite/index";
import Footer from "src/components/footer/index";
import HeaderPrincipal from "../components/header/index"

import { useEffect, useState } from 'react'
import Api from "src/providers/http/api";

const Home: NextPage = () => {




    useEffect(()=>{
        (async()=>{

            const championships = await Api.get('/api/auth/game')

            console.log('games', championships)

        })()
    },[])



    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowX: 'hidden' }}>
            <HeaderPrincipal />
            <motion.div
                animate={{ x: 0, opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ display: "flex", flexDirection: "row", width: '100vw', gap: '1rem', padding: '2rem', paddingRight: '1rem' }}>
                <AsideEnquete />
                <CardPalpite />
                <AsideBlog />
            </motion.div>
            <Footer />
        </div>
    );
}

export default Home