

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.get('/', (req, res) => {
    res.send('Art & Craft Store server is running');
});

// Start server
app.listen(port, () => {
    console.log(`Art & Craft Store server is running on port: ${port}`);
});
