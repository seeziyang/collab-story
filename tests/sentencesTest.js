const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');

const Sentence = require('../models/sentence');
const { expect } = require('chai');

chai.use(chaiHttp);
chai.should();

describe('Sentences', () => {
  let sentences;

  // populate DB
  before(() => {
    const sentence1 = new Sentence({
      text: 'Hello world!',
      font: 'Arial',
      size: 15,
      style: 'Bold',
    });

    const sentence2 = new Sentence({
      text: 'What is this!?',
    });

    const sentence3 = new Sentence({ text: 'A quick brown fox jumps over the lazy dog', size: 12 });

    sentences = [sentence1, sentence2, sentence3];

    sentences.forEach(sentence => sentence.save());
  });

  // remove test sentences from DB
  after(() => {
    sentences.forEach(sentence => sentence.delete());
  });

  describe('GET /api/sentences', () => {
    it('should get all sentences', done => {
      chai
        .request(app)
        .get('/api/sentences')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');

          done();
        });
    });
  });

  describe('GET /api/sentences/:id', () => {
    it('should get sentence 0', done => {
      chai
        .request(app)
        .get(`/api/sentences/${sentences[0]._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');

          const { text, font, size, style, createdOn } = res.body;
          text.should.be.equals(sentences[0].text);
          font.should.be.equals(sentences[0].font);
          size.should.be.equals(sentences[0].size);
          style.should.be.equals(sentences[0].style);
          createdOn.should.be.equals(sentences[0].createdOn.toISOString());

          done();
        });
    });

    it('should get sentence 1', done => {
      chai
        .request(app)
        .get(`/api/sentences/${sentences[1]._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');

          const { text, createdOn } = res.body;
          text.should.be.equals(sentences[1].text);
          createdOn.should.be.equals(sentences[1].createdOn.toISOString());

          done();
        });
    });
  });

  describe('POST /api/sentences', () => {
    let id;

    after(() => Sentence.deleteOne({ _id: id }));

    it('should post sentence', done => {
      const sentenceText = 'Posting this sentence!!';

      chai
        .request(app)
        .post('/api/sentences')
        .set('content-type', 'application/json')
        .send({ text: sentenceText, font: 'Times', size: 8 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.text.should.be.equals(sentenceText);
          res.body.message.should.be.equals(`Sentence ${res.body.data._id} created`);

          id = res.body.data._id;

          done();
        });
    });
  });

  describe('PUT /api/sentences/:id', () => {
    it('should put sentence', done => {
      const sentenceSize = 22;
      const sentenceStyle = 'Bold';

      chai
        .request(app)
        .put(`/api/sentences/${sentences[2]._id}`)
        .set('content-type', 'application/json')
        .send({ size: sentenceSize, style: sentenceStyle })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.size.should.be.equals(sentenceSize);
          res.body.message.should.be.equals(`Sentence ${sentences[2]._id} successfully updated`);

          done();
        });
    });
  });

  describe('PATCH /api/sentences/:id', () => {
    it('should patch sentence', done => {
      const sentenceText = 'Patched text!';

      chai
        .request(app)
        .patch(`/api/sentences/${sentences[2]._id}`)
        .set('content-type', 'application/json')
        .send({ text: sentenceText })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.text.should.be.equals(sentenceText);
          res.body.message.should.be.equals(`Sentence ${sentences[2]._id} successfully updated`);

          done();
        });
    });
  });

  describe('DELETE /api/sentences/:id', () => {
    it('should delete sentence', done => {
      chai
        .request(app)
        .delete(`/api/sentences/${sentences[1]._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.be.equals(`Sentence ${sentences[1]._id} successfully deleted`);

          done();
        });
    });
  });
});
