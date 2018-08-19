import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      filteredAuthor: [],
      loading: true,
      currentAuthor: {},
      query: ""
    };
  }

  componentDidMount() {
    axios
      .get("https://the-index-api.herokuapp.com/api/authors/")
      .then(res => res.data)
      .then(authors =>
        this.setState({
          authors: authors,
          filteredAuthor: authors,
          loading: false
        })
      )
      .catch(err => console.error(err));
  }

  getContentView() {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.currentAuthor.id) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.filteredAuthor}
          selectAuthorHandler={this.selectAuthor}
          search={this.filterAuthors}
        />
      );
    }
  }

  selectAuthor = id => {
    this.setState({ loading: true });
    axios
      .get(`https://the-index-api.herokuapp.com//api/authors/${id}/`)
      .then(res => res.data)
      .then(author => {
        this.setState({ currentAuthor: author, loading: false });
        console.log(author);
      })
      .catch(err => console.error(err));
  };

  backToAuthorList = () => {
    this.setState({ currentAuthor: {} });
  };

  filterAuthors = event => {
    const query = event.target.value.toLowerCase();
    const list = this.state.authors.filter(author =>
      `${author.first_name}`.toLowerCase().includes(query)
    );
    this.setState({ filteredAuthor: list });
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar back={this.backToAuthorList} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
