import { useRouter } from 'next/router'
import { useState } from 'react'

import Cookies from 'js-cookie'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function loginUser(form) {
    setLoading(true)
    const formData = new FormData(form.target);
    const data = JSON.stringify(Object.fromEntries(formData))
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api-token-auth/`, {
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    setLoading(false)

    if (response.ok) {
      const jsonResponse = await response.json()
      console.log('token: ', jsonResponse)
      Cookies.set('token', jsonResponse.token)
      router.replace('/')
    }
  }

  return (
      <Grid textAlign='center' style={{height: '90vh'}} verticalAlign='middle'>
      <Grid.Column style={{maxWidth: 450}}>
        <Header as='h2' color='violet' textAlign='center'>
          Log-in
        </Header>
        <Form size='large' onSubmit={loginUser}>
          <Segment stacked>
            <Form.Input
              name="username"
              fluid icon='user'
              iconPosition='left'
              placeholder='Username'
            />
            <Form.Input
              name="password"
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='violet' fluid size='large' loading={loading}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Do you want to create an account? <a href='/sign-up'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm
