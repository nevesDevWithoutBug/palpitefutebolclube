import style from "./style.module.css"

function MenuComponent({setMenu}:any) {
    return (
        <aside className={style.menu}>      
            <a onClick={() => setMenu('home')}>Home</a>            
            <a onClick={() => setMenu('jogo')}>Rodadas</a>            
            <a onClick={() => setMenu('user')}>Jogos</a>                         
       </aside>
    )
}

export default MenuComponent