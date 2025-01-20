async function getAllDocuments(dbId) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbId);

        request.onerror = () => reject(request.error);

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['documents'], 'readonly');
            const store = transaction.objectStore('documents');
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                const documents = getAllRequest.result;
                db.close();
                resolve(documents);
            };

            getAllRequest.onerror = () => {
                db.close();
                reject(getAllRequest.error);
            };
        };
    });
}


async function exportProject(dbId) {
    try {
        // Get all documents
        let documents = await getAllDocuments(dbId);

        // Process documents to remove result property from request types
        documents = documents.map(doc => {
            if (doc.type === "request") {
                const { result, ...docWithoutResult } = doc;
                return docWithoutResult;
            }
            return doc;
        });

        // Create export data
        const exportData = {
            version: 'bg-recover',
            timestamp: Date.now(),
            documents: documents
        };

        // Create and download file
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export-${exportData.timestamp}.json`;
        a.click();
        URL.revokeObjectURL(url);

        return exportData;
    } catch (error) {
        console.error('Export failed:', error);
        throw error;
    }
}


// Get all documents:
// getAllDocuments('ws-your-db-id').then(console.table);

// Export and download project:
// exportProject('ws-your-db-id').then(data => {
//     console.log('Export completed:', data);
// });

