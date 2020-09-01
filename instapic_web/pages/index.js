import {useState} from 'react'

import {Accordion, Container, Grid, Header} from 'semantic-ui-react'

import styles from '../styles/Home.module.scss'
import NewPost from '../components/new-post'
import PostList from '../components/post-list'
import cookieParser from '../utils/cookie-parser'

export default function Home({data}) {
  const [accordionState, setAccordionState] = useState(-1)
  function handleAccordion(e, titleProps) {
    const {index} = titleProps
    if (accordionState === 0) {
      setAccordionState(-1)
    } else {
      setAccordionState(0)
    }
  }
  if(!(data && data.results)) {
    return null
  }

  return (
    <Container>
      <main className={styles.main}>
        <Accordion fluid>
          <Accordion.Title
            active={accordionState === 0}
            index={0}
            onClick={handleAccordion}
          >
            <Header as='h2' color='violet' textAlign='center'>
              Would you like to share something?
            </Header>
          </Accordion.Title>
          <Accordion.Content
            active={accordionState === 0}
          >
            <Grid container centered>
              <Grid.Column mobile={16} tablet={8} computer={8} widescreen={6}>
                <NewPost/>
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
        <h1>Post List</h1>
        <PostList
          data={data}
        />
      </main>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const cookies = cookieParser(context)
  console.log('token: ', cookies.token)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
    headers: {
      'Authorization': `Token ${cookies.token}`,
    },
  })

  let data = {}
  if (response.ok) {
    data = await response.json()
  }

  console.log('data: ', data)

  return {
    props: {
      data
    }, // will be passed to the page component as props
  }
}
