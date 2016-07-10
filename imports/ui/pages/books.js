import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BooksList from '../containers/books-list.js';
import { AddBook } from '../components/add-book.js';

export class Books extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subscription: 'books',
      subscriptionParam: ''
    };
  }

  validateSearch(search) {
    return (typeof search === 'string') && search.length >= 4;
  }

  handleUserInput(search) {
    console.log(`page.books.handleUserInput.search: ${search}`)
    this.setState({
      search: this.validateSearch(search),
      subscriptionParam: search
    });
  }

//export const Books = (params) => {
  //console.log(`pages/books.js: ${JSON.stringify(params)}`);
  render() {
    return (<Row>
        <Col xs={ 12 }>
          <h4 className="page-header">Add Book</h4>
          <AddBook onUserInput={this.handleUserInput.bind(this)}/>
          <BooksList id={ this.props.params.id } search={this.state.search} subscriptionParam={this.state.subscriptionParam}/>
        </Col>
      </Row>
    )
  }
}
