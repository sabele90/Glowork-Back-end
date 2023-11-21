const Company = require('../models/company.model')

async function getAllCompany(req,res){
    try{
        const company = await Company.findAll()
        return res.status(200).json(company)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function getOneCompany(req,res){
    try{
        const company = await Company.findByPk(req.params.company_id)
        if (company) {
            return res.status(200).json(company)
        } else {
            return res.status(404).send('company not found')
        }
    } catch (error) {
        res.status(200).send(error.message)
    }
}

async function createCompany(req, res){
    try{
        const company = await Company.create(req.body)
        return res.status(200).json({
            message: 'company created',
            company : company,
            role: 'company',
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function updateCompany(req, res){
    try{
        const [companyExist,company] = await Company.update(req.body, {
            returning: true,
            where: {
                id: req.params.company_id
            }
        })
        if (companyExist !== 0) {
            return res.status(200).json({
                message: 'company updated',
                company : company
            })
        
    } else {
        return res.status(404).send('company not found')
    }
} catch (error) {
    return res.status(500).send(error.message)
}

}

async function deleteCompany(req,res){
    try{
        const company = await Company.destroy({
            where: {
                id: req.params.company_id
            }
        }) 
        if (company){
            return res.status(200).json('company deleted')
        } else {
            return res.status(404).send('company not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllCompany,
    getOneCompany,
    createCompany,
    updateCompany,
    deleteCompany
}