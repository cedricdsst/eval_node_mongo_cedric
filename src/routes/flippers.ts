import { Hono } from 'hono';
import { Flipper } from '../models/flippers';
import { isValidObjectId, Types } from 'mongoose';

const flippersApi = new Hono();

// Return tous les flippers
flippersApi.get('/', async (c) => {
    const allFlippers = await Flipper.find({});
    return c.json(allFlippers);
});

// Return un flipper par id
flippersApi.get('/:flipperId', async (c) => {
    const _id = c.req.param('flipperId');

    if (isValidObjectId(_id)) {
        const oneFlipper = await Flipper.findOne({ _id });
        return c.json(oneFlipper);
    }
    return c.json({ msg: 'ObjectId malformed' }, 400);
});

// Return tous les flippers d'une marque 
flippersApi.get('/brand/:brandId', async (c) => {
    const brandId = c.req.param('brandId');

    if (isValidObjectId(brandId)) {
        const flippers = await Flipper.find({ brand: brandId });
        return c.json(flippers);
    }
    return c.json({ msg: 'Invalid brand ID' }, 400);
});

// Ajouter un nouveau flipper
flippersApi.post('/', async (c) => {
    const body = await c.req.json();
    try {
        const newFlipper = new Flipper(body);
        const saveFlipper = await newFlipper.save();
        return c.json(saveFlipper, 201);
    } catch (error: unknown) {
        return c.json({ msg: (error as any)._message }, 400);
    }
});

// Mettre à jour un flipper par id
flippersApi.put('/:flipperId', async (c) => {
    const _id = c.req.param('flipperId');
    const body = await c.req.json();
    const q = { _id };
    const updateQuery = { ...body };

    const tryToUpdate = await Flipper.findOneAndUpdate(q, updateQuery, { new: true });
    return c.json(tryToUpdate, 200);
});

// Supprimer un flipper par id
flippersApi.delete('/:flipperId', async (c) => {
    const _id = c.req.param('flipperId');
    const tryToDelete = await Flipper.deleteOne({ _id });
    const { deletedCount } = tryToDelete;
    if (deletedCount) {
        return c.json({ msg: 'DELETE done' });
    }
    return c.json({ msg: 'not found' }, 404);
});



// Mettre à jour l'image principale d'un flipper (DEMANDE CLIENT)
flippersApi.patch('/:flipperId/mainImage', async (c) => {
    const flipperId = c.req.param('flipperId');
    const { mainImage } = await c.req.json();

    if (isValidObjectId(flipperId) && mainImage) {
        const updatedFlipper = await Flipper.findOneAndUpdate(
            { _id: flipperId },
            { $set: { mainImage } },
            { new: true }
        );
        return c.json(updatedFlipper, 200);
    }
    return c.json({ msg: 'Invalid flipper ID or missing main image' }, 400);
});

// Mettre à jour les images supplémentaires d'un flipper (DEMANDE CLIENT)
flippersApi.patch('/:flipperId/additionalImages', async (c) => {
    const flipperId = c.req.param('flipperId');
    const { additionalImages } = await c.req.json();

    if (isValidObjectId(flipperId) && Array.isArray(additionalImages)) {
        const updatedFlipper = await Flipper.findOneAndUpdate(
            { _id: flipperId },
            { $set: { additionalImages } },
            { new: true }
        );
        return c.json(updatedFlipper, 200);
    }
    return c.json({ msg: 'Invalid flipper ID or missing additional images array' }, 400);
});

export default flippersApi;