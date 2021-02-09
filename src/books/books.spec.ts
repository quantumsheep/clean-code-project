import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../api'
import { IUser } from '../models/user.model';
import { UsersService } from '../users/users.service';

chai.use(chaiHttp);
chai.should();

describe('Books', () => {
  let user: IUser = null;

  before(async () => {
    const res = await chai.request(app)
      .post('/users');

    user = await UsersService.update(res.body._id, {
      is_librarian: true,
    });
  });

  describe('Add a new book', () => {
    it('Book is added when valid', async () => {
      const res = await chai.request(app)
        .post('/books')
        .query({ token: user.token })
        .send({
          name: 'A',
          author: 'B',
        });

      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');

      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('name', 'A');
      expect(res.body).to.have.property('author', 'B');

      const res2 = await chai.request(app)
        .get(`/books/${res.body._id}`);

      expect(res2).to.have.status(200);
      expect(res2.body).to.be.a('object');

      expect(res2.body).to.have.property('_id', res.body._id);
      expect(res2.body).to.have.property('name', res.body.name);
      expect(res2.body).to.have.property('author', res.body.author);
    });
  });
});
