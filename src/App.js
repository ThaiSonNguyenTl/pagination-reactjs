import React, { Component } from 'react'
import axios from 'axios';
import Pagination from './components/Pagination';
import Posts from './components/Posts';
class App extends Component{
    constructor(props) {
      super(props)
      this.state = {
        posts: [],
        loading: false,
        currentPage: 1,
        pageSize: 5
      }
    }
  componentDidMount() {
    const getPosts = async () => {
      this.setState({ loading: true });
      const results = await axios.get('https://jsonplaceholder.typicode.com/posts')
      this.setState({
        posts: results.data
      })
      this.setState({loading: false})
    }
    getPosts()
  }
  render() {
    let { currentPage, pageSize, loading, posts } = this.state
    
    let indexLastPage = currentPage * pageSize
    let indexFirstPage = indexLastPage - pageSize
    let currentPosts = posts.slice(indexFirstPage, indexLastPage)
    
    const paginate = pageNum => this.setState({ currentPage: pageNum })
    
    const nextPage = () => {
      if (currentPage === Math.ceil(posts.length / pageSize)) {
        this.setState({ currentPage: 1})
      } else {
        this.setState({ currentPage: currentPage + 1 })
      }  
    }
    const prevPage = () => {
      if (currentPage === 1) {
        this.setState({
          currentPage: Math.ceil(posts.length / pageSize)
        })
      } else {
        this.setState({ currentPage: currentPage - 1 })
      }
    }
        return (
          <div className="container">
          <h1 className="my-5 text-primary text-center">React Pagination</h1>
          <Posts posts={currentPosts} loading={loading} />
            <Pagination
              pageSize={pageSize}
              totalPosts={posts.length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
            />
        </div>
        )
    }
}
export default App