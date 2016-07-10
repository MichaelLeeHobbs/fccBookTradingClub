/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Books } from './books.js';
import { insertBook, updateBook, removeBook } from './methods.js';

describe('Book methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a book into the Book collection', function () {
    insertBook.call({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    const getBook = Books.findOne({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    assert.equal(getBook.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('updates a book in the Book collection', function () {
    const { _id } = Factory.create('book');

    updateBook.call({
      _id,
      update: {
        title: 'You can\'t arrest me, I\'m the Cake Boss!',
      },
    });

    const getBook = Books.findOne(_id);
    assert.equal(getBook.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('removes a book from the Book collection', function () {
    const { _id } = Factory.create('book');
    removeBook.call({ _id });
    const getBook = Books.findOne(_id);
    assert.equal(getBook, undefined);
  });
});
