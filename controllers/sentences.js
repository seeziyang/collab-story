const Sentence = require('../models/sentence');

class SentenceController {
  static getAll(req, res) {
    Sentence.find((err, sentences) => {
      if (err) {
        res.status(404);
        return res.json({ message: 'Sentences not found', err });
      }

      res.json(sentences);
    });
  }

  static get(req, res) {
    const { id } = req.params;

    Sentence.findById(id, (err, sentence) => {
      if (err) {
        res.status(404);
        return res.json({ message: `Sentence ${id} not found`, err });
      }

      res.json(sentence);
    });
  }

  static create(req, res) {
    const { text, font, size, style } = req.body;
    const sentence = new Sentence({ text, font, size, style });

    sentence.save(err => {
      if (err) {
        res.status(400);
        return res.json({ message: 'New Sentence could not be created', err });
      }

      res.json({ message: `Sentence ${sentence._id} created`, data: sentence });
    });
  }

  static delete(req, res) {
    const { id } = req.params;

    Sentence.deleteOne({ _id: id }, (err, sentence) => {
      if (err) {
        res.status(404);
        return res.json({ message: `Sentence ${id} could not be deleted`, err });
      }

      res.json({ message: `Sentence ${id} successfully deleted`, data: sentence });
    });
  }

  static update(req, res) {
    const { id } = req.params;
    const { text, font, size, style } = req.body;

    Sentence.findById(id, (err, sentence) => {
      if (err) {
        res.status(404);
        return res.json({ message: `Sentence ${id} not found`, err });
      }

      sentence.text = text || sentence.text;
      sentence.font = font;
      sentence.size = size;
      sentence.style = style;

      sentence.save(err => {
        if (err) {
          res.status(400);
          return res.json({ message: `Sentence ${id} could not be updated`, err });
        }

        res.json({ message: `Sentence ${id} successfully updated`, data: sentence });
      });
    });
  }
}

module.exports = SentenceController;
