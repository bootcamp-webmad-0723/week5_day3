const express = require('express')
const router = express.Router()

const charactersApi = require('../services/characters.service')


router.get('/listado', (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list', { characters: response.data }))
        .catch(err => next(err))
})


router.get('/detalles/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details', { character: response.data }))
        .catch(err => next(err))
})


router.get('/crear', (req, res) => {
    res.render('characters/create')
})

router.post('/crear', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .saveCharacter(newCharacter)
        .then(() => res.redirect('/personajes/listado'))
        .catch(err => next(err))
})




router.get('/editar/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit', { character: response.data }))
        .catch(err => next(err))
})

router.post('/editar/:id', (req, res, next) => {

    const { id: character_id } = req.params
    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .editCharacter(character_id, newCharacter)
        .then(() => res.redirect('/personajes/listado'))
        .catch(err => next(err))
})

module.exports = router
