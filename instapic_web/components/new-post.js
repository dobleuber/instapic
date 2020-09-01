import {useState} from 'react'

import {Button, Form, Image, TextArea, Segment} from 'semantic-ui-react'
import Cookies from 'js-cookie'

export default function NewPost() {
  const [loading, setLoading] = useState(false)

  async function createPost(form) {
    setLoading(true)
    const formData = new FormData(form.target);
    const token = Cookies.get('token')
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: formData
    })
    setLoading(false)
  }

  function pictureChange(event) {
    const reader = new FileReader()
    reader.onload = (e) => {
      document.querySelector('#preview')
        .setAttribute('src', e.target.result);
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  return (
      <Form size='large' onSubmit={createPost}>
        <Segment stacked>
          <Form.Field>
            <TextArea
              name='description'
              placeholder='What is your story?'
              length={256}
              rows={3}
              required
            />
          </Form.Field>
          <div style={{width: '100%', textAlign: 'center'}}>
            <Image
              id="preview"
              size='medium'
              centered
              verticalAlign='middle'
            />
          </div>
          <Form.Input
            name='picture'
            fluid icon='file'
            iconPosition='left'
            type='file'
            required
            onChange={pictureChange}
          />
          <Button color='violet' fluid size='large' loading={loading}>
            Create post
          </Button>
        </Segment>
      </Form>
  )
}
