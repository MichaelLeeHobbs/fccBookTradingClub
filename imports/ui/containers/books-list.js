import { composeWithTracker } from 'react-komposer';
import { Books } from '../../api/books/books.js';
import { BookSearch } from '../../api/bookSearch/bookSearch.js';
import { BooksList } from '../components/books-list.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  console.log(`params.subscription: ${params.subscription}  params.subscriptionParam: ${params.subscriptionParam}`);

  const subscription = Meteor.subscribe('books');
  if (subscription.ready()) {
    let books;
    if (params.id) {
      books = Books.find({owner: params.id}).fetch();
    } else {
      books = Books.find().fetch();
    }
    if (! params.search) {
      console.log('books: ', {books});
      onData(null, {books});
    }
  }

  let search;
  if (params.search) {
    search = Meteor.subscribe('bookSearch', params.subscriptionParam);
    if(search.ready()){
      let searchResults = BookSearch.find().fetch();
      console.log('search: ', searchResults.length, searchResults);
      onData(null, { books: searchResults });
    }
  }
};

export default composeWithTracker(composer, Loading)(BooksList);
