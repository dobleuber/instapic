import { Card, Image } from 'semantic-ui-react'

export default function PostDetail({post}) {
  if (!post) return null
  return (
    <Card centered>
      <Image src={post.picture} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{post.title}</Card.Header>
        <Card.Meta>Uploaded by {post.owner}</Card.Meta>
        <Card.Meta>Published in {post.created}</Card.Meta>
        <Card.Description>
          {post.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <span>labels</span>
      </Card.Content>
    </Card>
  )
}
