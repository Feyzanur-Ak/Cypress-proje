import { Link } from "react-router-dom"
export default function ErrorPage() {
    return (
        <div>
            <h2>Böyle bir kullanıcı yok!</h2>
            <Link to="/">Anasayfa</Link>
        </div>
    )
};