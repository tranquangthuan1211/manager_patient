import {Page as PageType} from 'src/types/page';
import {Layout} from 'src/layouts/index';
import {LayoutPatient} from 'src/layouts/patient/patient-layout';

const Page: PageType = () => {
    return (

            <div>
                <h1>Lịch hẹn</h1>
            </div>
    )
}
Page.getLayout = (page) => <Layout>{page}</Layout>

export default Page;