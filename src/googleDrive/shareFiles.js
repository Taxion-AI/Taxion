import axios from 'axios';

class GoogleDrive {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://fake-google-api.com/drive/v3';
    }

    async authenticate() {
        try {
            const response = await axios.post(`${this.baseUrl}/auth`, {
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating with Google Drive:", error);
            throw error;
        }
    }

    async shareFile(fileId, email) {
        try {
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/files/${fileId}/permissions`, {
                role: 'reader',
                type: 'user',
                emailAddress: email
            }, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error sharing file on Google Drive:", error);
            throw error;
        }
    }

    async updateSharePermissions(fileId, email, role) {
        try {
            const authData = await this.authenticate();
            const response = await axios.put(`${this.baseUrl}/files/${fileId}/permissions`, {
                role: role,
                type: 'user',
                emailAddress: email
            }, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating share permissions on Google Drive:", error);
            throw error;
        }
    }

    async revokeSharePermissions(fileId, email) {
        try {
            const authData = await this.authenticate();
            const response = await axios.delete(`${this.baseUrl}/files/${fileId}/permissions`, {
                data: {
                    emailAddress: email
                },
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error revoking share permissions on Google Drive:", error);
            throw error;
        }
    }
}

module.exports = GoogleDrive;
