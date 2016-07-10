import { Meteor } from 'meteor/meteor';
import { BookSearch } from '../bookSearch';
import { HTTP } from 'meteor/http';

const getBook = function (oclc, cb) {
  //https://openlibrary.org/api/books?bibkeys=OCLC:38891494&jscmd=data&format=json
  let url = `https://openlibrary.org/api/books?bibkeys=OCLC:${oclc}&jscmd=data&format=json`;
  HTTP.get(url, cb);
};

const searchBookByTitle = function (title, cb) {
  // http://openlibrary.org/search.json?title=the+lord+of+the+rings
  let url = `http://openlibrary.org/search.json?title=${title.replace(/\s/g, '+')}`;
  HTTP.get(url, cb);
};

Meteor.publish('bookSearch', (search) =>{
  if (! search) {
    return;
  }
  check(search, String);
  // todo take a look at a better way to handle this - clear previous search results for now
  BookSearch.remove({});

  searchBookByTitle(search, (error, response) => {
    if (!error) {
      let content = JSON.parse(response.content)

      content.docs.forEach((ele)=> {
        // if no oclc then skip
        if (! ele.oclc) {
          return;
        }
        ele.oclc.forEach((oclc)=>{
          BookSearch.insert({
            oclc: oclc,
            search: search,
            coverUrl: `http://covers.openlibrary.org/b/oclc/${oclc}-M.jpg`
          });
        });
      });
    } else {
      // todo log error
    }
  });

  return BookSearch.find({search: search});
});

