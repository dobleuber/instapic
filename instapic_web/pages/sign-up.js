import { useRouter } from 'next/router'
import { useState } from 'react'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const SignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function confirmValidation() {
    const name1 = document.querySelector('[name=password]')
    const name2 = document.querySelector('[name=password2]')
    if (name1.value === name2.value) {
      name2.setCustomValidity('')
    } else {
      name2.setCustomValidity('The passwords must match')
    }
  }

  async function signupUser(form) {
    setLoading(true)
    const formData = new FormData(form.target);
    const data = JSON.stringify(Object.fromEntries(formData))
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register-user/`, {
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    setLoading(false)

    if (response.ok) {
      router.push('/log-in')
    }
  }

  return (
    <Grid textAlign='center' style={{height: '90vh'}} verticalAlign='middle'>
      <Grid.Column style={{maxWidth: 450}}>
        <Header as='h2' color='violet' textAlign='center'>
          Sign Up
        </Header>
        <Form
          size='large'
          onSubmit={signupUser}
        >
          <Segment stacked>
            <Form.Input
              name='username'
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              required
            />
            <Form.Input
              name='email'
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              type='email'
              required
            />
            <Form.Input
              name='password'
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              required
            />

            <Form.Input
              name='password2'
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm password'
              type='password'
              required
              onChange={confirmValidation}
              onBlur={confirmValidation}
            />

            <Button color='violet' fluid size='large' loading={loading}>
              Create Account
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account <a href='/log-in'>Log in</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default SignUpForm
