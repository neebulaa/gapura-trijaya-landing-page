import PageHeader from "./../components/PageHeader";
import { Link } from "react-router-dom";
export default function NotFound() {
	return (
		<PageHeader title="Not Found">
			<p>
				Sepertinya halaman yang anda kunjungi tidak ada atau sudah
				dipindahkan
			</p>
			<Link to="/" className="underline">
				Kembali ke Beranda
			</Link>
		</PageHeader>
	);
}
