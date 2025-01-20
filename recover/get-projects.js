async function getProjects() {
    const databases = (await indexedDB.databases())
        .filter(d => d.name && d.name.startsWith("ws-"))
        .map(d => d.name);

    const projects = await Promise.all(
        databases.map(async (name) => {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(name);

                request.onerror = () => reject(request.error);

                request.onsuccess = () => {
                    const db = request.result;
                    const transaction = db.transaction(['documents'], 'readonly');
                    const store = transaction.objectStore('documents');
                    const projectRequest = store.getAll();

                    projectRequest.onsuccess = () => {
                        const project = projectRequest.result.find(doc => doc.type === 'project');
                        db.close();
                        resolve(project ? {
                            name: project.name,
                            dbId: project.dbId
                        } : null);
                    };

                    projectRequest.onerror = () => {
                        db.close();
                        reject(projectRequest.error);
                    };
                };
            });
        })
    );

    return projects.filter(p => p);
}

getProjects().then(console.table);