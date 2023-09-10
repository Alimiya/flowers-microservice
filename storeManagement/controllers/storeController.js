const Store = require('../models/storeModel')

exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find({}, { __v: 0})
        res.json(stores)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stores', details:error.message })
    }
}

exports.getStoreById = async (req, res) => {
    const { id } = req.params
    try {
        const store = await Store.findById(id, { __v: 0 })
        if (store) {
            res.json(store)
        } else {
            res.status(404).json({ error: 'Store not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch store' })
    }
}

exports.createStore = async (req, res) => {
    const { name, city, address, contact, start, end, day} = req.body
    const storeExist = await Store.findOne({name, city})

    if (storeExist) {
        res.status(400).json({message:"Store already exists"})
        return
    }
    try {
        const newStore = await Store.create({
            name,
            city,
            address,
            contact,
            start,
            end,
            day
        })

        res.status(201).json(newStore)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create store', details: error.message })
    }
}

exports.updateStoreById = async (req, res) => {
    const { id } = req.params
    const { name, city, address, contact, start, end, day} = req.body
    try {
        const updatedStore = await Store.findByIdAndUpdate(
            id,
            {
                name,
                city,
                address,
                contact,
                start,
                end,
                day
            },
            { new: true, projection: { __v: 0 } }
        )
        if (updatedStore) {
            res.json(updatedStore)
        } else {
            res.status(404).json({ error: 'Store not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update store' })
    }
}

exports.deleteStoreById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedStore = await Store.findByIdAndDelete(id)
        if (deletedStore) {
            res.json({ message: 'Store deleted successfully' })
        } else {
            res.status(404).json({ error: 'Store not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete store' })
    }
}