import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotiDispatch, setNoti } from '../contexts/NotiContext'
import { useBlogDispatch, setBlogs } from '../contexts/BlogContext'
import blogService from '../services/blogs'

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2,
    throwOnError: (err) => console.log('Error fetching blogs:', err),
  })
}

export const useBlogMutation = () => {
  const notiDispatch = useNotiDispatch()
  const blogDispatch = useBlogDispatch()
  const queryClient = useQueryClient()

  const { mutate: createBlog } = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const mapedBlogs = blogs.concat(newBlog)
      queryClient.setQueryData(['blogs'], mapedBlogs)
      blogDispatch(setBlogs(mapedBlogs))
      document.querySelector('form').reset()

      notiDispatch(
        setNoti([
          `A new blog "${newBlog.title}" by ${newBlog.author} added!`,
          'success',
        ]),
      )
      console.log('Blog successfully created:', newBlog)
    },
    onError: (err) => {
      notiDispatch(setNoti([err.response.data.error, 'error']))
      console.error('Error creating blog:', err)
    },
  })

  const { mutate: updateBlog } = useMutation({
    mutationFn: ({ id, updBlog }) => blogService.update(id, updBlog),
    onSuccess: (updBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const mapedBlogs = blogs.map((b) => (b.id === updBlog.id ? updBlog : b))
      queryClient.setQueryData(['blogs'], mapedBlogs)
      blogDispatch(setBlogs(mapedBlogs))
      document.querySelector('form').reset()

      notiDispatch(setNoti([`Blog "${updBlog.title}" updated!`, 'success']))
      console.log('Blog successfully updated:', updBlog)
    },
    onError: (err) => {
      notiDispatch(
        setNoti([
          'Blog not found. Are you trying to update a deleted blog?',
          'error',
        ]),
      )
      console.error('Error updating blog:', err)
    },
  })

  const { mutate: deleteBlog } = useMutation({
    mutationFn: (id) => blogService.dilit(id),
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const mapedBlogs = blogs.filter((b) => b.id !== id)
      queryClient.setQueryData(['blogs'], mapedBlogs)
      blogDispatch(setBlogs(mapedBlogs))

      notiDispatch(setNoti(['Blog deleted successfully!', 'success']))
      console.log(`Blog with id ${id} deleted successfully`)
    },
    onError: (err) => {
      notiDispatch(setNoti([err.response.data.error, 'error']))
      console.error('Error deleting blog:', err)
    },
  })

  const { mutate: likeBlog } = useMutation({
    mutationFn: ({ id, likedBlog }) => blogService.update(id, likedBlog),
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const mapedBlogs = blogs.map((b) =>
        b.id === likedBlog.id ? likedBlog : b,
      )
      queryClient.setQueryData(['blogs'], mapedBlogs)
      blogDispatch(setBlogs(mapedBlogs))
    },
    onError: (err) => {
      notiDispatch(setNoti([err.response.data.error, 'error']))
      console.error('Error liking blog:', err)
    },
  })

  return {
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
  }
}
