import React, { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import calculateAge from '../utils/calculateAge'
import { REVALIDATE_SECONDS } from '../utils/constants'
import UserData from '../data/user'
import IUser from '../types/user'
import Layout from '../layout'
import ProjectData from '../data/project'

type userProps = {
  user: IUser
}

const Index = ({ user }: userProps) => {
  return (
    <div
      style={{
        padding: '1rem'
      }}
    >
      <h1>Hello, Welcome to my portfolio</h1>
      <h2>
        I am {user.name}. I live in {user.city} and i am{' '}
        {calculateAge(new Date(user.dob))} years old.
      </h2>
      <p> {user.about}</p>
    </div>
  )
}

export default Index
Index.getLayout = (page: ReactElement, user: IUser) => (
  <Layout data={user}>{page}</Layout>
)
export const getStaticProps: GetStaticProps = async () => {
  const user = await UserData
  const projects = await ProjectData
  return {
    props: {
      user,
      projects
    },
    revalidate: REVALIDATE_SECONDS
  }
}
