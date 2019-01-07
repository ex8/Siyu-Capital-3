const Newsletter = require('../models/newsletter');

module.exports.comment = (req, res) => {
    res.render('new-comment', {
        title: `New Comment | Siyu Capital`
    });
};

module.exports.newComment = (req, res) => {
    Newsletter
        .findOne({slug: req.params.slug})
        .exec()
        .then(newsletter => {
            newsletter.comments.push(req.body);
            newsletter.save();
            res.redirect(`/newsletters/${newsletter.slug}`);
        })
        .catch(err => res.json({message: err}));
};
