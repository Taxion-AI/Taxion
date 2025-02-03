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

    async createFolder(folderName) {
        try {
            const authData = await this.authenticate();
            const response = await axios.post(`${this.baseUrl}/files`, {
                name: folderName,
                mimeType: 'application/vnd.google-apps.folder'
            }, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating folder on Google Drive:", error);
            throw error;
        }
    }

    async updateFolderName(folderId, newFolderName) {
        try {
            const authData = await this.authenticate();
            const response = await axios.patch(`${this.baseUrl}/files/${folderId}`, {
                name: newFolderName
            }, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating folder name on Google Drive:", error);
            throw error;
        }
    }

    async deleteFolder(folderId) {
        try {
            const authData = await this.authenticate();
            const response = await axios.delete(`${this.baseUrl}/files/${folderId}`, {
                headers: {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting folder from Google Drive:", error);
            throw error;
        }
    }
}

module.exports = GoogleDrive;
