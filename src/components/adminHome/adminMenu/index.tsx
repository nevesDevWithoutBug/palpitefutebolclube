import style from "./style.module.css"

function MenuComponent() {
    return (
        <aside className={style.menu}>                                   
        <a > Início </a>
        <a href="/admin/jogos"> Jogos </a>
        <a > Ajuda </a>
       </aside>
    )
}

export default MenuComponent