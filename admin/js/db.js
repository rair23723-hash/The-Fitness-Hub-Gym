// Data Layer - Simulated Database
// This structure is designed to be easily swappable with a real backend (Firebase/MongoDB).

const DB_KEY = 'fitness_hub_clients';

window.db = {
    // Read all clients
    getClients: () => {
        const data = localStorage.getItem(DB_KEY);
        return data ? JSON.parse(data) : [];
    },
    
    // Save state to storage
    saveClients: (clients) => {
        localStorage.setItem(DB_KEY, JSON.stringify(clients));
    },

    // Create
    addClient: (client) => {
        const clients = window.db.getClients();
        client.id = Date.now().toString(); // Generate unique ID
        clients.push(client);
        window.db.saveClients(clients);
        return client;
    },

    // Update
    updateClient: (id, updates) => {
        const clients = window.db.getClients();
        const index = clients.findIndex(c => c.id === id);
        if (index > -1) {
            clients[index] = { ...clients[index], ...updates };
            window.db.saveClients(clients);
            return clients[index];
        }
        return null;
    },

    // Delete
    deleteClient: (id) => {
        const clients = window.db.getClients();
        const filtered = clients.filter(c => c.id !== id);
        window.db.saveClients(filtered);
    },

    // Get specific client
    getClientById: (id) => {
        return window.db.getClients().find(c => c.id === id);
    },

    // Business Logic: Calculate Expiry Date based on join date and duration
    calculateExpiry: (joinDateStr, durationMonths) => {
        const date = new Date(joinDateStr);
        date.setMonth(date.getMonth() + parseInt(durationMonths));
        return date.toISOString().split('T')[0];
    },

    // Business Logic: Membership Status Engine
    getClientStatus: (expiryDateStr) => {
        const expiry = new Date(expiryDateStr);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Expired';
        if (diffDays <= 7) return 'Expiring Soon'; // Customizable threshold for SMS alerts
        return 'Active';
    }
};
