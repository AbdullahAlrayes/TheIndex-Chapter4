import React, { Component } from "react";

// Components
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";

class AuthorsList extends Component {
  render() {
    const authorCards = this.props.authors.map(author => (
      <AuthorCard
        key={author.first_name + author.last_name}
        author={author}
        selectAuthorHandler={this.props.selectAuthorHandler}
      />
    ));

    return (
      <div className="authors">
        <h3>Authors</h3>
        <div>
          <SearchBar search={this.props.search} />
        </div>
        <div className="row">{authorCards}</div>
      </div>
    );
  }
}

export default AuthorsList;
