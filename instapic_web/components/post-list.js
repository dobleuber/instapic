import Cookies from 'js-cookie'
import {useEffect, useState} from 'react'

import {Dimmer, Grid, Loader} from 'semantic-ui-react'

import PostDetails from './post-details'

export default function PostList({data}) {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [nextPage, setNextPage] = useState(null)

  const handleScroll = async (e) => {
    const hasScrollToBottom =
      document.body.scrollHeight - 50 <= document.body.offsetHeight + window.scrollY

    if (!loading && !!nextPage && hasScrollToBottom) {
      setLoading(true)

      const newPageResponse = await fetch(nextPage)
      const newPageData = await newPageResponse.json()

      setPosts([
        ...posts,
        ...newPageData.results
      ])

      setNextPage(newPageData.next)

      setLoading(false)
    }
  }

  // Set up user data
  useEffect(() => {
    if (data) {
      if (data.results) {
        setNextPage(data.next)
        setPosts(data.results)
      }
    }
  }, [data])

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })
  return (
    <Grid container>
      {
        posts.map(post => (
          <Grid.Column
            className='post-detail'
            computer={5}
            key={post.id}
            mobile={16}
            stretched
            tablet={8}
            widescreen={4}
          >
            <PostDetails post={post}/>
          </Grid.Column>
        ))
      }

      <Loader active={loading} inline='centered'/>

    </Grid>
  )
}
