import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import recepieService from "../service/recepieService.js";

const recepieController = Router();

function buildFilter(query) {
    const filterResult = Object.keys(query).reduce((filter, filterParam) => {
        const filterParamValue = query[filterParam].replaceAll('"', '');

        const searchParams = new URLSearchParams(filterParamValue);
        
        return { ...filter, ...Object.fromEntries(searchParams.entries()) };
    }, {})

    return filterResult
};

// Get all
recepieController.get('/', async (req, res) => {
    // buildFilter({ where: '_ownerId="67ace2aed1eaa48b16b4b2eb"&email="ivo@abv.bg"', sortBy: 'createdAt="desc"' });
    const filter = buildFilter(req.query);
    
    const recepies = await recepieService.getAll(filter);

    res.json(recepies);
});

// Get one
recepieController.get('/:recepieId', async (req, res) => {
    const recepie = await recepieService.getOne(req.params.recepieId);

    res.json(recepie);
});

// Create
recepieController.post('/', isAuth, async (req, res) => {
    const recepieData = req.body;
    const userId = req.user.id;

    const newRecepie = await recepieService.create(recepieData, userId);

    res.json(newRecepie);
});

// Update
recepieController.put('/:recepieId', async (req, res) => {
    const recepieId = req.params.recepieId;
    const recepieData = req.body;

    const updatedRecepie = await recepieService.update(recepieId, recepieData);

    res.json(updatedRecepie);
});

// Delete
recepieController.delete('/:recepieId', async (req, res) => {
    const recepieId = req.params.recepieId;

    await recepieService.delete(recepieId);

    res.json({ ok: true });
});

export default recepieController;
