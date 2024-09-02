import { Layout } from 'src/layouts';
import { type Page as PageType } from 'src/types/page';


const Page:PageType = () => {

    return (
        <h1>hello page complaint</h1>
    )
}

Page.getLayout = (page) => 
<Layout>
    {page}
</Layout>

export default Page;