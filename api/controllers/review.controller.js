const Review = require('../models/review.model')

async function getAllReview(req,res){
    try{
        const review = await Review.findAll()
        return res.status(200).json(review)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function getOneReview(req,res){
    try{
        const review = await Review.findByPk(req.params.review_id)
        if (review) {
            return res.status(200).json(review)
        } else {
            return res.status(404).send('Review not found')
        }
    } catch (error) {
        res.status(200).send(error.message)
    }
}

async function createReview(req, res){
    try{
        const review = await Review.create(req.body)
        return res.status(200).json({
            message: 'Review created',
            review : review
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}


async function updateReview(req, res){
    try{
        const [reviewExist,review] = await Review.update(req.body, {
            returning: true,
            where: {
                id: req.params.review_id
            }
        })
        if (reviewExist !== 0) {
            return res.status(200).json({
                message: 'review updated',
                review : review
            })
        
    } else {
        return res.status(404).send('review not found')
    }
} catch (error) {
    return res.status(500).send(error.message)
}

}

async function deleteReview(req,res){
    try{
        const review = await Review.destroy({
            where: {
                id: req.params.review_id
            }
        }) 
        if (review){
            return res.status(200).json('Review deleted')
        } else {
            return res.status(404).send('Review not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllReview,
    getOneReview,
    createReview,
    updateReview,
    deleteReview
}