const Writer = require('../models/writer');
const Newsletter = require('../models/newsletter');

module.exports.dashboard = (req, res) => {
    Newsletter
        .find({published: true})
        .limit(5)
        .exec()
        .then(newsletters => {
            Writer
                .find()
                .exec()
                .then(writers => {
                    res.render(`dashboard`, {
                        title: `Siyu Capital`,
                        newsletters: newsletters,
                        writers: writers
                    });
                });
        })
        .catch(err => res.json({message: err}));
};

module.exports.about = (req, res) => {
    Writer
        .find()
        .exec()
        .then(writers => {
            res.render(`about`, {
                title: `About | Siyu Capital`,
                writers: writers
            });
        })
        .catch(err => res.send(`No writers`));
};

module.exports.contact = (req, res) => {
    res.render(`contact`, {
        title: `Contact | Siyu Capital`
    });
};

module.exports.newContact = (req, res) => {
    res.json({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
};

module.exports.newWriter = (req, res) => {
    Writer
        .create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            twitter: req.body.twitter || '',
            description: req.body.description
        })
        .then(writer => {
            res.json({
                message: `Writer created`,
                writer: writer
            });
        })
        .catch(err => {
            res.json({
                message: `Writer creation ERROR`,
                error: err
            });
        });
};
