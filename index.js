const express = require('express')
const app = express()
const port = 3000

// to parse the body of the request
app.use(express.json());

/*
 CRUD operations:
 we have many http methods:
 - get: to get data from server
 - post: to send data to server
 - put: to update data on server
 - patch: to update data on server
 - delete: to delete data from server
*/

// our data
const users = [
    { id: 1, name: 'Ahmed', age: 25 },
    { id: 2, name: 'Ali', age: 30 },
    { id: 3, name: 'Mohamed', age: 35 },
]

app.get('/users', (req, res) => {
    res.send(users);
})

// path parameters (we're sending the userId in the path)
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(x => x.id == id);
    if (!user) {
        res.status(404).send({message: 'User not found'});
    } else {
        res.send(user);
    }
})

// body (adding a new user)
app.post('/users', (req, res) => {
    const user = {
        // set the id of the new user to be the length of the users array + 1
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }

    users.push(user);
    res.status(201).send(user);
})

// updating a user
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(x => x.id == id);
    if (!user) {
        res.status(404).send({message: 'User not found'});
    } else {
        const newUser = {
            id: user.id,
            name: req.body.name,
            age: req.body.age
        }
        users[users.indexOf(user)] = newUser;
        res.send(newUser);
    }
})

// deleting a user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(x => x.id == id);
    if (!user) {
        res.status(404).send({message: 'User not found'});
    } else {
        users.splice(users.indexOf(user), 1);
        res.send(user);
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})