import { Link } from "react-router-dom"
export default function Success() {
    return (
        <div>
            <h2>Başarıyla giriş yaptınız!</h2>
            <Link to="/">Anasayfa</Link>
        </div>
    )
}