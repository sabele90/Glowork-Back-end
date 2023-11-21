const Continent = require('../models/continent.model')

async function getAllContinent(req,res){
    try{
        const continent = await Continent.findAll()
        return res.status(200).json(continent)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function getOneContinent(req,res){
    try{
        const continent = await Continent.findByPk(req.params.continent_id)
        if (continent) {
            return res.status(200).json(continent)
        } else {
            return res.status(404).send('Continent not found')
        }
    } catch (error) {
        res.status(200).send(error.message)
    }
}

async function createContinent(req, res){
    try{
        const continent = await Continent.create(req.body)
        return res.status(200).json({
            message: 'continent created',
            continent : continent
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function updateContinent(req, res){
    try{
        const [continentExist,continent] = await Continent.update(req.body, {
            returning: true,
            where: {
                id: req.params.continent_id
            }
        })
        if (continentExist !== 0) {
            return res.status(200).json({
                message: 'continent updated',
                continent : continent
            })
        
    } else {
        return res.status(404).send('continent not found')
    }
} catch (error) {
    return res.status(500).send(error.message)
}

}

async function deleteContinent(req,res){
    try{
        const continent = await Continent.destroy({
            where: {
                id: req.params.continent_id
            }
        }) 
        if (continent){
            return res.status(200).json('Continent deleted')
        } else {
            return res.status(404).send('Continent not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllContinent,
    getOneContinent,
    createContinent,
    updateContinent,
    deleteContinent
}