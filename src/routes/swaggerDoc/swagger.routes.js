import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

const getSwaggerDocument = () => {
    const swaggerPath = path.resolve('src/swagger.yaml');

    try {
        const file = fs.readFileSync(swaggerPath, 'utf8');
        return YAML.parse(file);
    } catch (error) {
        console.error('Error loading Swagger document:', error);
        process.exit(1); // Exit process if the file is not found
    }
};

export default getSwaggerDocument;
