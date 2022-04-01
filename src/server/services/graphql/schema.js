const typeDefinitions = `
type Post {
  id: Int
  user: User
  text: String
}
type User {
    avatar: String
    username: String
}
type RootQuery {
    posts: [Post]
}
schema {
    query: RootQuery
    input PostInput {
      text: String!
    }
    input UserInput {
      username: String!
      avatar: String!
    }
    type RootMutation {
      addPost {
        post: PostInput!
        user: UserInput!
      }: Post
    }
  }
`;
export default [typeDefinitions];
