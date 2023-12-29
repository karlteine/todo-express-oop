import fs from 'node:fs/promises'

class FileManager {
   
    async writeFile(filename, data) {
        try {
        // convert data to JSON format
        data = JSON.stringify(data, null, 2)
        // save data into file
        await fs.writeFile(filename, data)
        } catch(error) {
            console.log('write error => ', error)
        } 
    }

    async readFile(filename){
        try {
            // read content from file in text format
            const fileContent = await fs.readFile(filename, 'utf-8')
            // convert content from text format to data format
            const fileData = JSON.parse(fileContent)
            return fileData
        
        } catch(error){
            console.log('write error => ', error)
            return null
        }  
    } 
}

export const fileManager = new FileManager()