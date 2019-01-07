const Newsletter = require('../models/newsletter');
const Writer = require('../models/writer');

module.exports.list = (req, res) => {
    Newsletter
        .find({published: true})
        .exec()
        .then(newsletters => {
            res.render(`newsletter-list`, {
                title: `Newsletters | Siyu Capital`,
                newsletters: newsletters
            });
        })
        .catch(err => res.send(`No newsletters list`));
};

module.exports.new = (req, res) => {
    Writer
        .find({
            'email': {
                $in: req.body.writer || req.body.writers
            }
        })
        .then(writers => {
            Newsletter
                .create({
                    title:req.body.title,
                    content: req.body.content,
                    writers: writers
                })
                .then(newsletter => {
                    res.json({
                        message: `Newsletter creation successful`,
                        newsletter: newsletter
                    });
                })
                .catch(err => res.json({message: err}));
        })
        .catch(err => res.json({message: err}));
};

module.exports.detail = (req, res) => {
    Newsletter
        .findOne({slug: req.params.slug})
        .exec()
        .then(newsletter => {
            res.render('newsletter-detail', {
                title: `${newsletter.title} | Newsletter | Siyu Capital`,
                newsletter: newsletter
            });
        })
        .catch(err => res.json({message: err}));
};

module.exports.edit = (req, res) => {
    Newsletter
        .findOneAndUpdate({slug: req.params.slug}, req.body)
        .exec()
        .then(newsletter => {
            res.json({
                message: `Newsletter update successful`,
                newsletter: newsletter
            });
        })
        .catch(err => res.json({message: err}));
};

module.exports.delete = (req, res) => {
    Newsletter
        .findOneAndDelete({
            slug: req.params.slug
        })
        .exec()
        .then(() => {
            res.json({message: `Newsletter deleted`})
        })
        .catch(err => res.json({message: err}));
};
