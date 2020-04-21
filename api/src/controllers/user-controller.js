const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports = {
    async getUsers(req, resp) {
        verifyJWT(req, resp);
        if (req.decoded.role === "admin") {
            let users = await User.find();
            return resp.json(users);
        }

        return resp.status(403).send({error: "Only Admins can get all users."});
    },

    async createUser(req, resp) {
        let user = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            role: "user"
        });
        user.setPassword(req.body.password);
        let createdUser = await User
            .create(user)
            .catch(exception => {
                let responseErrors = [];
                let serverErrors = exception.errors;
                if (serverErrors["username"] != undefined) {
                    responseErrors.push(`Username '${serverErrors["username"].value}' ${serverErrors["username"].message}.`);
                }
                if (serverErrors["email"] != undefined) {
                    responseErrors.push(`Email '${serverErrors["email"].value}' ${serverErrors["email"].message}.`);
                }
                return resp.status(422).send(responseErrors);
            });
        return resp.json(createdUser);
    },

    async deleteUserByUsername(req,resp) {
        if (req.body.username === undefined) {
            return resp.status(400).send({error: "Null Username."});
        }

        if (!await User.exists({ username: req.body.username })) {
            return resp.status(400).send({error: `User '${req.body.username}' doesn't exist.`});
        }

        await User.findOneAndRemove({
            username: req.body.username
        });

        if (await User.exists({ username: req.body.username })) {
            return resp.status(500).send({error: `Failed to delete user '${req.body.username}'`});
        }

        return resp.status(200).send({result: "Success"});
    },

    async authenticateUser(req, resp) {
        let username = req.body.username;
        let password = req.body.password;

        if (username === undefined || password === undefined) {
            return resp.status(400).send({error: "Null Username or Password."});
        }

        let user = await User.findOne({
            username : username
        });

        if (user === undefined) {
            return resp.status(422).send({error: `User ${username} doesn't exist.`});
        }

        if (await user.isValidPassword(password)) {
            return resp.json(user.toAuthJSON());    
        }

        return resp.status(403).json({error: "Wrong password."});
    },

    async updateUserInfo(req, resp) {
        verifyJWT(req, resp);

        let params = {
            email: req.body.email
        }
        for (let prop in params) {
            if (!params[prop]) {
                delete params[prop];
            }
        }

        let user = await User.findOneAndUpdate({
            username: req.decoded.username
        },
        params,
        {
            new: true
        });

        return resp.send(user);
    }
}

function verifyJWT(req, res) {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ error: 'No token provided.' });
    }
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to authenticate token.' });
        }
        req.decoded = decoded;
    });
}