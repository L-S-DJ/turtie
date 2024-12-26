const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractAddress = "0xe2C4F043b5f3231eCC3f3B3c28527C28e0A8256f";
const tokenPriceInUSDT = 0.00025; // Precio de cada token en USDT
const bnbToUsdtRate = 300; // Suponiendo 1 BNB = 300 USDT

let web3;
let contract;

// Inicializar Web3
if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' });
    contract = new web3.eth.Contract(contractABI, contractAddress);
} else {
    alert("MetaMask no está instalado. Por favor, instálalo para continuar.");
}

// Actualizar precios en tiempo real
document.getElementById("usdtAmount").addEventListener("input", function () {
    const usdtAmount = parseFloat(this.value) || 0;
    const tokenEquivalent = usdtAmount / tokenPriceInUSDT;
    const priceInBNB = usdtAmount / bnbToUsdtRate;

    document.getElementById("tokenEquivalent").innerText = `Equivalente en Tokens: ${tokenEquivalent.toFixed(4)}`;
    document.getElementById("bnbPrice").value = priceInBNB.toFixed(6);
});

// Función para comprar tokens
async function buyTokens() {
    const usdtAmount = parseFloat(document.getElementById("usdtAmount").value) || 0;
    const tokenAmount = usdtAmount / tokenPriceInUSDT;
    const priceInBNB = usdtAmount / bnbToUsdtRate;

    const accounts = await web3.eth.getAccounts();
    const buyerAddress = accounts[0];

    try {
        await contract.methods.transfer(buyerAddress, tokenAmount).send({
            from: buyerAddress,
            value: web3.utils.toWei(priceInBNB.toString(), 'ether')
        });
        alert("Compra exitosa!");
    } catch (error) {
        console.error("Error en la transacción:", error);
        alert("Hubo un error al completar la compra.");
    }
}



let boton = document.querySelector(".aaahh")

boton.addEventListener("click", () => {
    let etiquetaAudio = document.createElement("audio")
    etiquetaAudio.setAttribute("src", "/audio/tortuga.mp3")
    etiquetaAudio.play()
})
