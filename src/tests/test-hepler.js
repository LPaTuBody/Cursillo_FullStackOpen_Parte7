const userLoged = {
  name: 'John Doe',
  username: 'some-dude',
}

const users = [
  {
    id: 'B01',
    name: 'John Doe',
    username: 'some-dude',
  },
  {
    id: 'B02',
    name: 'Fulano de Tal',
    username: 'una_gente',
  },
]

const blogs = [
  {
    id: 'A01',
    title: 'This is just an example',
    author: 'somebody_somewhere',
    url: 'https://www.example.com',
    likes: 321,
    user: users[0],
  },
  {
    id: 'A02',
    title: 'This is another example',
    author: 'RandomGuyOnInternet',
    url: 'https://www.examples_for_something_idk.com',
    likes: 441,
    user: users[1].id,
  },
]

export default { userLoged, users, blogs }
