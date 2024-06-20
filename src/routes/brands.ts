import { Hono } from 'hono';
import { Brand } from '../models/brands';
import { isValidObjectId } from 'mongoose';

const brandsApi = new Hono();

// Return toutes les marques
brandsApi.get('/', async (c) => {
    const allBrands = await Brand.find({});
    return c.json(allBrands);
});

//Return une marque par id
brandsApi.get('/:brandId', async (c) => {
    const _id = c.req.param('brandId');

    if (isValidObjectId(_id)) {
        const oneBrand = await Brand.findOne({ _id });
        return c.json(oneBrand);
    }
    return c.json({ msg: 'ObjectId malformed' }, 400);
});

//Ajoute une marque
brandsApi.post('/', async (c) => {
    const body = await c.req.json();
    try {
        const newBrand = new Brand(body);
        const saveBrand = await newBrand.save();
        return c.json(saveBrand, 201);
    } catch (error: unknown) {
        return c.json({ msg: (error as any)._message }, 400);
    }
});

//Met a jour une marque par id
brandsApi.put('/:brandId', async (c) => {
    const _id = c.req.param('brandId');
    const body = await c.req.json();
    const q = { _id };
    const updateQuery = { ...body };

    const tryToUpdate = await Brand.findOneAndUpdate(q, updateQuery, { new: true });
    return c.json(tryToUpdate, 200);
});

//Supprime une marque par id
brandsApi.delete('/:brandId', async (c) => {
    const _id = c.req.param('brandId');
    const tryToDelete = await Brand.deleteOne({ _id });
    const { deletedCount } = tryToDelete;
    if (deletedCount) {
        return c.json({ msg: 'DELETE done' });
    }
    return c.json({ msg: 'not found' }, 404);
});

export default brandsApi;
