import axios from 'axios';

class GoogleDrive {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.googleapis.com/drive/v3';
    }

    async authenticate() {
        try {
            // Fixed the authentication endpoint
            const response = await axios.post(`${this.baseUrl}/oauth2/v4/token`, {
                apiKey: this.apiKey
            });
            return response.data;
        } catch (error) {
            console.error("Error authenticating with Google Drive:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async uploadFile(filePath, fileName) {
        try {
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/files`, {
                filePath: filePath,
                fileName: fileName
            }, {
                headers: {
                    Authorization: `Bearer ${authData.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading file to Google Drive:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async updateFile(fileId, newFilePath) {
        try {
            const authData = await this.authenticate();
            const response = await axios.patch(`${this.baseUrl}/files/${fileId}`, {
                filePath: newFilePath
            }, {
                headers: {
                    Authorization: `Bearer ${authData.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating file on Google Drive:", error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            const authData = await this.authenticate();
            const response = await axios.delete(`${this.baseUrl}/files/${fileId}`, {
                headers: {
                    Authorization: `Bearer ${authData.access_token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting file from Google Drive:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

module.exports = GoogleDrive;
