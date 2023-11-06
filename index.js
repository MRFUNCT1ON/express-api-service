const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { ethers } = require('ethers');

// Create express application instance
const app = express();

// Use Helmet to protect against well known vulnerabilities by setting appropriate HTTP headers
app.use(helmet());

// Enable CORS for all requests
app.use(cors());

// Enable parsing of json body in requests
app.use(express.json());

// Define a simple route for GET requests to the root URL
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Don Function's Web3 API"
    });
});

// Define a route to get the balance of a given Ethereum address
app.get('/balance/:address', async (req, res, next) => {
    try {
        // Replace with the appropriate Ethereum RPC URL
        // For this example, we'll use the default ethers provider (mainnet)
        const provider = new ethers.providers.JsonRpcProvider();
    
        const { address } = req.params;
        
        // Validate Ethereum address
        if (!ethers.utils.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }
        
        const balance = await provider.getBalance(address);
        
        // Convert the balance from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance);
    
        res.json({ balance: balanceInEth });
    } catch (error) {
        next(error);
    }
});

// Define a route to get the name, symbol, decimals, total supply of a token
app.get('/token/:address', async (req, res, next) => {
    try {
        // Replace with the appropriate Ethereum RPC URL
        // For this example, we'll use the default ethers provider (mainnet)
        const provider = new ethers.providers.JsonRpcProvider();
    
        const { address } = req.params;
        
        // Validate Ethereum address
        if (!ethers.utils.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }
        
        const contract = new ethers.Contract(address, [
            'function name() view returns (string)',
            'function symbol() view returns (string)',
            'function decimals() view returns (uint8)',
            'function totalSupply() view returns (uint256)',
        ], provider);
        
        const [name, symbol, decimals, totalSupply] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.decimals(),
            contract.totalSupply(),
        ]);
    
        res.json({
            name,
            symbol,
            decimals,
            totalSupply: totalSupply.toString(),
        });
    } catch (error) {
        next(error);
    }
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// Error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

// Set the port for the application
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});