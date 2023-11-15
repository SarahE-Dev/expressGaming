const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid').v4;

let games = [
    {
        id: "adowb1b3bb",
        game: "League of Legends",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
        id: "kd7b9ks2nda",
        game: "PlayerUnknown's Battlegrounds",
        description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
    ]

router.get('/', (req, res)=>{
    res.json('this is the game router')
})

router.get('/get-all-games', (req, res)=>{
    res.json({games})
})

router.get('/get-game-by-id', (req, res)=>{
    const {id, game} = req.query;

    const foundItem = games.filter((elem)=>{
        if(elem.id === id){
            return elem
        }
    })
    if(foundItem.length > 0){
        res.json(foundItem)
    }else{
        res.end("The game with the id does not exist, please check id")
    }


})

router.get('/get-game-by-name', (req, res)=>{
    const {name} = req.body;
    const gameFound = games.filter((elem)=>{
        return elem.game === name
    })
    if(gameFound.length > 0){
        res.json(gameFound)
    }else{
        res.json({
            message: "The game does not exist, please check name."
        })
    }
})

router.post('/create-new-game', (req, res)=>{
    const {game, description} = req.body;
    let newGame = {
        newId: uuidv4(),
        gameName: game,
        newDesc: description
    }
    if(!(newGame.gameName) || !(newGame.newDesc)){
        res.json({
            message: "cannot leave text area blank."
        })
    }else{
        for(let item in games){
            if(item.game === newGame.gameName){
                res.json({
                    message: "Game already exists, cannot add game."
                })
            }
        }
        games.push(newGame)
        res.json(games)
    }
})

router.put('/update-game', (req, res)=>{
    const {id, game, description} = req.body;
    for(let item of games){
    if(item.id === id){
        if(game){
            for(let item of games){
                if(item.id === id){
                    item.game = game
                }
            }
        }
        if(description){
            for(let item of games){
                if(item.id === id){
                    item.description = description
                }
            }
        }
        res.json(games)
    }
    
}
    res.json({
        message: "game not found, cannnot update"
    })
   
})

router.put('/delete-game', (req, res)=>{
    const {id} = req.body;
    const arrayItemDeleted = games.filter((elem)=>{
        return elem.id !== id
    })
    res.json(arrayItemDeleted)
})

module.exports = router;