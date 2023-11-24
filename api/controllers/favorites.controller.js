const Favorites = require('../models/favorites.model')
const User = require('../models/user.model')
const Offer = require('../models/offer.model')
const Company = require('../models/company.model')

async function getAllFavorites(req,res){
    try{
        const favorites = await Favorites.findAll()
        return res.status(200).json(favorites)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getMyFavorites(req,res){
    try{
        const user = await User.findByPk(res.locals.user.id, {
            include: [
                {
                  model: Favorites,
                  include: [
                            {
                              model: Offer,
                              include: [
                                {
                                    model: Company,
                                }
                              ]
                            }
                            ]
                }]
        })
        return res.status(200).json(user.favorites)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function getOneFavorites(req,res){
    try{
        const favorites = await Favorites.findByPk(req.params.favorites_id)
        if (favorites) {
            return res.status(200).json(favorites)
        } else {
            return res.status(404).send('Favorites not found')
        }
    } catch (error) {
        res.status(200).send(error.message)
    }
}

async function createFavorites(req, res){
    req.body.user_id = res.locals.user.id
    try{
        const favorites = await Favorites.create(req.body)
        return res.status(200).json({
            message: 'Favorites created',
            favorites : favorites
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function updateFavorites(req, res){
    try{
        const [favoritesExist,favorites] = await Favorites.update(req.body, {
            returning: true,
            where: {
                id: req.params.favorites_id
            }
        })
        if (favoritesExist !== 0) {
            return res.status(200).json({
                message: 'Favorites updated',
                favorites : favorites
            })
        
    } else {
        return res.status(404).send('Favorites not found')
    }
} catch (error) {
    return res.status(500).send(error.message)
}

}

async function deleteFavorites(req,res){
    try{
        const favorites = await Favorites.destroy({
            where: {
                offer_id: req.params.offer_id,
                user_id: res.locals.user.id
            }
        }) 
        if (favorites){
            return res.status(200).json('Favorites deleted')
        } else {
            return res.status(404).send('Favorites not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllFavorites,
    getOneFavorites,
    createFavorites,
    updateFavorites,
    deleteFavorites,
    getMyFavorites
}