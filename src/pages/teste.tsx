import { NextPage } from "next";
import AsideBlog from "src/components/asideBlog";
import AsideEnquete from "src/components/asideEnquete";
import CardPalpite from "src/components/cardPalpite/index";
import Footer from "src/components/footer/index";
import HeaderPrincipal from "../components/header/index"

const Home: NextPage = () => {
    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowX: 'hidden' }}>
            <HeaderPrincipal />
            <div style={{ display: "flex", flexDirection: "row", width: '100vw', justifyContent: 'space-evenly' }}>
                <AsideEnquete />
                <CardPalpite />
                <AsideBlog />
            </div>
            <Footer />
        </div>
    );
}

export default Home