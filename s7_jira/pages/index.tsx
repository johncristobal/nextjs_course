import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'

const HomePage: NextPage = () => {
  return (
    <Layout title='Hi jira'>
      <Typography color='primary'>Hoem page</Typography>
    </Layout>
  )
}

export default HomePage
