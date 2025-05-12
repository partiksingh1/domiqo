import express from 'express';
import { deletePropertyById, findProperties, findPropertyById, listProperty, updateProperty, uploadImages } from '../controllers/property';


const listRouter = express.Router();

listRouter.post('/list-property', uploadImages, listProperty); // Use the function as a handler
listRouter.get('/find-properties', findProperties);
listRouter.put('/property/:id', updateProperty);
listRouter.get('/findPropertyById/:id', findPropertyById);
listRouter.delete('/deletePropertyById/:id', deletePropertyById);

export default listRouter;
