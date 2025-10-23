import Atomic from "./atomic";
import Coinbase from "./coinbase";
import Exodus from "./exedus";
import Keplr from "./keplr";
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
				{selectedWallet == "metamask" && <MetaMask />}
				{selectedWallet == "phantom" && <Phantom />}
				{selectedWallet == "exodus" && <Exodus />}
				{selectedWallet == "keplr" && <Keplr />}
				{selectedWallet == "atomic" && <Atomic />}
				{selectedWallet == "trustwallet" && <TrustWallet />}
				{selectedWallet == "coinbase" && <Coinbase />}
			</section>
		</>
	);
}

export default ShowManualWallets;
