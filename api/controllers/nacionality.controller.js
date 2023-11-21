const Nationality = require('../models/nationality.model')

async function getAllNationality(req,res){
    try{
        const nationality = await Nationality.findAll()
        return res.status(200).json(nationality)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function getOneNationality(req,res){
    try{
        const nationality = await Nationality.findByPk(req.params.nationality_id)
        if (nationality) {
            return res.status(200).json(nationality)
        } else {
            return res.status(404).send('Nationality not found')
        }
    } catch (error) {
        res.status(200).send(error.message)
    }
}

async function createNationality(req, res){
    try{
        const nationality = await Nationality.create(req.body)
        return res.status(200).json({
            message: 'Nationality created',
            nationality : nationality
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function updateNationality(req, res){
    try{
        const [nationalityExist,nationality] = await Nationality.update(req.body, {
            returning: true,
            where: {
                id: req.params.nationality_id
            }
        })
        if (nationalityExist !== 0) {
            return res.status(200).json({
                message: 'Nationality updated',
                nationality : nationality
            })
        
    } else {
        return res.status(404).send('Nationality not found')
    }
} catch (error) {
    return res.status(500).send(error.message)
}

}

async function deleteNationality(req,res){
    try{
        const nationality = await Nationality.destroy({
            where: {
                id: req.params.nationality_id
            }
        }) 
        if (nationality){
            return res.status(200).json('Nationality deleted')
        } else {
            return res.status(404).send('Nationality not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllNationality,
    getOneNationality,
    createNationality,
    updateNationality,
    deleteNationality
}