const Country = require('../models/country.model')

async function getAllCountry(req,res){
    try{
        const country = await Country.findAll()
        return res.status(200).json(country)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function getOneCountry(req,res){
    try{
        const country = await Country.findByPk(req.params.country_id)
        if (country) {
            return res.status(200).json(country)
        } else {
            return res.status(404).send('Country not found')
        }
    } catch (error) {
        res.status(200).send(error.message)
    }
}

async function createCountry(req, res){
    try{
        const country = await Country.create(req.body)
        return res.status(200).json({
            message: 'country created',
            country : country
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function updateCountry(req, res){
    try{
        const [countryExist,country] = await Country.update(req.body, {
            returning: true,
            where: {
                id: req.params.country_id
            }
        })
        if (countryExist !== 0) {
            return res.status(200).json({
                message: 'Country updated',
                country : country
            })
        
    } else {
        return res.status(404).send('Country not found')
    }
} catch (error) {
    return res.status(500).send(error.message)
}

}

async function deleteCountry(req,res){
    try{
        const country = await Country.destroy({
            where: {
                id: req.params.country_id
            }
        }) 
        if (country){
            return res.status(200).json('country deleted')
        } else {
            return res.status(404).send('country not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllCountry,
    getOneCountry,
    createCountry,
    updateCountry,
    deleteCountry
}