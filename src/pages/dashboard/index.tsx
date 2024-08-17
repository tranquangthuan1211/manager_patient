import {FC, ReactNode} from  'react';
import { useAuth } from 'src/hooks/use-auth'; 
import {Layout} from 'src/layouts';
import { type Page as PageType } from 'src/types/page';


const Home: PageType = () => {
  const {user} = useAuth();
  return (
    <Layout>
      <h1>Welcome {user?.email}</h1>
    </Layout>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>
export default Home;